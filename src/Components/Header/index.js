import React from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { 
    Typography, 
    AppBar, 
    Toolbar, 
    IconButton 
} from '@mui/material';
// import LoginStore from '../../utils/stores/LoginStore';
// import useSubject from '../../utils/hooks/useSubject';

export default function Header() {

// const lockedIn  = useSubject(LoginStore)
// console.log("locked in", lockedIn)
  return (
    <>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <DehazeIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    HR Administration System
                </Typography>
            </Toolbar>
        </AppBar>
    </>
  )
}
