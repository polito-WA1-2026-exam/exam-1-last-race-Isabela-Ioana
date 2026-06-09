import { Accordion, Container, Badge, Row, Col, Card, ListGroup, Tab, Nav } from "react-bootstrap";
import { InfoCircle, SignpostSplit, Lightbulb, Trophy } from "react-bootstrap-icons";


function GameRules() {
    return (   // #9888A5 #FF8C42  #7A6F9B
    <div style={{ backgroundColor: '#FFFFFC'}}>
        <Container className="py-5">
            <h2 className="text-center fw-bold text-uppercase tracking-wider mb-5" style={{ color: '#FF8C42' }}>
                Rules of the Game
            </h2>
            <Row className="g-4">
                {/* Step 1 */}
                <Col md={4}>
                    <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #FF8C42' }}>
                        <Card.Body className="p-4 text-start">
                            <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 01</span>
                            <Card.Title className="fw-bold text-dark h5 mb-3">Topology Validation</Card.Title>
                            <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                Before the simulation begins, the system maps the structural integrity of your layout. Each rail placement updates a live system graph.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Step 2 */}
                <Col md={4}>
                    <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #FF8C42' }}>
                        <Card.Body className="p-4 text-start">
                            <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 02</span>
                            <Card.Title className="fw-bold text-dark h5 mb-3">Event Simulation</Card.Title>
                            <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                As your train traverses the validated path, rail connections trigger database queries to pull dynamic transit scenarios. Balance fluctuates from
                                <Badge bg="danger" className="mx-1 px-2 py-1 align-middle">-4</Badge> to
                                <Badge bg="success" className="mx-1 px-2 py-1 align-middle">+4</Badge>.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Step 3 */}
                <Col md={4}>
                    <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #FF8C42' }}>
                        <Card.Body className="p-4 text-start">
                            <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 03</span>
                            <Card.Title className="fw-bold text-dark h5 mb-3">Global Ranking</Card.Title>
                            <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                Once the run terminates, your final efficiency rating is weighed against operational costs and pushed directly to the global live leaderboard.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    );
}

export default GameRules;