package com.lbm294.typingstories.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

/**
 * Modell-Klasse für eine Bewertung (Score) einer Story.
 * <p>
 * Ein Score enthält eine Referenz auf die zu bewertende Story,
 * eine Komponente (z.B. "overall"), und einen numerischen Wert
 * im Bereich von 0.0 bis 10.0. Die Klasse ist als JPA-Entity annotiert.
 * </p>
 */
@Entity
@Table(name = "score")
public class Score {

    /**
     * Eindeutige Kennung des Scores (Primärschlüssel).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Referenz auf die bewertete Story. Nicht null.
     */
    @ManyToOne(optional = false)
    @JoinColumn(name = "story_id")
    @JsonBackReference
    private Story story;

    /**
     * Name der Bewertungs-Komponente, z. B. "overall".
     */
    @NotBlank
    private String component;

    /**
     * Numerischer Wert des Scores im Bereich 0.0–10.0.
     */
    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double value;

    /**
     * Standardkonstruktor für JPA.
     */
    public Score() {}

    /**
     * Konstruktor zur einfachen Instanziierung.
     *
     * @param story     die zu bewertende Story
     * @param component Name der Komponente
     * @param value     numerischer Wert (0.0–10.0)
     */
    public Score(Story story, String component, Double value) {
        this.story = story;
        this.component = component;
        this.value = value;
    }

    // --- Getter / Setter ---

    /**
     * Liefert die ID des Scores.
     *
     * @return eindeutige ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID des Scores.
     *
     * @param id eindeutige ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Liefert die bewertete Story.
     *
     * @return Story-Instanz
     */
    public Story getStory() {
        return story;
    }

    /**
     * Setzt die bewertete Story.
     *
     * @param story Story-Instanz
     */
    public void setStory(Story story) {
        this.story = story;
    }

    /**
     * Liefert den Namen der Bewertungs-Komponente.
     *
     * @return Komponentenname
     */
    public String getComponent() {
        return component;
    }

    /**
     * Setzt den Namen der Bewertungs-Komponente.
     *
     * @param component Komponentenname
     */
    public void setComponent(String component) {
        this.component = component;
    }

    /**
     * Liefert den numerischen Wert des Scores.
     *
     * @return Wert im Bereich 0.0–10.0
     */
    public Double getValue() {
        return value;
    }

    /**
     * Setzt den numerischen Wert des Scores.
     *
     * @param value Wert im Bereich 0.0–10.0
     */
    public void setValue(Double value) {
        this.value = value;
    }
}
