package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.StoryRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
@CrossOrigin
public class StoryController {

    private final StoryRepository storyRepo;

    @Autowired
    public StoryController(StoryRepository storyRepo) {
        this.storyRepo = storyRepo;
    }

    @GetMapping
    public List<Story> getAll() {
        return storyRepo.findAll();
    }

    @GetMapping("/{id}")
    public Story getOne(@PathVariable Long id) {
        return storyRepo.findById(id).orElseThrow();
    }

    @PostMapping
    public Story create(@RequestBody @Valid Story story) {
        return storyRepo.save(story);
    }

    @PutMapping("/{id}")
    public Story update(@PathVariable Long id, @RequestBody @Valid Story story) {
        story.setId(id);
        return storyRepo.save(story);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        storyRepo.deleteById(id);
    }
}
