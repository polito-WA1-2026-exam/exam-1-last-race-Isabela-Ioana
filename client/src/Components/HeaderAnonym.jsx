import { useNavigate, Outlet } from "react-router";
import { Navbar, Container, Button } from "react-bootstrap";
import { TrainFront } from 'react-bootstrap-icons';
import { useState } from "react";


function HeaderAnonym() {


    const navigate = useNavigate();

    const [hideButton, setHideButton] = useState(false)

    function logButton(){
        setHideButton(true)
        navigate('/login');
    }


    return (
        <>
        <Navbar sticky="top" className="py-2 border-bottom border-secondary border-opacity-10" 
                style={{ 
                    background: '#161925',
                    backdropFilter: 'blur(12px)',         
                    WebkitBackdropFilter: 'blur(12px)' 
                }}>
            <Container fluid className="d-flex justify-content-between align-items-center px-5">

                <Navbar.Brand className="d-flex align-items-center gap-2 font-monospace text-white fs-5 opacity-75"> 
                    <TrainFront size={26} />
                    <span> LAST RACE - BUCHAREST EDITION 2026 </span> 
                </Navbar.Brand> 
            
                
                <Button variant="light" onClick={logButton} hidden={hideButton} className="btn-sm px-4 fw-semibold rounded-pill text-dark opacity-90">
                    Log In
                </Button>
                
            </Container>
        </Navbar>

        <Outlet/> 

        </>
    );
}


export default HeaderAnonym