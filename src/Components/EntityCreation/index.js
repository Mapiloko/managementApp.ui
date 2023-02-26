import { Grid, Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useStyles } from "./styles";
import CreationStore from '../../utils/stores/CreationStore';
import useSubject from '../../utils/hooks/useSubject';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import CustomButton from '../CustomButton';
import { getFromStore } from '../../utils/hooks/storage';
import { createDepartment$, createEmployee$, editDepartment$, editEmployee$ } from '../../api/axios';
import { dataLoader } from '../EmployeeList';
import { EditLocationAltOutlined } from '@mui/icons-material';



export default function EntityCreate() {
    let data = getFromStore("allData")
    const navigate = useNavigate()
    const route = useSubject(CreationStore)
    const { category, subCat, id } = useParams();
    const [name, setName] = useState()
    const [surname, setSurname] = useState("")
    const [telephone, setTelephone] = useState("")
    const [edit, setEdit] = useState(false)
    const [email, setEmail] = useState("")
    const [manager, setManager] = useState(0)
    const [status, setStatus] = useState("Active")
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");


    const classes = useStyles()

    useEffect(()=>{
        setManager(data.employees.filter((dta)=>{
            return dta.isManager
        })[0].id)
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
        let body={}
        if(subCat === "create")
        {
            if(category === "employee" )
            {
                body = {
                    FirstName: name,
                    LastName: surname,
                    Telephone: telephone,
                    ManagerId: manager,
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
                    setOpen(true) 
                    data = await dataLoader() 
                }).catch(er=>{ console.log("Got some Error")})
            }
            else if(category === "department")
            {
                body = {
                    Name: name,
                    ManagerId: manager,
                }
                createDepartment$(body).then(async(res)=>{
                    console.log("departement created")
                    setMessage(`Departement "${name}" Created`)
                    setName("")
                    data = await dataLoader()
                    setOpen(true) 
                }).catch(er=>{ console.log("Got some Error")})
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
                    ManagerId: manager,
                    IsManager: false,
                    Email: email,
                    Status: status
                }
                // editEmployee$()
                editEmployee$(body, id).then(async (res)=>{
                    console.log("Employee edited")
                    setMessage(`Employee "${name} ${surname}" Edited Successfully`)
                    setName("")
                    setSurname("")
                    setTelephone("")
                    setEmail("")
                    setOpen(true)
                    data = await dataLoader() 
                }).catch(er=>{ console.log("Got some Error")})
            }
            else if(category === "department")
            {
                body = {
                    Name: name,
                    ManagerId: manager,
                    Status: status
                }
                editDepartment$(body, id).then(async(res)=>{
                    console.log("departement created")
                    setMessage(`Departement "${name}" Edited Successfully`)
                    setName("")
                    data = await dataLoader()
                    setOpen(true) 
                }).catch(er=>{ console.log("Got some Error")})
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
                        <select onChange={(e)=>setManager(e.target.value)} className="form-select" aria-label="Default select example">
                        {
                            data.employees.filter((dta)=>{
                                return dta.isManager
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
