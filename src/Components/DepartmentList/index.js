import { Grid, Typography, Button, Link, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import CustomButton from '../../Helpers/CustomButton';
import { useStyles } from "./styles";
import { useNavigate } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import LoginStore from "../../utils/stores/EditStore";
import Header from '../Header';
import CreationStore from '../../utils/stores/CreationStore';
import { getFromStore } from '../../utils/hooks/storage';
import { updateDepartmentStatus$ } from '../../api/departments';
import { dataLoader } from '../EmployeeList';
import Loader from '../Loader';
import Pagination from '../../Helpers/Pagination';
import RoleStore from '../../utils/stores/RoleStore';
import useSubject from '../../utils/hooks/useSubject';
import DialogBox from '../../Helpers/DialogBox';
import { Roles } from '../../utils/Configs/Roles';

export default function EmployeeList() {

    const classes = useStyles()
    const navigate = useNavigate()
    const [searchTxt, setSearch] = useState("")
    let data = getFromStore("allData")
    const user = getFromStore("User")

    const [Status, setStatus] = useState("0")
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [departmentsPerPage, setEmpPerPage] = useState(5);

    //Pagenation
    const indextOflastDepartment = currentPage * departmentsPerPage;
    const indexOfFirstDepartment = indextOflastDepartment - departmentsPerPage;
    const currentDepartments = data.departments.slice(indexOfFirstDepartment, indextOflastDepartment)

    const [originalDta, setOriginalData] = useState(currentDepartments)
    const [displayData, setDisplayData] = useState(currentDepartments)

    useEffect(()=>{
        setOriginalData(currentDepartments)
        setDisplayData(currentDepartments)
        handleClick(currentDepartments)
    },[departmentsPerPage, currentPage])

    const paginate = (number) => setCurrentPage(number)
    
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
                    odta.Status=== (Status==="0"? odta.Status: Status)
                )
            })
        else
            data = originalDta.filter((odta)=>{
                return (
                    odta.Status=== (Status==="0"? odta.Status: Status)
                )
            })
        setDisplayData(data)
    }

    useEffect(()=>{
        let data = originalDta.filter((odta)=>{
            return (
                odta.Status.toLowerCase().includes(searchTxt) || 
                odta.Name.toLowerCase().includes(searchTxt) || 
                odta.Manager.toLowerCase().includes(searchTxt)
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
        let Status;
        let department = data.departments.filter((dpt)=>{
            return dpt.Id === id
        })[0]
        if(department.Status === "Active")
            Status = "Inactive"
        else
            Status = "Active"

        updateDepartmentStatus$({Status: Status}, id).then(async (res)=>{
            setMessage(`Status ${Status === "Active"? "Activated": "Deactivated"}`)
            data = await dataLoader()
            setLoading(false)
            setOpen(true)
        }).catch(err=> console.log("Error updating Status", err))

    }

    return (
        <>
            <Header/>
            {loading &&
                <Loader/>
            }
            <DialogBox open={open} handleClose={handleClose} dialogMessage={dialogMessage} />
            <Grid container spacing={2}>
                <Grid item  xs={12}>
                    <Typography className={classes.screen} variant='h4' color="white" >Departments</Typography> 
                </Grid>
                <Grid item  xs={3}>
                    <Grid className={`${classes.divBorderStart} justify-content-center`}>
                        <Typography align='center'  color="white" >Menu</Typography>
                        
                        <Grid className={classes.menuBtns} >
                            <Button fullWidth className='mb-2' variant="contained" onClick={()=> navigate("/employees-list") } >Go to Employees</Button>
                             <Button fullWidth className='mb-2' variant="contained" disabled={ user.Role !== Roles.admin } onClick={()=> createNavigate("createE") } >Create Employee</Button>
                            <Button fullWidth className='mb-2'variant="contained" disabled={ user.Role !== Roles.admin } onClick={()=> createNavigate("createD") } >Create Department</Button>
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
                            <select onChange={(e)=>{
                                setCurrentPage(1)
                                setEmpPerPage(parseInt(e.target.value))
                                }} 
                                className="form-select" aria-label="Default select example">
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={data.departments.length}>All</option>
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
                                {user.Role !== Roles.admin ?
                                    <Typography className='ps-2'>No Action</Typography> :
                                    <>
                                        <Link onClick={()=>editHandler(dt.Id)} className="ps-2" role="button" >Edit </Link> 
                                        <Link onClick={()=>actionHandler(dt.Id)} role="button">{dt.Status === "Active"? "Deactivate": "Activate"}</Link>
                                    </>  
                                    }
                                </div>
                                <div className='col-3' >
                                    <p>{dt.Name}</p> 
                                </div>
                                <div className='col-3' >
                                    <p>{dt.Manager}</p> 
                                </div>
                                <div className='col-3' >
                                    <p>{dt.Status}</p> 
                                </div>
                            </div> 
                            )
                        })
                    }
                </div>
            </div>
            { departmentsPerPage < data.departments.length &&
                <Grid container style={{marginTop:"0.5rem"}}>
                    <Pagination selected={currentPage} paginate={paginate} entityPerPage={departmentsPerPage} totalEntities={data.departments.length} />
                </Grid>
            }
        </>
    )
}
