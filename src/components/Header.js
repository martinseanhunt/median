import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css';

class Header extends Component {
  headerModifier = () => (
    this.props.page === '/' 
      ? ''
      : 'header--page'
  )

  render() {
    return (
      <header className={`row header ${this.headerModifier()}`}>
        <div className="header__inner grid">
          <div className="grid__col grid__col--1 grid__col--alignleft">
            {this.props.page === '/' 
              ? <Link to="/post" className="btn">Write a post</Link>
              : <Link to="/" className="btn">Go back</Link>
            }
          </div>
          <div className="grid__col grid__col--1 grid__col--aligncenter">
            <h1 className="header__heading"><Link to="/">Median</Link></h1>
          </div>
          <div className="grid__col grid__col--1 grid__col--alignright">
            Search & user <span role="img" aria-label="construction emoji">🛠</span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
