import React from 'react'
import { Link } from 'react-router-dom';

const ChooseTemplate = () => {
    return (
        <div>
            <p>Choose Template</p>
            <img src='/assets/sample-resume.png' />
            <img src='/assets/sample-resume.png' />
            <img src='/assets/sample-resume.png' />
            <Link to="/resume-builder/edit-details">
                <button>Create Resume</button>
            </Link>
        </div>
    )
}

export default ChooseTemplate