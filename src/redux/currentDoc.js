const SET_CURRENT = 'SET_CURRENT';
const CHANGE_CURRENT_CONTENT = 'CHANGE_CURRENT_CONTENT';

export default function currentDocReducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.doc;
    } case CHANGE_CURRENT_CONTENT: {
      return action.doc;
    }
    default:
      return state;
  }
}

export const changeCurrentContent = (doc) => ({
  type: CHANGE_CURRENT_CONTENT,
  doc,
});

export const setCurrentDoc = (doc) => ({
  type: SET_CURRENT,
  doc,
});
