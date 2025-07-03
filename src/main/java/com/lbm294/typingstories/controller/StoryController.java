package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.GenreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin
public class StoryController {

    private final StoryRepository storyRepo;
    private final GenreRepository genreRepo;

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

    @PostMapping
    public ResponseEntity<Story> create(@RequestBody @Valid Story story) {
        if (story.getGenre() == null || story.getGenre().getId() == null) {
            // Genre fehlt komplett
            return ResponseEntity.badRequest().body(null);
        }

        boolean genreExists = genreRepo.existsById(story.getGenre().getId());
        if (!genreExists) {
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
        return ResponseEntity.ok(storyRepo.save(story));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!storyRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        storyRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
