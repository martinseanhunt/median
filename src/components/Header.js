import React, { Component } from 'react';
import '../styles/Header.css';

class Header extends Component {
  render() {
    return (
      <header className="row grid header">
        <div className="grid__col grid__col--1 grid__col--alignleft">
          <button className="btn">Write a post</button>
        </div>
        <div className="grid__col grid__col--1 grid__col--aligncenter">
          <h1 className="header__heading">Median</h1>
        </div>
        <div className="grid__col grid__col--1 grid__col--alignright">
          Searchnwotnot
        </div>
      </header>
    );
  }
}

export default Header;
