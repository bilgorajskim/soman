import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {loadNotes} from './../state/modules/notes.js';
import API from './../../api/index.js';
import Note from './notes/Note'

class Notes extends PureComponent {
  render() {
    let {notes} = this.props;

    return <div>
      <h1>Ogłoszenia</h1>
      <div className="notes-app__notes">
        {notes.map(n => <Note note={n} key={n.id} />)}
      </div>
    </div>;
  }

  async componentDidMount() {
    const notes = await API.announcements.getAnnouncements()
    this.props.loadNotes(notes);
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNotes: (notes) => dispatch(loadNotes(notes))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
