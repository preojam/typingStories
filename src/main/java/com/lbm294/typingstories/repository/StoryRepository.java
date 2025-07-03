package com.lbm294.typingstories.repository;


import com.lbm294.typingstories.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {

}
