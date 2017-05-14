export function showNotification(notification) {
  return {
    type: 'SHOW_NOTIFICATION',
    notification
  };
}

const defaultState = {
  loading: false,
  notification: {
    type: '',
    message: ''
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'SHOW_NOTIFICATION':
      return {
        notification: action.notification
      };
    default:
      return state
  }
}
