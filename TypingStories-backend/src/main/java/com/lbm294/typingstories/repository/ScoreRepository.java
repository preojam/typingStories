package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByStoryId(Long storyId);
}
