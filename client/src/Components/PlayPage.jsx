import { useState, useEffect } from "react";
import { Button, Container, Spinner, Card, Row, Col, ListGroup, Form } from "react-bootstrap";
import MetroMap from "./Map";
import { Plus } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

function PlayPage() {
    const navigate = useNavigate();
    const [gameStarted, setGameStarted] = useState(false);
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [availableSegments, setAvailableSegments] = useState([]);
    const [chosenRoute, setChosenRoute] = useState([]);
    const [validationResult, setValidationResult] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [timeLeft, setTimeLeft] = useState(90);

    // TIMER
    useEffect(() => {
        if (!gameStarted) return;

        if (timeLeft === 0) {
            handleVerifyRoute();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, gameStarted]);


    async function handleStartGame() {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/game/start",{credentials:"include"});
            if (!response.ok) {
                throw new Error("Couldn't generate stations!");
            }
            const data = await response.json();
            setGameData(data);

            const responseSegments = await fetch("http://localhost:3000/api/game/start/segments",{credentials:"include"});
            if (!responseSegments.ok) {
                throw new Error("Couldn't generate segments!");
            }
            const segments = await responseSegments.json();
            setAvailableSegments(segments);

            setGameStarted(true);
            setChosenRoute([]);
            setValidationResult(null);
            setTimeLeft(90);
        } catch (err) {
            console.error(err);
            alert("Error starting the game!");
        } finally {
            setLoading(false);
        }
    }

    function handleAddSegment(segment) {
        if (!chosenRoute.includes(segment)) {
            setChosenRoute([...chosenRoute, segment]);
            setValidationResult(null);
        }
    }

    async function handleVerifyRoute() {
        try {
            const response = await fetch("http://localhost:3000/api/game/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chosenRoute: chosenRoute,
                    startStation: gameData?.startStation.name,
                    endStation: gameData?.endStation.name
                }),
                credentials:"include"
            });

            if (!response.ok) {
                throw new Error("Server communication error during validation.");
            }

            const data = await response.json();

            navigate(`/userpage/playgame/score/${chosenRoute.length}`, {
                state: {
                    segments: chosenRoute,
                    isRouteInvalid: !data.isValid,
                    errorMessage: data.message
                }
            });
        } catch (err) {
            console.error(err);
            alert("Error verifying the route: " + err.message);
        }
    }

    function getFilteredSegments() {
        let rezultate = [];
        let textCautat = searchQuery.toLowerCase();
        for (let i = 0; i < availableSegments.length; i++) {
            let textSegment = availableSegments[i].toLowerCase();
            if (textSegment.indexOf(textCautat) !== -1) {
                rezultate.push(availableSegments[i]);
            }
        }
        return rezultate;
    }

    const filteredSegments = getFilteredSegments();

    return (
        <div style={{ backgroundColor: '#FFFFFC', minHeight: "100vh" }} className="pt-0 pb-4">
            <Container fluid style={{ maxWidth: "1400px" }} className="mt-3">
                {!gameStarted ? (
                    <div className="text-center mt-4 mx-auto" style={{ maxWidth: "600px" }} >
                        <h3 className="text-black fw-bold mb-2 fs-4"> Ready? </h3>
                        <Button
                            onClick={handleStartGame}
                            className="mb-3 px-4 py-1.5 fw-bold fs-6 shadow-sm border-0 text-white shadow-none custom-mov-btn"
                            style={{ backgroundColor: '#7a6f9b' }}>

                            {loading ? <Spinner animation="border" size="sm" /> : "START GAME"}

                        </Button>

                        <div className="rounded overflow-hidden shadow-sm border" style={{ maxHeight: "650px" }}>
                            <MetroMap showTitle={false} showLines={false}></MetroMap>
                        </div>
                    </div>
                ) : (
                    <Row>
                        {/* metro map */}
                        <Col lg={7} md={12} className="mb-3">
                            <Card className="border-3 shadow-sm rounded-3 bg-white h-100" style={{ borderColor: '#161925' }}>
                                <div
                                    className="text-white p-3 fw-bold fs-5 text-start"
                                    style={{ backgroundColor: '#161925' }}
                                >
                                    Metro Network Map
                                </div>
                                <Card.Body className="bg-white p-2 d-flex align-items-center justify-content-center" style={{ minHeight: "500px" }}>
                                    <div className="w-100 h-100 rounded overflow-hidden">
                                        <MetroMap showTitle={false} showLines={false} showCard={false} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* right side */}

                        <Col lg={5} md={12} className="mb-3">
                            <div className="d-flex flex-column gap-2 h-100 justify-content-between">

                                {/* start and end stations */}
                                <StartAndEnd gameData={gameData} timeLeft={timeLeft} />

                                {/* your route */}
                                <div className="flex-grow-1">
                                    <SelectedRoute
                                        chosenRoute={chosenRoute}
                                        setChosenRoute={setChosenRoute}
                                        validationResult={validationResult}
                                        setValidationResult={setValidationResult}
                                        handleVerifyRoute={handleVerifyRoute}
                                    />
                                </div>

                                {/* available segments */}
                                <div className="flex-grow-1">
                                    <AvailableSegments
                                        searchQuery={searchQuery}
                                        setSearchQuery={setSearchQuery}
                                        chosenRoute={chosenRoute}
                                        filteredSegments={filteredSegments}
                                        handleAddSegment={handleAddSegment}
                                        validationResult={validationResult}
                                    />
                                </div>

                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
}

function StartAndEnd(props) {
    const gameData = props.gameData;
    const timeLeft = props.timeLeft;

    return (
        <Card className="shadow-sm border-3 rounded-3 bg-white" style={{ borderColor: '#161925', height: "110px" }}>
            <Card.Body className="p-2 px-3 d-flex align-items-center justify-content-between">
                <div className="text-start">
                    <h6 className="fw-bold text-secondary mb-1" style={{ fontSize: "0.9rem" }}>Reconstruct the Metro Route</h6>
                    <div className="d-flex align-items-center gap-2 mb-1">
                        <span className="bg-success text-white px-2 py-1 rounded fw-bold small">{gameData?.startStation.name}</span>
                        <span className="text-muted small">➔</span>
                        <span className="bg-success text-white px-2 py-1 rounded fw-bold small">{gameData?.endStation.name}</span>
                    </div>
                    <p className="text-muted m-0" style={{ fontSize: "0.75rem" }}>
                        Connect <strong>{gameData?.startStation.name}</strong> to <strong>{gameData?.endStation.name}</strong>
                    </p>
                </div>

                <div
                    className={`fw-bold px-3 py-2 rounded-3 text-center ${timeLeft <= 15 ? 'text-danger bg-danger bg-opacity-10' : 'text-dark bg-light'}`}
                    style={{
                        fontFamily: 'monospace',
                        fontSize: '1.2rem',
                        minWidth: '80px',
                        border: '2px solid #161925'
                    }}
                >
                    {timeLeft}s
                </div>
            </Card.Body>
        </Card>
    );
}

function SelectedRoute(props) {
    const chosenRoute = props.chosenRoute;
    const setChosenRoute = props.setChosenRoute;
    const handleVerifyRoute = props.handleVerifyRoute;

    return (
        <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden h-100" style={{ borderColor: '#161925' }}>
            <div className="text-white p-1 px-3 fw-bold text-start" style={{ backgroundColor: '#161925', fontSize: "0.85rem" }}>
                Your Route ({chosenRoute.length} segments)
            </div>

            <Card.Body className="bg-white p-2 px-3 d-flex flex-column justify-content-between" style={{ height: "180px" }}>
                <div style={{ overflowY: "auto", maxHeight: "90px" }} className="mb-1 flex-grow-1">
                    {chosenRoute.length === 0 ? (
                        <p className="text-muted text-center my-3 small" style={{ fontSize: "0.8rem" }}>No segments added yet.</p>
                    ) : (
                        <ListGroup variant="flush">
                            {chosenRoute.map((segment, idx) => (
                                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center p-1 bg-light rounded mb-1 border-0" style={{ fontSize: "0.8rem" }}>
                                    <span className="fw-medium text-dark text-truncate me-2">{segment}</span>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        style={{ fontSize: "0.7rem", padding: "1px 4px" }}
                                        onClick={() => setChosenRoute(chosenRoute.filter((_, i) => i !== idx))}
                                    >
                                        Delete
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>

                <Button
                    className="w-100 fw-bold py-1 mt-auto btn-sm border-0 text-white shadow-none"
                    disabled={chosenRoute.length === 0}
                    onClick={handleVerifyRoute}
                    style={{ fontSize: "0.85rem", 
                    backgroundColor: '#7a6f9b' }}
                >
                    Verify Route & Finish
                </Button>
            </Card.Body>
        </Card>
    );
}

function AvailableSegments(props) {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const chosenRoute = props.chosenRoute;
    const filteredSegments = props.filteredSegments;
    const handleAddSegment = props.handleAddSegment;

    return (
        <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden h-100" style={{ borderColor: '#161925' }}>
            <div className="text-white p-1 px-3 fw-bold text-start" style={{ backgroundColor: '#161925', fontSize: "0.85rem" }}>
                Available Segments
            </div>

            <div className="p-1 bg-light border-bottom">
                <Form.Control
                    id="segment-search"
                    name="segmentSearch"
                    type="text"
                    placeholder="Search for a segment"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-secondary border-opacity-50 text-dark form-control-sm"
                    style={{ fontSize: "0.8rem", padding: "2px 6px" }}
                />
            </div>

            <Card.Body className="bg-white p-0 text-muted" style={{ height: "180px", overflowY: "auto" }}>
                <ListGroup variant="flush">
                    {filteredSegments.map((segment, index) => {
                        const isAdded = chosenRoute.includes(segment);
                        return (
                            <ListGroup.Item
                                key={index}
                                className="d-flex justify-content-between align-items-center p-1 px-3 border-bottom bg-white text-dark"
                                style={{ fontSize: "0.8rem" }}
                            >
                                <span className="fw-semibold text-secondary text-truncate me-2">
                                    {segment}
                                </span>
                                <Button
                                    variant={isAdded ? "light" : "outline-primary"}
                                    size="sm"
                                    disabled={isAdded}
                                    onClick={() => handleAddSegment(segment)}
                                    className="d-flex align-items-center justify-content-center bg-white"
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "4px",
                                        padding: 0
                                    }}
                                >
                                    <Plus size={14} />
                                </Button>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default PlayPage;