package com.lbm294.typingstories.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

/**
 * Modell-Klasse für ein Tippergebnis (TypingResult).
 * <p>
 * Diese Entity repräsentiert das Ergebnis einer Tipp-Session
 * für eine bestimmte Story und enthält Informationen wie
 * den Benutzernamen, getippte Wörter pro Minute (WPM), Anzahl
 * an Fehlern und den Zeitstempel der Erstellung.
 * </p>
 */
@Entity
public class TypingResult {

    /**
     * Eindeutige Kennung des TypingResult (Primärschlüssel).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Referenz auf die Story, zu der dieses Ergebnis gehört.
     */
    @ManyToOne
    @JoinColumn(name = "storyId")
    @JsonBackReference
    private Story story;

    /**
     * Der Name des Benutzers, der getippt hat.
     * Maximale Länge: 50 Zeichen.
     */
    @Size(max = 50)
    private String username;

    /**
     * Getippte Wörter pro Minute (WPM).
     * Muss mindestens 0.0 sein.
     */
    @DecimalMin("0.0")
    private Double wpm;

    /**
     * Anzahl der beim Tippen gemachten Fehler.
     * Muss mindestens 0 sein.
     */
    @Min(0)
    private Integer errors;

    /**
     * Zeitstempel der Erstellung dieses Ergebnisses.
     * Wird beim Instanziieren auf den aktuellen Zeitpunkt gesetzt.
     */
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * Standardkonstruktor für JPA.
     */
    public TypingResult() {}

    /**
     * Konstruktor zur Initialisierung aller Felder außer id und createdAt.
     *
     * @param story     Story-Entity, zu der dieses Ergebnis gehört
     * @param username  Benutzername des Tippenden
     * @param wpm       Getippte Wörter pro Minute
     * @param errors    Anzahl der Fehler
     */
    public TypingResult(Story story, String username, Double wpm, Integer errors) {
        this.story = story;
        this.username = username;
        this.wpm = wpm;
        this.errors = errors;
        this.createdAt = LocalDateTime.now();
    }

    // --- Getter & Setter ---

    /**
     * Liefert die ID dieses Tippergebnisses.
     *
     * @return eindeutige ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID dieses Tippergebnisses.
     *
     * @param id eindeutige ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Liefert die Story-Entity, zu der dieses Ergebnis gehört.
     *
     * @return Story-Entity
     */
    public Story getStory() {
        return story;
    }

    /**
     * Setzt die zugehörige Story.
     *
     * @param story Story-Entity
     */
    public void setStory(Story story) {
        this.story = story;
    }

    /**
     * Liefert den Benutzernamen des Tippenden.
     *
     * @return Benutzername
     */
    public String getUsername() {
        return username;
    }

    /**
     * Setzt den Benutzernamen des Tippenden.
     *
     * @param username Benutzername (max. 50 Zeichen)
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Liefert die getippte Wörter-pro-Minute-Rate.
     *
     * @return WPM-Wert
     */
    public Double getWpm() {
        return wpm;
    }

    /**
     * Setzt die Wörter-pro-Minute-Rate.
     *
     * @param wpm WPM-Wert (mindestens 0.0)
     */
    public void setWpm(Double wpm) {
        this.wpm = wpm;
    }

    /**
     * Liefert die Anzahl der Tippfehler.
     *
     * @return Anzahl der Fehler
     */
    public Integer getErrors() {
        return errors;
    }

    /**
     * Setzt die Anzahl der Tippfehler.
     *
     * @param errors Anzahl der Fehler (mindestens 0)
     */
    public void setErrors(Integer errors) {
        this.errors = errors;
    }

    /**
     * Liefert den Zeitstempel der Erstellung.
     *
     * @return Erstellungszeitpunkt
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Setzt den Zeitstempel der Erstellung.
     *
     * @param createdAt Erstellungszeitpunkt
     */
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}