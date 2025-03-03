package com.example.flymanager.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchFly {

    private boolean success;
    private List<FlightData> data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FlightData {
        private String origin;
        private String destination;
        
        @JsonProperty("origin_airport")
        private String originAirport;
        
        @JsonProperty("destination_airport")
        private String destinationAirport;
        
        private int price;
        private String airline;
        
        @JsonProperty("flight_number")
        private String flightNumber;
        
        @JsonProperty("departure_at")
        private String departureAt;
        
        @JsonProperty("return_at")
        private String returnAt;
        
        private int transfers;
        
        @JsonProperty("return_transfers")
        private int returnTransfers;
        
        private int duration;
        
        @JsonProperty("duration_to")
        private int durationTo;
        
        @JsonProperty("duration_back")
        private int durationBack;
        
        private String link;

    }
}
