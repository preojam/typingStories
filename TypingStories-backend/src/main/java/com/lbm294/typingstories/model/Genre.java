package com.lbm294.typingstories.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

/**
 * Modell-Klasse für ein Genre.
 * <p>
 * Ein Genre repräsentiert eine Kategorie oder ein Themengebiet
 * von Stories. Die Klasse ist als JPA-Entity annotiert und
 * verfügt über eine automatisch generierte ID sowie einen Namen.
 * </p>
 */
@Entity
public class Genre {

    /**
     * Eindeutige Kennung des Genres (Primärschlüssel).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Name des Genres. Darf nicht leer sein.
     */
    @NotBlank
    private String name;

    /**
     * Liefert die ID des Genres.
     *
     * @return die eindeutige ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Setzt die ID des Genres.
     * <p>
     * Wird in der Regel von JPA beim Persistieren gesetzt,
     * kann aber auch manuell angepasst werden.
     * </p>
     *
     * @param id die eindeutige ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Liefert den Namen des Genres.
     *
     * @return der Name (nicht leer)
     */
    public String getName() {
        return name;
    }

    /**
     * Setzt den Namen des Genres.
     *
     * @param name der Name des Genres (darf nicht leer sein)
     */
    public void setName(String name) {
        this.name = name;
    }
}
