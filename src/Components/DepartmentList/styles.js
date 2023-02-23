import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    divBorder: {
        height:"10rem",
        width:"100%",
        border:"3.5px solid black",
        marginTop:"1rem",
        paddingLeft: "3rem"
    },
    OverlapText: {
        width:"8rem",
        marginTop:"-1.2rem",
        marginLeft:"-2rem",
        fontSize:"20px",
        color:"white",
        borderRadius:"2rem"
    },
    search: {
        width: "100%",
        border: "0.8px solid #C8C8C8",
        margin: "0.5rem 0",
        padding:"0 0.5rem",
        fontSize:"1.5rem",
        marginBottom: "0.8rem"
    },
    screen: {
        marginTop:"0.5rem", 
        marginBottom:"1rem"
    },
    contentHeader: {
        height:"15rem", 
        border: "3.5px solid black", 
        paddingLeft:"1rem"
    },
    content: {
        height:"82%", 
        overflowY:"scroll", 
        padding:"0", 
        margin: "0",
        overflowX: "hidden"
    },
    SearchIcon: {
        color: "black",
        backgroundColor: "white",
        alignSelf:"center",
        fontSize:"2rem !important"
    }
}))