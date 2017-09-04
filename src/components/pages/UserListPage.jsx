import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import UserList from '../user/UserList';

class UserListPage extends React.Component{
  render(){
    return (
      <HomeLayout title="用户列表">
        <UserList {...this.props}/>
      </HomeLayout>
    );
  }
}

export default UserListPage;