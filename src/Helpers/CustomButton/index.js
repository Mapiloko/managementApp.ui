import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export const useStyles = makeStyles(() => ({
  Button:{
    boxShadow: "8px 8px black !important"
},
filterBtn: {
  backgroundColor:"#005a88", 
  width:"6rem", 
  borderRadius:"5px", 
  padding:"0.5rem",
  justifyItems:"center"
}
}))

const CustomButton = ({ handleClick, title, disabled, className, filter }) => {

  const classes = useStyles()


  return (
    <>
    {filter ?
      <div onClick={handleClick} className={`${classes.Button} ${classes.filterBtn}`} role="button">
        <FilterAltIcon/>
        {title}
      </div> :
      <Button onClick={handleClick} disabled={disabled} className={`${classes.Button} ${className}`} color="primary" size="medium" variant="contained">
        {title}
      </Button>
    }
    </>
  );
};

// Button.defaultProps = {
//   filter: false,
//   disabled: false
// };

export default CustomButton;
