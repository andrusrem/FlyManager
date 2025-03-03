package com.example.flymanager.model;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;


@Configuration
public class WebClientConfig {

    private static final String BASE_URL = "https://api.travelpayouts.com/aviasales/v1";

    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
                .baseUrl(BASE_URL)
                .defaultHeaders(headers -> {
                    headers.add("Accept", "application/json");
                })
                .build();
    }
}
