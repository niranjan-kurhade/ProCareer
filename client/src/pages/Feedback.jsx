import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Feedback(){
    const location = useLocation();
    const feedback = location.state.feedback;
    console.log(feedback);
    return(
        <div>
            <Navbar />
            {feedback}
        </div>
    )
}

export default Feedback;