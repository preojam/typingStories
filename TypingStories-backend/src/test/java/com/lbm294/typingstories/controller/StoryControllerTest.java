package com.lbm294.typingstories.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lbm294.typingstories.model.Genre;
import com.lbm294.typingstories.model.Story;
import com.lbm294.typingstories.repository.StoryRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StoryController.class)
class StoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    /**
     * Ersetzt @MockBean
     * (Annotation, die den StoryRepository-Bean im Test-Context mit
     * einem Mockito-Mock überschreibt).
     */
    @MockitoBean
    private StoryRepository storyRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/stories → 200 und JSON-Liste")
    void testGetAll() throws Exception {
        Genre g = new Genre(); g.setId(1L); g.setName("Fiction");
        Story s1 = new Story(); s1.setId(10L); s1.setTitle("A"); s1.setGenre(g);
        Story s2 = new Story(); s2.setId(20L); s2.setTitle("B"); s2.setGenre(g);

        Mockito.when(storyRepo.findAll()).thenReturn(Arrays.asList(s1, s2));

        mockMvc.perform(get("/api/stories"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(10))
                .andExpect(jsonPath("$[1].title").value("B"));
    }

    @Test
    @DisplayName("GET /api/stories/{id} → 200 wenn vorhanden")
    void testGetByIdFound() throws Exception {
        Story s = new Story(); s.setId(5L); s.setTitle("Story5");
        Mockito.when(storyRepo.findById(5L)).thenReturn(Optional.of(s));

        mockMvc.perform(get("/api/stories/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Story5"));
    }

    @Test
    @DisplayName("GET /api/stories/{id} → 404 wenn nicht vorhanden")
    void testGetByIdNotFound() throws Exception {
        Mockito.when(storyRepo.findById(99L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/stories/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /api/stories → 201 bei gültigem Body")
    void testCreateValid() throws Exception {
        Genre g = new Genre(); g.setId(2L);
        Story input = new Story(); input.setTitle("Neu"); input.setGenre(g);
        Story saved = new Story(); saved.setId(7L); saved.setTitle("Neu"); saved.setGenre(g);

        Mockito.when(storyRepo.save(any(Story.class))).thenReturn(saved);

        mockMvc.perform(post("/api/stories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(7))
                .andExpect(jsonPath("$.title").value("Neu"));
    }

    @Test
    @DisplayName("POST /api/stories → 400 wenn Genre fehlt")
    void testCreateInvalid() throws Exception {
        Story input = new Story(); input.setTitle("NoGenre");

        mockMvc.perform(post("/api/stories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(input)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("DELETE /api/stories/{id} → 204 bei Löschung")
    void testDelete() throws Exception {
        Mockito.when(storyRepo.existsById(3L)).thenReturn(true);
        Mockito.doNothing().when(storyRepo).deleteById(3L);

        mockMvc.perform(delete("/api/stories/3"))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("DELETE /api/stories/{id} → 404 wenn nicht gefunden")
    void testDeleteNotFound() throws Exception {
        Mockito.when(storyRepo.existsById(4L)).thenReturn(false);

        mockMvc.perform(delete("/api/stories/4"))
                .andExpect(status().isNotFound());
    }
}

