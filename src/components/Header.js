import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/Header.css'
import Categories from '../containers/Categories'

// The header component won't get the route spedific values of props.match because it's 
// not being rendered from within the routes. That's why I'm grabbing using this.props.page
// this way...

class Header extends Component {
  headerModifier = () => {
    const { page } = this.props
    const urlSegment = page.split('/')[1]
    return this.props.page === '/' || urlSegment === 'categories'
      ? ''
      : 'header--page'
  }

  render() {
    const { page } = this.props
    const urlSegments = page.split('/')
    return (
      <header className={`row header ${this.headerModifier()}`}>
        <div className="header__inner grid">
          <div className="grid__col grid__col--1 grid__col--alignleft">
            {page === '/' || urlSegments[1] === 'categories'
              ? <Link to={`/post/${urlSegments[2] || ''}`} className="btn">Write a post</Link>
              : <Link to="/" className="btn">Home</Link>
            }
          </div>
          <div className="grid__col grid__col--1 grid__col--aligncenter">
            <h1 className="header__heading"><Link to="/">Median</Link></h1>
          </div>
          <div className="grid__col grid__col--1 grid__col--alignright">
            Search & user <span role="img" aria-label="construction emoji">🛠</span>
          </div>

          {(page === '/' || urlSegments[1] === 'categories') &&
            <Categories activeCategory={urlSegments[2]}/>
          }
        </div>
      </header>
    );
  }
}

export default Header;
