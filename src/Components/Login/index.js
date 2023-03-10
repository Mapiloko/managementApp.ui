import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import CustomButton from "../../Helpers/CustomButton";
import LoginStore from "../../utils/stores/EditStore";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";
import { useStyles } from "./styles";
import Loader from "../Loader";
import { setToStore } from "../../utils/hooks/storage";
import RoleStore from "../../utils/stores/RoleStore";
import { Login$ } from "../../api/accounts";


const Login = () => {
	const navigate = useNavigate();
	LoginStore.next(false)
	const classes = useStyles()
	const [userName, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [wrongLogins, setWronglogins] = useState(false)
	const [netError, setNetError] = useState(false)

	const handleClick = ()=>{
		const body = { UserName: userName, Password: password}

		setLoading(true)
		Login$(body).then(async (res)=>{
			const response = await res.json()
			if(response.StatusCode === 401)
			{
				setLoading(false)
				setWronglogins(true)
				setTimeout(() => {
					setWronglogins(false)
				}, 7000);
			}
			else{
				setToStore("User", response)
				navigate("/employees-list")
			}
		}).catch((err)=>{
			setLoading(false)
			setNetError(true)
			setTimeout(() => {
				setNetError(false)
			}, 7000);
			console.log("Network Error", err)
		})
	}

	return (
		<>
			{loading &&
                <Loader />
            }
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
							<CustomButton disabled={password.length === 0 || userName.length === 0} handleClick={ handleClick } className={classes.Button} title="Login"/>
						</Grid>
						{ wrongLogins ?
							<Typography className={`${classes.forgotPassword} blink_text`} variant="h6" color="red" align="center">Incorrect Username or Password</Typography>:
							netError &&
							<Typography className={`${classes.forgotPassword} blink_text`} variant="h6" color="red" align="center">Network Error!!</Typography>
						}
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Login;
