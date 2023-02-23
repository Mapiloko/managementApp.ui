import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../CustomButton";
import LoginStore from "../../utils/stores/LoginStore";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";


const Login = () => {
	const navigate = useNavigate();
	LoginStore.next(false)
	const classes = useStyles()
	const [userName, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [wrongLogins, setWronglogins] = useState(false)

	const handleClick = ()=>{
		navigate("/employees-list")
	}

	return (
		<div className={classes.mainWrapper}>
			<Grid container direction="row" justifyContent="center" alignItems="center">
				<Grid item xs={12} md={8} className={classes.contentWrapper} >
					<Grid item xs={12}>
						<Typography className={classes.Login} align="center" variant="h2">Login</Typography>
					</Grid>

					<Grid item xs={10} className={classes.usernameContent}>
						<Typography variant="h5" color="white" align="left">Username</Typography>
						<input value={userName} className= {classes.userName} onChange={(e)=> setUsername(e.target.value)}/>
					</Grid>

					<Grid item xs={10} className={classes.usernameContent}>
						<Typography variant="h5" color="white" align="left">Password</Typography>
						<input value={password} className= {classes.userName} type="password" onChange={(e)=> setPassword(e.target.value)}/>
					</Grid>

					<Grid item xs={10} className={classes.submitBtn}>
						<CustomButton handleClick={ handleClick } className={classes.Button} title="Login"/>
					</Grid>
					{ wrongLogins &&
						<Typography className={classes.forgotPassword} variant="h6" color="red" align="center">Incorrect Username or Password</Typography>
					}
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
