import React from "react";
// import { Drawer, Button } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import "./Home.css";

import SubForumsList from "./components/sub-forums-list/sub-forums-list.component";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <main className="main">
          <h2 className="sub-title">Sub-Forums</h2>
          <SubForumsList />
        </main>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
