package com.example.flymanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flymanager.service.SearchFlyService;

import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/search")
public class SearchFlyController {
    @Autowired
    private final SearchFlyService searchFlyService;

    public SearchFlyController(SearchFlyService searchFlyService)
    {
        this.searchFlyService = searchFlyService;
    }
    @GetMapping
    public Mono<String> getSearchRequest(
        @RequestParam String origin,
        @RequestParam String destination,
        @RequestParam String departureDate,
        @RequestParam(required = false) String returnDate,
        @RequestParam(required = false) String oneWay,
        @RequestParam(required = false) String direct,
        @RequestParam String sorting,
        @RequestParam String token
    ) 
    {
        return searchFlyService.getSearchedFlies(origin, destination, departureDate, returnDate, token, oneWay, direct, sorting);
    }

    @GetMapping("/cities")
    public String getCities(@RequestParam String param) {
        return new String();
    }
    
}
