package com.lbm294.typingstories.repository;


import com.lbm294.typingstories.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    Optional<Story> findTopByOrderByIdDesc();
    List<Story> findByGenreId(Long genreId);

}
