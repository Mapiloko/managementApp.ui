import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    mainWrapper: {
        height: "100vh",
        display: "grid",
        alignContent: "center",
    },
    Login: {
        color: "white",
        marginTop: "2rem !important",
        fontSize: "3rem !important",
        fontWeight: "400 !important",
    },
    contentWrapper: {
        background: "rgba(0, 0, 0, 0.4)",
        borderRadius: "16px",
        height: "31rem",
    },
    usernameContent:{
        margin:"0 auto !important",
        marginTop:"2rem !important"
    },
    userName: {
        width: "100%",
        border: "0.8px solid #C8C8C8",
        borderRadius: "10px",
        margin: "1rem 0",
        padding:"0 0.5rem",
        fontSize:"2rem"
    },
    submitBtn: {
        margin: "0 auto !important",
        display:"grid", 
        justifyContent:"center",
        marginTop:"1rem !important"
    },
    Button:{
        padding:"0.5rem 8rem !important",
    },
    forgotPassword: {
        marginTop:"0.5rem !important"
    }
}))
