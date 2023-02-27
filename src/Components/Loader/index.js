import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { useStyles } from './styles'

export default function Loader() {
    const classes = useStyles()

  return (
    <>
        <Grid className={classes.progressWrapper}>
            <CircularProgress color="secondary" size="6rem" />
        </Grid>
    </>
  )
}
