import { useContext, useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router"
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import UserContext from "../Context/UserContext";




function ScorePage() {
    const user= useContext(UserContext)
    const { segmentLength } = useParams()
    const [randomEvents, setRandomEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation();
    const navigate = useNavigate();
    const [visibleCount, setVisibleCount] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);
    const finalRoute = location.state?.segments || [];
    const currentVisibleEvents = randomEvents.slice(0, visibleCount);
    const liveScore = currentVisibleEvents.reduce((total, event) => total + (event.effect || 0), 20);

    async function saveScore() {
      try{
        const response = await fetch('http://localhost:3000/api/ranking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user?.id,               
                    score: liveScore, 
                    date: new Date().toISOString()           
                })
            });

            if (!response.ok) {
                throw new Error("Failed to save score to the leaderboard!");
            }

            setGameFinished(true);
            alert("Score successfully saved in the leaderboard!");
        } catch(err){
            console.error(err);
            alert("Error saving score: " + err.message);
        }
   
    }

    useEffect(() => {
        async function fetchEvents(numberOfEvents) {
            try {
                const response = await fetch('http://localhost:3000/api/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        numberOfEvents: numberOfEvents
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error, status: ${response.status}`);
                }

                const data = await response.json();
                const cleaned = Object.values(data);

                setRandomEvents(cleaned);
                if (cleaned.length > 0) {
                    setVisibleCount(1);
                }
            } catch (err) {
                console.error("Failed to fetch events:", err);
            } finally {
                setLoading(false);
            }
        }

        if (segmentLength) {
            fetchEvents(segmentLength);
        } else {
            setLoading(false);
        }


    }, [segmentLength]);

    useEffect(() => {
        if (loading || randomEvents.length === 0 || visibleCount >= randomEvents.length) {
            return;
        }

        const intervalId = setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + 1);
        }, 2000);

        return () => clearTimeout(intervalId);
    }, [visibleCount, randomEvents, loading]);

   

    const isSimulationFinished = !loading && randomEvents.length > 0 && visibleCount === randomEvents.length;


    return (
        <Container className="my-5" style={{ maxWidth: "900px" }}>
            <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden mb-4" style={{ borderColor: '#161925' }}>

                <div
                    className="text-white p-3 fw-bold fs-5 d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: '#161925' }}
                >
                    <span>Your route</span>

                    {!loading && randomEvents.length > 0 && (
                        <span className="badge bg-warning text-dark fs-6 fw-bold">
                            Live Score: {liveScore >= 0 ? `${liveScore}` : liveScore} pts
                        </span>
                    )}
                </div>

                <Card.Body className="bg-white p-4">
                    {loading ? (
                        <div className="text-center my-4">
                            <Spinner animation="border" variant="primary" />
                            <p className="text-muted mt-2">Loading random events...</p>
                        </div>
                    ) : (
                        <Row>
                            {currentVisibleEvents.map((event, idx) => {
                                const positive = event.effect > 0;
                                const segmentName = finalRoute[idx]

                                return (
                                    <Col md={6} key={idx} className="mb-3">
                                        <div className="p-3 bg-white rounded border border-secondary border-opacity-25 text-start shadow-sm h-100 d-flex flex-column">
                                            <div className="small fw-bold text-primary text-uppercase mb-2" style={{ letterSpacing: "0.5px" }}>
                                                {segmentName}
                                            </div>

                                            <div className="fw-medium text-dark mb-3 flex-grow-1" style={{ minHeight: "48px" }}>
                                                {event.description}
                                            </div>

                                            <div className="small bg-light p-2 rounded d-inline-block mt-auto w-100">
                                                <strong>Effect: </strong>
                                                <span className={positive ? "text-success fw-bold" : "text-danger fw-bold"}>
                                                    {positive ? `+${event.effect}` : event.effect} points
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    )}
                </Card.Body>
            </Card>

            {isSimulationFinished && (
                <Card className="border-3 shadow rounded-3 text-center p-4 mb-4" style={{ borderColor: '#198754' }}>
                    <h2 className={`fw-bold mb-2 text-success`}>
                        GAME OVER!
                    </h2>

                    <p className="fs-5 text-secondary mb-4">
                        The journey is over. Your total final score is <strong>{liveScore} points</strong>.
                        <br />
                    </p>

                    {!gameFinished ? (
                        <Button
                            variant="primary"
                            className="fw-bold py-2 px-5 align-self-center"
                            onClick={saveScore}
                            style={{ maxWidth: "300px", fontSize: "1.1rem" }}
                        >
                            Finish Current Game
                        </Button>
                    ) : (
                        <>
                            <p className="fs-5 text-secondary mb-4">
                                See your position on the <strong>leaderboard</strong>!
                                <br />
                            </p>

                            <Button
                                variant={"success"}
                                className="fw-bold py-2 px-5 align-self-center"
                                onClick={() => navigate('/userpage/playgame')}
                                style={{ maxWidth: "300px", fontSize: "1.1rem" }}
                            >
                                Play Again
                            </Button>
                        </>
                    )}

                </Card>
            )}
        </Container>
    );
}

export default ScorePage;