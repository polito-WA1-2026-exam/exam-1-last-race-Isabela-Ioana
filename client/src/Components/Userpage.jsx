
import MetroMap from "./Map";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router';

function Userpage() {


    const navigate = useNavigate();


    function playButton() {
        navigate('/userpage/playgame')
    }


    return (
        <div className="position-relative shadow-none" style={{ backgroundColor: '#FFFFFC' }}>
            <Button
                className="fw-bold position-absolute border-0 text-white shadow-none custom-mov-btn"
                style={{
                    top: "9px",
                    left: "650px",
                    minWidth: "300px",
                    backgroundColor: '#7a6f9b'
                }}
                onClick={playButton}> PLAY </Button>
                <MetroMap />
            
        </div>
    );
}

export default Userpage;