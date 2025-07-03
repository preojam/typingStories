package com.lbm294.typingstories.controller;

import com.lbm294.typingstories.model.Genre;
import com.lbm294.typingstories.repository.GenreRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@CrossOrigin
public class GenreController {

    private final GenreRepository genreRepo;

    @Autowired
    public GenreController(GenreRepository genreRepo) {
        this.genreRepo = genreRepo;
    }

    @GetMapping
    public List<Genre> getAll() {
        return genreRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getById(@PathVariable Long id) {
        return genreRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Genre> create(@RequestBody @Valid Genre genre) {
        Genre saved = genreRepo.save(genre);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> update(@PathVariable Long id, @RequestBody @Valid Genre genre) {
        if (!genreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        genre.setId(id);
        return ResponseEntity.ok(genreRepo.save(genre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!genreRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        genreRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
