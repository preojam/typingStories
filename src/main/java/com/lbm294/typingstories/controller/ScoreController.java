package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Score;
import com.lbm294.typingstories.repository.ScoreRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin
public class ScoreController {

    private final ScoreRepository scoreRepo;

    @Autowired
    public ScoreController(ScoreRepository scoreRepo) {
        this.scoreRepo = scoreRepo;
    }

    @GetMapping
    public List<Score> getAll() {
        return scoreRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Score> getById(@PathVariable Long id) {
        return scoreRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Score> create(@RequestBody @Valid Score score) {
        Score saved = scoreRepo.save(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Score> update(@PathVariable Long id, @RequestBody @Valid Score score) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        score.setId(id);
        return ResponseEntity.ok(scoreRepo.save(score));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        scoreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
