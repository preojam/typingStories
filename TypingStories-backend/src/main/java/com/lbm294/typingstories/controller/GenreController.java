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

/**
 * REST-Controller für die Verwaltung von Genre-Ressourcen.
 * <p>
 * Bietet Endpunkte zum Erstellen, Lesen, Aktualisieren und Löschen (CRUD)
 * von Genres. Alle Routen sind unter "/api/genres" erreichbar.
 * CORS ist standardmäßig aktiviert.
 * </p>
 */
@RestController
@RequestMapping("/api/genres")
@CrossOrigin
@Tag(name = "Genres", description = "Verwaltung aller Genres")
public class GenreController {

    private final GenreRepository genreRepo;

    /**
     * Konstruktor für GenreController.
     *
     * @param genreRepo Repository für Genre-Entitäten.
     */
    @Autowired
    public GenreController(GenreRepository genreRepo) {
        this.genreRepo = genreRepo;
    }

    /**
     * Gibt eine Liste aller vorhandenen Genres zurück.
     *
     * @return Liste aller Genres.
     */
    @Operation(summary = "Alle Genres abrufen")
    @ApiResponse(responseCode = "200", description = "Liste aller Genres")
    @GetMapping
    public List<Genre> getAll() {
        return genreRepo.findAll();
    }

    /**
     * Gibt ein Genre anhand seiner ID zurück.
     *
     * @param id ID des abzufragenden Genres.
     * @return {@code ResponseEntity} mit dem Genre und Status 200,
     *         oder Status 404, wenn das Genre nicht gefunden wurde.
     */
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

    /**
     * Legt ein neues Genre an.
     *
     * @param genre Genre-Daten im Request-Body (muss gültig sein).
     * @return {@code ResponseEntity} mit dem erstellten Genre und Status 201,
     *         oder Status 400 bei ungültigen Daten.
     */
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

    /**
     * Legt mehrere neue Genres auf einmal an.
     *
     * @param genres Liste der anzulegenden Genres.
     * @return {@code ResponseEntity} mit den erstellten Genres und Status 201.
     */
    @Operation(summary = "Mehrere Genres auf einmal anlegen")
    @ApiResponse(responseCode = "201", description = "Genres erstellt")
    @PostMapping("/batch")
    public ResponseEntity<List<Genre>> createBatch(@RequestBody List<Genre> genres) {
        List<Genre> saved = genreRepo.saveAll(genres);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aktualisiert ein bestehendes Genre.
     *
     * @param id    ID des zu aktualisierenden Genres.
     * @param genre Genre-Daten im Request-Body (muss gültig sein).
     * @return {@code ResponseEntity} mit dem aktualisierten Genre und Status 200,
     *         oder Status 404, wenn das Genre nicht gefunden wurde.
     */
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

    /**
     * Löscht ein Genre anhand seiner ID.
     *
     * @param id ID des zu löschenden Genres.
     * @return {@code ResponseEntity} mit Status 204 bei erfolgreichem Löschen,
     *         oder Status 404, wenn das Genre nicht gefunden wurde.
     */
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
