import React from 'react'

function ForgotPassword() {
    return (
        <div className="forgot-container">
            <div className="input">
                <label className="fa fa-at fa-fw" aria-hidden="true"></label>
                <input type="text" placeholder="Email address" />
            </div>
            <div className="button-container">
                <button className="button">Find lost password</button>
            </div>
        </div>
    );
}

export default ForgotPassword