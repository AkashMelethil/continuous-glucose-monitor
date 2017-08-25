import React from 'react'

import Popover from './Popover'
import ProfileSettings from './ProfileSettings'
import AppSettings from './AppSettings'

class SettingsInterface  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAppSettingsActive: false,
            isProfileSettingsActive: false
        }
        
        this.toggleAppSettings = this.toggleAppSettings.bind(this)
        this.toggleProfileSettings = this.toggleProfileSettings.bind(this)
    }

    toggleAppSettings() {
        this.setState({
            isAppSettingsActive: !this.state.isAppSettingsActive,
            isProfileSettingsActive: false
        })
    }

    toggleProfileSettings() {
        this.setState({
            isAppSettingsActive: false,
            isProfileSettingsActive: !this.state.isProfileSettingsActive
        })
    }

    render() {
        const { isAppSettingsActive, isProfileSettingsActive } = this.state
        return(
            <div className="settings-interface">
                <Popover 
                    iconElement={<span onClick={this.toggleAppSettings} className="fa fa-cog fa-fw fa-lg"></span>}
                    isActive={isAppSettingsActive}
                >
                    <AppSettings/>
                </Popover>
                <Popover 
                    iconElement={<span onClick={this.toggleProfileSettings} className="fa fa-user fa-fw fa-lg"></span>}
                    isActive={isProfileSettingsActive}
                >
                    <ProfileSettings/>
                </Popover>
            </div>
        )
    }
}

export default SettingsInterface