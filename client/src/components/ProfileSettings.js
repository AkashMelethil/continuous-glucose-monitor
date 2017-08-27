import React from 'react'

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { username } = this.props
        return (
            <div classNameName="profile-settings">
                <div className="popover-section">
                    <div className="popover-section-title">Profile</div>
                    <div className="popover-section-element">First Name: Daniel</div>
                    <div className="popover-section-element">Login Email: test@gmail.com</div>
                    <div className="popover-section-element">
                        <a className="forgot-link">Reset Password</a>
                    </div>
                </div>
                <div className="popover-section">
                    <div className="popover-section-title">
                        <span>Notification Emails</span>
                        <span className="fa fa-plus fa-fw add"></span>
                    </div>
                    <div className="popover-section-element">
                        <span>test1@gmail.com</span>
                        <span className="fa fa-minus fa-fw remove"></span>
                    </div>
                    <div className="popover-section-element">
                        <span>test2@gmail.com</span>
                        <span className="fa fa-minus fa-fw remove"></span>
                    </div>
                </div>
                <div className="button-container">
                    <button className="button">Logout</button>
                </div>
            </div>
        )
    }
}

export default ProfileSettings