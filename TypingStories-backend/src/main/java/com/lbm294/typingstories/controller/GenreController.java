package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Genre;
import com.lbm294.typingstories.repository.GenreRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@CrossOrigin
@Tag(name = "Genres", description = "Verwaltung aller Genres")
public class GenreController {

    private final GenreRepository genreRepo;

    @Autowired
    public GenreController(GenreRepository genreRepo) {
        this.genreRepo = genreRepo;
    }

    @Operation(summary = "Alle Genres abrufen")
    @ApiResponse(responseCode = "200", description = "Liste aller Genres")
    @GetMapping
    public List<Genre> getAll() {
        return genreRepo.findAll();
    }

    @Operation(summary = "Genre nach ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Genre gefunden"),
            @ApiResponse(responseCode = "404", description = "Genre nicht gefunden")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Genre> getById(@PathVariable Long id) {
        return genreRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Neues Genre anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Genre erstellt"),
            @ApiResponse(responseCode = "400", description = "Ungültige Daten")
    })
    @PostMapping
    public ResponseEntity<Genre> create(@RequestBody @Valid Genre genre) {
        Genre saved = genreRepo.save(genre);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @Operation(summary = "Mehrere Genres auf einmal anlegen")
    @ApiResponse(responseCode = "201", description = "Genres erstellt")
    @PostMapping("/batch")
    public ResponseEntity<List<Genre>> createBatch(@RequestBody List<Genre> genres) {
        List<Genre> saved = genreRepo.saveAll(genres);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @Operation(summary = "Genre aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Genre aktualisiert"),
            @ApiResponse(responseCode = "404", description = "Genre nicht gefunden")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Genre> update(
            @PathVariable Long id,
            @RequestBody @Valid Genre genre
    ) {
        if (!genreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        genre.setId(id);
        return ResponseEntity.ok(genreRepo.save(genre));
    }

    @Operation(summary = "Genre löschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Genre gelöscht"),
            @ApiResponse(responseCode = "404", description = "Genre nicht gefunden")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!genreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        genreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
