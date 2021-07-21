import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip, IconButton } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { updateItemById } from '../../actions/todos';

export default function CompleteButton({ text, id, completed }) {
  const dispatch = useDispatch();

  return (
    <Tooltip title='completed'>
      <IconButton
        aria-label='delete'
        onClick={() => dispatch(updateItemById(id, text, completed))}
      >
        <DoneOutlineIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  )
};
