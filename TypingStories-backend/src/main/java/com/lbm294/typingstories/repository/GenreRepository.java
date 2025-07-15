package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository-Interface für Genre-Entitäten.
 * <p>
 * Bietet CRUD-Funktionalität und Abfragemethoden
 * für das Genre-Entity mittels Spring Data JPA.
 * </p>
 */
public interface GenreRepository extends JpaRepository<Genre, Long> {

}
