package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repository-Interface für Score-Entitäten.
 * <p>
 * Bietet CRUD-Funktionalität für Scores und
 * eine Methode zum Abrufen aller Scores einer
 * bestimmten Story mittels Spring Data JPA.
 * </p>
 */
public interface ScoreRepository extends JpaRepository<Score, Long> {

    /**
     * Findet alle Scores, die zu einer gegebenen Story-ID gehören.
     *
     * @param storyId ID der Story
     * @return Liste der Score-Entitäten
     */
    List<Score> findByStoryId(Long storyId);
}
