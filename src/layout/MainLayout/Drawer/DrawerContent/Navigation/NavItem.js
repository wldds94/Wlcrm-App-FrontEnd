import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project import
import { activeItem, openDrawer, openSupport } from 'store/reducers/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({ item, level }) => {
    const location = useLocation()

    const theme = useTheme();

    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));

    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu);
    const { drawerOpen, openItem } = menu;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }
    if (item?.isSupport) {
        listItemProps = { component: 'div' };
    }

    const itemHandler = (id) => {
        if(item?.isSupport) {
            dispatch(openSupport(/* { supportOpen: true } */));
        } else {
            dispatch(activeItem({ openItem: [id] }));
        }
        if (matchDownLG) {
            dispatch(openDrawer({ drawerOpen: false }));
        }
        // dispatch(openDrawer({ drawerOpen: false }));


    };

    const Icon = item.icon;
    const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

    const isSelected = openItem.findIndex((id) => id === item.id) > -1;

    // active menu item on page load
    // useEffect(() => {
    //     const currentIndex = document.location.pathname
    //         .toString()
    //         .split('/')
    //         .findIndex((id) => id === item.id);
    //     if (currentIndex > -1) {
    //         dispatch(activeItem({ openItem: [item.id] }));
    //     }
    //     // eslint-disable-next-line
    // }, []);

    // active menu on change location
    useEffect(() => {
        // const regex = /\//;
        // const currentIndex = document.location.pathname
        //     .toString()
        //     .replace(regex, '')
        
        // console.log("item: ", item); 
        // console.log("location: ", location); 
        // console.log("locationPathname: ", location.pathname); // console.log("currentIndex: ", currentIndex);
        if (item.regexURI.test(location.pathname)) {
            // N.B. CHECK THE RegexURI - NOT WORK PROPERLY
            // console.log('Finded'); console.log(item.id);
            dispatch(activeItem({ openItem: [item.id] })); // console.log('Finded');
        }
        // if (location.pathname.match(item.regexURI)) {
        //     console.log('Finded');
        //     console.log(item.id);
        // }
    }, [location]);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            onClick={() => itemHandler(item.id)}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: 'primary.lighter'
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter'
                        }
                    }
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent'
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        bgcolor: 'transparent'
                    }
                })
            }}
        >
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter'
                            }
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                            bgcolor: 'primary.lighter',
                            '&:hover': {
                                bgcolor: 'primary.lighter'
                            }
                        })
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
