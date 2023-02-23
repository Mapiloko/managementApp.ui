import { Grid, Typography, Button } from '@mui/material'
import React, {useState} from 'react'
import CustomButton from '../CustomButton';
import { useStyles } from "./styles";
import { useLoaderData, useNavigation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../Header';
import CreationStore from '../../utils/stores/CreationStore';
// import LoginStore from "../../utils/stores/LoginStore";

// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function EmployeeList() {
    // LoginStore.next(true)
    const dog = useLoaderData()
    const navigation = useNavigation()
    const navigate = useNavigate()
    const classes = useStyles()
    const [seachTxt, setSearch] = useState("")
    const [age, setAge] = useState()

    const data = [
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", firstName: "firstname1", lastName: "lastname1", telephone:"1112223333",email:"email@gamil.com", manager:"manager1", status:"Active"},
    ]

    const handleClick = () => {

    }

    const createNavigate = (e) =>{
        CreationStore.next(e)
        if(e == "createE")
            navigate("/employee/create")
        else
            navigate("/department/create")
    }
    return (
        <> 
            <Header/>
            <Grid container spacing={2}>
                <Grid item  xs={12}>
                    <Typography className={classes.screen} variant='h4' color="white" >Employees</Typography> 
                </Grid>
                <Grid item  xs={3}>
                    <Grid className={`${classes.divBorderStart} justify-content-center`}>
                        <Typography align='center'  color="white" >Menu</Typography>
                        
                        <Grid className={classes.menuBtns} >
                            {/* <Button fullWidth className='mb-2' variant="contained" disabled >Go to Employees</Button> */}
                            <Button fullWidth className='mb-2' variant="contained"  onClick={()=> navigate("/department-list") }>Go to Departments</Button>
                            <Button fullWidth className='mb-2' variant="contained" onClick={()=> createNavigate("createE") } >Create Employee</Button>
                            <Button fullWidth className='mb-2'variant="contained" onClick={()=> createNavigate("createD") } >Create Department</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item  xs={9}>
                    <Grid className={classes.divBorder} >
                       <p className={`${classes.OverlapText} text-center defaultB`}>Filters</p>
                       <Grid>
                            <Grid container className='p'>
                                <Grid item xs={5}>
                                    <p >Status</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="1">Active Only</option>
                                        <option value="2">All</option>
                                        <option value="3">Deactive only</option>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container className='py-2'>
                                <Grid item xs={5}>
                                    <p >Department</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5}>
                                    <p >Manager</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select className="form-select" aria-label="Default select example">
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid item  xs={12}>
                                <CustomButton filter={true} handleClick={ handleClick } title="Filter">
                                </CustomButton> 
                            </Grid>
                       </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container style={{marginTop:"0.5rem"}}>
                    <Grid style={{margin: "auto 0"}} item xs={8}>
                        <Grid container style={{margin: "auto 0", marginBottom: "0.5rem"}}>
                            <Grid style={{margin: "auto 0"}} item xs={2}>
                                <p style={{margin: "0"}} >Show per page</p> 
                            </Grid> 
                            <Grid style={{margin: "auto 0"}} item xs={4}>
                                <select className="form-select" aria-label="Default select example">
                                    <option value="1">10</option>
                                    <option value="2">20</option>
                                    <option value="3">50</option>
                                    <option value="3">100</option>
                                    <option value="3">All</option>
                                </select>                      
                            </Grid> 
                        </Grid>
                    </Grid>
                    <Grid item md={4}  xs={12}>
                        <input value={seachTxt} className= {classes.search} type="text" onChange={(e)=> setSearch(e.target.value)}/>
                        {/* <Grid container style={{backgroundColor:"white"}}>
                            <Grid item xs={1} style={{position:"relative", margin: "auto 0"}}>
                                <SearchIcon  className= {classes.SearchIcon}/>
                            </Grid> 
                            <Grid item xs={11}>
						        <input value={seachTxt} className= {classes.search} type="text" onChange={(e)=> setSearch(e.target.value)}/>
                            </Grid> 
                        </Grid> */}
                    </Grid>
            </Grid>
            <div className={classes.contentHeader}>
                <div className="row" style={{marginRight:"0.3rem"}}>
                    <div className='col-sm-12 h5 col-md-2 ps-3' >
                        Actions
                    </div>
                    <div className='col-sm-12 h5 col-md-2' >
                        First Name
                    </div>
                    <div className='col-sm-12 h5 col-md-2' >
                        Last Name
                    </div>
                    <div className='col-sm-12 h5 col-md-1' >
                        Telephone
                    </div>
                    <div className='col-sm-12 h5 col-md-2' >
                        Email Adress
                    </div>
                    <div className='col-sm-12 h5 col-md-2' >
                        Manager
                    </div>
                    <div className='col-sm-12 h5 col-md-1' >
                        Status
                    </div>
                </div>

                <div id="employees" className={classes.content}>
                    {
                        data.map((dt, index)=>{
                            return (
                            <div key={index} className="row" >
                                <div className='col-md-2' >
                                    <p className="ps-2">{dt.Actions}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.firstName}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p>{dt.lastName}</p> 
                                </div>
                                <div className='col-md-1' >
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
                            </div> 
                            )
                        })
                    }
                </div>
            </div>
            <Grid container style={{marginTop:"0.5rem"}}>
                <Grid item xs={12}>
                    <p> 1 2 3 4 5 6 </p> 
                </Grid>
            </Grid>
        </>
    )
}

export const dataLoader = async ()=>{
    const res = await fetch('https://random.dog/woof.json')
    const dog = await res.json()

    return dog
}