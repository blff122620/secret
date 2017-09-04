import React from 'react';
import { post } from '../../utils/request';
import formProvider from '../../utils/formProvider';
import Input from '../form/Input';
import './style.css';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();

    const {formValid, form: {account, password}} = this.props;
    if (!formValid) {
      alert('请输入账号或密码');
      return;
    }

    post(this.props.history, 'http://localhost:3001/login', {
      account: account.value,
      password: password.value
    })
      .then((res) => {
        if (res) {
          this.props.history.push('/');
        } else {
          alert('登录失败，账号或密码错误');
        }
      })
  }

  render(){
    const {form: {account, password}, onFormChange} = this.props;
    return (
      <div className="align-center">
        <form onSubmit={this.handleSubmit} >
          <Input errorText={account.error} hintText="请填写账号" required floatingLabelText="用户名" value={account.value} type="text" name="account" onChange={(e) => onFormChange(e)} />
          <Input errorText={password.error} hintText="请填写密码" required floatingLabelText="密码" value={password.value} type="password" name="password" onChange={(e) => onFormChange(e)} />
          <div className="align-center" style={
            {
              marginTop: '20px'
            }
          }>
            <Input type="submit" primary value="提交"/>
          </div>
          
        </form>
      </div>
    );
  }
}

const validLogin = formProvider(Login, {
  account:{
    defaultValue: '',
    rules:[
      {
        pattern: function(v){
          return v.length > 0;
        },
        error: '请输入账号',
      },
      {
        pattern: /^[a-zA-Z_0-9]{1,10}$/,
        error: '用户名最多10个字符,允许字母，数字，下划线',
      }
    ],
  },
  password:{
    defaultValue: '',
    rules:[
      {
        pattern: function(v){
          return v.length > 0;
        },
        error: '请输入密码',
      },
      {
        pattern: /^[a-zA-Z_0-9]{1,10}$/,
        error: '密码最多10个字符,允许字母，数字，下划线',
      }
    ],
  },

});

export default validLogin;