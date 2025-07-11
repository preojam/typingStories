package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.GenreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin
@Tag(name = "Stories", description = "CRUD-Endpunkte für Stories")
public class StoryController {

    private final StoryRepository storyRepo;
    private final GenreRepository genreRepo;
    private final Path uploadDir = Path.of("uploads");

    @Autowired
    public StoryController(StoryRepository storyRepo, GenreRepository genreRepo) {
        this.storyRepo = storyRepo;
        this.genreRepo = genreRepo;
    }

    @Operation(summary = "Alle Stories abrufen (optional nach Genre filtern)")
    @ApiResponse(responseCode = "200", description = "Liste der Stories")
    @GetMapping
    public List<Story> getAll(
            @RequestParam(value = "genreId", required = false) Long genreId
    ) {
        if (genreId != null) {
            return storyRepo.findByGenreId(genreId);
        }
        return storyRepo.findAll();
    }

    @Operation(summary = "Story nach ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Story gefunden"),
            @ApiResponse(responseCode = "404", description = "Story nicht gefunden")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Story> getById(@PathVariable Long id) {
        return storyRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Letzte Story abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Letzte Story"),
            @ApiResponse(responseCode = "204", description = "Keine Stories vorhanden")
    })
    @GetMapping("/last")
    public ResponseEntity<Story> getLastStory() {
        return storyRepo.findTopByOrderByIdDesc()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    @Operation(summary = "Eigene Stories abrufen")
    @ApiResponse(responseCode = "200", description = "Liste eigener Stories")
    @GetMapping("/mine")
    public ResponseEntity<List<Story>> getMyStories() {
        return ResponseEntity.ok(storyRepo.findAll());
    }

    @Operation(summary = "Neue Story anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Story erstellt"),
            @ApiResponse(responseCode = "400", description = "Ungültige Genre-Angabe")
    })
    @PostMapping
    public ResponseEntity<Story> create(@RequestBody @Valid Story story) {
        if (story.getGenre() == null
                || story.getGenre().getId() == null
                || !genreRepo.existsById(story.getGenre().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Story saved = storyRepo.save(story);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @Operation(summary = "Story aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Story aktualisiert"),
            @ApiResponse(responseCode = "400", description = "Ungültige Daten"),
            @ApiResponse(responseCode = "404", description = "Story nicht gefunden")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Story> update(
            @PathVariable Long id,
            @RequestBody @Valid Story story
    ) {
        if (!storyRepo.existsById(id)
                || story.getGenre() == null
                || story.getGenre().getId() == null
                || !genreRepo.existsById(story.getGenre().getId())) {
            return ResponseEntity.badRequest().build();
        }
        story.setId(id);
        return ResponseEntity.ok(storyRepo.save(story));
    }

    @Operation(summary = "Story löschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Story gelöscht"),
            @ApiResponse(responseCode = "404", description = "Story nicht gefunden")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!storyRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        storyRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Cover-Bild für Story hochladen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cover hochgeladen"),
            @ApiResponse(responseCode = "415", description = "Dateiformat nicht unterstützt")
    })
    @PostMapping("/{id}/cover")
    public ResponseEntity<Void> uploadCover(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        var story = storyRepo.findById(id).orElseThrow();

        String ct = file.getContentType();
        if (ct == null || !ct.startsWith("image/")) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
        }
        String ext = FilenameUtils.getExtension(
                Objects.requireNonNull(file.getOriginalFilename())
        ).toLowerCase();
        if (!List.of("png","jpg","jpeg","gif").contains(ext)) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();
        }
        Files.createDirectories(uploadDir);
        Path dest = uploadDir.resolve(id + "." + ext);
        file.transferTo(dest.toFile());

        story.setCoverUrl("/uploads/" + dest.getFileName());
        storyRepo.save(story);
        return ResponseEntity.ok().build();
    }
}
