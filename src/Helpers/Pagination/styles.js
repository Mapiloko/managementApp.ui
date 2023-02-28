import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    selected: {
        backgroundColor: "white",
        borderRadius: "1rem"
    },
    pageItem: {
        padding:".5rem",
        cursor:"pointer",
    },
    pageLink:{
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
        paddingBottom: ".2rem"
    }
}))
