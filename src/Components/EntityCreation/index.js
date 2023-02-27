import { Grid, Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useStyles } from "./styles";
import CreationStore from '../../utils/stores/CreationStore';
import useSubject from '../../utils/hooks/useSubject';
import { useParams, useNavigate, useNavigation } from 'react-router-dom';
import Header from '../Header';
import CustomButton from '../CustomButton';
import { getFromStore } from '../../utils/hooks/storage';
import { dataLoader } from '../EmployeeList';
import { createEmployee$, editEmployee$, editEmployeeDepartment$, editEmployeeRole$ } from '../../api/employees';
import { createDepartment$, editDepartment$ } from '../../api/departments.js';
import Loader from '../Loader';


export default function EntityCreate() {
    let data = getFromStore("allData")
    const navigate = useNavigate()
    const navigation = useNavigation()   
    const route = useSubject(CreationStore)
    const { category, subCat, id } = useParams();
    const [name, setName] = useState()
    const [surname, setSurname] = useState("")
    const [telephone, setTelephone] = useState("")
    const [edit, setEdit] = useState(false)
    const [email, setEmail] = useState("")
    const [manager, setManager] = useState([{departmentId: "0"}])
    const [managerId, setManagerId] = useState(0)
    const [status, setStatus] = useState("Active")
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");
    const [loading, setLoading] = useState(false)



    const classes = useStyles()

    const startConfigs = () =>{
        if(subCat === "edit")
        {
            let dpmnt;
            if(category === "employee")
            {
                dpmnt = data.employees.filter((emp)=>{
                    return emp.id === parseInt(id)
                })[0].departmentId
               
            }
            else{
                dpmnt = data.departments.filter((dpmt)=>{
                    return dpmt.id === parseInt(id)
                })[0].id
            }

            const mngr = data.employees.filter((emp)=>{
                return emp.departmentId === dpmnt && 
                emp.isManager
            })
            setManager(mngr)
            setManagerId(mngr[0].id)
        }
        else{
            let mngr
            if(category === "department")
            {
                mngr = data.employees.filter((emp)=>{
                    return !emp.isManager
                })[0]
            }
            else
            mngr = data.employees.filter((emp)=>{
                return emp.isManager
                })[0]

            setManager([mngr])
            setManagerId(mngr.id)
        }
    } 

    useEffect(()=>{
        startConfigs();
    },[])

    useEffect(()=>{
        if(id && data && !edit)
        {
            if(subCat == "edit")
            {
                if(category === "employee")
                {
                    let currentEmp = data.employees.filter((emp)=>{
                        return `${emp.id}` === id
                    })[0]
                    setName(currentEmp.firstName)
                    setSurname(currentEmp.lastName)
                    setTelephone(currentEmp.telephone)
                    setEmail(currentEmp.email) 
                }
                else
                {
                    let currentDpt = data.departments.filter((dpt)=>{
                        return `${dpt.id}` === id
                    })[0]
                    setName(currentDpt.name)
                }
            }
            setEdit(true)
        }
    },[id, data])

    const createNavigate = (e)=>{
        if(e === "createE")
            navigate("/employee/create")
        else
            navigate("/department/create")
        }
    const handleSave = ()=>{
        setLoading(true) 
        let body={}
        
        let currentManager = data.employees.filter((emp)=>{
            return emp.id === managerId
        })[0]

        let department = data.departments.filter((dpt)=>{
            return dpt.id === currentManager.departmentId 
        })[0]
        
        if(subCat === "create")
        {
            if(category === "employee" )
            {
                body = {
                    FirstName: name,
                    LastName: surname,
                    Telephone: telephone,
                    DepartmentId: department.id,
                    IsManager: false,
                    Email: email
                }

                createEmployee$(body).then(async (res)=>{
                    console.log("employee created")
                    setMessage(`Employee "${name} ${surname}" Created`)
                    setName("")
                    setSurname("")
                    setTelephone("")
                    setEmail("")
                    data = await dataLoader() 
                    setLoading(false)
                    setOpen(true) 
                }).catch(er=>{ 
                    setLoading(false)
                    console.log("Got some Error")
                })
            }
            else if(category === "department")
            {
                body = {
                    Name: name,
                    ManagerId: managerId,
                }
                createDepartment$(body).then(async(res)=>{
                    console.log("departement created")
                    setMessage(`Departement "${name}" Created`)
                    setName("")
                    const response = await res.json()

                    const res1 = await editEmployeeDepartment$({DepartmentId: response.id}, currentManager.id)
                    const res2 = await editEmployeeRole$({IsManager: true}, currentManager.id)

                    data = await dataLoader()
                    setLoading(false)
                    setOpen(true) 
                }).catch(er=>{ 
                    setLoading(false)
                    console.log("Got some Error")
                })
            }
        }
        else if(subCat === "edit")
        {
            if(category === "employee" )
            {
                body = {
                    FirstName: name,
                    LastName: surname,
                    Telephone: telephone,
                    DepartmentId: department.id,
                    IsManager: false,
                    Email: email,
                    Status: status
                }
                editEmployee$(body, id).then(async (res)=>{
                    setMessage(`Employee "${name} ${surname}" Edited Successfully`)
                    setName("")
                    setSurname("")
                    setTelephone("")
                    setEmail("")
                    setLoading(false)
                    setOpen(true)
                    if(manager[0].id !== currentManager.id)
                    {
                        const res = await editEmployeeRole$({IsManager: false}, manager[0].id)
                        const res2 = await editEmployeeRole$({IsManager: true}, currentManager.id)
                        const res3 = await editDepartment$({Name: department.name, ManagerId: currentManager.id,
                            Status: department.status}, department.id)
                    }
                    data = await dataLoader()
                    startConfigs()
                    }).catch(er=>{ 
                    setLoading(false)
                    console.log("Got some Error")
                })
            }
            else if(category === "department")
            {
                body = {
                    Name: name,
                    ManagerId: managerId,
                    Status: status
                }
                console.log("manager", manager[0].id, currentManager.id)
                editDepartment$(body, id).then(async(res)=>{
                    setMessage(`Departement "${name}" Edited Successfully`)
                    setName("")
                    setLoading(false)
                    setOpen(true)
                    if(manager[0].id !== currentManager.id)
                    {
                        const res = await editEmployeeRole$({IsManager: false}, manager[0].id)
                        const res2 = await editEmployeeRole$({IsManager: true}, currentManager.id)
                        const res3 = await editDepartment$({Name: department.name, ManagerId: currentManager.id,
                            Status: department.status}, department.id)
                    } 
                    data = await dataLoader()
                    startConfigs()
                    }).catch(er=>{ 
                        setLoading(false)
                    console.log("Got some Error")
                })
            }
        }
    }
    const handleCancel = ()=>{
        if(route)
            navigate(`/${route}`)
        else
            navigate("/employees-list")
    }

  return (
    <>
        <Header/>
        {loading &&
            <Loader/>
        }
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {dialogMessage}
            </DialogTitle>
            <DialogActions>
                <Button onClick={()=> setOpen(false)} autoFocus>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
            <Grid item  xs={3}>
                <Grid className={`${classes.divBorderStart} justify-content-center`}>
                    <Typography align='center'  color="white" >Menu</Typography>
                    
                    <Grid className={classes.menuBtns} >
                        <Button fullWidth className='mb-3' variant="contained" onClick={()=> navigate("/employees-list") }>Go to Employees</Button>
                        <Button fullWidth className='mb-3' variant="contained"  onClick={()=> navigate("/department-list") }>Go to Departments</Button>
                        <Button fullWidth className='mb-3' variant="contained" disabled={ category === "employee" && subCat === "create"} onClick={()=> createNavigate("createE") } >Create Employee</Button>
                        <Button fullWidth className='mb-3'variant="contained" disabled={ category === "department" && subCat === "create"} onClick={()=> createNavigate("createD") } >Create Department</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item  xs={8}>
                <Typography className={classes.screen} variant='h4' color="white" >{subCat === "create"? "Create": "Edit"} {category === "employee"? "Employee": "Department"} </Typography>
                <Grid container style={{margin:"1.5rem 0"}}>
                    <Grid item md={3} className="me-5">
                        <Typography variant='h5'>*Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <input defaultValue={name} width="100%" className= {classes.userName} onChange={(e)=>setName(e.target.value)}/>
                    </Grid>
                </Grid>
                {category === "employee" && 
                    <>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5">
                                <Typography variant='h5'>*Surname</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={surname} className= {classes.userName} onChange={(e)=> setSurname(e.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5" >
                                <Typography variant='h5'>*Telephone Number</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={telephone} className= {classes.userName} onChange={(e)=> setTelephone(e.target.value)}/>
                            </Grid>
                        </Grid>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5">
                                <Typography variant='h5'>*Email Address</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={email} className= {classes.userName} onChange={(e)=> setEmail(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </>
                } 
                <Grid container style={{margin:"1.5rem 0"}}>
                    <Grid item md={3} className="me-5">
                        <Typography variant='h5'>*Manager</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <select onChange={(e)=>setManagerId(parseInt(e.target.value))} className="form-select" aria-label="Default select example">
                        {subCat === "edit" && manager.length !== 0 && 
                            <option key={manager[0].id} value={manager[0].id}>{`${manager[0].firstName} ${manager[0].lastName} (Current manager)`}</option>
                        }
                        {
                            data.employees.filter((dta)=>{
                                return ( subCat === "edit"? (!dta.isManager && dta.departmentId === manager[0].departmentId) :
                                 (subCat === "create" && category === "department"? !dta.isManager :
                                 dta.isManager))
                            }).map((mpd)=>{
                                return (
                                    <option key={mpd.id} value={mpd.id}>{`${mpd.firstName} ${mpd.lastName}`}</option>
                                )
                            })
                        }
                        </select>
                    </Grid>
                </Grid> 
                {subCat === "edit" &&
                    <Grid container style={{margin:"1.5rem 0"}}>
                        <Grid item md={3} className="me-5">
                            <Typography variant='h5'>*Status</Typography>
                        </Grid>
                        <Grid item md={8}>
                            <select onChange={(e)=>setStatus(e.target.value)} className="form-select" aria-label="Default select example">
                                <option value="Active">Active</option>
                                <option value="Inactive">Deactive</option>
                            </select>
                        </Grid>
                    </Grid> 
                }
            </Grid>
        </Grid>
        <Grid container>
            <Grid item md={9}>
            </Grid>
            <Grid item md={1}>
                <CustomButton handleClick={ handleSave } title="Save"/>
            </Grid>
            <Grid item md={1}>
                <CustomButton handleClick={ handleCancel } title="Cancel"/>
            </Grid>
        </Grid>
    </>
  )
}
