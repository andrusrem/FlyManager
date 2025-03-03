package com.example.flymanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.flymanager.service.SearchFlyService;

import reactor.core.publisher.Mono;

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
    public Mono<String> createSearchRequest(
        @RequestParam String origin,
        @RequestParam String destination,
        @RequestParam String departureDate,
        @RequestParam(required = false) String returnDate,
        @RequestParam String token
        ) 
    {
        return searchFlyService.getSearchedFlies(origin, destination, departureDate, returnDate, token);
    }
}
