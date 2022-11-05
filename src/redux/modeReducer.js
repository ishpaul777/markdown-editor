const TOGGLE_SWITCH = 'TOGGLE_SWITCH';

const modeReducer = (state = 'light', action) => {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return state === 'light' ? 'dark' : 'light';
    default:
      return state;
  }
};

export const toggleMode = () => ({
  type: TOGGLE_SWITCH,
});

export default modeReducer;
