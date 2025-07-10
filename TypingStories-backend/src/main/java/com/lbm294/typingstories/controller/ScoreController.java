// src/main/java/com/lbm294/typingstories/controller/ScoreController.java
package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Score;
import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.ScoreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
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

    /**
     * GET /api/scores?storyId={id}
     * Wenn storyId gesetzt: nur diese Scores, sonst alle.
     */
    @GetMapping
    public ResponseEntity<List<Score>> getAll(
            @RequestParam(value = "storyId", required = false) Long storyId
    ) {
        List<Score> list;
        if (storyId != null) {
            if (!storyRepo.existsById(storyId)) {
                return ResponseEntity.notFound().build();
            }
            list = scoreRepo.findByStoryId(storyId);
        } else {
            list = scoreRepo.findAll();
        }
        return ResponseEntity.ok(list);
    }

    /** POST /api/scores
     * Body erwartet: { story: { id: … }, component: "...", value: … }
     */
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

    /** PUT /api/scores/{id} */
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

    /** DELETE /api/scores/{id} */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!scoreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        scoreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
