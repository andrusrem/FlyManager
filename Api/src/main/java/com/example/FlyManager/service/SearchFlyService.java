package com.example.flymanager.service;


import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.flymanager.model.City;
import com.example.flymanager.model.SearchFly;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class SearchFlyService {
    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();
    public SearchFlyService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> getSearchedFlies(String origin, String destination, String departureDate, String periodType, String token, String oneWay, String tripClass, String sorting) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/get_latest_prices")
                        .queryParam("currency", "eur")
                        .queryParam("origin", origin)
                        .queryParam("destination", destination)
                        .queryParam("beginning_of_period", departureDate)
                        .queryParam("period_type", periodType)
                        .queryParam("one_way", oneWay)
                        .queryParam("page", 1)
                        .queryParam("sorting", sorting)
                        .queryParam("trip_class", tripClass)
                        .queryParam("token", token)
                        .build())
                .retrieve()
                .bodyToMono(String.class);
    }

    public ResponseEntity<List<City>> getIATACities() throws IOException 
    {
        File file = new ClassPathResource("static/cities.json").getFile();

        // Read the file content as a string
        String content = new String(Files.readAllBytes(file.toPath()));

        // Deserialize JSON content to a List of City objects
        List<City> cities = objectMapper.readValue(content, objectMapper.getTypeFactory().constructCollectionType(List.class, City.class));

        // Return the List of City objects as a JSON response
        return ResponseEntity.ok(cities);
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
