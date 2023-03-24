var it = require("apexcharts/dist/locales/it.json")

export const dynamicOption = {
    area: {
        chart: {
            type: 'area',
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            },
            column: {
                colors: ['#f8f8f8', 'transparent'],
            },
        },
    },
    bar: {
        chart: {
            type: 'bar',
            // stacked: true,
        },
        stroke: {
            colors: ['transparent'],
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            },
            column: {
                colors: ['#f8f8f8', 'transparent'],
            },
        },
    },
    line: {
        chart: {
            type: 'line',
        },
        stroke: {
            curve: 'straight',
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            },
            column: {
                colors: ['#f8f8f8', 'transparent'],
            },
        },
    },
    scatter: {
        chart: {
            type: 'scatter',
        },
        grid: {
            row: {
                colors: ['#e5e5e5', 'transparent'],
                opacity: 0.5
            },
            column: {
                colors: ['#f8f8f8', 'transparent'],
            },
        },
    },
    sparkline: {
        chart: {
            group: 'sparklines',
            type: 'area',
            width: 100,
            height: 100,
            sparkline: {
                enabled: true
            },
            toolbar: {
                show: false,
            },
        },
        title: {
            offsetX: 30,
            style: {
                fontSize: '24px',
                cssClass: 'apexcharts-yaxis-sparkline-title'
            }
        },
        subtitle: {
            offsetX: 30,
            style: {
                fontSize: '14px',
                cssClass: 'apexcharts-yaxis-sparkline-title'
            }
        },
        stroke: {
            curve: 'straight',
        },
        colors: ['#DCE6EC'],
        fill: {
            opacity: 1,
        },
    },
    donut: {
        chart: {
            type: 'donut',
            width: 100,
            height: 100,
        },
    },
    boxPlot: {
        chart: {
            type: 'boxPlot',
            height: 350,
        },
        stroke: {
            colors: ['#6c757d'],
            width: 1,
        },
        plotOptions: {
            bar: {
                //   horizontal: true,
                barHeight: '50%'
            },
        }
    },
    radialBar: {
        chart: {
            type: 'radialBar',
            // height: 350,
        },
    },
}

export const paletteColor = {
    default: undefined,
    status: ['#249efa', '#52b788'/* '#24e6a4' */, '#ff4d4f'],
    genre: ['#249efa', '#ff609e', '#cfcfcf'],
}

export const baseOption = {
    chart: {
        id: "wlcrm-react-chart",
        locales: [it],
        defaultLocale: 'it',
        fontFamily: "'Nunito','Poppins','Arvo','Public Sans',sans-serif'",
        foreColor: '#5a5a5a',
        height: 450,
        toolbar: {
            show: true,
        },
        zoom: {
            type: 'xy'
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
        pie: {
            donut: {
                labels: {
                    show: true,
                    total: {
                        showAlways: true,
                        show: true,
                    }
                }
            }
        },
        boxPlot: {
            colors: {
                upper: '#e9ecef',
                lower: '#f8f9fa'
            }
        },
    },
    // colors: ['#249efa', '#24e6a4', '#ff4d4f'], // ['#249efa', '#24e6a4', '#ff4d4f'],
    stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        // colors: ["#1890ff", "#0050b3"]
    },
    dataLabels: {
        enabled: false
    },
    grid: {
        // row: {
        //     colors: ['#e5e5e5', 'transparent'],
        //     opacity: 0.5
        // },
        // column: {
        //     colors: ['#f8f8f8', 'transparent'],
        // },
        strokeDashArray: 0
    },
    xaxis: {
        labels: {
            show: true,
            tickPlacement: 'on',
            hideOverlappingLabels: true,
        },
    },
    legend: {
        show: true,
        position: 'bottom',
    }
}