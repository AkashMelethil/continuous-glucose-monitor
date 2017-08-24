import React from 'react'

import '../styles/Dropdown.css'

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 'Donuts'
        };
        this.collapse = this.collapse.bind(this)
    }

    expand() {
        this.setState({ expanded: true });
    }

    collapse() {
        this.setState({ expanded: false });
    }

    handleItemClick(e) {
        this.setState({
            expanded: false,
            value: e.target.innerText
        });
    }

    handleTriggerClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let dropdown = undefined;
        if (this.state.expanded) {
            dropdown = (
                <div className="content">
                    {
                        this.props.options.map(item => {
                            return <div onClick={(e) => { this.handleItemClick(e); }} className="item">{item}</div>;
                        })
                    }
                </div>
            );
        }

        return (
            <div className={`dropdown ${this.state.expanded ? 'active' : ''}`}
                tabIndex="0">
                <div className="trigger" onClick={e => this.handleTriggerClick()}>
                    {this.state.value}
                </div>
                {dropdown}
            </div>
        );
    }
}

export default Dropdown