import React from 'react';
import Paper from '@material-ui/core/Paper';
import '@material-ui/system'

import './sub-forum.styles.scss'

const SubForum = ({forumName}) => {
  return (
  <Paper elevation={2} className='sub-forum'>
    <h3>{forumName}</h3>
  </Paper>
  )
}

export default SubForum;