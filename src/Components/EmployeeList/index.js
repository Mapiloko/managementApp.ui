import { Grid, Typography, Button, Link, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import CustomButton from '../CustomButton';
import { useStyles } from "./styles";
import { editEmployeeStatus$, getDepartmentsData$, getEmployeesData$ } from '../../api/axios';
import { 
    useLoaderData, useNavigation, 
    useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
import Header from '../Header';
import CreationStore from '../../utils/stores/CreationStore';
import { getFromStore, setToStore } from '../../utils/hooks/storage';
import EditStore from '../../utils/stores/EditStore';


export default function EmployeeList() {
    let data = useLoaderData()
    const navigation = useNavigation()

    const navigate = useNavigate()
    const classes = useStyles()
    const [searchTxt, setSearch] = useState("")
    const [status, setStatus] = useState("0")
    const [department, setDepartment] = useState("0")
    const [manager, setManager] = useState("0")
    const [originalDta, setOriginalData] = useState(data?.employees)
    const [displayData, setDisplayData] = useState(data?.employees)
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");


    const handleClose = ()=>{
        setOpen(false)
        data = getFromStore("allData")
        setOriginalData(data?.employees)
        handleClick(data?.employees)
    }

    useEffect(()=>{
        let data = originalDta.filter((odta)=>{
            return (
                odta.status.toLowerCase().includes(searchTxt) || 
                odta.firstName.toLowerCase().includes(searchTxt) || 
                odta.lastName.toLowerCase().includes(searchTxt) || 
                odta.manager.toLowerCase().includes(searchTxt) || 
                odta.telephone.toLowerCase().includes(searchTxt) || 
                odta.email.toLowerCase().includes(searchTxt)
            )
        })

        setDisplayData(data)
    },[searchTxt])

    const handleClick = ( data_ = []) => {
        let data;
        if(data_.length)
            data = data_.filter((odta)=>{
                return (
                    odta.status=== (status==="0"? odta.status: status) && 
                odta.manager === (manager === "0"? odta.manager: manager ) && 
                odta.manager === (department === "0"? odta.manager: department )
                )
            })
        else
            data = originalDta.filter((odta)=>{
                return (
                    odta.status=== (status==="0"? odta.status: status) && 
                odta.manager === (manager === "0"? odta.manager: manager ) && 
                odta.manager === (department === "0"? odta.manager: department )
                )
            })

        setDisplayData(data)
    }

    const createNavigate = (e) =>{
        CreationStore.next("employees-list")
        if(e === "createE")
            navigate("/employee/create")
        else
            navigate("/department/create")
    }

    const editHandler = (id) =>{
        CreationStore.next("employees-list")
        navigate(`/employee/edit/${id}`)
    }

    const actionHandler = (id)=>{
        let status;
        let employee = data.employees.filter((emp)=>{
            return emp.id === id
        })[0]
        if(employee.status === "Active")
            status = "Inactive"
        else
            status = "Active"
    
        editEmployeeStatus$({Status: status}, id).then(async (res)=>{
            setMessage(`Status ${status === "Active"? "Activated": "Deactivated"}`)
            data = await dataLoader()
            setOpen(true)
        }).catch(err=> console.log("Error updating status", err))
    

    }

    return (
        <> 
            <Header/>
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
                    <Typography className={classes.screen} variant='h4' color="white" >Employees</Typography> 
                </Grid>
                <Grid item  xs={3}>
                    <Grid className={`${classes.divBorderStart} justify-content-center`}>
                        <Typography align='center'  color="white" >Menu</Typography>
                        
                        <Grid className={classes.menuBtns} >
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
                                    <select onChange={ (e)=> setStatus(e.target.value) } className="form-select" aria-label="Default select example">
                                        <option value="0">All</option>
                                        <option value="Active">Active Only</option>
                                        <option value="Inactive">Deactive only</option>
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container className='py-2'>
                                <Grid item xs={5}>
                                    <p >Department</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select onChange={ (e)=> setDepartment(e.target.value) }  className="form-select" aria-label="Default select example">
                                        <option value="0">All</option>
                                        {data.departments.map((dept)=>{
                                            return (    
                                                <option key={dept.id} value={dept.manager}>{dept.name}</option>
                                            )
                                        })}
                                    </select>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5}>
                                    <p >Manager</p> 
                                </Grid>
                                <Grid item  xs={6}>
                                    <select onChange={ (e)=> setManager(e.target.value) } className="form-select" aria-label="Default select example">
                                        <option value="0">All</option>
                                        {
                                            data.employees.filter((dta)=>{
                                                return dta.isManager
                                            }).map((mpd)=>{
                                                return (
                                                    <option key={mpd.id} value={`${mpd.firstName} ${mpd.lastName}`}>{`${mpd.firstName} ${mpd.lastName}`}</option>
                                                )
                                            })
                                        }
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
                        <input value={searchTxt} className= {classes.search} type="text" onChange={(e)=> setSearch(e.target.value.toLowerCase())}/>
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
                        displayData.map((dt, index)=>{
                            return (
                            <div key={index} className="row" >
                                <div className='col-md-2' >
                                    <>
                                        <Link onClick={()=>editHandler(dt.id)} className="ps-2" role="button" >Edit </Link> 
                                        <Link onClick={()=>actionHandler(dt.id)} role="button">{dt.status === "Active"? "Deactivate": "Activate"}</Link>
                                    </> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0' >{dt.firstName}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0 py-2'>{dt.lastName}</p> 
                                </div>
                                <div className='col-md-1' >
                                    <p className='m-0'>{dt.telephone}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0'>{dt.email}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0'>{dt.manager}</p> 
                                </div>
                                <div className='col-md-1' >
                                    <p className='m-0'>{dt.status}</p> 
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
    const res = await getEmployeesData$()
    const employees = await res.json()    
    employees.forEach(rsp => {
        let manager = employees.filter((rp)=>{
            return rp.id === rsp.managerId
        })
        if(manager.length > 0 )
            rsp["manager"] = `${manager[0].firstName} ${manager[0].lastName}`
        else
            rsp["manager"] = `${rsp.firstName} ${rsp.lastName}`
    });

    const dept = await getDepartmentsData$();
    const departments = await dept.json() 

    departments.forEach(dpt => {
        let manager = employees.filter((emp)=>{
            return emp.id === dpt.managerId
        })[0]
        dpt["manager"] = `${manager.firstName} ${manager.lastName}`
    });

    const data = {
        employees: employees,
        departments: departments
    }
    setToStore("allData", data)
    return data;
}