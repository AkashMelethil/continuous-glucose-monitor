import React from 'react'
import { LinePath } from '@vx/shape'

function HonrizontalLine({data, yScale, xScale, y, x, dy, value}) {
    return (
        <g>
            <LinePath
                data={data}
                yScale={yScale}
                xScale={xScale}
                y={y}
                x={x}
                stroke="#666666"
                strokeWidth={2}
                strokeDasharray="4,4"
                strokeOpacity=".3"
            />
            <text fill="#666666" y={yScale(value)} dy={dy} dx="0" fontSize="12">
                {value}
            </text>
        </g>
    );
}

export default HonrizontalLine
