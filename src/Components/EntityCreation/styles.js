import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    screen: {
        marginTop:"0.8rem !important", 
        marginBottom:"3rem !important"
    },
    userName: {
        width: "100%",
        border: "0.8px solid #C8C8C8",
        padding:"0 0.5rem",
        fontSize:"1.5rem"
    },
    divBorderStart: {
        height:"20rem",
        width:"100%",
        border:"3.5px solid black",
        marginTop:"1rem",
    },
    menuBtns: {
        marginTop:"3rem",
        marginLeft: "1rem",
        marginRight: "1rem"
    }
}))