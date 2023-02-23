import { Grid, Typography } from '@mui/material'
import React, {useState} from 'react'
import CustomButton from '../CustomButton';
import { useStyles } from "./styles";
import SearchIcon from '@mui/icons-material/Search';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function EmployeeList() {
    const classes = useStyles()
    const [seachTxt, setSearch] = useState("")
    const [age, setAge] = useState()

    const data = [
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
        {Actions: "Edit Activate", name: "name1", manager:"manager1", status:"Active"},
    ]

    const handleClick = () => {

    }

    const handleChange = () =>{

    }
    return (
        <>
            <Grid container>
                <Typography className={classes.screen} variant='h4' color="white" >Departments</Typography> 
                <Grid item  xs={12}>
                    <div className={classes.divBorder} >
                       <p className={`${classes.OverlapText} text-center defaultB`}>Filters</p>
                       <Grid>
                            <Grid container className='mt-4'>
                                <Grid item xs={5}>
                                    <p >Status</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select class="form-select" aria-label="Default select example">
                                        <option value="1">Active Only</option>
                                        <option value="2">All</option>
                                        <option value="3">Deactive only</option>
                                    </select>
                                </Grid>
                                <Grid item  xs={12}>
                                    <CustomButton filter={true} handleClick={ handleClick } title="Filter">
                                    </CustomButton> 
                                </Grid>
                            </Grid>
                       </Grid>
                    </div>
                </Grid>

                <Grid container style={{marginTop:"0.5rem"}}>
                    <Grid style={{margin: "auto 0"}} item xs={8}>
                        <Grid container style={{margin: "auto 0", marginBottom: "0.5rem"}}>
                            <Grid style={{margin: "auto 0"}} item xs={2}>
                                <p style={{margin: "0"}} >Show per page</p> 
                            </Grid> 
                            <Grid style={{margin: "auto 0"}} item xs={4}>
                                <select class="form-select" aria-label="Default select example">
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
            </Grid>
            <div className={classes.contentHeader}>
                <div className="row" style={{marginRight:"0.3rem"}}>
                    <div className='col-3 h5 ps-3' >
                        Actions
                    </div>
                    <div className='col-3 h5' >
                        Name
                    </div>
                    <div className='col-3 h5' >
                        Manager
                    </div>
                    <div className='col-3 h5' >
                        Status
                    </div>
                </div>

                <div id="employees" className={classes.content}>
                    {
                        data.map((dt, index)=>{
                            return (
                            <div key={index} className="row" >
                                <div className='col-3' >
                                    <p className="ps-2">{dt.Actions}</p> 
                                </div>
                                <div className='col-3' >
                                    <p>{dt.name}</p> 
                                </div>
                                <div className='col-3' >
                                    <p>{dt.manager}</p> 
                                </div>
                                <div className='col-3' >
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
