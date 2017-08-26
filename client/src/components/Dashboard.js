import React from 'react'
import { graphql, gql } from 'react-apollo'

import Chart from './Chart'
import Select from './Select'
import Popover from './Popover'
import SettingsInterface from './SettingsInterface'

function Dashboard({ setIsAuthenticated, showError, allRecordsQuery }) {
    console.log(allRecordsQuery);
    /* Cannot update state in render */
    /*if (allRecordsQuery && allRecordsQuery.loading) {
        showError("Loading data...")
    }
    if (allRecordsQuery && allRecordsQuery.error) {
        showError(allRecordsQuery.error)
    }*/

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

    function handleClick() {
        /*setIsAuthenticated(false)*/
        showError("This is an error");
    }

    return (
        <div className="dashboard-container">
            <SettingsInterface/>
            <div className="chart">
                <div className="chart-head">
                    <div className="chart-title">
                        <h1 onClick={handleClick}>Daniel's Glucose Monitor</h1>
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
    )
}

const ALL_RECORDS_QUERY = gql`
query allRecordsQuery {
    medtronicSensorRecords {
        id
        senseDateTime
        calibrationFactor
        unfilteredValue
        isigValue
    }
}
`
export default graphql(ALL_RECORDS_QUERY, { name: 'allRecordsQuery' }) (Dashboard)

