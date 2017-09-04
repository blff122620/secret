import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import UserEditor from '../user/UserEditor';

class UserCreaterPage extends React.Component{
  render(){
    return (
      <HomeLayout title="添加用户">
        <UserEditor {...this.props}/>
      </HomeLayout>
    );
  }
}

export default UserCreaterPage;