import React from 'react';
import Grid from '@material-ui/core/Grid'

import SubForum from '../sub-forum/sub-forum.component';

import './sub-forums-list.styles.scss';

const SubForumsList = () => (
  <div className='sub-forums-list'>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={4}>
        <SubForum forumName="Front-End" />
      </Grid>
      <Grid item xs={12}  sm={6} lg={4}>
        <SubForum forumName='Back-End' />
      </Grid>
      <Grid item xs={12}  sm={6} lg={4}>
        <SubForum forumName='Databases' />
      </Grid>
      <Grid item xs={12}  sm={6} lg={4}> 
        <SubForum forumName='HTML & CSS' />
      </Grid >
      <Grid item xs={12}  sm={6} lg={4}>
        <SubForum forumName='JavaScript' />
      </Grid>
      <Grid item xs={12}  sm={6} lg={4}>
        <SubForum forumName='Off-Topic' />
      </Grid>
    </Grid>
  </div> 
)

export default SubForumsList;