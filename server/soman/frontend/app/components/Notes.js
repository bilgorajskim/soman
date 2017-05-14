import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import {Row, Col, Button} from 'reactstrap';
import Grid from './notes/Grid.js';
import {loadNotes as loadNotes2} from './../state/modules/notes.js';

class Notes extends PureComponent {
  render() {
    let {notes} = this.props;

    let gridOptions = {
      items: notes
    };

    return <div>
      <h1>Ogłoszenia</h1>
      <Button color="primary">
        Dodaj ogłoszenie
      </Button>
      <Grid className="notes-app__notes"
                 {...gridOptions}>
      </Grid>
    </div>;
  }

  componentDidMount() {
    this.props.loadNotes([
      {
        id: 1,
        text: 'testowa notatka',
        color: 'white'
      },
      {
        id: 2,
        text: 'testowa notatka',
        color: 'orange'
      },
      {
        id: 13,
        text: 'testowa notatka',
        color: 'cyan'
      }
    ]);
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadNotes: (notes) => dispatch(loadNotes2(notes))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes)
