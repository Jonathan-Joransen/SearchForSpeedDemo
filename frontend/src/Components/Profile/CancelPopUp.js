import { Dialog, DialogContent, DialogTitle, IconButton, Typography, createStyles, withStyles } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitleStyled = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

const DialogContentStyled = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(DialogContent);

export default function CustomizedDialogs({children,title, handleClose, open}) {

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitleStyled id="customized-dialog-title" onClose={handleClose}>
        {title}
        </DialogTitleStyled>
        <DialogContentStyled dividers>
          {children}
        </DialogContentStyled>
      </Dialog>
    </div>
  );
}