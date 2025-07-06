package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.GenreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import jakarta.validation.Valid;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin
public class StoryController {

    private final StoryRepository storyRepo;
    private final GenreRepository genreRepo;

    /**
     * Verzeichnis, in dem Uploads (Cover-Bilder) gespeichert werden.
     * Wird relativ zum Arbeitsverzeichnis deiner Spring-Boot-App angelegt:
     *  LB-typingstories/uploads/
     */
    private final Path uploadDir = Path.of("uploads");

    @Autowired
    public StoryController(StoryRepository storyRepo, GenreRepository genreRepo) {
        this.storyRepo = storyRepo;
        this.genreRepo = genreRepo;
    }

    @GetMapping
    public List<Story> getAll() {
        return storyRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getById(@PathVariable Long id) {
        return storyRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/last")
    public ResponseEntity<Story> getLastStory() {
        return storyRepo.findTopByOrderByIdDesc()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }


    @PostMapping
    public ResponseEntity<Story> create(@RequestBody @Valid Story story) {
        // Genre-Must-Haves prüfen
        if (story.getGenre() == null || story.getGenre().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }
        if (!genreRepo.existsById(story.getGenre().getId())) {
            return ResponseEntity.badRequest().body(null);
        }
        Story saved = storyRepo.save(story);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> update(@PathVariable Long id, @RequestBody @Valid Story story) {
        if (!storyRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (story.getGenre() == null || story.getGenre().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        story.setId(id);
        Story updated = storyRepo.save(story);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!storyRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        storyRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Upload eines Cover-Bildes für eine bestehende Story.
     * URL: POST /api/stories/{id}/cover
     * RequestParam "file" muss ein MultipartFile sein.
     */
    @PostMapping("/{id}/cover")
    public ResponseEntity<Void> uploadCover(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        // Story laden (wirft 404, wenn nicht vorhanden)
        Story story = storyRepo.findById(id).orElseThrow();

        // Dateiendung aus dem Original-Dateinamen extrahieren
        String ext = Objects.requireNonNull(
                FilenameUtils.getExtension(file.getOriginalFilename())
        );

        // Upload-Verzeichnis anlegen, falls noch nicht vorhanden
        Files.createDirectories(uploadDir);

        // Zieldatei: uploads/{id}.{ext}
        Path dest = uploadDir.resolve(id + "." + ext);

        // Datei auf der Festplatte speichern
        file.transferTo(dest.toFile());

        // URL, unter der der Client das Bild später anfordern kann
        // (z.B. http://localhost:8080/{id}.png – du brauchst evtl. eine
        // ResourceHandler-Config, um "uploads/" statisch auszuliefern)
        story.setCoverUrl("/" + dest.getFileName().toString());

        // Story mit Cover-URL aktualisieren
        storyRepo.save(story);
        return ResponseEntity.ok().build();
    }
}
