package com.lbm294.typingstories.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

/**
 * Modell-Klasse für eine Story.
 * <p>
 * Eine Story enthält einen Titel, ein Genre, den Inhalt,
 * eine optionale Cover-URL sowie Listen von zugehörigen Scores
 * und TypingResults. Sie ist als JPA-Entity annotiert.
 * </p>
 */
@Entity
public class Story {

    /**
     * Eindeutige Kennung der Story (Primärschlüssel).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Titel der Story. Darf nicht leer sein.
     */
    @NotBlank
    private String title;

    /**
     * Zugehöriges Genre der Story.
     */
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    /**
     * Inhaltstext der Story.
     */
    @Lob
    private String content;

    /**
     * URL zum Cover-Bild, z.B. "/uploads/5.png".
     */
    private String coverUrl;

    /**
     * Liste der Bewertungen (Scores) für diese Story.
     */
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Score> scores = new ArrayList<>();

    /**
     * Liste der Tippergebnisse (TypingResults) für diese Story.
     */
    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TypingResult> typingResults = new ArrayList<>();

    // --- Getter & Setter ---

    /**
     * Liefert die ID der Story.
     *
     * @return eindeutige ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID der Story.
     *
     * @param id eindeutige ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Liefert den Titel der Story.
     *
     * @return Titel der Story
     */
    public String getTitle() {
        return title;
    }

    /**
     * Setzt den Titel der Story.
     *
     * @param title neuer Titel (darf nicht leer sein)
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Liefert das Genre der Story.
     *
     * @return Genre-Instanz
     */
    public Genre getGenre() {
        return genre;
    }

    /**
     * Setzt das Genre der Story.
     *
     * @param genre Genre-Instanz
     */
    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    /**
     * Liefert den Inhaltstext der Story.
     *
     * @return Textinhalt
     */
    public String getContent() {
        return content;
    }

    /**
     * Setzt den Inhaltstext der Story.
     *
     * @param content neuer Textinhalt
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * Liefert die Cover-URL der Story.
     *
     * @return URL als String
     */
    public String getCoverUrl() {
        return coverUrl;
    }

    /**
     * Setzt die Cover-URL der Story.
     *
     * @param coverUrl URL zum Cover-Bild
     */
    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    /**
     * Liefert alle Scores dieser Story.
     *
     * @return Liste von Score-Objekten
     */
    public List<Score> getScores() {
        return scores;
    }

    /**
     * Setzt die Liste der Scores für diese Story.
     *
     * @param scores Liste von Score-Objekten
     */
    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    /**
     * Liefert alle Tippergebnisse dieser Story.
     *
     * @return Liste von TypingResult-Objekten
     */
    public List<TypingResult> getTypingResults() {
        return typingResults;
    }

    /**
     * Setzt die Liste der Tippergebnisse für diese Story.
     *
     * @param typingResults Liste von TypingResult-Objekten
     */
    public void setTypingResults(List<TypingResult> typingResults) {
        this.typingResults = typingResults;
    }
}
