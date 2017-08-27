import React from 'react'
import '../styles/Popover.css'

function Popover({ iconElement, children, isActive, arrowClass }) {
    return (
        <div className="popover-container">
            {iconElement}
            <div className={`popover-box ${isActive ? '' : 'popover-hidden'} ${arrowClass}`}>
                {children}
            </div>
        </div>
    )
}

export default Popover