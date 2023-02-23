import { Grid, Typography } from '@mui/material'
import React, {useState} from 'react'
import { useStyles } from "./styles";
import LoginStore from "../../utils/stores/LoginStore";
import CreationStore from '../../utils/stores/CreationStore';
import useSubject from '../../utils/hooks/useSubject';



export default function EntityCreate() {
    LoginStore.next(true)
    const [userName, setUsername] = useState("")
    const [employee, setEmployee] = useState(true)
    const [edit, setEdit] = useState(true)

    const classes = useStyles()

  return (
    <>
        <Grid>
            <Typography className={classes.screen} variant='h4' color="white" >Create / Edit {employee? "Employee": "Department"} </Typography>
            <Grid container style={{margin:"1.5rem 0"}}>
                <Grid item md={2} className="me-2">
                    <Typography variant='h5'>*Name</Typography>
                </Grid>
                <Grid item md={8}>
                    <input value={userName} className= {classes.userName} onChange={(e)=> setUsername(e.target.value)}/>
                </Grid>
            </Grid>
            {employee && 
                <>
                    <Grid container style={{margin:"1.5rem 0"}}>
                        <Grid item md={2} className="me-2">
                            <Typography variant='h5'>*Surname</Typography>
                        </Grid>
                        <Grid item md={8}>
                            <input value={userName} className= {classes.userName} onChange={(e)=> setUsername(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid container style={{margin:"1.5rem 0"}}>
                        <Grid item md={2} className="me-2" >
                            <Typography variant='h5'>*Telephone Number</Typography>
                        </Grid>
                        <Grid item md={8}>
                            <input value={userName} className= {classes.userName} onChange={(e)=> setUsername(e.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid container style={{margin:"1.5rem 0"}}>
                        <Grid item md={2} className="me-2">
                            <Typography variant='h5'>*Email Address</Typography>
                        </Grid>
                        <Grid item md={8}>
                            <input value={userName} className= {classes.userName} onChange={(e)=> setUsername(e.target.value)}/>
                        </Grid>
                    </Grid>
                </>
            } 
            <Grid container style={{margin:"1.5rem 0"}}>
                <Grid item md={2} className="me-2">
                    <Typography variant='h5'>*Manager</Typography>
                </Grid>
                <Grid item md={8}>
                    <select className="form-select" aria-label="Default select example">
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </Grid>
            </Grid> 
            {edit &&
                <Grid container style={{margin:"1.5rem 0"}}>
                    <Grid item md={2} className="me-2">
                        <Typography variant='h5'>*Status</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <select className="form-select" aria-label="Default select example">
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </Grid>
                </Grid> 
            }
        </Grid>
    </>
  )
}
