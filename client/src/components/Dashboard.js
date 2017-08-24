import React from 'react'

import Chart from './Chart'

function Dashboard() {
    return (
        <div className="container">
            <div className="settings-interface">
                <span className="fa fa-cog fa-fw fa-lg"></span>
                <span className="fa fa-user fa-fw fa-lg"></span>
            </div>
            <div className="chart">
                <div className="chart-head">
                    <div className="chart-title">
                        <h1>Daniel's Glucose Monitor</h1>
                        <div className="chart-data-age">
                            <span className="chart-data-age-value">Past 12h</span>
                            <span className="fa fa-angle-down fa-fw"></span>
                        </div>
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
