package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Score;
import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.ScoreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * REST-Controller für die Verwaltung von Score-Ressourcen.
 * <p>
 * Bietet Endpunkte zum Erstellen, Lesen, Aktualisieren und Löschen (CRUD) von Bewertungen
 * (Scores) für Stories. Optional kann nach Story gefiltert werden.
 * </p>
 */
@RestController
@RequestMapping("/api/scores")
@CrossOrigin
@Tag(name = "Scores", description = "Bewertungen für eine Story")
public class ScoreController {

    private final ScoreRepository scoreRepo;
    private final StoryRepository storyRepo;

    /**
     * Konstruktor für ScoreController.
     *
     * @param scoreRepo Repository für Score-Entitäten.
     * @param storyRepo Repository für Story-Entitäten.
     */
    @Autowired
    public ScoreController(ScoreRepository scoreRepo, StoryRepository storyRepo) {
        this.scoreRepo = scoreRepo;
        this.storyRepo = storyRepo;
    }

    /**
     * Gibt alle Scores zurück, optional gefiltert nach Story.
     *
     * @param storyId (optional) ID der Story, nach der gefiltert werden soll.
     * @return {@code ResponseEntity} mit der Liste der Scores und Status 200,
     *         oder Status 404, wenn die angegebene Story nicht existiert.
     */
    @Operation(summary = "Alle Scores (optional nach Story filtern)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Liste der Scores"),
            @ApiResponse(responseCode = "404", description = "Story nicht gefunden")
    })
    @GetMapping
    public ResponseEntity<List<Score>> getAll(
            @RequestParam(value = "storyId", required = false) Long storyId
    ) {
        if (storyId != null && !storyRepo.existsById(storyId)) {
            return ResponseEntity.notFound().build();
        }
        List<Score> list = (storyId != null)
                ? scoreRepo.findByStoryId(storyId)
                : scoreRepo.findAll();
        return ResponseEntity.ok(list);
    }

    /**
     * Legt einen neuen Score an.
     *
     * @param score Score-Objekt im Request-Body (muss gültig sein und eine Story-ID enthalten).
     * @return {@code ResponseEntity} mit dem erstellten Score und Status 201,
     *         oder Status 400 bei fehlender oder ungültiger Story-ID.
     * @throws ResponseStatusException bei fehlender oder nicht vorhandener Story-ID.
     */
    @Operation(summary = "Einen neuen Score anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Score erstellt"),
            @ApiResponse(responseCode = "400", description = "Ungültige Anfrage")
    })
    @PostMapping
    public ResponseEntity<Score> create(@RequestBody @Valid Score score) {
        if (score.getStory() == null || score.getStory().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing story ID");
        }
        Story story = storyRepo.findById(score.getStory().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Story not found"
                ));
        score.setStory(story);
        Score saved = scoreRepo.save(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aktualisiert einen bestehenden Score.
     *
     * @param id    ID des zu aktualisierenden Scores.
     * @param score Score-Objekt im Request-Body (muss gültig sein und eine Story-ID enthalten).
     * @return {@code ResponseEntity} mit dem aktualisierten Score und Status 200,
     *         Status 400 bei fehlender oder ungültiger Story-ID,
     *         oder Status 404, wenn der Score nicht existiert.
     * @throws ResponseStatusException bei fehlender oder nicht vorhandener Story-ID.
     */
    @Operation(summary = "Bestehenden Score aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Score aktualisiert"),
            @ApiResponse(responseCode = "400", description = "Ungültige Anfrage"),
            @ApiResponse(responseCode = "404", description = "Score nicht gefunden")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Score> update(
            @PathVariable Long id,
            @RequestBody @Valid Score score
    ) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        if (score.getStory() == null || score.getStory().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing story ID");
        }
        Story story = storyRepo.findById(score.getStory().getId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Story not found"
                ));
        score.setStory(story);
        score.setId(id);
        return ResponseEntity.ok(scoreRepo.save(score));
    }

    /**
     * Löscht einen Score anhand seiner ID.
     *
     * @param id ID des zu löschenden Scores.
     * @return {@code ResponseEntity} mit Status 204 bei erfolgreichem Löschen,
     *         oder Status 404, wenn der Score nicht existiert.
     */
    @Operation(summary = "Score löschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Score gelöscht"),
            @ApiResponse(responseCode = "404", description = "Score nicht gefunden")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        scoreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
