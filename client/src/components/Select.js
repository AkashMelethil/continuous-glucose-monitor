import React from 'react'

import '../styles/Select.css'

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
            selectedOption: this.props.options[0]
        }
        this.collapse = this.collapse.bind(this)
        this.expand = this.expand.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    expand() {
        this.setState({ isExpanded: true })
    }

    collapse() {
        console.log("col")
        this.setState({ isExpanded: false })
    }

    handleItemClick(e) {
        this.setState({
            isExpanded: false,
        });
    }

    handleClick() {
        console.log("CLICK");
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    render() {
        const { onChange, options } = this.props;
        return (
            <span className={`select ${this.state.isExpanded ? 'select-active' : ''}`} onBlur={this.collapse}>
                <div className="selected-item" onClick={this.handleClick}>
                    <span>
                    <span className="selected-value">{this.state.selectedOption.value}</span>
                    <span className={`fa fa-angle-${this.state.isExpanded ? 'up' : 'down'} fa-fw`}></span>
                    </span>
                </div>
                <ul className={`select-options ${this.state.isExpanded ? '' : 'select-hidden'}`}>
                    {options.reduce((acc, cur) => {
                        if (cur.key !== this.state.selectedOption.key) {
                            acc.push(<li key={cur.key} className="select-option">{cur.value}</li>);
                        }
                        return acc
                    }, [])}
                </ul>
            </span>
        )


        /*
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
                        tabIndex="0"
                        onBlur={this.collapse}>
                        <div className="trigger" onClick={this.handleTriggerClick}>
                            {this.state.value}
                        </div>
                        {dropdown}
                    </div>
                );
                */
    }
}

export default Select