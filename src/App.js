import React, { Component } from 'react';
import { Grid, Row, Table } from 'react-bootstrap';
import firebase from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }
  componentWillMount(){
    const messagesRef = firebase.database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault();
    firebase.database()
      .ref('messages')
      .push( this.inputEl.value );
    this.inputEl.value = '';
  }
  render() {
    return (
      <Grid>
        <Row>
          <form onSubmit={this.addMessage.bind(this)}>
            <input type="text" ref={ el => this.inputEl = el }/>
            <input type="submit"/>
            <Table>
              <tbody>
              {this.state.messages.map(message => (
                <tr><td key={message.id}>{message.text}</td></tr>)
              )}
              </tbody>
            </Table>
          </form>
        </Row>
      </Grid>
    );
  }
}

export default App;
