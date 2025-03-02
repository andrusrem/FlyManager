package com.example.flymanager.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.flymanager.model.SearchFly;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/search")
public class SearchFlyController {
    
    @PostMapping
    public SearchFly createSearchRequest(@RequestBody SearchFly searchFly) {
        return null; //in development
    }  
}
