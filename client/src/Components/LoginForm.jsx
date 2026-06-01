import { Form, Container, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router"
import { useState } from "react";
import { doLogin } from "../api/auth";
import { Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Envelope, Lock, ShieldLock} from "react-bootstrap-icons";






function LoginForm(props){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        console.log("Email to send:", email);
        console.log("Password to send:", password);

      
        try{
          if (!email.trim() || !password.trim()) {
            setErrorMessage("All fields are required. Please fill in your credentials!");
            return;}


          const user= await doLogin(email,password)
          props.setTheUser(user)
          navigate('/userpage')
        }
        catch(err){
          console.log(err)
          setErrorMessage("User doesn't exist or invalid credentials!");

        }
    }

    function userLoggedIn(){
        navigate('/')
    }

    return(


        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "85vh" }}>
            
            <Card className="p-4 border-0 text-white" 
              style={{ 
                  width: "100%", 
                  maxWidth: "420px", 
                  backgroundColor: "#a3adb8", 
                  borderRadius: "12px"        
              }}>
                
                <div className="text-center mb-4 font-monospace">
                    <h3 className="fw-bold text-uppercase tracking-wider m-0">User log in</h3>
                </div>
                
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
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button variant="info" type="submit" className="w-100 py-2.5 fw-bold text-white text-uppercase shadow-sm font-monospace rounded-3 mb-2">
                        ENTER ACCOUNT &rarr;
                    </Button>
                </Form>

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