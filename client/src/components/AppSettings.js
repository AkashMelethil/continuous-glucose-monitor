import React from 'react'

class AppSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { units } = this.props
        return (
            <div className="app-settings">
                <div class="settings-section">
                    <span class="settings-section-title">Units</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Date Format</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Alarm</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Time Zone</span>
                </div>
            </div>
        )
    }
}

export default AppSettings