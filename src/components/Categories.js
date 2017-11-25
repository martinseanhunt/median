import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import '../styles/Categories.css'

class Categories extends Component {
  render(){
    const { categories, activeCategory } = this.props
    return(
      <ul className="categories">
        <li className={activeCategory || 'categories__active'}><Link to="/">All</Link></li>
        {categories.length > 0 && categories.map(category => 
          <li key={category.name} className={activeCategory === category.name ? 'categories__active' : 'c'}>
            <Link to={`/${category.name}`}>{category.name}</Link>
          </li>
        )}
      </ul>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(mapStateToProps)(Categories)