import React from 'react';
import { Drawer, ListItem, Button, Divider } from '@material-ui/core'

import './header.styles.scss'

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerHidden: false,
    };
  }

  toggleDrawer = () => {
    if (this.state.drawerHidden) {
      this.setState({ drawerHidden: false })
    } else {
      this.setState({ drawerHidden: true })
    }
  }

  render() {
    return (
      <header className='header'>
        <div>
          <Button variant='outlined' onClick={this.toggleDrawer}>Options</Button>
          <h1 className='title'>WEB DEVELOPMENT FORUM</h1>
          <Drawer
            variant='temporary'
            anchor='left'
            open={this.state.drawerHidden}
            onClose={this.toggleDrawer}
          >
            <ListItem button >Sign In</ListItem>
            <ListItem button >Sign Up</ListItem>
            <ListItem button >Settings</ListItem>
            <ListItem button >Fuck This Shit Up</ListItem>
            <Divider />
            <ListItem button onClick={this.toggleDrawer}>Close</ListItem>
          </Drawer>
        </div>
      </header>
    )
  }
}

export default Header;