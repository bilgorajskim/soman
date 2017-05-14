import React, {PureComponent} from 'react';
import {RIEToggle, RIEInput, RIETextArea, RIENumber, RIETags, RIESelect} from 'riek'
import {Button} from 'reactstrap';
import EditIcon from 'react-icons/lib/fa/edit';
import NoteModal from './NoteModal';
import tinycolor from 'tinycolor2';

class Note extends PureComponent {

  componentWillMount() {
    this.setState({
      modal: false,
      note: this.props.note
    });
  }

  _onText(e) {
    console.info('Text', e.target.value);
    this.setState({
      note: {
        ...this.state.note,
        text: e.target.value
      }
    });
  }

  _showModal() {
    this.setState({
      modal: true
    });
  }

  render() {
    let note = this.state.note;
    let {color} = note;

    console.log('rendering note', note);

    let bgColor = tinycolor(color);

    let noteStyles = {
      backgroundColor: color,
      color: bgColor.isDark() ? '#fff' : '#000'
    };

    return <div className="note" style={noteStyles}>
      <textarea onChange={::this._onText} value={note.text} className="note__textarea" />
      <Button size="sm" className="note__edit" color="secondary" onClick={::this._showModal}>
        <EditIcon/>
      </Button>
      {this.state.modal?(

        <NoteModal note={note} onClose={() => {
          this.setState({modal:false})
        }} onChange={(newProps) => {
          console.log('saved', newProps.color);
          this.setState({
            note: {
              ...this.state.note,
              color: newProps.color
            }
          });
        }} />

        ):null}
    </div>
  }
}

export default Note;
