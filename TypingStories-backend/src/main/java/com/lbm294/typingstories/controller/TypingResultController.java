package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.TypingResult;
import com.lbm294.typingstories.repository.TypingResultRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/typingresults")
@CrossOrigin
public class TypingResultController {

    private final TypingResultRepository typingResultRepo;

    @Autowired
    public TypingResultController(TypingResultRepository typingResultRepo) {
        this.typingResultRepo = typingResultRepo;
    }

    @GetMapping
    public List<TypingResult> getAll() {
        return typingResultRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypingResult> getById(@PathVariable Long id) {
        return typingResultRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TypingResult> create(@RequestBody @Valid TypingResult result) {
        if (result.getStory() == null || result.getStory().getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        TypingResult saved = typingResultRepo.save(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypingResult> update(@PathVariable Long id, @RequestBody @Valid TypingResult result) {
        if (!typingResultRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        result.setId(id);
        return ResponseEntity.ok(typingResultRepo.save(result));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!typingResultRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        typingResultRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
