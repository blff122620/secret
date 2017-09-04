import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Login from '../user/Login';

class LoginPage extends React.Component{
  render(){
    return (
      <HomeLayout title="用户登录">
        <Login {...this.props}/>
      </HomeLayout>
    );
  }
}

export default LoginPage;