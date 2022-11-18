/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import logo from './assets/images/logo.svg';
import iconDoc from './assets/images/document-icon.svg';
import './assets/drawer.css';
import { createNewDoc, setFirstDoc } from '../redux/allDocs';
import { setCurrentDoc } from '../redux/currentDoc';
import { toggleMode } from '../redux/modeReducer';

const Drawer = ({ isDrawerOpen }) => {
  const docs = useSelector((state) => state.docs);
  const currentDoc = useSelector((state) => state.currentDoc);
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const newDoc = {
    id: uuidv4(),
    name: 'Untitled',
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    modifiedAt: new Date().toLocaleString('en-US'),
    content: '#Hello World',
  };

  const docsNames = docs.map((doc) => (
    <li
      className={`documents-infos ${currentDoc.id === doc.id ? 'active' : ''}`}
      key={doc.id}
      onClick={() => {
        dispatch(setCurrentDoc(doc));
        dispatch(setFirstDoc(doc));
      }}
    >
      <div className="documents-infos-icon">
        <img className="document-icon" src={iconDoc} alt="" />
      </div>
      <div className="documents-infos-text">
        <p className="documents-infos-date">{doc.createdAt}</p>
        <p className="documents-infos-name">
          {`${doc.name}.md`}
        </p>
      </div>
    </li>
  ));

  return (
    <div className={`menu-drawer ${isDrawerOpen && 'active'}`}>
      <div className="menu-logo">
        <img src={logo} alt="Markdown Logo" />
        <div className="mode-toggler">
          <i className={`bi bi-brightness${(mode === 'dark') ? '-low' : '-high-fill'}`} />
          <label htmlFor="checkbox" onClick={() => dispatch(toggleMode())} className="toggler-label">
            <span className={`ball ${(mode === 'dark') && 'active'}`} />
          </label>
          <i className={`bi bi-moon-stars${(mode === 'dark') ? '-fill' : ''}`} />
        </div>
      </div>
      <div className="all-docs">
        <h2 className="heading-all-docs">MY DOCUMENTS</h2>
        <button
          type="button"
          className="new-doc-btn"
          onClick={() => {
            dispatch(createNewDoc(newDoc));
            dispatch(setCurrentDoc(newDoc));
          }}
        >
          + New document
        </button>
        <ul className="documents-list">{docsNames}</ul>
      </div>
      <footer className="attribution">
        Made with
        {' '}
        <i className="bi bi-heart-fill" />
        {' '}
        by
        {' '}
        <a href="https://github.com/ishpaul777/">Ishpaul Singh</a>
        {' '}
      </footer>
    </div>
  );
};

Drawer.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
};

export default Drawer;
