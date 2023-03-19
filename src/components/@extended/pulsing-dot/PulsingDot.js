import React from 'react'

// style
import './pulsing-dot.scss'

const PulsingDot = ({
    status = "active",
    color = '#62bd19',
    ...other
}) => {
    const colors = [
        {
            key: 'active',
            color: '#62bd19',
        },
        {
            key: 'inactive',
            color: '#ff9966',
        },
        {
            key: 'trash',
            color: '#cc3300',
        },
    ]
    // const ringingStyle = {
    //     borderColor: '#62bd19',
    // }

    const findedByStatus = colors?.find((item, index) => item?.key === status)
    const currentColor = color !== null 
        ? color 
        : (findedByStatus?.color ? findedByStatus?.color : colors[0]?.color)
    // if (color !== null) {
    //     currentColor = color
    // } else {
    //     const findedByStatus = colors?.find((item, index) => item?.key === status)
    //     currentColor = findedByStatus?.color ? findedByStatus?.color : colors[0]?.color
    // }

    return (
        <div className="wl-ring-container">
            <div className="ringring" style={{ borderColor: currentColor}}></div>
            <div className="circle" style={{ backgroundColor: currentColor}}></div>
        </div>
    )
}

export default PulsingDot