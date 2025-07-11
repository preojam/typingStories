package com.lbm294.typingstories;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
        info = @Info(
                title       = "TypingStories API",
                version     = "1.0.0",
                description = "REST-API für die TypingStories-Applikation",
                contact     = @Contact(name = "preo", email = "praewphan.jamnongnok@gmail.com"),
                license     = @License(name = "MIT", url = "https://opensource.org/licenses/MIT")
        )
)
public class TypingStoriesApplication {

    public static void main(String[] args) {
        SpringApplication.run(TypingStoriesApplication.class, args);
    }

}
