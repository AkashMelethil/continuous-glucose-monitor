import React from 'react'
import '../styles/Popover.css'

function Popover({ iconElement, children, isActive }) {
    return (
        <div className="popover-container">
            {iconElement}
            <div className={`popover-box ${isActive ? '' : 'popover-hidden'}`}>
                {children}
            </div>
        </div>
    )
}

export default Popover