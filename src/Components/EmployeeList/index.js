import { Grid, Typography } from '@mui/material'
import React from 'react'
import CustomButton from '../CustomButton';
import { useStyles } from "./styles";


export default function EmployeeList() {
    const classes = useStyles()
    const data = [
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
    ]

    const handleClick = () => {

    }

    return (
        <>
            <Grid container>
                <Typography variant='h4' color="white" style={{marginTop:"0.5rem", marginBottom:"1rem"}} >Employees</Typography> 
                <Grid item  xs={12}>
                    <div className={classes.divBorder} >
                       <p className={`${classes.OverlapText} text-center defaultB`}>Filters</p>
                       <Grid container>
                            <Grid item xs={5}>
                                <p >Status</p> 
                            </Grid>
                            <Grid item  xs={7}>
                                <Typography align="left" variant='h5' color="white" >Active Only / (All) / Deactive Only</Typography> 
                            </Grid>
                            <Grid item xs={5}>
                                <p >Department</p> 
                            </Grid>
                            <Grid item  xs={7}>
                                <Typography align="left" variant='h5' color="white" >--Select--</Typography> 
                            </Grid>
                            <Grid item xs={5}>
                                <p >Manager</p> 
                            </Grid>
                            <Grid item  xs={7}>
                                <Typography align="left" variant='h5' color="white" >--Select-- </Typography> 
                            </Grid>
                            <Grid item  xs={12}>
                                <CustomButton filter={true} handleClick={ handleClick } title="Filter">
                                </CustomButton> 
                            </Grid>
                       </Grid>
                    </div>
                </Grid>

                <Grid container style={{marginTop:"0.5rem"}}>
                    <Grid item md={8} xs={12}>
                        <p>Show per page</p> 
                    </Grid>
                    <Grid item md={4}  xs={12}>
                        <p>Search</p> 
                    </Grid>
                </Grid>
                <Grid container style={{height:"15rem", border: "3.5px solid black", paddingLeft:"1rem"}} >
                    <Grid container style={{marginRight:"1rem"}}>
                        <Grid item xs={12} md={1}>
                            <p>Actions</p> 
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <p>First Name</p> 
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <p>Last Name</p> 
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <p>Telephone Number</p> 
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <p>Email Adress</p> 
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <p>Manager</p> 
                        </Grid>
                        <Grid item xs={1}>
                            <p>Status</p> 
                        </Grid>
                    </Grid>
                    <Grid container style={{height:"75%", overflowY:"scroll", padding:"0", margin: "0"}}>
                    {
                        data.map((dt)=>{

                            return (
                            <>
                                <Grid item md={1}  xs={12}>
                                    <p>{dt.Actions}</p> 
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <p>{dt.firstName}</p> 
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <p>{dt.lastName}</p> 
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <p>{dt.telephone}</p> 
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <p>{dt.email}</p> 
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <p>{dt.manager}</p> 
                                </Grid>
                                <Grid item md={1} xs={12}>
                                    <p>{dt.status}</p> 
                                </Grid>
                            </> 
                            )
                        })
                    }
                    </Grid>
                </Grid>
            </Grid>
            {/* <div className='row' style={{height:"15rem", border: "3.5px solid black", xpaddingLeft:"1rem"}}>
                <div className='col-sm-12 col-md-1' >
                    Actions
                </div>
                <div className='col-sm-12 col-md-2' >
                    First Name
                </div>
                <div className='col-sm-12 col-md-2' >
                    Last Name
                </div>
                <div className='col-sm-12 col-md-2' >
                    Telephone Number
                </div>
                <div className='col-sm-12 col-md-2' >
                    Email Adress
                </div>
                <div className='col-sm-12 col-md-2' >
                    Manager
                </div>
                <div className='col-sm-12 col-md-1' >
                    Status
                </div>

                <div className='row' style={{height:"75%", overflowY:"auto", padding:"0", margin: "0"}}>
                    {
                        data.map((dt)=>{
                            return (
                            <>
                                <div className='col-md-1' >
                                    <p>{dt.Actions}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.firstName}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.lastName}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.telephone}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.email}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.manager}</p> 
                                </div>
                                <div className='col-md-1' >
                                    <p>{dt.status}</p> 
                                </div>
                            </> 
                            )
                        })
                    }
                </div>
            </div> */}
        </>
    )
}
