package com.lbm294.typingstories.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Konfiguriert das Spring Web MVC, um statische Ressourcen
 * aus dem lokalen Dateisystem bereitzustellen.
 * <p>
 * Insbesondere werden Dateien aus dem Verzeichnis "uploads/"
 * unter dem Pfad "/uploads/**" im Browser erreichbar gemacht.
 * </p>
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Registriert einen Resource Handler, der alle Anfragen
     * unter "/uploads/**" abfängt und die entsprechenden Dateien
     * aus dem lokalen Verzeichnis "uploads/" ausliefert.
     *
     * @param registry das {@link ResourceHandlerRegistry}, in dem
     *                 der neue Resource Handler registriert wird
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
