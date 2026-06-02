
import MetroMap from "./Map";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router';

function Userpage() {


    const navigate = useNavigate();


    function playButton(){
        navigate('/userpage/playgame')
    }


    return (
        <div className="position-relative">
            <Button 
                variant="info" 
                className="fw-bold position-absolute"
                style={{ 
                    top: "9px", 
                    left: "650px",
                    minWidth: "300px"
                }}
                onClick={playButton}> PLAY </Button>

            <MetroMap />
        </div>
    );
}

export default Userpage;