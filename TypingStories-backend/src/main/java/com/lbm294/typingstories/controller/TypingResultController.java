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

@RestController
@RequestMapping("/api/typingresults")
@CrossOrigin
@Tag(name = "TypingResults", description = "Tippergebnisse speichern und abrufen")
public class TypingResultController {

    private final TypingResultRepository typingResultRepo;

    @Autowired
    public TypingResultController(TypingResultRepository typingResultRepo) {
        this.typingResultRepo = typingResultRepo;
    }

    @Operation(summary = "Alle Tippergebnisse abrufen")
    @ApiResponse(responseCode = "200", description = "Liste aller Ergebnisse")
    @GetMapping
    public List<TypingResult> getAll() {
        return typingResultRepo.findAll();
    }

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
