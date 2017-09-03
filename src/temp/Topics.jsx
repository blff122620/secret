import React from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Topics extends React.Component{
  constructor(props){
    super(props);
    this.match = this.props.match;
  }
  render(){
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${this.match.url}/rendering`}>
              Rendering with React
            </Link>
          </li>
          <li>
            <Link to={`${this.match.url}/components`}>
              Components
            </Link>
          </li>
          <li>
            <Link to={`${this.match.url}/props-v-state`}>
              Props v. State
            </Link>
          </li>
        </ul>
    
        <Route path={`${this.match.url}/:topicId`} component={Topic}/>
        <Route exact path={this.match.url} render={() => (
          <h3>Please select a topic.</h3>
        )}/>
        <Link to={this.match.url}>返回</Link>
        <Link to="/">返回主页</Link>
      </div>
    );
  }
}

function Topic({match}){
  return <div>{match.params.topicId}</div>;
}


export default Topics;