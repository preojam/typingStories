package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.TypingResult;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository-Interface für TypingResult-Entitäten.
 * <p>
 * Bietet CRUD-Funktionalität für Tippergebnisse (TypingResults)
 * mittels Spring Data JPA. Jedes TypingResult speichert das Ergebnis
 * einer Tipp-Session für eine Story.
 * </p>
 */
public interface TypingResultRepository extends JpaRepository<TypingResult, Long> {

}
