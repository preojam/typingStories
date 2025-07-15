package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.TypingResult;
import com.lbm294.typingstories.repository.TypingResultRepository;
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
 * REST-Controller für die Verwaltung von Tippergebnissen.
 * <p>
 * Bietet CRUD-Endpunkte zum Abrufen, Erstellen, Aktualisieren
 * und Löschen von Tippergebnissen (TypingResult).
 * </p>
 */
@RestController
@RequestMapping("/api/typingresults")
@CrossOrigin
@Tag(name = "TypingResults", description = "Tippergebnisse speichern und abrufen")
public class TypingResultController {

    private final TypingResultRepository typingResultRepo;

    /**
     * Konstruktor für TypingResultController.
     *
     * @param typingResultRepo Repository für TypingResult-Entitäten
     */
    @Autowired
    public TypingResultController(TypingResultRepository typingResultRepo) {
        this.typingResultRepo = typingResultRepo;
    }

    /**
     * Gibt alle Tippergebnisse zurück.
     *
     * @return Liste aller gespeicherten TypingResult-Objekte
     */
    @Operation(summary = "Alle Tippergebnisse abrufen")
    @ApiResponse(responseCode = "200", description = "Liste aller Ergebnisse")
    @GetMapping
    public List<TypingResult> getAll() {
        return typingResultRepo.findAll();
    }

    /**
     * Gibt ein Tippergebnis anhand seiner ID zurück.
     *
     * @param id ID des abzufragenden Tippergebnisses
     * @return ResponseEntity mit dem Ergebnis und Status 200,
     *         oder Status 404, wenn das Ergebnis nicht gefunden wurde
     */
    @Operation(summary = "Tippergebnis nach ID abrufen")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ergebnis gefunden"),
            @ApiResponse(responseCode = "404", description = "Ergebnis nicht gefunden")
    })
    @GetMapping("/{id}")
    public ResponseEntity<TypingResult> getById(@PathVariable Long id) {
        return typingResultRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Legt ein neues Tippergebnis an.
     *
     * @param result TypingResult-Objekt im Request-Body (muss gültig sein und mit Story verknüpft sein)
     * @return ResponseEntity mit dem gespeicherten Ergebnis und Status 201,
     *         oder Status 400, wenn die Anfrage ungültig ist
     */
    @Operation(summary = "Neues Tippergebnis anlegen")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Ergebnis gespeichert"),
            @ApiResponse(responseCode = "400", description = "Ungültige Anfrage")
    })
    @PostMapping
    public ResponseEntity<TypingResult> create(@RequestBody @Valid TypingResult result) {
        if (result.getStory() == null || result.getStory().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        TypingResult saved = typingResultRepo.save(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * Aktualisiert ein bestehendes Tippergebnis.
     *
     * @param id     ID des zu aktualisierenden Tippergebnisses
     * @param result TypingResult-Objekt im Request-Body (muss gültig sein)
     * @return ResponseEntity mit dem aktualisierten Ergebnis und Status 200,
     *         oder Status 404, wenn das Ergebnis nicht gefunden wurde
     */
    @Operation(summary = "Tippergebnis aktualisieren")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ergebnis aktualisiert"),
            @ApiResponse(responseCode = "404", description = "Ergebnis nicht gefunden")
    })
    @PutMapping("/{id}")
    public ResponseEntity<TypingResult> update(
            @PathVariable Long id,
            @RequestBody @Valid TypingResult result
    ) {
        if (!typingResultRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        result.setId(id);
        return ResponseEntity.ok(typingResultRepo.save(result));
    }

    /**
     * Löscht ein Tippergebnis anhand seiner ID.
     *
     * @param id ID des zu löschenden Tippergebnisses
     * @return ResponseEntity mit Status 204 bei Erfolg,
     *         oder Status 404, wenn das Ergebnis nicht gefunden wurde
     */
    @Operation(summary = "Tippergebnis löschen")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Ergebnis gelöscht"),
            @ApiResponse(responseCode = "404", description = "Ergebnis nicht gefunden")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!typingResultRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        typingResultRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
