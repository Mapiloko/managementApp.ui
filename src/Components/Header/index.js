import React from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { 
    Typography, 
    AppBar, 
    Toolbar, 
    IconButton 
} from '@mui/material';

export default function Header() {
  return (
    <div>
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <DehazeIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    HR Administration System
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
  )
}
