import React, { useEffect, useMemo, useState } from 'react'

// mui material
import { Box, IconButton, Stack } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Divider } from '@mui/material'
// styled
import { useTheme, styled } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// projet import
import ApexChartComponent from 'components/apex-charts/ApexChartComponent';
import AccordionCard from 'components/card/list/AccordionCard';
import SimpleHeaderBoxed from 'components/typography/SimpleHeaderBoxed';

// assets
import { VscGraphScatter, VscGraphLine } from 'react-icons/vsc'
import { AiOutlineBarChart, AiOutlineAreaChart } from 'react-icons/ai'

// utils
import { isDeepEqual } from 'utils/equal';

const ChartsCard = ({
    // charts container
    classesContainer = [],
    // header
    withHeader = true,
    cardTitle = false,
    // wrapping toolbar
    withWrapToolbar = true,
    // chart
    chartsTitle = false, // "",
    titleLabelColor = false,
    chartsTitlePreparation = false, // (seriesMemo) => "",
    chartsSubTitle = "",
    // content
    data = [],
    memoryDataCallback = (data) => [], // data,
    memoryDataDependecies = [],
    // Series
    toggler = true,
    defaultTypeSeries = false,
    defaultTypesSeries = [/* {
        value: 'months',
        label: 'Mese',
    }, {
        value: 'weeks',
        label: 'Week',
    } */],
    memoryCategoriesCallback = (data) => [],
    columnParallal = false,
    fieldValue = false,
    getUnique = (data, columnParallal) => [],
    fieldDate = false,
    transformValueToCompare = (value) => {return value},
    getPositionByPeriod = (period, value) => { return -1},
    // Charts Type
    defaultType = "area",
    types = ['area', 'bar', 'line', 'scatter'],
    themeColor = "default",
    ...other
}) => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentData, setCurrentData] = useState(data)
    useEffect(() => {
        if (!isDeepEqual(currentData, data)) {
            setCurrentData(data)
        }
    }, [data])

    const [type, setType] = useState(defaultType) // 'area' - 'bar' - 'scatter'
    const handleChangeType = (value) => {
        if (value !== type) {
            setType(value)
        }
    }
    const typeActions = [
        {
            value: 'area',
            icon: <AiOutlineAreaChart />,
            onClick: handleChangeType,
        },
        {
            value: 'bar',
            icon: <AiOutlineBarChart />,
            onClick: handleChangeType,
        },
        {
            value: 'line',
            icon: <VscGraphLine />,
            onClick: handleChangeType,
        },
        {
            value: 'scatter',
            icon: <VscGraphScatter />,
            onClick: handleChangeType,
        },
    ]

    const [typeSeries, setTypeSeries] = useState(defaultTypeSeries)
    const handleChangeTypeSeries = (e, value) => {
        if (value !== typeSeries) {
            setTypeSeries(value)
        }
    }

    const TogglerGroup = () => {
        return (
            <>
                {toggler === false
                    ? <></>
                    : <ToggleButtonGroup
                        color="primary"
                        size="small"
                        value={typeSeries}
                        exclusive
                        onChange={handleChangeTypeSeries}
                        aria-label="Slot Chart"
                        sx={{
                            '& .MuiToggleButton-root': {
                                fontSize: '.7rem',
                                pt: .4,
                                pb: .4,
                            }
                        }}
                    >
                        {defaultTypesSeries?.map((item, index) => (
                            <ToggleButton key={index} value={item?.value}>{item?.label}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>}
            </>
        )
    }

    const categoriesMemo = useMemo(
        () => memoryCategoriesCallback(currentData, typeSeries),
        [currentData, typeSeries]
    )
    console.log(categoriesMemo);

    const seriesMemo = useMemo(
        () => memoryDataCallback(
            currentData, 
            typeSeries, 
            columnParallal,
            fieldValue,
            fieldDate, 
            categoriesMemo,
            getUnique,
            transformValueToCompare,
            getPositionByPeriod,
        ),
        [currentData, typeSeries, categoriesMemo]
    )
    console.log(seriesMemo);

    return (
        <>
            <AccordionCard
                bottomBorder={false}
                fullWidth={true}
                ContentSummary={() => withHeader !== true ? <></> : <SimpleHeaderBoxed title={cardTitle} lightShadow={true} />}
                ContentDetails={() => <>
                    <Stack direction={matchDownSM ? "column" : "row"} alignItems='flex-start' /* flow='row wrap' */ >

                        <Box sx={{ height: '100%', mt: 1, p: '0 3px 3px 3px',/* background: 'yellow' */ }}>
                            <Stack direction="row" gap={1.5}  >
                                {withWrapToolbar === true
                                    && <><Stack direction={matchDownSM ? "row" : "column"}>
                                        {typeActions?.filter(item => types.includes(item?.value))?.map((item, index) => {
                                            return (
                                                <IconButton key={index}
                                                    onClick={() => item?.onClick(item?.value)}
                                                    color={String(item?.value) === String(type) ? 'primary' : "secondary"}
                                                >
                                                    {item?.icon}
                                                </IconButton>
                                            )
                                        })}
                                    </Stack></>}

                                {(matchDownSM && toggler === true)
                                    && <>
                                        <Divider variant="middle" orientation="vertical" flexItem />
                                        <TogglerGroup />
                                    </>}
                            </Stack>
                        </Box>
                        {(!matchDownSM && withWrapToolbar === true)
                            && <Divider variant="middle" orientation="vertical" flexItem />}

                        <Box sx={{ /* p: 1,  width: '100%' overflow: 'hidden', */overflow: 'auto', width: '100%', flexGrow: 15, minHeight: withWrapToolbar === true ? '350px' : '100px', }}>
                            {(!matchDownSM && toggler === true)
                                && <Box sx={{ p: .4, maxWidth: '100px' }} >
                                    <TogglerGroup />
                                </Box>}
                            <ApexChartComponent
                                classesContainer={classesContainer}
                                series={seriesMemo}
                                categories={categoriesMemo}
                                type={type}
                                titleLabel={chartsTitle ? chartsTitle : ""/* titleMemo */}
                                titleLabelColor={titleLabelColor}
                                subtitleLabel={chartsSubTitle}
                                themeColor={themeColor}
                            />
                        </Box>
                    </Stack>
                </>}
            />
        </>
    )
}

export default ChartsCard