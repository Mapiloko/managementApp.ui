import React from 'react'
import { Button, Dialog, DialogActions, DialogTitle  } from '@mui/material'


export default function DialogBox({open, handleClose, dialogMessage }) {
  return (
    <>
      <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            {dialogMessage}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    </>
  )
}
