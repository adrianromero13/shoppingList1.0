import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteItemButton({ id, deleteById }) {
const dispatch = useDispatch();

  return (
    <Tooltip title='Delete'>
      <IconButton aria-label='delete' onClick={() => dispatch(deleteById(id))}>
        <DeleteIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  )
};
