import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";



function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirline } = props;

    // Define a projection using geoMercator
    let projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // Define a path generator using geoPath
    const pathGenerator = geoPath().projection(projection);

    // Plot the world map
    const worldMap = countries.features.map((feature, index) => (
        <path
            key={index}
            d={pathGenerator(feature)}
            stroke="#ccc"
            fill="#eee"
        />
    ));

    // Plot the airports
    const airportDots = airports.map(d => (
        <circle
            key={d.AirportID}
            cx={projection([d.Longitude, d.Latitude])[0]}
            cy={projection([d.Longitude, d.Latitude])[1]}
            r={1}
            fill="#2a5599"
        />
    ));

    return (
        <g>
            {/* Render world map */}
            {worldMap}

            {/* Render airports */}
            {airportDots}

            {/* Render routes */}
            <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirline} />
        </g>
    );
}

export { AirportMap };
