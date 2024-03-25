import React from "react";

function Routes(props) {
    const { projection, routes, selectedAirlineID } = props;

    // Return routes of the selected airline
    if (selectedAirlineID === null) {
        return <g></g>; // No airline selected, return empty group
    } else {
        const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);

        return (
            <g>
                {selectedRoutes.map((route, index) => (
                    <line
                        key={index}
                        x1={projection([route.SourceLongitude, route.SourceLatitude])[0]}
                        y1={projection([route.SourceLongitude, route.SourceLatitude])[1]}
                        x2={projection([route.DestLongitude, route.DestLatitude])[0]}
                        y2={projection([route.DestLongitude, route.DestLatitude])[1]}
                        stroke="#992a2a"
                        opacity = {0.3}
                        strokeWidth={0.5}
                    />
                ))}
            </g>
        );
    }
}

export { Routes };