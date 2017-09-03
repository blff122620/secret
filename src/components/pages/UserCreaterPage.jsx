import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import UserCreater from '../user/UserCreater';

class UserCreaterPage extends React.Component{
  render(){
    return (
      <HomeLayout title="添加用户">
        <UserCreater />
      </HomeLayout>
    );
  }
}

export default UserCreaterPage;