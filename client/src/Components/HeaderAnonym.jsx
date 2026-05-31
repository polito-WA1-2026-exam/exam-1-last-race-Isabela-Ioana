import { useNavigate, Outlet } from "react-router";
import { Navbar, Container, Button } from "react-bootstrap";
import { TrainFront } from 'react-bootstrap-icons';



function HeaderAnonym() {

    function logButton(){
        console.log('pressed button')
    }


    return (

        <Navbar sticky="top" className="py-2 border-bottom border-secondary border-opacity-10" 
                style={{ 
                    background: 'rgba(19, 145, 242, 0.8)',
                    backdropFilter: 'blur(12px)',         
                    WebkitBackdropFilter: 'blur(12px)' 
                }}>
            <Container fluid className="d-flex justify-content-between align-items-center px-5">

                <Navbar.Brand className="d-flex align-items-center gap-2 font-monospace text-white fs-5 opacity-75"> 
                    <TrainFront size={26} />
                    <span> LAST RACE - BUCHAREST EDITION 2026 </span> 
                </Navbar.Brand> 
            
                
                <Button variant="light" onClick={logButton} className="btn-sm px-4 fw-semibold rounded-pill text-dark opacity-90">
                    Log In
                </Button>
                
            </Container>
        </Navbar>
    );


      <Outlet>  </Outlet> 

}


export default HeaderAnonym