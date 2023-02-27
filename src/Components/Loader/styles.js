import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";

export const useStyles = makeStyles(() => ({
    screen: {
        marginTop:"0.8rem !important", 
        marginBottom:"3rem !important"
    },
    progressWrapper: {
        position: "absolute",
        top:0,
        left:0,
        height:"100vh",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex:100,
        display: "grid",
        justifyContent: "center",
        alignItems: "center"
    }
}))