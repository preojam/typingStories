package com.lbm294.typingstories.model;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;


class StoryTest {
    private static Validator validator;

    @BeforeAll
    static void setupValidator() {
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            validator = factory.getValidator();
        }
    }

    @Test
    void testDefaultConstructorAndGettersSetters() {
        Story story = new Story();
        // Default-Listen sind initialisiert
        assertThat(story.getScores()).isNotNull().isEmpty();
        assertThat(story.getTypingResults()).isNotNull().isEmpty();

        // Setter anwenden
        story.setId(7L);
        story.setTitle("Märchen");
        story.setContent("Es war einmal...");
        Genre genre = new Genre();
        genre.setId(3L);
        genre.setName("Fantasy");
        story.setGenre(genre);
        story.setCoverUrl("/uploads/7.png");

        // Getter prüfen
        assertThat(story.getId()).isEqualTo(7L);
        assertThat(story.getTitle()).isEqualTo("Märchen");
        assertThat(story.getContent()).isEqualTo("Es war einmal...");
        assertThat(story.getGenre()).isSameAs(genre);
        assertThat(story.getCoverUrl()).isEqualTo("/uploads/7.png");
    }

    @Test
    void testValidationFailsOnBlankTitle() {
        Story story = new Story();
        story.setTitle("   "); // nur Leerzeichen
        story.setContent("Inhalt");
        Genre genre = new Genre();
        genre.setId(1L);
        genre.setName("SciFi");
        story.setGenre(genre);

        Set<ConstraintViolation<Story>> violations = validator.validate(story);
        // Es erwartet genau eine Violation auf title (@NotBlank)
        assertThat(violations)
                .hasSize(1)
                .allMatch(v -> "title".equals(v.getPropertyPath().toString()));
    }
}