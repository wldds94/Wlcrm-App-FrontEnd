import React, { useState, useEffect } from 'react';

// reduxjs
import { nanoid } from '@reduxjs/toolkit';

// third-party
import ReactApexChart from 'react-apexcharts';
import { isDeepEqual } from 'utils/equal';
// import apexchart from "apexcharts";

// config
import { baseOption, dynamicOption, paletteColor } from './chartConfig';

const ApexChartComponent = ({
    // container
    classesContainer = [],
    // chart
    chardId = false,
    titleLabel = "",
    titleLabelColor = false,
    subtitleLabel = "",
    /**
     * DYNAMIC
     */
    type = "area",
    categories = [],
    series = [],
    // secondary
    curve = 'smooth',
    // theme color
    themeColor = "default",
    ...other
}) => {
    const chartID = 'wlrm-react-chart-' + (chardId !== false ? chardId : Math.random() * 100)
    // const [updater, setUpdater] = useState(0)

    const [currentCategories, setCurrentCategories] = useState(categories)
    useEffect(() => {
        if (categories.length > 0 && !isDeepEqual(categories, currentCategories)) {
            setCurrentCategories(categories)
            // setUpdater(prevState => prevState + 1)
        }
    }, [categories])

    const [currentSeries, setCurrentSeries] = useState(series)
    useEffect(() => {
        // console.log(series);
        if (series.length > 0 && !isDeepEqual(series, currentSeries)) {
            // console.log('I Have To Update');
            // if (series.length) {
            //     setCurrentSeries(series)
            // }
            setCurrentSeries(series)
            // apexchart.exec("wlcrm-react-chart", 'updateSeries', series);
            // setUpdater(prevState => prevState + 1)
        }
    }, [series])

    const [currentType, setCurrentType] = useState(type)
    useEffect(() => {
        // console.log(type);
        if (String(type) !== String(currentType)) {
            // console.log('I Have To Update TYPE');
            setCurrentType(type)
            // setUpdater(prevState => prevState + 1)
        }
    }, [type])

    const generateOptions = () => {
        return {
            ...baseOption,
            // series: currentSeries,
            title: {
                ...dynamicOption[type].title,
                text: titleLabel,
                style: {
                    ...dynamicOption[type]?.title?.style,
                    color: titleLabelColor ? titleLabelColor : null
                }
            },
            subtitle: {
                ...dynamicOption[type].subtitle,
                text: subtitleLabel
            },
            chart: {
                ...baseOption.chart,
                ...dynamicOption[type].chart,
                // id: chartID,
                // type: dynamicOption[type].type, // currentType, // props.type,
            },
            labels: [...currentCategories],
            colors: dynamicOption[type]?.colors ? [...dynamicOption[type].colors] : paletteColor[themeColor], // undefined, ///* baseOption.colors */,
            // colors: [...props.colors],
            stroke: {
                ...baseOption.stroke,
                ...dynamicOption[type].stroke,
                // curve: 'straight'
            },
            plotOptions: {
                ...baseOption.plotOptions,
                ...dynamicOption[type].plotOptions,
                // curve: 'straight'
            },
            xaxis: {
                ...baseOption.xaxis,
                // type: 'datetime',
                tickAmount: generateTicking(currentCategories.length), // 12,
                categories: currentCategories, // props.categories, // ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            grid: {
                ...baseOption.grid,
                ...dynamicOption[type].grid,
            }
        }
    }

    const [currentOptions, setCurrentOptions] = useState(generateOptions())
    useEffect(() => {
        if ((series.length > 0 && !isDeepEqual(series, currentSeries))
            || (categories.length > 0 && isDeepEqual(categories, currentCategories))
            || String(type) !== String(currentType)) {

            setCurrentOptions(generateOptions()) // setCurrentCategories(categories) // setCurrentSeries(series) // setCurrentType(type)
        }

    }, [categories, type, series])

    return (
        <div className={"wlcrm-chart-container" + classesContainer?.reduce((prev, next) => {
            return prev + " " + next
        }, [""])} >
            <ReactApexChart
                // key={currentType}
                key={'wlcrm-react-chart_' + currentType + "_" + nanoid()}
                // id={chartID}
                series={currentSeries}
                categories={currentCategories}
                options={currentOptions}
                type={dynamicOption[currentType].chart.type}
            // colors={colors} 
            />
        </div>
    )
}

export default ApexChartComponent

function generateTicking(categories) {
    if (categories <= 12) {
        return categories
    }
    if (categories > 12 && categories < 32) {
        return Math.floor(Number(categories) / 4)
    } else {
        return Math.floor(Number(categories) / 8)
    }
}