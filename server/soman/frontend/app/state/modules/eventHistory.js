import API from './../../../api'
const TOGGLE_EVENT_HISTORY_MODAL = 'TOGGLE_EVENT_HISTORY_MODAL';
const LOAD_EVENT_HISTORY = 'LOAD_EVENT_HISTORY';

export function closeEventHistory() {
  return {
    type: TOGGLE_EVENT_HISTORY_MODAL,
    active: false
  }
}

export function showEventHistory(sensorId) {
  return (dispatch, getState) => {
    API.sensors.getLatestEventsForSensor(sensorId).then(events => {
      dispatch({
        type: LOAD_EVENT_HISTORY,
        events
      })
      dispatch({
        type: TOGGLE_EVENT_HISTORY_MODAL,
        active: true
      })
    })
  };
}

const defaultState = {
  modalActive: false,
  events: []
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_EVENT_HISTORY:
      return {
        ...state,
        events: action.events
      }
    case TOGGLE_EVENT_HISTORY_MODAL:
      return {
        ...state,
        active: action.active
      };
    default:
      return state;
  }
}
