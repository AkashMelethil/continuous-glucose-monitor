import React from 'react'

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { username } = this.props
        return (
            <div className="profile-settings">
                <div className="settings-section">
                    <span className="settings-section-title">username</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">password</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">emails</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">sms numbers</span>
                </div>
                <div className="settings-section">
                    <span className="settings-section-title">logout</span>
                </div>
            </div>
        )
    }
}

export default ProfileSettings