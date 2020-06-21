import React, { Fragment, Drawer } from 'react';
// import { Button, Avatar, Card, CardContent } from '@material-ui/core';

import './App.css';
import './Home.css';

import SubForumsList from './components/sub-forums-list/sub-forums-list.component';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

function App() {
  return (
    <Fragment>
      <Header />
      <main className='main'>
        <h2 className='sub-title'>Sub-Forums</h2>
        <SubForumsList />
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
