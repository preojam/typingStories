package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.GenreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
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
public class StoryController {

    private final StoryRepository storyRepo;
    private final GenreRepository genreRepo;
    private final Path uploadDir = Path.of("uploads");

    @Autowired
    public StoryController(StoryRepository storyRepo, GenreRepository genreRepo) {
        this.storyRepo = storyRepo;
        this.genreRepo = genreRepo;
    }

    /**
     * Alle Stories abrufen oder nach Genre filtern, wenn ?genreId=… gesetzt ist.
     * GET /api/stories?genreId={id}
     */
    @GetMapping
    public List<Story> getAll(
            @RequestParam(value = "genreId", required = false) Long genreId
    ) {
        if (genreId != null) {
            return storyRepo.findByGenreId(genreId);
        }
        return storyRepo.findAll();
    }

    /** Einzelne Story abrufen */
    @GetMapping("/{id}")
    public ResponseEntity<Story> getById(@PathVariable Long id) {
        return storyRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /** Letzte Story abrufen */
    @GetMapping("/last")
    public ResponseEntity<Story> getLastStory() {
        return storyRepo.findTopByOrderByIdDesc()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }

    /** "Meine" Stories (aktuell einfach alle; später nach Nutzer filtern) */
    @GetMapping("/mine")
    public ResponseEntity<List<Story>> getMyStories() {
        List<Story> mine = storyRepo.findAll();
        return ResponseEntity.ok(mine);
    }

    /** Neue Story anlegen */
    @PostMapping
    public ResponseEntity<Story> create(@RequestBody @Valid Story story) {
        if (story.getGenre() == null ||
                story.getGenre().getId() == null ||
                !genreRepo.existsById(story.getGenre().getId())) {
            return ResponseEntity.badRequest().build();
        }
        Story saved = storyRepo.save(story);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /** Story aktualisieren */
    @PutMapping("/{id}")
    public ResponseEntity<Story> update(
            @PathVariable Long id,
            @RequestBody @Valid Story story
    ) {
        if (!storyRepo.existsById(id) ||
                story.getGenre() == null ||
                story.getGenre().getId() == null ||
                !genreRepo.existsById(story.getGenre().getId())) {
            return ResponseEntity.badRequest().build();
        }
        story.setId(id);
        Story updated = storyRepo.save(story);
        return ResponseEntity.ok(updated);
    }

    /** Story löschen */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!storyRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        storyRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /** Cover-Upload für eine Story */
    @PostMapping("/{id}/cover")
    public ResponseEntity<Void> uploadCover(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        Story story = storyRepo.findById(id).orElseThrow();

        // Nur Bilddateien erlauben
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return ResponseEntity
                    .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .build();
        }

        // Dateiendung prüfen
        String ext = FilenameUtils.getExtension(
                Objects.requireNonNull(file.getOriginalFilename())
        ).toLowerCase();
        List<String> allowed = List.of("png", "jpg", "jpeg", "gif");
        if (!allowed.contains(ext)) {
            return ResponseEntity
                    .status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .build();
        }

        // Upload-Verzeichnis anlegen und Datei speichern
        Files.createDirectories(uploadDir);
        Path dest = uploadDir.resolve(id + "." + ext);
        file.transferTo(dest.toFile());

        // Cover-URL in der Story hinterlegen
        story.setCoverUrl("/uploads/" + dest.getFileName());
        storyRepo.save(story);

        return ResponseEntity.ok().build();
    }
}
