package com.lbm294.typingstories.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lbm294.typingstories.model.Genre;
import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.GenreRepository;
import com.lbm294.typingstories.repository.StoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StoryController.class)
class StoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private StoryRepository storyRepo;

    @MockitoBean
    private GenreRepository genreRepo;

    private Story makeStory(Long id, String title, String content, Long genreId) {
        Story s = new Story();
        s.setId(id);
        s.setTitle(title);
        s.setContent(content);
        Genre g = new Genre();
        g.setId(genreId);
        s.setGenre(g);
        return s;
    }

    @BeforeEach
    void setUp() {
        // Genre exist checks
        given(genreRepo.existsById(1L)).willReturn(true);
        given(genreRepo.existsById(999L)).willReturn(false);

        // story existence checks
        given(storyRepo.existsById(1L)).willReturn(true);
        given(storyRepo.existsById(999L)).willReturn(false);

        // findAll
        given(storyRepo.findAll()).willReturn(List.of(
                makeStory(1L, "Alpha", "Content A", 1L),
                makeStory(2L, "Beta",  "Content B", 1L)
        ));

        // filter by genre
        given(storyRepo.findByGenreId(1L)).willReturn(List.of(
                makeStory(1L, "Alpha", "Content A", 1L)
        ));

        // findById
        given(storyRepo.findById(1L))
                .willReturn(Optional.of(makeStory(1L, "Alpha", "Content A", 1L)));
        given(storyRepo.findById(999L))
                .willReturn(Optional.empty());

        // findLast
        given(storyRepo.findTopByOrderByIdDesc())
                .willReturn(Optional.of(makeStory(2L, "Beta", "Content B", 1L)));

        // save
        given(storyRepo.save(any(Story.class)))
                .willAnswer(inv -> {
                    Story s = inv.getArgument(0);
                    if (s.getId() == null) {
                        s.setId(42L);
                    }
                    return s;
                });
    }

    @Test
    void testCreateValid() throws Exception {
        Story toCreate = new Story();
        toCreate.setTitle("Neue Story");
        toCreate.setContent("Ein spannender Inhalt");
        Genre genre = new Genre();
        genre.setId(1L);
        toCreate.setGenre(genre);

        mockMvc.perform(post("/api/stories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(toCreate)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(42L));
    }

    @Test
    void testCreateInvalid() throws Exception {
        Story bad = new Story();
        bad.setTitle("Keine Genre");
        bad.setContent("Inhalt");
        // kein Genre gesetzt

        mockMvc.perform(post("/api/stories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(bad)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetAll() throws Exception {
        mockMvc.perform(get("/api/stories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void testGetByIdFound() throws Exception {
        mockMvc.perform(get("/api/stories/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Alpha"));
    }

    @Test
    void testGetByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/stories/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDelete() throws Exception {
        mockMvc.perform(delete("/api/stories/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testDeleteNotFound() throws Exception {
        mockMvc.perform(delete("/api/stories/999"))
                .andExpect(status().isNotFound());
    }
}
