import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import ActionHome from 'material-ui/svg-icons/action/home';
import FontIcon from 'material-ui/FontIcon';

const fetchUrl = 'http://localhost:3001/user';

class UserList extends React.Component{
  
  constructor (props) {
    super(props);
    this.state = {
      userList: []
    };
    this.handleDel = this.handleDel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  componentWillMount(){
    fetch(fetchUrl)
    .then(res => res.json())
    .then(res => {
      this.setState({
        userList: res
      });
    });
  }
  handleEdit(){
    console.log('hi');
  }
  handleDel(){

  }
  render(){
    const { userList } = this.state;
    return (
      <div style={{
        width: '800px'
      }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>用户名</TableHeaderColumn>
              <TableHeaderColumn>姓名</TableHeaderColumn>
              <TableHeaderColumn>年龄</TableHeaderColumn>
              <TableHeaderColumn>性别</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user,idx) => (
              <TableRow key={user.id}>
                <TableRowColumn>{idx+1}</TableRowColumn>
                <TableRowColumn>{user.username}</TableRowColumn>
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.age}</TableRowColumn>
                <TableRowColumn>{user.gender}</TableRowColumn>
                <TableRowColumn>
                  

                </TableRowColumn>
              </TableRow>
            ))}
          
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default UserList;