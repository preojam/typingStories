package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Long> {
}
