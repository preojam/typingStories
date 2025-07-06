package com.lbm294.typingstories.repository;

import com.lbm294.typingstories.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {


}
