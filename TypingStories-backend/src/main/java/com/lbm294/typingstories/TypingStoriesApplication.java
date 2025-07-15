package com.lbm294.typingstories;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

/**
 * Einstiegs- und Konfigurationsklasse für die TypingStories-Anwendung.
 * <p>
 * Diese Klasse startet die Spring Boot Applikation und definiert
 * die OpenAPI-Dokumentationsdetails wie Titel, Version, Beschreibung,
 * Kontakt und Lizenzinformationen.
 * </p>
 */
@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title = "TypingStories API",
                version = "1.0.0",
                description = "REST-API für die TypingStories-Applikation",
                contact = @Contact(name = "preo", email = "praewphan.jamnongnok@gmail.com"),
                license = @License(name = "MIT", url = "https://opensource.org/licenses/MIT")
        )
)
public class TypingStoriesApplication {

    /**
     * Hauptmethode zum Starten der Spring Boot Anwendung.
     *
     * @param args Startparameter (können beim Start der JVM übergeben werden)
     */
    public static void main(String[] args) {
        SpringApplication.run(TypingStoriesApplication.class, args);
    }
}
