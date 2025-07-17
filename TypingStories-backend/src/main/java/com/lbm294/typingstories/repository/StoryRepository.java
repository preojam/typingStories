package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository-Interface für Story-Entitäten.
 * <p>
 * Bietet CRUD-Funktionalität für Stories sowie
 * Methoden zum Abrufen der neuesten Story und
 * zum Filtern von Stories nach Genre mittels Spring Data JPA.
 * </p>
 */
public interface StoryRepository extends JpaRepository<Story, Long> {

    /**
     * Findet die zuletzt erstellte Story basierend auf der höchsten ID.
     *
     * @return Optional mit der neuesten Story, falls vorhanden
     */
    Optional<Story> findTopByOrderByIdDesc();

    /**
     * Findet alle Stories, die zu einer gegebenen Genre-ID gehören.
     *
     * @param genreId ID des Genres
     * @return Liste der Story-Entitäten
     */
    List<Story> findByGenreId(Long genreId);


    /**
     * Sucht Stories, deren Titel (case-insensitive) den gegebenen Begriff enthalten.
     *
     * @param title Teil des Titels oder Suchbegriff
     * @return Liste der passenden Stories
     */
    List<Story> findByTitleContainingIgnoreCase(String title);

}
