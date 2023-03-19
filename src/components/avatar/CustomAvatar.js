import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

// material ui
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

// utils
import { getRandomColor, stringToColor } from 'utils/color';


// styled
import { useMediaQuery } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';


function stringAvatar(name, avSx, withChildren, withAvatarIcon, AvatarIcon) {
  // const parts = name.split(' ')
  // console.log(parts);
  const nameVal = name.split(' ')[0]
  const nameValSecond = name.split(' ')[1]
  let children = null
  if (withChildren) {
    if (nameVal?.length && nameValSecond?.length) {
      children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    } else {
      children = nameVal?.length ? `${name.split(' ')[0][0]}` : null
    }
  } else {
    children = withAvatarIcon ? AvatarIcon : " "
  }

  // console.log(children);
  const bgcolor = children !== "" ? getRandomColor(name, false, 0.9)/* stringToColor(name) */ : "#1890ff"
  return {
    sx: {
      bgcolor: bgcolor, // stringToColor(name),
      ...avSx,
    },
    children: children, // `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export const BackgroundLetterAvatars = ({
  withChildren = true,
  withAvatarIcon = true,
  AvatarIcon = null,
  name = "", 
  avSx = { width: 24, height: 24, fontSize: '.8rem' }, 
  ...other 
}) => {
  // theme
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  
  const avSxResponsive = matchDownSM ? {
    width: 24, height: 24, fontSize: '.6rem'
  } : {
    ...avSx
  }

  return (
    <Stack direction="row"/*  spacing={2} */>
      <Avatar {...stringAvatar(name, avSxResponsive, withChildren, withAvatarIcon, AvatarIcon)} /* sx={{ ...avSx, fontSize: '.8rem' }} */ />
    </Stack>
  );
}

export const CustomAvatar = ({
  withChildren = true,
  withAvatarIcon = true,
  srcAvatar = null,
  AvatarIcon = null,
  text = null,
  avSx = {},
  ...other
}) => {
  // theme
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  
  const avSxResponsive = matchDownSM ? {
    width: 24, height: 24, fontSize: '.8rem'
  } : {
    ...avSx
  }

  const [currentText, setCurrentText] = useState(text)
  useEffect(() => {
    if (text !== currentText) {
      setCurrentText(text)
    }
  }, [text])

  const [currentAvatar, setCurrentAvatar] = useState(srcAvatar)
  useEffect(() => {
    if (srcAvatar !== currentAvatar) {
      setCurrentAvatar(srcAvatar)
    }
  }, [srcAvatar])
  return (
    <Stack direction="row" spacing={2}>
      {(currentText || AvatarIcon) !== null
        ? <Avatar {...stringAvatar(currentText, avSxResponsive, withChildren, withAvatarIcon, AvatarIcon)} />
        : (currentAvatar !== null ? <Avatar alt="avatar" src={currentAvatar} sx={{ ...avSxResponsive }} /> : "")
      }
    </Stack>
  );
} 