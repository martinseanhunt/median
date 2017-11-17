import React, { Component } from 'react'
import '../styles/DropDown.css'

class CategoryDropdown extends Component{
  state = {
    isOpen: false,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  toggleDropdown = (e) => {
    const isOpen = !this.state.isOpen
    this.setState({ isOpen })
  }

  setDropdownRef = dropdownRef => this.setState({ dropdownRef })

  setTriggerRef = triggerRef => this.setState({ triggerRef })

  handleClickOutside = e => {
    if (this.state.dropdownRef && !this.state.dropdownRef.contains(e.target) && !this.state.triggerRef.contains(e.target)) {
      this.setState({ isOpen: false })
    }
  }

  handleSelect = (e, selection) => {
    e.stopPropagation()
    this.props.onSelect(selection)
    this.toggleDropdown()
  }

  isSelectedClass = name => ( name === this.props.selectedItem )

  render() {
    return (
      <div className="dropdown">
        <span 
          className="dropdown__trigger"
          onClick={this.toggleDropdown}
          ref={this.setTriggerRef}
        >
          {this.props.selectedItem} 
          <svg className="dropdown__icon" width="19" height="19">
            <path d="M3.9 6.772l5.205 5.756.427.472.427-.472 5.155-5.698-.854-.772-4.728 5.254L4.753 6z" />
          </svg>
        </span>

        {this.state.isOpen &&
          <div className="dropdown__dropdown" ref={this.setDropdownRef}>
            <ul className="dropdown__list">
              {this.props.items.map(item => (
                <li 
                  key={item.name}
                  onClick={(e) => this.handleSelect(e, item.name)}
                  className={`dropdown__item ${this.isSelectedClass(item.name) 
                    ? 'dropdown__item--active'
                    : ''}`
                  }
                >
                  <span className="dropdown__radio">
                    {this.isSelectedClass(item.name) && 
                      <span className="dropdown__radio-active"></span>
                    }
                  </span> 
                  <span className="dropdown__option">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        }
        
      </div>
    ) 
  }
}

export default CategoryDropdown