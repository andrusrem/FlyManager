package com.example.flymanager.service;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.stereotype.Service;

import com.example.flymanager.model.SearchFly;

@Service
public class SearchFlyService {
    public HttpResponse<String> getSearchedFlies(String url, SearchFly searchFly) throws URISyntaxException
    {
        //query params
        String currency = "currency=eur";
        String origin = "&origin=" + searchFly.getOrigin();
        String destination = "&destination=" + searchFly.getDestination();
        String departure_at = "&departure_at=" + searchFly.getDeparture_at().toString();
        String return_at = "&return_at=" + searchFly.getReturn_at().toString();
        String one_way = "&one_way=" + searchFly.getOne_way().toString();
        String market = "&market=pl";
        String limit = "&limit=30";
        String page = "&page=" + searchFly.getPage();
        String unique = "&unique=" + searchFly.getUnique().toString();
        String token = "&token=" + searchFly.getToken();
        String query = currency + origin + destination + departure_at 
            + return_at + one_way + market + limit + page + unique + token;

        String new_url = url + "?" + query;
        URI obj = new URI(new_url);
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

    
}
