package com.lbm294.typingstories.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @Lob
    private String content;

    /**
     * URL zum Cover-Bild, z.B. "/uploads/5.png"
     */
    private String coverUrl;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Score> scores = new ArrayList<>();

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TypingResult> typingResults = new ArrayList<>();

    // --- Getter & Setter ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public List<Score> getScores() {
        return scores;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public List<TypingResult> getTypingResults() {
        return typingResults;
    }

    public void setTypingResults(List<TypingResult> typingResults) {
        this.typingResults = typingResults;
    }
}
