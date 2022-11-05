/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Showdown from 'showdown';
import Split from 'react-split-grid';
import './assets/Editor.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeCurrentContent } from '../redux/currentDoc';
import { updateDoc } from '../redux/allDocs';

const Editor = () => {
  let currentDoc = useSelector((state) => state.currentDoc);
  const dispatch = useDispatch();

  const handleContentChange = (content) => {
    currentDoc = { ...currentDoc, content };
    dispatch(changeCurrentContent(currentDoc));
    dispatch(updateDoc(currentDoc));
  };

  const converter = new Showdown.Converter();
  return (
    <Split
      columnMaxSize={800}
      columnMinSize={400}
      minSize={400}
      maxSize={800}
      render={({
        getGridProps,
        getGutterProps,
      }) => (
        <div className="grid" {...getGridProps()}>
          <div
            className="editor-textarea-wrapper"
          >
            <div className="editor-col-head">
              Markdown
            </div>
            <textarea
              value={currentDoc.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="editor-textarea"
            />
          </div>
          <div
            className="gutter-col gutter-col-1"
            {...getGutterProps('column', 1)}
          />
          <div>
            <div className="editor-col-head">
              Preview
            </div>
            <div
              className="editor-preview"
              dangerouslySetInnerHTML={{ __html: converter.makeHtml(currentDoc.content) }}
            />
          </div>
        </div>
      )}
    />

  );
};

export default Editor;
