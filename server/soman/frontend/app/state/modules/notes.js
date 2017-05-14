const LOAD_NOTES = 'LOAD_NOTES';
const ADD_NOTE = 'ADD_NOTE';
const EDIT_NOTE = 'EDIT_NOTE';

export function loadNotes(notes) {
  return {
    type: LOAD_NOTES,
    notes
  };
}

export function addNote() {
  return {
    type: ADD_NOTE,
    note: {
      text: 'Wpisz tekst'
    }
  };
}


export function editNote(noteId, updatedProps) {
  return {
    type: EDIT_NOTE,
    noteId,
    note: updatedProps
  };
}

const defaultState = [];

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case LOAD_NOTES:
      return action.notes;
    case ADD_NOTE:
      return [...state, action.note];
    case EDIT_NOTE:
      return state.map(note => {
        if (note.id == action.noteId)
        {
          return {
            ...note,
            ...action.note
          }
        }
        return note;
      });
    default:
      return state;
  }
}
