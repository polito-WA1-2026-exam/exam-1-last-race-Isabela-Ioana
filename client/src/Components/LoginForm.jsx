import { Form, Container, Button,Alert, Card,InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router"
import { useState } from "react";
import { doLogin } from "../api/auth";
import { Envelope, Lock } from "react-bootstrap-icons";



function LoginForm(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

    

        try {
            if (!email.trim() || !password.trim()) {
                setErrorMessage("All fields are required. Please fill in your credentials!");
                return;
            }


            const user = await doLogin(email, password)
            props.setTheUser(user)
            navigate('/userpage')
        }
        catch (err) {
            console.log(err)
            setErrorMessage("User doesn't exist or invalid credentials!");

        }
    }

    function userLoggedIn() {
        navigate('/')
    }

    return (


        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>

            <Card
                className="border-3 shadow-sm rounded-3 bg-white overflow-hidden"
                style={{
                    width: "100%",
                    maxWidth: "420px",
                    borderColor: '#161925',
                    borderRadius: "12px"
                }}
            >

                <div
                    className="text-white p-3 fw-bold fs-5 text-start text-center font-monospace text-uppercase tracking-wider"
                    style={{ backgroundColor: '#161925' }}
                >
                    User log in
                </div>

                <Card.Body className="bg-white p-4">
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-white-50 small font-monospace">EMAIL</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-white border-secondary border-opacity-50 text-secondary">
                                    <Envelope size={16} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white border-secondary border-opacity-50 text-secondary"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label className="text-white-50 small font-monospace">PASSWORD</Form.Label>
                            <InputGroup>
                                <InputGroup.Text className="bg-white border-secondary border-opacity-50 text-secondary">
                                    <Lock size={16} />
                                </InputGroup.Text>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white border-2 text-dark"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Button
                            type="submit"
                            className="w-100 py-2 fw-bold text-white text-uppercase shadow-sm font-monospace rounded-3 mb-2 border-0"
                            style={{ backgroundColor: '#7a6f9b' }}
                        >
                            ENTER ACCOUNT &rarr;
                        </Button>
                    </Form>

                </Card.Body>
                {errorMessage && (
                    <Alert variant="danger" className="text-center">
                        {errorMessage}
                    </Alert>
                )}
            </Card>
        </Container>

    )

}

export default LoginForm;