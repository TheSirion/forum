import React, { Fragment } from 'react';
import { Button, Avatar, Card, CardContent, Typography, makeStyles } from '@material-ui/core';

import './App.css';
import './Home.css';
import './components/Subforum'

import SubForum from './components/Subforum';
import Header from './components/Header';
import Footer from './components/Footer'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <Header />
      <main>
        <h2>Sub-Forums</h2>
        <SubForum forumName='Front-End' />
        <SubForum forumName='Back-End' />
        <SubForum forumName='Databases' />
        <SubForum forumName='HTML & CSS' />
        <SubForum forumName='JavaScript' />
        <Card variant='outlined' component='span' m={1} className='classes.root'>
          <CardContent>
            <Typography className='classes.title' color='textSecondary'>
              User
            </Typography>
            <Avatar src='https://i.pinimg.com/originals/08/1a/49/081a4990914d41a52e25a8fe6807ba5f.jpg' />
            <Button variant='contained' color='primary'>Hello there!</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
