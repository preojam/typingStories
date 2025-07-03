package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Score;
import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.ScoreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin
public class ScoreController {

    private final ScoreRepository scoreRepo;
    private final StoryRepository storyRepo;

    @Autowired
    public ScoreController(ScoreRepository scoreRepo, StoryRepository storyRepo) {
        this.scoreRepo = scoreRepo;
        this.storyRepo = storyRepo;
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

        if (score.getStory() == null || score.getStory().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing story ID in request");
        }

        Long storyId = score.getStory().getId();

        Story story = storyRepo.findById(storyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Story not found"));

        score.setStory(story);

        Score saved = scoreRepo.save(score);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Score> update(@PathVariable Long id, @RequestBody @Valid Score score) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Long storyId = score.getStory().getId();
        Story story = storyRepo.findById(storyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid story id"));
        score.setStory(story);
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
