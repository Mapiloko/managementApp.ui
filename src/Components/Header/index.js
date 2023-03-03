import React from 'react'
import { useStyles } from "./styles";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Typography} from '@mui/material';
import AuthService from '../../Services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const classes = useStyles()
    const navigate = useNavigate()

    const logOutHangler = ()=>{
        AuthService.logout()
        navigate("/")
    }

  return (
    <>
        <nav className={classes.navWrapper}>
            <div className="container-fluid">
                <div className='d-flex justify-content-between'>
                    <div className={`d-flex ${classes.Leftpanel}`}>
                        <div className={classes.Colapse}>
                            <DehazeIcon/>
                        </div>
                        <div className={classes.Heading}>
                            <Typography variant='h4' align='left' >HR Administration System</Typography>
                        </div>
                    </div>
                    <div className={classes.Btn}>
                        <button onClick={ logOutHangler } className="btn btn-outline-primary float-right" type="submit">Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}
