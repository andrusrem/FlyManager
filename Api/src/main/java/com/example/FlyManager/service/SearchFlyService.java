package com.example.flymanager.service;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.flymanager.model.SearchFly;

import reactor.core.publisher.Mono;

@Service
public class SearchFlyService {
    private final WebClient webClient;

    public SearchFlyService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> getSearchedFlies(String origin, String destination, String departureDate, String returnDate, String token) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/city-directions")
                        .queryParam("origin", origin)
                        .queryParam("destination", destination)
                        .queryParam("departure_at", departureDate)
                        .queryParam("return_at", returnDate)
                        .queryParam("one_way", false)
                        .queryParam("sorting", "price")
                        .queryParam("direct", false)
                        .queryParam("currency", "eur")
                        .queryParam("limit", 30)
                        .queryParam("page", 1)
                        .queryParam("token", token)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public HttpResponse<String> getAITACities() throws URISyntaxException
    {
        URI obj = new URI("https://api.travelpayouts.com/data/en/cities.json?_gl=1*15izib6*_ga*MTI4OTQ4NjM1NS4xNzQwODQ3NDc3*_ga_1WLL0NEBEH*MTc0MDg0NzQ3Ni4xLjEuMTc0MDg1MzIwMC4xMi4wLjA.%20AITA%20airports:%20https://api.travelpayouts.com/data/en/airports.json?");
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(obj)
                .header("Accept", "application/json")
                .GET()
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response;
        } catch (IOException | InterruptedException e) {
        }
        return null; 
    }
    public HttpResponse<String> getAITAAirports() throws URISyntaxException
    {
        URI obj = new URI("https://api.travelpayouts.com/data/en/airports.json?_gl=1*4dqzxy*_ga*MTI4OTQ4NjM1NS4xNzQwODQ3NDc3*_ga_1WLL0NEBEH*MTc0MDg0NzQ3Ni4xLjEuMTc0MDg1NDA1OS42MC4wLjA.");
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(obj)
                .header("Accept", "application/json")
                .GET()
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response;
        } catch (IOException | InterruptedException e) {
        }
        return null; 
    }

    public HttpResponse<String> getAITAAirlines() throws URISyntaxException
    {
        URI obj = new URI("https://api.travelpayouts.com/data/en/airlines.json?_gl=1*1jf6e9u*_ga*MTI4OTQ4NjM1NS4xNzQwODQ3NDc3*_ga_1WLL0NEBEH*MTc0MDg0NzQ3Ni4xLjEuMTc0MDg1NDA1OS42MC4wLjA.");
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(obj)
                .header("Accept", "application/json")
                .GET()
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response;
        } catch (IOException | InterruptedException e) {
        }
        return null; 
    }

    public Mono<SearchFly> getSearchedFlights(String origin, String destination, String departureAt, String returnAt,
            boolean oneWay, boolean direct, String currency, int limit, int page, String sorting) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSearchedFlights'");
    }
}
