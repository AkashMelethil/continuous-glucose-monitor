import React from 'react'

import Chart from './Chart'
import Dropdown from './Dropdown'
import Select from './Select'

function Dashboard() {
    const options = [
        {
            key: '1',
            value: 'Past 12h'
        },
        {
            key: '2',
            value: 'Past day'
        },
        {
            key: '3',
            value: 'Past week'
        },
        {
            key: '4',
            value: 'Past 4 weeks'
        },
    ];

    return (
        <div className="dashboard-container">
            <div className="settings-interface">
                <span className="fa fa-cog fa-fw fa-lg"></span>
                <span className="fa fa-user fa-fw fa-lg"></span>
            </div>
            <div className="chart">
                <div className="chart-head">
                    <div className="chart-title">
                        <h1>Daniel's Glucose Monitor</h1>
                        <Select options={options}/>
                    </div>
                    <div className="chart-latest-info">
                        <div className="chart-latest-data">54.5 mg/dL</div>
                        <div className="chart-latest-diff">
                            <span className="chart-latest-data-diff">+0.3 mg/dL</span>
                            <span className="chart-latest-time">12min ago</span>
                        </div>
                    </div>
                </div>
                <div className="chart-body">
                    <Chart
                        margin={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

 export default Dashboard;
