import React from 'react'
import { withScreenSize } from '@vx/responsive'
import { genDateValue } from '@vx/mock-data'
import { extent, max } from 'd3-array'
import { scaleTime, scaleLinear } from '@vx/scale'
import { Group } from '@vx/group'
import { GlyphDot } from '@vx/glyph'
import { AreaClosed, LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { PatternLines } from '@vx/pattern'
import { AxisBottom } from '@vx/axis'
import { LinearGradient } from '@vx/gradient'

import { CHART_WIDTH_RATIO, CHART_HEIGHT_RATIO } from '../constants'
import HorizontalLine from './HorizontalLine'
import formatDate from '../utils/formatDate'
import '../styles/Chart.css'

function Chart({ screenWidth, screenHeight, margin }) {
    const width = screenWidth * CHART_WIDTH_RATIO
    const height = screenHeight * CHART_HEIGHT_RATIO

    const data = genDateValue(15)

    // accessors
    const x = d => d.date
    const y = d => d.value

    // find max and min
    const firstPoint = data[0];
    const currentPoint = data[data.length - 1]
    const minValue = Math.min(...data.map(y))
    const maxValue = Math.max(...data.map(y))
    const maxData = [
      { date: x(firstPoint), value: maxValue },
      { date: x(currentPoint), value: maxValue }
    ]
    const minData = [
      { date: x(firstPoint), value: minValue },
      { date: x(currentPoint), value: minValue }
    ]

    // bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    // scales
    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x),
    })
    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
    })

    return (
        <div>
            <svg
                width={width}
                height={height}
            >
                <PatternLines
                    id="dLines"
                    height={6}
                    width={6}
                    stroke="#fafafa"
                    strokeWidth={1}
                    orientation={['diagonal']}
                />
                <LinearGradient
                    id="fill"
                    from="rgba(99, 214, 197, 0.4)"
                    to="#ffffff"
                    fromOpacity={0.5}
                    toOpacity={0}
                />
                <Group top={margin.top}>
                    <AxisBottom
                        data={data}
                        scale={xScale}
                        x={x}
                        top={height}
                        left={0}
                        numTicks={15}
                        hideTicks
                        hideAxisLine
                        tickFormat={formatDate}
                        tickLabelComponent={
                            <text
                                fill="#666666"
                                dy="0"
                                fillOpacity={1.0}
                                fontSize={11}
                                textAnchor="middle"
                            />
                        }
                    />
                    <AreaClosed
                        stroke="transparent"
                        data={data}
                        yScale={yScale}
                        xScale={xScale}
                        x={x}
                        y={y}
                        fill="url(#fill)"
                        curve={curveMonotoneX}
                    />
                    <AreaClosed
                        stroke="transparent"
                        data={data}
                        yScale={yScale}
                        xScale={xScale}
                        x={x}
                        y={y}
                        fill="url(#dLines)"
                        curve={curveMonotoneX}
                    />
                    <HorizontalLine
                        data={maxData}
                        yScale={yScale}
                        xScale={xScale}
                        y={y}
                        x={x}
                        dy={"1.3em"}
                        value={maxValue}
                    />
                    <HorizontalLine
                        data={minData}
                        yScale={yScale}
                        xScale={xScale}
                        y={y}
                        x={x}
                        dy="-0.5em"
                        value={minValue}
                    />
                    <LinePath
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        x={x}
                        y={y}

                        stroke='#63D6C5'
                        strokeWidth={2}
                        curve={curveMonotoneX}
                        glyph={(d, i) => {
                            return (
                                <g key={`line-point-${i}`}>
                                    <GlyphDot
                                        cx={xScale(x(d))}
                                        cy={yScale(y(d))}
                                        r={5}
                                        fill='#DD8369'
                                        stroke='#ffffff'
                                        strokeWidth={3}
                                    />
                                </g>
                            );
                        }}
                    />
                </Group>
            </svg>
        </div>
    )
}

export default withScreenSize(Chart)