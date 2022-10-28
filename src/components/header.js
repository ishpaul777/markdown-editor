import React from 'react';
import menu from './assets/images/menu.svg';
import logo from './assets/images/logo.svg';
import deleteIcon from './assets/images/delete-icon.svg';
import saveIcon from './assets/images/save-icon.svg';
import './assets/header.css';

const Header = () => (
  <div className="header-wrapper">
    <div className="header-left">
      <div className="menu-btn-box">
        <img src={menu} alt="open menu" />
      </div>
      <div className="header-logo">
        <img src={logo} alt="open menu" />
      </div>

    </div>
    <div className="header-right">
      <div className="delete-btn">
        <img src={deleteIcon} alt="delete document" />
      </div>
      <button type="button" className="save-btn">
        <img src={saveIcon} alt="save changes" />
        Save Changes
      </button>
    </div>
  </div>
);

export default Header;
