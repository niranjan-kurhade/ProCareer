import React from "react";
import { useLocation } from "react-router-dom";


function Feedback(){
    const location = useLocation();
    const feedback = location.state.feedback;
    console.log(feedback);
    return(
        <div>
            {feedback}
        </div>
    )
}

export default Feedback;