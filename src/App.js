import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // Link
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import HomePage from './components/pages/home/HomePage';
import UserCreaterPage from './components/pages/UserCreaterPage';
import UserListPage from './components/pages/UserListPage';
import UserEditorPage from './components/pages/UserEditorPage';

class App extends React.Component{
  render(){
    return (
      <MuiThemeProvider>
        <Router >
          <div>
            <Route exact path="/" component={HomePage}/>
            <Route path="/user/add" component={UserCreaterPage}/>
            <Route path="/user/list" component={UserListPage}/>
            <Route path="/user/edit/:id" component={UserEditorPage}/>
          </div>
        </Router>
      </MuiThemeProvider>
    );
    
  }
}

export default App;