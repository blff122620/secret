import React from 'react';
import PropTypes from 'prop-types';
// import {List} from 'immutable';

class Button extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {}
  }

  handleClick(e){

  }
  render(){
    return (
      <button onClick={this.handleClick} style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string,
}


class Message extends React.Component{
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.props.fn({
  //       hi: '123',
  //     });
  //   },3000)

  // }
  render(){
    return (
      <div ref={()=> setTimeout(()=>{
       this.props.fn({
         hi: '123',
       });
     },3000)}>
        {this.props.text}
        <Button >
          hi
        </Button>
      </div>
    );
  }
}

class MessageList extends React.Component{
  constructor(props){
    super(props);
    this.fn = this.fn.bind(this);
    this.state ={
      hi: '444'
    }
  }
  getChildContext(){
    return {
      color: 'purple'
    }
  }
  fn(newState){
    this.setState(newState);
  }
  render(){
    return (

      <div>
        ....{this.state.hi}
        {this.props.messages && this.props.messages.map((message,idx) =>
          <Message key={idx} text={message.text} fn={this.fn} />
        )}
      </div>
    );
  }
}
MessageList.childContextTypes = {
  color: PropTypes.string,
}

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focus = this.focus.bind(this);
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focus}
        />
      </div>
    );
  }
}
export {CustomTextInput};
export default MessageList;
