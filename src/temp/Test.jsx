import React from 'react';

class Test extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      num: 0,
    }
  }
  render(){
    return (
      <div>
        {this.state.num}
        <input type="button" onClick={(e) => {this.setState({
          num: this.state.num + 1
        })}}/>
        </div>
    );
  }
}

export default Test;