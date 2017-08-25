import React from 'react'

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { username } = this.props
        return (
            <div className="profile-settings">
                <div class="settings-section">
                    <span class="settings-section-title">Username</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Password</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Emails</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">SMS Numbers</span>
                </div>
                <div class="settings-section">
                    <span class="settings-section-title">Logout</span>
                </div>
            </div>
        )
    }
}

export default ProfileSettings