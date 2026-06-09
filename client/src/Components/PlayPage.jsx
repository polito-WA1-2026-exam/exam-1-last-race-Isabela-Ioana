import { useState } from "react";
import { Button, Container, Spinner, Card, Row, Col, ListGroup, Form } from "react-bootstrap";
import MetroMap from "./Map";
import { DatabaseGear } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";

function PlayPage() {
    const [gameStarted, setGameStarted] = useState(false);
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [availableSegments, setAvailableSegments] = useState([])
    const [chosenRoute, setChosenRoute] = useState([])
    const [validationResult, setValidationResult] = useState(null)
    const [searchQuery, setSearchQuery] = useState("");


    async function handleStartGame() {
        try {
            setLoading(true);

            const response = await fetch("http://localhost:3000/api/game/start");
            if (!response.ok) {
                throw new Error("Couldn't generate stations!");
            }
            const data = await response.json();
            setGameData(data);

            const responseSegments = await fetch("http://localhost:3000/api/game/start/segments")
            if (!responseSegments.ok) {
                throw new Error("Couldn't generate segments!");
            }
            const segments = await responseSegments.json()
            setAvailableSegments(segments)

            setGameStarted(true);
            setChosenRoute([])      //resets the route at every start of a new game
            setValidationResult(null)
        } catch (err) {
            console.error(err);
            alert("Error starting the game!");
        } finally {
            setLoading(false);
        }
    }

    function handleAddSegment(segment) {
        if (!chosenRoute.includes(segment)) {
            setChosenRoute([...chosenRoute, segment])
            setValidationResult(null)
        }
    }

    function handleVerifyRoute() {

        const startStationName = gameData?.startStation.name;
        const endStationName = gameData?.endStation.name;

        let orderedStations = [];

        for (let i = 0; i < chosenRoute.length; i++) {
            const parts = chosenRoute[i].split(" - ").map(s => s.trim());
            const segmentStart = parts[0];
            const segmentEnd = parts[1];

            if (i === 0) {
                if (segmentStart === startStationName) {
                    orderedStations.push(segmentStart, segmentEnd);
                }
                else {
                    setValidationResult(`The route must start at ${startStationName}!`);
                    return;
                }
            } else {
                const lastVisitedStation = orderedStations[orderedStations.length - 1];

                if (segmentStart === lastVisitedStation) {
                    orderedStations.push(segmentEnd);
                } else if (segmentEnd === lastVisitedStation) {
                    orderedStations.push(segmentStart);
                } else {
                    setValidationResult(`Disconnection found! Segment "${chosenRoute[i]}" does not connect to the previous station "${lastVisitedStation}".`);
                    return;
                }
            }
        }

        const finalStationReached = orderedStations[orderedStations.length - 1];
        if (finalStationReached !== endStationName) {
            setValidationResult(`The route is continuous but it ends at ${finalStationReached} instead of ${endStationName}.`);
            return;
        }

        setValidationResult('success');
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
        <div style={{ backgroundColor: '#FFFFFC' }} className="py-2">
            <Container className="my-5 text-center">

                {!gameStarted ? (
                    <>
                        <h1 className="text-black fw-bold"> Ready? </h1>
                        <Button
                            variant='success'
                            onClick={handleStartGame}
                            className="mb-4 px-4 fw-bold"
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : "START"}
                        </Button>

                        <MetroMap showTitle={false} showLines={false}></MetroMap>
                    </>
                ) : (

                    <>

                        <BannerTop gameData={gameData} />


                        <Card
                            className="border-3 shadow-sm rounded-3 bg-white mx-auto mb-4"
                            style={{
                                borderColor: '#161925',
                                maxWidth: "600px"
                            }}
                        >
                            <div
                                className="text-white p-3 fw-bold fs-5 text-start"
                                style={{ backgroundColor: '#161925' }}
                            >
                                Metro Network Map
                            </div>


                            <Card.Body className="bg-white p-3">
                                <MetroMap showTitle={false} showLines={false} showCard={false} />
                            </Card.Body>
                        </Card>



                        <Row className="text-start">



                            <Col md={6} className="mb-4">
                                <SelectedRoute chosenRoute={chosenRoute} setChosenRoute={setChosenRoute} validationResult={validationResult} setValidationResult={setValidationResult} handleVerifyRoute={handleVerifyRoute} />
                            </Col>


                            <Col md={6} className="mb-4">
                                <AvailableSegments searchQuery={searchQuery} setSearchQuery={setSearchQuery} chosenRoute={chosenRoute} filteredSegments={filteredSegments} handleAddSegment={handleAddSegment}  ></AvailableSegments>
                            </Col>

                        </Row>
                    </>

                )}

            </Container>
        </div>
    );
}


