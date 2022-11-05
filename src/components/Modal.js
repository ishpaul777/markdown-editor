import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from 'prop-types';
import { deleteDoc, createNewDoc } from '../redux/allDocs';
import { setCurrentDoc } from '../redux/currentDoc';
import './assets/modal.css';

const ModalConfirmation = ({ trigger, toggleModal }) => {
  const newDoc = {
    id: uuidv4(),
    name: 'Welcome',
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    modifiedAt: new Date().toLocaleString('en-US'),
    content: "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  };

  const currentDoc = useSelector((state) => state.currentDoc);
  const allDocs = useSelector((state) => state.docs);
  const dispatch = useDispatch();
  const deleteFile = (id) => {
    dispatch(deleteDoc(id));
    if (allDocs.length > 1) {
      dispatch(setCurrentDoc(allDocs[1]));
    } else {
      dispatch(createNewDoc(newDoc));
      dispatch(setCurrentDoc(newDoc));
    }
  };
  return (
    <Modal show={trigger} onHide={() => toggleModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          Delete
          {' '}
          {currentDoc.name}
          .md ?
          {' '}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the
        {' '}
        <em />
        {' '}
        document and its contents? This action cannot be reversed.
      </Modal.Body>
      <Modal.Footer>
        <button
          className="delete-btn-confirm"
          type="button"
          onClick={() => {
            deleteFile(currentDoc.id);
            toggleModal(false);
          }}
        >
          Confirm & Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

ModalConfirmation.propTypes = {
  trigger: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ModalConfirmation;
