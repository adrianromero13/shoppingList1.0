import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import { Button, Modal, Typography } from '@material-ui/core';

import { deleteListById } from '../../actions/todos';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
  textAlign: 'center',
    width: '70%',    
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.background.paper,
  },
  remove: {
    alignSelf: 'flex-end',
    position: 'sticky',
  },
}));

export default function DeleteListModal(props) {
  const classes = useStyles();
  const { title, todos, _id } = props?.list;

  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async id => {
    await dispatch(deleteListById(id));
    await handleCloseModal();
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const modalContent = (
    <div className={classes.paper} key={_id}>
      <Typography component='h1' variant='h6'>Delete List: {title}</Typography>
      <p>List has {todos?.length} items</p>
      <p>Are you sure you want to delete?</p>
      <Button
        variant='outlined'
        color='secondary'
        fullWidth
        size='small'
        onClick={() => handleDelete(_id)}
      >Delete {title}</Button>
    </div>
  );

  return (
    <>
      <RemoveIcon
        className={classes.remove}
        onClick={handleOpenModal}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        {modalContent}
      </Modal>
    </>
  )
};
