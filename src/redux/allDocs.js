const CREATE_NEW = 'CREATE_NEW';
const DELETE_DOC = 'DELETE_DOC';
const SET_FIRST = 'SET_FIRST';
const UPDATE_DOC = 'UPDATE_DOC';

export default function DocsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_NEW: {
      const newState = [action.newDoc, ...state];
      localStorage.setItem('docs', JSON.stringify(newState));
      return newState;
    } case DELETE_DOC: {
      const newState = state.filter((doc) => doc.id !== action.id);
      localStorage.setItem('docs', JSON.stringify(newState));
      return newState;
    } case SET_FIRST: {
      const newState = state.filter((doc) => doc.id !== action.doc.id);
      newState.unshift(action.doc);
      localStorage.setItem('docs', JSON.stringify(newState));
      return newState;
    } case UPDATE_DOC: {
      const newState = state.filter((doc) => doc.id !== action.doc.id);
      newState.unshift(action.doc);
      localStorage.setItem('docs', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}

export const createNewDoc = (newDoc) => ({
  type: CREATE_NEW,
  newDoc,
});

export const deleteDoc = (id) => ({
  type: DELETE_DOC,
  id,
});

export const setFirstDoc = (doc) => ({
  type: SET_FIRST,
  doc,
});

export const updateDoc = (doc) => ({
  type: UPDATE_DOC,
  doc,
});