function BannerTop(props) {
    const gameData = props.gameData;

    return (
        <>
            {/*BANNER TOP: */}
            <Card className="mb-4 shadow-sm border-3 rounded-3 bg-white" style={{ borderColor: '#161925' }}>
                <Card.Body className="text-center p-4">
                    <h4 className="fw-bold text-secondary text-start fs-5 mb-3">Reconstruct the Metro Route</h4>
                    <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                        <span className="bg-success text-white px-4 py-2 rounded-3 fw-bold fs-5">{gameData?.startStation.name}</span>
                        <span className="fs-3 text-muted">➔</span>
                        <span className="bg-success text-white px-4 py-2 rounded-3 fw-bold fs-5">{gameData?.endStation.name}</span>
                    </div>
                    <p className="text-muted m-0">
                        Build the route from <strong>{gameData?.startStation.name}</strong> to <strong>{gameData?.endStation.name}</strong> using the stations below
                    </p>
                </Card.Body>
            </Card>
        </>
    )
}

function SelectedRoute(props) {
    const chosenRoute = props.chosenRoute;
    const setChosenRoute = props.setChosenRoute;
    const validationResult = props.validationResult;
    const setValidationResult = props.setValidationResult;
    const handleVerifyRoute = props.handleVerifyRoute;


    return (
        <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden" style={{ borderColor: '#161925' }}>
            <div className="text-white p-3 fw-bold fs-5" style={{ backgroundColor: '#161925' }}>
                Your Route
            </div>
            <Card.Body className="bg-white p-4 text-center text-muted" style={{ minHeight: "350px" }}>

                <div className="flex-grow-1">
                    {chosenRoute.length === 0 ? (
                        <p className="text-muted text-center my-5">No segments added yet. Select segments from the list below!</p>
                    ) : (
                        <ListGroup variant="flush" className="mb-3">
                            {chosenRoute.map((segment, idx) => (
                                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center p-2 bg-light rounded mb-2 border-0">
                                    <span className="fw-medium text-dark">{segment}</span>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                            setChosenRoute(chosenRoute.filter((_, i) => i !== idx));

                                            setValidationResult(null);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </div>

                {validationResult && (
                    <div className={`alert ${validationResult === 'success' ? 'alert-success' : 'alert-danger'} fw-bold text-center p-2 mb-3`}>
                        {validationResult === 'success' ? " Correct route! Well done!" : validationResult}
                    </div>
                )}



                <Button
                    variant="primary"
                    className="w-100 fw-bold py-2"
                    disabled={chosenRoute.length === 0}
                    onClick={handleVerifyRoute}
                >
                    Verify Route
                </Button>

            </Card.Body>
        </Card>
    )
}

function AvailableSegments(props) {
    const searchQuery = props.searchQuery
    const setSearchQuery = props.setSearchQuery
    const chosenRoute = props.chosenRoute
    const filteredSegments = props.filteredSegments
    const handleAddSegment = props.handleAddSegment



    return (
        <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden mt-4" style={{ borderColor: '#161925' }}>

            <div className="text-white p-3 fw-bold fs-5" style={{ backgroundColor: '#161925' }}>
                Available Segments
            </div>


            <div className="p-2 bg-light border-bottom">
                <Form.Control
                    id="segment-search"      
                    name="segmentSearch"
                    type="text"
                    placeholder="Search for a station or segment"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-secondary border-opacity-50 text-dark"
                />
            </div>

            <Card.Body className="bg-white p-0 text-center text-muted" style={{ maxHeight: "350px", overflowY: "auto" }} >

                <ListGroup variant="flush">
                    {filteredSegments.map((segment, index) => {
                        const isAdded = chosenRoute.includes(segment);

                        return (

                            <ListGroup.Item
                                key={index}
                                className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white text-dark fs-6"
                            >

                                <span className="fw-semibold text-secondary">
                                    {segment}
                                </span>


                                <Button
                                    variant={isAdded ? "light" : "outline-primary"}
                                    size="sm"
                                    disabled={isAdded}
                                    onClick={() => handleAddSegment(segment)}
                                    className="d-flex align-items-center justify-content-center bg-white"
                                    style={{
                                        width: "34px",
                                        height: "34px",
                                        borderRadius: "6px"
                                    }}
                                >
                                    <Plus size={22} />
                                </Button>
                            </ListGroup.Item>


                        )
                    })}
                </ListGroup>

            </Card.Body>
        </Card>

    )
}



export default PlayPage;