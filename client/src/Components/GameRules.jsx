import { Accordion, Container, Badge } from "react-bootstrap";
import { InfoCircle, SignpostSplit, Lightbulb, Trophy } from "react-bootstrap-icons";

function GameRules() {
    return (
        <Container className="my-5 px-4" style={{ maxWidth: "800px" }}>
          
            <div className="d-flex align-items-center justify-content-center gap-2 mb-4 font-monospace border-bottom border-secondary border-opacity-25 pb-3">
                <InfoCircle size={22} className="text-info" />
                <h2 className="fs-4 fw-bold m-0 text-black uppercase tracking-wider">
                    Rules of the game 
                </h2>
            </div>


            <Accordion defaultActiveKey="0" flush className="shadow-lg border border-secondary border-opacity-25 rounded-3 overflow-hidden">
                
            
                <Accordion.Item eventKey="0" className="bg-dark text-black border-bottom border-secondary border-opacity-25">
                    <Accordion.Header className="font-monospace fw-bold">
                        <div className="d-flex align-items-center gap-2 text-black">
                            <SignpostSplit className="text-info" />
                            <span>NETWORK TOPOLOGY VALIDATION (THE SYSTEM GRAPH)</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="text-white-50 lh-lg" style={{ background: "#82a5d9" }}>
                        The game logic operates strictly on a simplified model of the real Bucharest Metro network. You are required to map out a continuous journey consisting of **at least 3 directly connected stations** from your database.
                        <br />
                        <span className="text-warning fw-bold">The Golden Rule:</span> Switching from one subway line to another (e.g., from the Yellow Line M1 to the Red Line M3) is strictly illegal unless the transfer occurs at an **authorized interchange hub** (<i>Piața Victoriei, Piața Unirii, Dristor, or Nicolae Grigorescu</i>). Changing lines at any standard, single-line station will cause the backend server to flag your route as invalid instantly.
                    </Accordion.Body>
                </Accordion.Item>

                
                <Accordion.Item eventKey="1" className="bg-dark text-white border-bottom border-secondary border-opacity-25">
                    <Accordion.Header className="font-monospace fw-bold">
                        <div className="d-flex align-items-center gap-2 text-black">
                            <Lightbulb className="text-warning" />
                            <span>RANDOM EVENT SIMULATION</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="text-white-50 lh-lg" style={{ background: "#82a5d9" }}>
                        As your train traverses the validated path segment by segment, each rail connection triggers a live backend database query to pull an unpredictable real-world transit scenario.
                        <br />
                        These underground anomalies alter your wallet balance dynamically, triggering coin fluctuations ranging from <Badge bg="danger">-4</Badge> to <Badge bg="success">+4</Badge>. You might secure funds through <i>optimal door positioning efficiency</i>, or lose capital due to <i>escalators blocked by tourists</i> or <i>unexpected ticket checkpoints</i>.
                    </Accordion.Body>
                </Accordion.Item>

                
                <Accordion.Item eventKey="2" className="bg-dark text-black">
                    <Accordion.Header className="font-monospace fw-bold">
                        <div className="d-flex align-items-center gap-2 text-black">
                            <Trophy className="text-success" />
                            <span>SCORE CALCULATION & THE GLOBAL RANKING</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="text-white-50 lh-lg" style={{ background: "#82a5d9" }}>
                        Your final score represents the exact amount of coins left in your inventory upon reaching the destination, computed securely on the server side.
                        <br />
                        If your balance drops below zero, or if the server deems your chosen routing illegal, you will face maximum penalties (a score of 0). To persist your achievements permanently in the **Global Leaderboard** database, ensure you hit the <strong>Sign In</strong> button on the header layout before initiating your run.
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        </Container>
    );
}

export default GameRules;