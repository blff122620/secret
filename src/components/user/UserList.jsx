import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { get, del } from '../../utils/request';
import config from '../../config/config';

const fetchUrl = `${config.fetchUrl}/user`;

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
    get(this.props.history, fetchUrl)
    // .then(res => res.json())
    .then(res => {
      this.setState({
        userList: res
      });
    })
    .catch((err) => {
      alert(err);
    });
  }
  handleEdit(user){
    this.props.history.push('/user/edit/' + user.id);
  }
  handleDel(user){
    if (window.confirm(`确定要删除用户 ${user.name} 吗？`)) {
      del(this.props.history, `${fetchUrl}/${user.id}`)
        // .then(res => res.json())
        .then(res => {
          this.setState({
            userList: this.state.userList.filter(item => item.id !== user.id)
          });
          alert('删除用户成功');
        })
        .catch(err => {
          console.error(err);
          alert('删除用户失败');
        });
    }
  }
  render(){
    const { userList } = this.state;
    return (
      <div style={{
        width: '800px'
      }}>
      {userList.length>0 ? 
        <Table selectable={false} >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>用户名</TableHeaderColumn>
              <TableHeaderColumn>姓名</TableHeaderColumn>
              <TableHeaderColumn>年龄</TableHeaderColumn>
              <TableHeaderColumn>性别</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {userList.map((user,idx) => (
              <TableRow key={user.id}>
                <TableRowColumn>{user.id}</TableRowColumn>
                <TableRowColumn>{user.username}</TableRowColumn>
                <TableRowColumn>{user.name}</TableRowColumn>
                <TableRowColumn>{user.age}</TableRowColumn>
                <TableRowColumn>{user.gender}</TableRowColumn>
                <TableRowColumn>
                  <a onClick={() => this.handleEdit(user)}>编辑</a>
                  <a onClick={() => this.handleDel(user)}>删除</a>
                </TableRowColumn>
              </TableRow>
            ))}
          
          </TableBody>
        </Table>
        :
        '加载中.....'
      }
      </div>
    );
  }
}

export default UserList;