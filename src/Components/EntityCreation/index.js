import { Grid, Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useStyles } from "./styles";
import CreationStore from '../../utils/stores/CreationStore';
import useSubject from '../../utils/hooks/useSubject';
import { useParams, useNavigate, useNavigation } from 'react-router-dom';
import Header from '../Header';
import { getFromStore } from '../../utils/hooks/storage';
import { dataLoader } from '../EmployeeList';
import { createEmployee$, updateEmployee$, updateEmployeeDepartment, editEmployeeRole$ } from '../../api/employees';
import { createDepartment$, updateDepartment$ } from '../../api/departments.js';
import Loader from '../Loader';
import CustomButton from '../../Helpers/CustomButton';
import { updateRole$ } from '../../api/accounts';


export default function EntityCreate() {
    let data = getFromStore("allData")
    const navigate = useNavigate()
    const navigation = useNavigation()   
    const route = useSubject(CreationStore)
    const { category, subCat, id } = useParams();
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [telephone, setTelephone] = useState("")
    const [edit, setEdit] = useState(false)
    const [email, setEmail] = useState("")
    const [manager, setManager] = useState([{DepartmentId: "0"}])
    const [managerId, setManagerId] = useState(0)
    const [status, setStatus] = useState("Active")
    const [open, setOpen] = useState(false);
    const [dialogMessage, setMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const [validName, setValidname] = useState(true);
    const [validLastname, setValLastname] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validTelephone, setValTelephone] = useState(true);
    const [validSave, setValidSave] = useState(true);




    const classes = useStyles()

    const startConfigs = () =>{
        if(subCat === "edit")
        {
            let dpmnt;
            if(category === "employee")
            {
                dpmnt = data.employees.filter((emp)=>{
                    return emp.Id === parseInt(id)
                })[0].DepartmentId
               
            }
            else{
                dpmnt = data.departments.filter((dpmt)=>{
                    return dpmt.Id === parseInt(id)
                })[0].Id
            }

            const mngr = data.employees.filter((emp)=>{
                return emp.DepartmentId === dpmnt && 
                emp.Role === "Manager"
            })
            setManager(mngr)
            setManagerId(mngr[0].Id)
        }
        else{
            let mngr
            if(category === "department")
            {
                mngr = data.employees.filter((emp)=>{
                    return emp.Role !== "Manager"
                })[0]
            }
            else
            mngr = data.employees.filter((emp)=>{
                return emp.Role === "Manager"
                })[0]

            setManager([mngr])
            setManagerId(mngr.Id)
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
                        return `${emp.Id}` === id
                    })[0]
                    setName(currentEmp.FirstName)
                    setSurname(currentEmp.LastName)
                    setTelephone(currentEmp.Telephone)
                    setEmail(currentEmp.Email) 
                }
                else
                {
                    let currentDpt = data.departments.filter((dpt)=>{
                        return `${dpt.Id}` === id
                    })[0]
                    setName(currentDpt.Name)
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
            return emp.Id === managerId
        })[0]

        let department = data.departments.filter((dpt)=>{
            return dpt.Id === currentManager.DepartmentId 
        })[0]
        
        if(subCat === "create")
        {
            if(category === "employee" )
            {
                body = {
                    FirstName: name,
                    LastName: surname,
                    Telephone: telephone,
                    DepartmentId: department.Id,
                    Status: "Active",
                    Role: "Employee",
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
                    console.log("Got some Error",er)
                })
            }
            else if(category === "department")
            {
                body = {
                    Name: name,
                    Status: "Active",
                }

                createDepartment$(body).then(async(res)=>{
                    console.log("departement created")
                    setMessage(`Departement "${name}" Created`)
                    setName("")
                    const response = await res.json()

                    const resp = await updateRole$({ UserName: currentManager.Email, RoleName: "Manager"})
                    const res1 = await updateEmployeeDepartment({DepartmentId: response.Id}, currentManager.Id)

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
                    DepartmentId: department.Id,
                    Email: email,
                    Status: status
                }
                updateEmployee$(body, id).then(async (res)=>{
                    setMessage(`Employee "${name} ${surname}" Edited Successfully`)
                    setName("")
                    setSurname("")
                    setTelephone("")
                    setEmail("")
                    setLoading(false)
                    setOpen(true)
                    if(manager[0].Id !== currentManager.Id)
                    {
                        const res = await updateRole$({ UserName: currentManager.Email, RoleName: "Manager"})
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
                updateDepartment$(body, id).then(async(res)=>{
                    setMessage(`Departement "${name}" Edited Successfully`)
                    setName("")
                    setLoading(false)
                    setOpen(true)
                    if(manager[0].id !== currentManager.id)
                    {
                        const res = await updateRole$({ UserName: currentManager.Email, RoleName: "Manager"})
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

    const validateValue = (type, value)=>{
        let notSave = false;
        if(type === "name")
        {   
            if(!value.match(/^[A-Za-z0-9]+$/) || value.length === 0)
            {
                notSave = true;
                setValidname(false)
            }
            else
                setValidname(true)
            setName(value)
        }
        else if(type === "surname")
        {   
            if(!value.match(/^[A-Za-z0-9]+$/) || value.length === 0)
            {
                notSave = true;
                setValLastname(false)
            }
            else
                setValLastname(true)
            setSurname(value)   
        }
        else if(type === "telephone")
        {   
            if(!value.match(/^[0-9 ]*$/) || value.length !== 10)
            {
                notSave = true;
                setValTelephone(false)
            }
            else
                setValTelephone(true)
            setTelephone(value)   
        }
        else if(type === "email")
        {   
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || value.length === 0)
            {
                notSave = true;
                setValidEmail(false)
            }
            else
                setValidEmail(true)
            setEmail(value) 
        }

        if(category === "employee")
        {
            if(!notSave && name.length !== 0 && surname.length !== 0 && telephone.length !== 0 && email.length !== 0 )
                setValidSave(false)
            else
                setValidSave(true)
        }
        else
        {
            if(!notSave && name.length !== 0)
                setValidSave(false)
            else
                setValidSave(true)
        }

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
                        <input defaultValue={name} width="100%" className= {classes.userName} onChange={(e)=> validateValue("name", e.target.value)}/>
                        { !validName &&
                            <Typography color="red">Enter valid name*</Typography>
                        }
                    </Grid>
                </Grid>
                {category === "employee" && 
                    <>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5">
                                <Typography variant='h5'>*Surname</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={surname} className= {classes.userName} onChange={(e)=> validateValue("surname", e.target.value)}/>
                                { !validLastname &&
                                    <Typography color="red">Enter valid Surname*</Typography>
                                }
                            </Grid>
                        </Grid>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5" >
                                <Typography variant='h5'>*Telephone Number</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={telephone} className= {classes.userName} onChange={(e)=> validateValue("telephone", e.target.value)}/>
                                { !validTelephone &&
                                    <Typography color="red">Enter valid telephone number with 10 digits*</Typography>
                                }
                            </Grid>
                        </Grid>
                        <Grid container style={{margin:"1.5rem 0"}}>
                            <Grid item md={3} className="me-5">
                                <Typography variant='h5'>*Email Address</Typography>
                            </Grid>
                            <Grid item md={8}>
                                <input defaultValue={email} className= {classes.userName} onChange={(e)=> validateValue("email", e.target.value)}/>
                                { !validEmail &&
                                    <Typography color="red">Enter valid email Address*</Typography>
                                }
                            </Grid>
                        </Grid>
                    </>
                } 
                <Grid container style={{margin:"1.5rem 0"}}>
                    <Grid item md={3} className="me-5">
                        <Typography variant='h5'>*Manager</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <select onChange={(e)=>{
                            validateValue("test", "test")
                            setManagerId(parseInt(e.target.value))
                        }} 
                        className="form-select" aria-label="Default select example">
                        {subCat === "edit" && manager.length !== 0 && 
                            <option key={manager[0].Id} value={manager[0].Id}>{`${manager[0].FirstName} ${manager[0].LastName} (Current manager)`}</option>
                        }
                        {
                            data.employees.filter((dta)=>{
                                return ( subCat === "edit"? (dta.Role !== "Manager" && dta.DepartmentId === manager[0].DepartmentId) :
                                 (subCat === "create" && category === "department"? dta.Role !== "Manager" :
                                 dta.Role === "Manager"))
                            }).map((mpd)=>{
                                return (
                                    <option key={mpd.Id} value={mpd.Id}>{`${mpd.FirstName} ${mpd.LastName}`}</option>
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
                            <select onChange={(e)=>{
                                validateValue("test", "test")
                                setStatus(e.target.value)}
                                } className="form-select" aria-label="Default select example">
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
                <CustomButton disabled={validSave} handleClick={ handleSave } title="Save"/>
            </Grid>
            <Grid item md={1}>
                <CustomButton  handleClick={ handleCancel } title="Cancel"/>
            </Grid>
        </Grid>
    </>
  )
}
