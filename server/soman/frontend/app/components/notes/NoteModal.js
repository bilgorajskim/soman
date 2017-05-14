import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {CirclePicker} from 'react-color';

class NoteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined
    };
  }

  _changeColor(color) {
    console.info('new note color', color);
    this.setState({
      color
    });
  }

  _cancel() {
    this.props.onClose();
  }

  _save() {
    this.props.onChange({
      color: this.state.color.hex
    });
    this.props.onClose();
  }

  render() {
    let {note} = this.props;

    return (
      <div>
        <Modal size="sm" isOpen={true} className={this.props.className}>
          <ModalHeader toggle={::this._cancel}>Szczegóły notatki</ModalHeader>
          <ModalBody>
            <div style={{margin: '0 auto', width: '252px'}}>
              <CirclePicker
               color={ this.state.color }
               onChangeComplete={::this._changeColor} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={::this._save}>Zapisz</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default NoteModal;
