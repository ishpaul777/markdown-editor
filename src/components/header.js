/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useSelector } from 'react-redux';
import ModalConfirmation from './Modal';
import menuIcon from './assets/images/menu.svg';
import closeIcon from './assets/images/close-icon.svg';
import logo from './assets/images/logo.svg';
import deleteIcon from './assets/images/delete-icon.svg';
import saveIcon from './assets/images/save-icon.svg';
import iconDoc from './assets/images/document-icon.svg';
import Drawer from './Drawer';
import './assets/header.css';

const Header = () => {
  const [isDrawerOpen, toggleDrawer] = React.useState(false);
  const currentDoc = useSelector((state) => state.currentDoc);
  const allDocs = useSelector((state) => state.docs);
  const [currentFileName, setCurrentFileName] = React.useState(currentDoc.name);
  const [isModalOpen, toggleModal] = React.useState(false);

  const handleClick = () => (toggleDrawer(!isDrawerOpen));

  const downloadFile = () => {
    const doc = Object.getOwnPropertyDescriptors(currentDoc);
    const docContent = doc.content.value;
    const docName = doc.name.value;

    // id any file extension, remove it from docName
    const extensionRemoved = docName.split('.').pop();
    const docNameWithExtension = `${extensionRemoved}.md`;
    const element = document.createElement('a');
    const file = new Blob([docContent], {
      type: 'text/markdown',
    });
    element.href = URL.createObjectURL(file);
    element.download = docNameWithExtension;
    document.body.appendChild(element);
    element.click();
  };

  if (isDrawerOpen) {
    document.body.classList.add('pushed');
  } else {
    document.body.classList.remove('pushed');
  }

  const handleFileChange = (e) => {
    setCurrentFileName(e.target.value);
    currentDoc.name = e.target.value;
  };
  // THIS WILL RENDER THE MODAL IN REACT PORTAL

  return (
    <div className="header">
      <Drawer isDrawerOpen={isDrawerOpen} />
      <div className={`header-wrapper ${isDrawerOpen && 'pushed'}`}>
        <div className="header-left">
          <button onClick={handleClick} type="button" className="menu-btn-box">
            <img src={isDrawerOpen ? closeIcon : menuIcon} alt="open menu" />
          </button>
          <img src={logo} alt="open menu" className="logo" />
          <div className="doc-name-box">
            <img src={iconDoc} alt="document" />
            <span className="doc-name-container">
              <label htmlFor="doc-name" className="doc-name-label">Document Name</label>
              <input
                value={`${currentDoc.name}`}
                onChange={(e) => handleFileChange(e)}
                id="doc-name"
              />
            </span>
          </div>
        </div>
        <div className="header-right">
          <div className="delete-btn" onClick={() => toggleModal(true)}>
            <img src={deleteIcon} alt="delete document" />
          </div>
          <button type="button" onClick={() => downloadFile()} className="save-btn">
            <img src={saveIcon} alt="save changes" />
            Download File
          </button>
        </div>
      </div>
      <ModalConfirmation trigger={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default Header;
