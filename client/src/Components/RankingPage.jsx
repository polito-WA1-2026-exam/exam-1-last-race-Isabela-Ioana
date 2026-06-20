import { useEffect, useState } from "react";
import { Container, Card, Table, Spinner } from "react-bootstrap";
import { CalendarEvent } from "react-bootstrap-icons";

function RankingPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await fetch('http://localhost:3000/api/ranking', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching ranking: ${response.status}`);
                }

                const data = await response.json();
                setLeaderboard(data);
            } catch (err) {
                console.error("Failed to load leaderboard:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchLeaderboard();
    }, []);

    return (
        <Container className="my-5" style={{ maxWidth: "800px" }}>
            <Card className="border-3 shadow-sm rounded-3 bg-white overflow-hidden" style={{ borderColor: '#161925' }}>
                
                <div className="text-white p-3 fw-bold fs-4" style={{ backgroundColor: '#161925' }}>
                    <span>Last Race Leaderboard</span>
                </div>

                <Card.Body className="p-4">
                    {loading ? (
                        <div className="text-center my-4">
                            <Spinner animation="border" variant="primary" />
                            <p className="text-muted mt-2">Loading leaderboard positions...</p>
                        </div>
                    ) : (
                        <Table hover className="align-middle text-start mb-0">
                            <thead className="table-light text-secondary text-uppercase small fw-bold">
                                <tr>
                                    <th style={{ width: "80px" }}>Rank</th>
                                    <th>Player Name</th>
                                    <th>Final Score</th>
                                    <th>Played At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((row, idx) => {
                                    const rank = idx + 1;
                                    
                                    const formattedDate = new Date(row.played_at).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

                                    return (
                                        <tr key={row.id}>
                                            <td className="fw-bold text-secondary">{rank}</td>
                                            <td>{row.username}</td>
                                            <td className="fw-bold text-dark">{row.score} points</td>
                                            <td className="text-muted small">
                                                <CalendarEvent size={14} className="me-1 mb-1" />
                                                {formattedDate}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default RankingPage;