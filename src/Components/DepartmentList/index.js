import { Grid, Typography, Button, Link, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import CustomButton from '../CustomButton';
import { useStyles } from "./styles";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import LoginStore from "../../utils/stores/EditStore";
import Header from '../Header';
import CreationStore from '../../utils/stores/CreationStore';
import { getFromStore } from '../../utils/hooks/storage';
import { editDepartmentStatus$ } from '../../api/departments';
import { dataLoader } from '../EmployeeList';
import Loader from '../Loader';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function EmployeeList() {

    const classes = useStyles()
    const navigate = useNavigate()
    const [searchTxt, setSearch] = useState("")
    let data = getFromStore("allData")

    const [status, setStatus] = useState("0")
    const [originalDta] = useState(data?.departments)
    const [displayData, setDisplayData] = useState(data?.departments)
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");
    const [loading, setLoading] = useState(false)


    const handleClose = ()=>{
        setOpen(false)
        data = getFromStore("allData")
        setDisplayData(data?.departments)
        handleClick(data?.departments)
    }

    const handleClick = (data_= []) => {
        let data;
        if(data_.length)
            data = data_.filter((odta)=>{
                return (
                    odta.status=== (status==="0"? odta.status: status)
                )
            })
        else
            data = originalDta.filter((odta)=>{
                return (
                    odta.status=== (status==="0"? odta.status: status)
                )
            })
        setDisplayData(data)
    }

    useEffect(()=>{
        let data = originalDta.filter((odta)=>{
            return (
                odta.status.toLowerCase().includes(searchTxt) || 
                odta.name.toLowerCase().includes(searchTxt) || 
                odta.manager.toLowerCase().includes(searchTxt)
            )
        })

        setDisplayData(data)
    },[searchTxt])

    const createNavigate = (e) =>{
        CreationStore.next("department-list")
        if(e === "createE")
            navigate("/employee/create")
        else
            navigate("/department/create")
    }

    const editHandler = (id) =>{
        CreationStore.next("department-list")
        navigate(`/department/edit/${id}`)
    }

    const actionHandler = (id)=>{
        setLoading(true)
        let status;
        let department = data.departments.filter((dpt)=>{
            return dpt.id === id
        })[0]
        if(department.status === "Active")
            status = "Inactive"
        else
            status = "Active"

        editDepartmentStatus$({Status: status}, id).then(async (res)=>{
            setMessage(`Status ${status === "Active"? "Activated": "Deactivated"}`)
            data = await dataLoader()
            setLoading(false)
            setOpen(true)
        }).catch(err=> console.log("Error updating status", err))

    }

    return (
        <>
            <Header/>
            {loading &&
                <Loader/>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                {dialogMessage}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2}>
                <Grid item  xs={12}>
                    <Typography className={classes.screen} variant='h4' color="white" >Departments</Typography> 
                </Grid>
                <Grid item  xs={3}>
                    <Grid className={`${classes.divBorderStart} justify-content-center`}>
                        <Typography align='center'  color="white" >Menu</Typography>
                        
                        <Grid className={classes.menuBtns} >
                            <Button fullWidth className='mb-2' variant="contained" onClick={()=> navigate("/employees-list") } >Go to Employees</Button>
                             <Button fullWidth className='mb-2' variant="contained" onClick={()=> createNavigate("createE") } >Create Employee</Button>
                            <Button fullWidth className='mb-2'variant="contained" onClick={()=> createNavigate("createD") } >Create Department</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item  xs={9}>
                    <div className={classes.divBorder} >
                       <p className={`${classes.OverlapText} text-center defaultB`}>Filters</p>
                       <Grid>
                            <Grid container className='mt-4'>
                                <Grid item xs={5}>
                                    <p >Status</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select onChange={ (e)=> setStatus(e.target.value) } className="form-select" aria-label="Default select example">
                                        <option value="0">All</option>
                                        <option value="Active">Active Only</option>
                                        <option value="Inactive">Deactive only</option>
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
                    <input value={searchTxt} className= {classes.search} type="text" onChange={(e)=> setSearch(e.target.value.toLowerCase())}/>
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
                        displayData.map((dt, index)=>{
                            return (
                            <div key={index} className="row" >
                                <div className='col-3' >
                                    <>
                                        <Link onClick={()=>editHandler(dt.id)} className="ps-2" role="button" >Edit </Link> 
                                        <Link onClick={()=>actionHandler(dt.id)} role="button">{dt.status === "Active"? "Deactivate": "Activate"}</Link>
                                    </>  
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
