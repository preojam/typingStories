package com.lbm294.typingstories.dataTransferObject;

/**
 * Data Transfer Object zum Übermitteln von Score-Daten.
 * <p>
 * Dieses DTO enthält die ID der zugehörigen Story, die Komponente
 * und den Wert des Scores.
 * </p>
 */
public class ScoreRequest {

    /**
     * ID der Story, zu der dieser Score gehört.
     */
    private Long storyId;

    /**
     * Name der Komponente (z. B. "accuracy", "speed").
     */
    private String component;

    /**
     * Numerischer Wert des Scores.
     */
    private Double value;

    /**
     * Liefert die ID der Story.
     *
     * @return ID der Story
     */
    public Long getStoryId() {
        return storyId;
    }

    /**
     * Setzt die ID der Story.
     *
     * @param storyId ID der Story
     */
    public void setStoryId(Long storyId) {
        this.storyId = storyId;
    }

    /**
     * Liefert den Namen der Komponente.
     *
     * @return Komponentenname
     */
    public String getComponent() {
        return component;
    }

    /**
     * Setzt den Namen der Komponente.
     *
     * @param component Komponentenname
     */
    public void setComponent(String component) {
        this.component = component;
    }

    /**
     * Liefert den numerischen Wert des Scores.
     *
     * @return Score-Wert
     */
    public Double getValue() {
        return value;
    }

    /**
     * Setzt den numerischen Wert des Scores.
     *
     * @param value Score-Wert
     */
    public void setValue(Double value) {
        this.value = value;
    }
}
