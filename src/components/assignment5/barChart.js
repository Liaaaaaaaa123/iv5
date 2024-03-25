import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart(props) {
    const { offsetX, offsetY, data, height, width, selectedAirline, setSelectedAirline } = props;

    // Find the maximum count
    const maxCount = max(data, d => d.Count);

    // Define x and y scales
    const xScale = scaleLinear()
        .domain([0, maxCount])
        .range([0, width]);

    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName))
        .rangeRound([0, height])
        .padding(0.2);

    // Define color function
    const color = d => (d.AirlineID === selectedAirline ? "#992a5b" : "#2a5599");

    // Define onMouseOver function
    const onMouseOver = d => {
        setSelectedAirline(d.AirlineID);
    };

    // Define onMouseOut function
    const onMouseOut = () => {
        setSelectedAirline('NULL');
    };

    // Return the bars
    const bars = data.map(d => (
        <rect
            key={d.AirlineID}
            y={yScale(d.AirlineName)}
            width={xScale(d.Count)}
            height={yScale.bandwidth()}
            stroke = 'black'
            fill={color(d)}
            onMouseOver={() => onMouseOver(d)}
            onMouseOut={onMouseOut}
        />
    ));

    return (
        <g transform={`translate(${offsetX}, ${offsetY})`}>
            {/* Return the bars */}
            {bars}

            {/* Return axes */}
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} offsetX={offsetX} />
        </g>
    );
}
