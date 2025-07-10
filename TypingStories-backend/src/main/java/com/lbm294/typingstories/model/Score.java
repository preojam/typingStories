// src/main/java/com/lbm294/typingstories/model/Score.java
package com.lbm294.typingstories.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "score")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "story_id")
    @JsonBackReference
    private Story story;

    @NotBlank
    private String component;  // z.B. "overall"

    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double value;      // 0.0–10.0

    public Score() {}

    public Score(Story story, String component, Double value) {
        this.story     = story;
        this.component = component;
        this.value     = value;
    }

    // --- Getter/Setter ---
    public Long   getId()        { return id; }
    public void   setId(Long id) { this.id = id; }

    public Story  getStory()               { return story; }
    public void   setStory(Story story)    { this.story = story; }

    public String getComponent()                     { return component; }
    public void   setComponent(String component)     { this.component = component; }

    public Double getValue()              { return value; }
    public void   setValue(Double value) { this.value = value; }
}
