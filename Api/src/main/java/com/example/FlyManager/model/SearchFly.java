package com.example.flymanager.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchFly {

    private String currency = "eur";
    private String origin;
    private String destination;
    private Data departure_at;
    private Data return_at;
    private Boolean one_way = false;
    private Boolean direct = false;
    private String market = "pl";
    private int limit = 30;
    private int page = 1;
    private Boolean unique = false;
    private String token;
}
