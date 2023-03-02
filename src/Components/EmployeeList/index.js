import { Grid, Typography, Button, Link, Dialog, DialogActions, DialogTitle  } from '@mui/material'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../Helpers/CustomButton';
import { useStyles } from "./styles";
import { 
    useLoaderData, useNavigation, 
    useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
import Header from '../Header';
import CreationStore from '../../utils/stores/CreationStore';
import { getFromStore, setToStore } from '../../utils/hooks/storage';
import { editEmployeeStatus$, getEmployeesData$ } from '../../api/employees';
import { getDepartmentManager$, getDepartmentsData$ } from '../../api/departments';
import Loader from '../Loader';
import Pagination from '../../Helpers/Pagination';


export default function EmployeeList() {
    let data = useLoaderData()
    const navigate = useNavigate()
    const classes = useStyles()
    const [searchTxt, setSearch] = useState("")
    const [Status, setStatus] = useState("0")
    const [department, setDepartment] = useState("0")
    const [Manager, setManager] = useState("0")
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dialogMessage, setMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage, setEmpPerPage] = useState(5);
    
    //Pagenation
    const indextOflastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indextOflastEmployee - employeesPerPage;
    const currentEmployees = data.employees.slice(indexOfFirstEmployee, indextOflastEmployee)

    const [originalDta, setOriginalData] = useState(currentEmployees)
    const [displayData, setDisplayData] = useState(currentEmployees)

    const handleClose = ()=>{
        setOpen(false)
        data = getFromStore("allData")
        setOriginalData(data?.employees)
        handleClick(data?.employees)
    }

    useEffect(()=>{
        setOriginalData(currentEmployees)
        setDisplayData(currentEmployees)
        handleClick(currentEmployees)
    },[employeesPerPage, currentPage])

    const paginate = (number) => setCurrentPage(number)
    
    useEffect(()=>{
        let data = originalDta.filter((odta)=>{
            return (
                odta.Status.toLowerCase().includes(searchTxt) || 
                odta.FirstName.toLowerCase().includes(searchTxt) || 
                odta.LastName.toLowerCase().includes(searchTxt) || 
                odta.Manager.toLowerCase().includes(searchTxt) || 
                odta.Telephone.toLowerCase().includes(searchTxt) || 
                odta.Email.toLowerCase().includes(searchTxt)
            )
        })

        setDisplayData(data)
    },[searchTxt])

    const handleClick = ( data_ = []) => {
        let data;
        if(data_.length)
        data = data_.filter((odta)=>{
            return (
                odta.Status=== (Status==="0"? odta.Status: Status) && 
                odta.Manager === (Manager === "0"? odta.Manager: Manager ) && 
                `${odta.DepartmentId}` === (department === "0"? `${odta.DepartmentId}`: department )
                )
            })
            else
            data = originalDta.filter((odta)=>{
                return (
                    odta.Status=== (Status==="0"? odta.Status: Status) && 
                odta.Manager === (Manager === "0"? odta.Manager: Manager ) && 
                `${odta.DepartmentId}` === (department === "0"? `${odta.DepartmentId}`: department )
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

    const actionHandler = (Id)=>{
        setLoading(true)
        let Status;
        let employee = data.employees.filter((emp)=>{
            return emp.Id === Id
        })[0]
        
        if(employee.Status === "Active")
            Status = "Inactive"
        else
            Status = "Active"
    
        editEmployeeStatus$({Status: Status}, Id).then(async (res)=>{
            setMessage(`Status ${Status === "Active"? "Activated": "Deactivated"}`)
            data = await dataLoader()
            setLoading(false)
            setOpen(true)
        }).catch(err=> {
            setLoading(false)
            console.log("Error updating Status", err)
        })
    

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
                                                <option key={dept.Id} value={dept.Id}>{dept.Name}</option>
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
                                                return dta.Role === "Manager"
                                            }).map((mpd)=>{
                                                return (
                                                    <option key={mpd.Id} value={`${mpd.FirstName} ${mpd.LastName}`}>{`${mpd.FirstName} ${mpd.LastName}`}</option>
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
                                <select onChange={(e)=>{
                                    setCurrentPage(1)
                                    setEmpPerPage(parseInt(e.target.value))
                                    }} 
                                    className="form-select" aria-label="Default select example">
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={data.employees.length}>All</option>
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
                                        <Link onClick={()=>editHandler(dt.Id)} className="ps-2" role="button" >Edit </Link> 
                                        <Link onClick={()=>actionHandler(dt.Id)} role="button">{dt.Status === "Active"? "Deactivate": "Activate"}</Link>
                                    </> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0' >{dt.FirstName}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0 py-2'>{dt.LastName}</p> 
                                </div>
                                <div className='col-md-1' >
                                    <p className='m-0'>{dt.Telephone}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0'>{dt.Email}</p> 
                                </div>
                                <div className='col-md-2' >
                                    <p className='m-0'>{dt.Manager}</p> 
                                </div>
                                <div className='col-md-1' >
                                    <p className='m-0'>{dt.Status}</p> 
                                </div>
                            </div> 
                            )
                        })
                    }
                </div>
            </div>
            { employeesPerPage < data.employees.length &&
                <Grid container style={{marginTop:"0.5rem"}}>
                    <Pagination selected={currentPage} paginate={paginate} entityPerPage={employeesPerPage} totalEntities={data.employees.length} />
                </Grid>
            }
        </>
    )
}

export const dataLoader = async ()=>{
    const res = await getEmployeesData$()
    const dept = await getDepartmentsData$();

    const employees = await res.json()    
    const departments = await dept.json() 

    employees.forEach(emp => {
        let department = departments.filter((dpt)=>{
            return dpt.Id === emp.DepartmentId
        })[0]
        emp["Manager"] = department.Manager
    });

    const data = {
        employees: employees,
        departments: departments
    }
    setToStore("allData", data)
    return data;
}