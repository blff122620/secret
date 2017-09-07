import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import UserEditor from '../user/UserEditor';
import { get } from '../../utils/request';
import config from '../../config/config';

const fetchUrl = config.url.user;
class UserEditorPage extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentWillMount () {
    const userId = this.props.match.params.id;
    get(this.props.history, `${fetchUrl}/${userId}`)
      // .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          user: res
        });
      });
  }

  render(){
    const {user} = this.state;
    return (
      <HomeLayout title="编辑用户">
        {
          user ? <UserEditor editTarget={user} {...this.props}/> : '加载中...'
        }
      </HomeLayout>
    );
  }
}

export default UserEditorPage;
