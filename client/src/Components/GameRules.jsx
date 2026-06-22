import { Container, Badge, Row, Col, Card} from "react-bootstrap";


function GameRules() {
    return (   // #9888A5 #FF8C42  #7A6F9B
        <div style={{ backgroundColor: '#FFFFFC' }}>
            <Container className="py-5">
                <h2 className="text-center fw-bold text-uppercase tracking-wider mb-5" style={{ color: '#7a6f9b' }}>
                    Rules of the Game
                </h2>
                <Row className="g-4">
                    {/* Step 1 */}
                    <Col md={4}>
                        <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #7a6f9b' }}>
                            <Card.Body className="p-4 text-center">
                                <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 01</span>
                                <Card.Title className="fw-bold text-dark h5 mb-3">Route Connection</Card.Title>
                                <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                    Your mission is to construct a continuous metro path. Connect track segments strategically from your designated start station to the final destination to unlock the simulation.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Step 2 */}
                    <Col md={4}>
                        <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #7a6f9b' }}>
                            <Card.Body className="p-4 text-center">
                                <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 02</span>
                                <Card.Title className="fw-bold text-dark h5 mb-3">Survive Random Events</Card.Title>
                                <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                    As your train rides through the grid, unexpected transit scenarios will trigger. Real-time modifiers will impact your engine, shifting your safe score base by  <Badge bg="danger" className="mx-1 px-2 py-1 align-middle">-4</Badge> to
                                    <Badge bg="success" className="mx-1 px-2 py-1 align-middle">+4</Badge>.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Step 3 */}
                    <Col md={4}>
                        <Card className="h-100" style={{ backgroundColor: '#FFFFFC', border: '2px solid #7a6f9b' }}>
                            <Card.Body className="p-4 text-center">
                                <span className="fw-bold d-block mb-2" style={{ color: '#161925', fontSize: '0.85rem' }}>STAGE 03</span>
                                <Card.Title className="fw-bold text-dark h5 mb-3"> Claim the Leaderboard </Card.Title>
                                <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>
                                    Reach the final station safely to calculate your efficiency rating. Save your total score instantly to outrank other engineers and secure your spot on the live global leaderboard.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GameRules;