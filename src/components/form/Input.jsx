import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  inputHeight:{
    height: '72px'
  }
}

class MyInput extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    this.props.onChange(e);
  }
  render() {
    const isBtn = (this.props.type === 'submit' || this.props.type === 'button')?
      true: false; 
    const isRaised = this.props.raised; // 非扁平化按钮
    const result = isBtn? 
      (isRaised ?
        <RaisedButton label={this.props.value}  {...this.props}/>
        :
        <FlatButton label={this.props.value}  {...this.props}/>
      )
      :
      <div>
        <TextField 
          {...this.props}
        />
      </div>;
    return (
      <div style={styles.inputHeight}>
        {result}
      </div>
    );
    
  }
}

export default MyInput;
