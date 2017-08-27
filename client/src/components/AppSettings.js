import React from 'react'

class AppSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { units } = this.props
        return (
            <div classNameName="profile-settings">
                <div className="popover-section">
                    <div className="popover-section-title">Units</div>
                    <div className="popover-section-element">Change units here.</div>
                </div>
                <div className="popover-section">
                    <div className="popover-section-title">
                        <span>Threshholds</span>
                        <span className="fa fa-plus fa-fw add"></span>
                    </div>
                    <div className="popover-section-element">
                        <span>Value | Rate</span>
                        <span className="fa fa-minus fa-fw remove"></span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AppSettings