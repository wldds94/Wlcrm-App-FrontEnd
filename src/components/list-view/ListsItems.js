import React, { useEffect, useMemo, useState } from 'react'

// material-ui
import {
    Box,
    Pagination,
    Stack,
    Typography
} from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
import ListHeader from './ListHeader'
import ContextMenu from 'components/context-menu/ContextMenu';
import AccordionCard from 'components/card/list/AccordionCard';
import CloseButton from 'components/button/CloseButton';

// icons
import { SortOrder } from 'assets/font-icons/icons';

// utils
import dynamicSortMultiple from 'utils/array';
import { isDeepEqual } from 'utils/equal';

const ListsItems = ({
    items = [],
    offItems = [],
    sortItems = null,
    sortSelected = null,
    totalIcon = false,
    totalText = false,
    withAddItem = false,
    AddIcon = false,
    withSearch = false,
    onChangeSearch = (value) => { return },
    withFilters = false,
    FiltersIcon = false,
    filters = [],
    withResetFilter = false,
    handleResetFilter = () => { return },
    FilterContent = false, // FilterContent = () => { <></> },
    AddContentCard = () => (<></>),
    ContentCard = () => (<></>),
    pagination = true,
    pageLimit = 5, // 10, // 0,
    page = 1,
    ...other
}) => {
    const theme = useTheme()
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    // console.log(items);
    const [currentItems, setCurrentItems] = useState(items)
    useEffect(() => {
        // console.log('useEffect ListItems');
        if (!isDeepEqual(items, currentItems)) {
            // console.log('I have to Update');
            setCurrentItems(items)
        }
    }, [items])

    const [currentPage, setCurrentPage] = useState(1) // useState(page)
    // useEffect(() => {
    //     // console.log('useEffect ListItems');
    //     if (Number(page) !== Number(currentPage)) {
    //         // console.log('I have to Update');
    //         setCurrentPage(page)
    //     }
    // }, [page])
    const handleChangePage = (event, value) => {
        if (Number(value) !== Number(currentPage)) {
            setCurrentPage(value);
        }
    };

    const [isAddingItem, setIsAddingItem] = useState(false)

    const getSorting = () => {
        return sortSelected !== null
            ? sortSelected
            : (sortItems?.length > 0
                ? sortItems[0] : null)
    }
    const [sorting, setSorting] = useState(getSorting())
    const handleSort = (value) => {
        setSorting(value)
    }
    const SortComponent = () => {
        return (
            <Stack direction="row" gap={.5}>
                {!matchDownMD && <Box sx={{ alignSelf: 'center', }}>
                    {sortItems?.filter(item => item?.key === sorting)?.map((item, index) => {
                        return (<Typography key={index} color="primary" sx={{ whiteSpace: 'nowrap' }}>{item?.label}</Typography>)
                    })}
                </Box>}
                <ContextMenu
                    items={sortItems?.map((item, index) => {
                        return {
                            ...item,
                            onClick: () => handleSort(item.key)
                        }
                    })}
                    SwapIcon={<SortOrder />}
                    selectedKey={sorting}
                />
            </Stack>
        )
    }

    // console.log(currentItems);
    const visibleList = useMemo(() => {
        const sorted = sorting !== null && Array.isArray(currentItems) ? currentItems?.slice()?.sort(dynamicSortMultiple(sorting)) : currentItems
        return sorted // .slice((currentPage - 1)*pageLimit, (currentPage)*pageLimit)
    }, [currentItems, sorting])


    return (
        <>
            <Stack>
                {/* <TopBar
                    withAddItem={withAddItem}
                    onAddClick={() => setIsAddingItem(true)}
                /> */}
                <ListHeader
                    totalValue={currentItems.length}
                    totalText={totalText}
                    withAddItem={withAddItem}
                    onAddClick={() => setIsAddingItem(true)}
                    withFilters={withFilters}
                    FilterContent={FilterContent}
                    filters={filters}
                    withResetFilter={withResetFilter}
                    handleResetFilter={handleResetFilter}
                    withSearch={withSearch}
                    onChangeSearch={onChangeSearch}
                    withRightBar={true}
                    RightBar={Array.isArray(currentItems) && sortItems?.length > 0
                        ? SortComponent : () => <></>}
                />
            </Stack>


            <Stack gap={2} sx={{ mb: 4, }}>
                {(withAddItem && isAddingItem) && (
                    <>
                        <AccordionCard
                            fullWidth={true}
                            withDarkBackground={true}
                            ContentSummary={() => <Box sx={{ p: 1.5 }}><div style={{ marginBottom: '8px' }}>
                                <CloseButton onClick={() => setIsAddingItem(false)} />
                            </div></Box>}
                            ContentDetails={() => <Box sx={{ p: 1.5 }}><AddContentCard /></Box>}
                        />
                    </>
                )}
                {visibleList?.slice((currentPage - 1) * pageLimit, (currentPage) * pageLimit)?.map((item, index) => {

                    return (
                        <ContentCard key={index} item={item} /* off={offItems.includes(item?.id)} */ />
                    )
                    // return (
                    //     <>
                    //     {/* <Box key={index} sx={{
                    //         borderBottom: '1px solid #f0f0f0',
                    //         paddingTop: '1rem',
                    //         paddingBottom: '1rem',
                    //         boxShadow: '0px 4px 15px -1px #f0f0f0',
                    //     }}> */}
                    //         {/* <JournalsCard item={item} client={client} /> */}
                    //         {<ContentCard key={index} item={item} />}
                    //         {/* <div style={{
                    //             heigth: '4px',
                    //             background: 'red',
                    //             width: '100%',
                    //         }}></div>
                    //     </Box> */}
                    //     </>

                    // )
                })}
            </Stack>

            <Stack alignItems="center"
                // sx={{
                //     position: 'absolute',
                //     bottom: '1.5rem',
                //     left: '50%',
                //     transform: 'translateX(-50%)',
                // }}
            >
                <Pagination
                    variant="outlined"
                    color="primary"
                    count={Math.floor(visibleList.length / pageLimit) + (visibleList.length % pageLimit === 0 ? 0 : 1)}
                    page={currentPage}
                    onChange={handleChangePage}
                    boundaryCount={0}
                    siblingCount={1}
                    showFirstButton
                    showLastButton
                    disabled={visibleList.length > 0 ? false : true}
                    size={matchDownSM ?  "small" : ""}
                />
            </Stack>
        </>
    )
}

export default ListsItems