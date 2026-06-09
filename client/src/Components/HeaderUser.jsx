import { useNavigate, Outlet } from "react-router";
import { Navbar, Container, Button } from "react-bootstrap";
import { TrainFront } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import UserContext from '../Context/UserContext'
import { useContext } from 'react'




function HeaderUser(props){

    const user = useContext(UserContext)

    //const navigate = useNavigate();

    function rankingButton(){
        //navigate('/ranking');
        console.log('pressed')
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
            
                
                <Button variant="light" onClick={rankingButton} className="btn-sm px-4 py-2 fw-semibold rounded-pill text-dark opacity-90 shadow-sm border-0">
                    Ranking
                </Button>

                <Card className="d-inline-flex align-items-center justify-content-center bg-light px-4 py-2 fw-semibold rounded-pill text-dark opacity-90 shadow-sm border-0"
                style={{ fontSize: "0.875rem" }}>Welcome, {user.name} {user.surname}!</Card>


            </Container>
        </Navbar>

        <Outlet/> 

        </>
    );
}


export default HeaderUser;