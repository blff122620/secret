import React from 'react';
// import { Link } from 'react-router-dom';
import Input from '../form/Input';
import Select from '../form/Select';
import formProvider from '../../utils/formProvider';
import './style.css';

const fetchUrl = 'http://localhost:3001/user';
class UserAdd extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    
    const {form: {username, name, age, gender}, formValid} = this.props;
    if(!formValid()){
      return;
    }
    
    fetch(fetchUrl, {
      method: 'post',
      body: JSON.stringify({
        username: username.value,
        name:name.value,
        age:age.value,
        gender:gender.value,
      }),
      headers: { 
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if(res.ok){
        console.log(res);
        this.props.history.push('/user/list');
      }
    });
    
  }
  render () {
    const {form: {username, name, age, gender}, onFormChange} = this.props;
    return (
      
      <div className="m-useradd">
        <form onSubmit={this.handleSubmit} >
          <Input errorText={username.error} className="m-input" hintText="请填写用户名" required floatingLabelText="用户名" value={username.value} type="text" name="username" onChange={(e) => onFormChange(e)} />
          <Input errorText={name.error} className="m-input" hintText="请填写姓名" required floatingLabelText="姓名" value={name.value} type="text" name="name" onChange={(e) => onFormChange(e)} />
          <Input errorText={age.error} className="m-input" floatingLabelText="年龄" hintText="请输入年龄" value={age.value} type="number" name="age" onChange={(e) => onFormChange(e)} />
          <Select className="m-input" floatingLabelText="性别" name="gender" value={gender.value} options={[
            {value:'male',name:'男'},
            {value:'female',name:'女'},
          ]} onChange={(e, index, value) => onFormChange(e, index, value, 'gender')} />
          
          <br/>
          <div className="m-useradd">
            <Input className="m-input" type="submit" primary value="提交"/>
          </div>
        </form>
      </div>
       
    );
  }
}
const ValidUserAdd = formProvider(UserAdd, {
  username:{
    defaultValue: '',
    rules:[
      {
        pattern: function(v){
          return v.length > 0;
        },
        error: '请输入用户名',
      },
      {
        pattern: /^[a-zA-Z_0-9]{1,10}$/,
        error: '用户名最多10个字符,允许字母，数字，下划线',
      }
    ],
  },
  name:{
    defaultValue: '',
    rules:[
      {
        pattern: function(v){
          return v.length > 0;
        },
        error: '请输入姓名',
      },
      {
        pattern: /^.{1,4}$/,
        error: '姓名最多四个字符',
      }
    ],
  },
  age:{
    defaultValue: '',
    rules:[
      {
        pattern: function(v){
          return v > 0 && v < 100;
        },
        error: '年龄需要在100以内',
      },
    ],
  },
  gender:{
    defaultValue: 'male',
    rules:[
      
    ],
  },
});
export default ValidUserAdd;