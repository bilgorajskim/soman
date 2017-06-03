import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default class EventHistory extends React.Component {
  handleClose = () => {
    this.props.onClose()
  };

  render() {
    const actions = [
      <FlatButton
        label="Zamknij"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          title="Historia zdarzeń"
          actions={actions}
          modal={false}
          open={true}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Data</TableHeaderColumn>
                <TableHeaderColumn>Zdarzenie</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.props.events.map(event => {
                let eventText = ''
                return <TableRow>
                <TableRowColumn>{moment(event.date).format('DD.MM.YYYY mm:ss')}</TableRowColumn>
                <TableRowColumn>{eventText}</TableRowColumn>
              </TableRow>;
              })}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}
