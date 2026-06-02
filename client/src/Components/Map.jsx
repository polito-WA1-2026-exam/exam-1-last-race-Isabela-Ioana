import { useState, useEffect } from "react";
import { Container, Card, Spinner, Alert, Button } from "react-bootstrap";
import { Map as MapIcon } from "react-bootstrap-icons";

function MetroMap() {
    const [mapData, setMapData] = useState({ stations: [], connections: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMap() {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/stations");
                
                if (!response.ok) {
                    throw new Error("Couldn't fetch map data.");
                }

                const data = await response.json();
                setMapData(data);
            } catch (err) {
                console.error(err);
                setError("Connection with database failed!");
            } finally {
                setLoading(false);
            }
        }

        fetchMap();
    }, []);

    if (loading) {
        return (
            <div className="text-center my-5 text-white font-monospace">
                <Spinner animation="border" variant="info" />
                <p className="mt-2">Map is loading..</p>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="my-5" style={{ maxWidth: "500px" }}>
                <Alert variant="danger" className="text-center font-monospace">
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-3 mb-4 text-white font-monospace" style={{ maxWidth: "800px" }}>
            
            <div className="d-flex justify-content-start align-items-center gap-2 mb-2 pb-2 border-bottom border-secondary border-opacity-25">
                <MapIcon size={22} className="text-info" />
                <h2 className="fs-4 text-black fw-bold m-0 text-uppercase">Bucharest Metro Map </h2>
            </div>

            <Card className="p-4 border-0 text-center" style={{ backgroundColor: "#69abed" }}>
                <svg 
                    viewBox="260 50 340 280"
                    width="100%" 
                    height="100%" 
                    style={{ background: "#ffffff", borderRadius: "8px" }}
                >

                    <defs>
                        <linearGradient id="M1-M3-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            {/* Prima jumătate: Galben (M1) */}
                            <stop offset="0%" stopColor="#FFCD00" />
                            <stop offset="50%" stopColor="#FFCD00" />
                            
                            {/* A doua jumătate: Roșu (M3) */}
                            <stop offset="50%" stopColor="#E31B23" />
                            <stop offset="100%" stopColor="#E31B23" />
                        </linearGradient>
                    </defs>


                    {mapData.connections.map((conn) => {

                        if (conn.id === 20 || conn.id === 25) {
                            return null;
                        }

                        return (                        
                            <line 
                                key={`conn-${conn.id}`}
                                x1={conn.x1} y1={conn.y1}
                                x2={conn.x2} y2={conn.y2}
                                stroke={conn.lineColor}
                                strokeWidth="4"
                                strokeLinecap="round" 
                            />
                        );
                    })} 

                    <line 
                        x1="496" y1="259"  
                        x2="545" y2="260"  
                        stroke="url(#M1-M3-gradient)" 
                        strokeWidth="5"    
                        strokeLinecap="round"
                    />

                    {mapData.stations.map((station) => { 
                        let textXOffset = 0;
                        let textYOffset = -10; 
                        let anchor = "middle";

                       
                        if (station.name === "Gara de Nord") {
                            textXOffset = -10;
                            textYOffset = 3;
                            anchor = "end"; 
                        } 
                        else if (station.name === "Basarab") {
                            textXOffset = 10;
                            textYOffset = -5;
                            anchor = "start"; 
                        }
                        else if (station.name === "Piata Romana" || station.name === "Universitate") {
                            textXOffset = 10;
                            textYOffset = 3;
                            anchor = "start"; 
                        }
                        else if (station.name === "Piata Unirii" || station.name === "Mihai Bravu") {
                            textYOffset = 10; 
                            textXOffset = -20;
                        }
                        else if (station.name === "N. Grigorescu") {
                            textYOffset = -11; 
                            textXOffset = -20;
                        }
                        else if (station.name === "Timpuri Noi") {
                            textYOffset = 10; 
                            textXOffset = -25;
                        }
                        else if (station.name === "Politehnica") {
                            textYOffset = 11; 
                            textXOffset = 10;
                        }
                        else if (station.name === "Dristor") {
                            textYOffset = -2; 
                            textXOffset = -20;
                        }
                        else if(station.name === "1 Decembrie") {
                            textYOffset = 14; 
                            textXOffset = -5;
                        }


                        return (
                            <g key={`station-${station.id}`}>
                                <circle 
                                    cx={station.coordX} 
                                    cy={station.coordY} 
                                    r="4.5" 
                                    fill="#FFFFFF" 
                                    stroke="#4A5568" 
                                    strokeWidth="1.5" 
                                />
                                <text 
                                    x={station.coordX + textXOffset} 
                                    y={station.coordY + textYOffset} 
                                    fill="#01070c" 
                                    fontSize="6" 
                                    fontWeight="bold" 
                                    textAnchor={anchor}
                                >
                                    {station.name}
                                </text>
                            </g>
                        );
                    })} 
                </svg>
            </Card>

        </Container>
    );
}

export default MetroMap;