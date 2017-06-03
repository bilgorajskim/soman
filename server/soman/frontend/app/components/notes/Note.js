import React, {PureComponent} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import moment from 'moment'

class Note extends PureComponent {

  componentWillMount() {
  }

  render() {
    let note = this.props.note;

    return <Card style={{margin: '2em 0'}}>
    <CardTitle title={note.title} subtitle={moment(note.date).format('DD.MM.YYYY')} />
    <CardText>
      {note.text}
    </CardText>
  </Card>
  }
}

export default Note;
