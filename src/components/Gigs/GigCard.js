import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Box,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Menu,
} from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { Delete, Edit, MoreHoriz, Vignette } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import ConfirmDialog from 'dialogs/ConfirmDialogBox';
import useToggle from 'hooks/useToggle';

const styles = makeStyles((theme) => ({
  gigCard: {
    width: 230,
    position: 'relative',
  },
  price: {
    fontSize: theme.spacing(3),
    paddingLeft: 5,
    fontWeight: 'bold',
  },
  modifyGig: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    zIndex: 1,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    flexGrow: 1,
    padding: 5,
  },
}));

const GigCard = ({ gig, isOwner, deleteGig }) => {
  const classes = styles();
  const { _id, title, images, packages } = gig;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isDeleteOpen, toggleDelete] = useToggle(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleGigModify = (e) => {
    navigate(`/services/${_id}/edit`);
    e.stopPropagation();
  };

  const handleDeleteGig = () => {
    console.log(`deleteGig`, deleteGig);
    deleteGig(_id);
    toggleDelete();
    handleClose();
  };

  console.log(`packages`, packages);

  return (
    <Card className={classes.gigCard}>
      {/* {isOwner === true && (
        <IconButton
          aria-label='show more'
          aria-haspopup='true'
          onClick={handleGigModify}
          className={classes.modifyGig}
          size='small'
        >
          <EditIcon />
        </IconButton>
      )} */}

      <CardActionArea component={Link} to={`/services/${_id}`}>
        <CardMedia
          component='img'
          alt={title}
          height='170'
          image={images?.[0]}
          title={title}
        />
        <CardContent>
          <Typography variant='subtitle1' color='textSecondary' component='p'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          style={{
            display: 'flex',
            paddingInline: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant='body2' color='primary' align='right'>
            STARTING AT{' '}
            <span className={classes.price}>{packages?.[0].price}</span>
          </Typography>
          {isOwner && (
            <IconButton
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          )}
        </Box>
      </CardActions>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            // width: '10ch',
          },
        }}
      >
        <MenuItem
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={handleGigModify}
          component={Link}
          to={`/services/${_id}`}
        >
          View <Vignette style={{ color: '#bdbdbd' }} />{' '}
        </MenuItem>
        <MenuItem
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={handleGigModify}
        >
          Edit <Edit style={{ color: '#bdbdbd' }} />{' '}
        </MenuItem>
        <MenuItem
          style={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={toggleDelete}
        >
          Delete <Delete style={{ color: '#bdbdbd' }} />{' '}
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={isDeleteOpen}
        toggleDialog={toggleDelete}
        success={handleDeleteGig}
        dialogTitle='Delete this service'
      />
    </Card>
  );
};

export default GigCard;
