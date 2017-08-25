import React from 'react'

class AppSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { units } = this.props
        return (
            <div className="app-settings">
                <div className="settings-section">
                    <span className="settings-section-title">Units</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">Date Format</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">Alarm</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">Time Zone</span>
                </div>
            </div>
        )
    }
}

export default AppSettings