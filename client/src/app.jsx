import React from 'react';
import ReactDOM from 'react-dom';
import AddUser from './components/AddUser.jsx';
import GroupList from './components/GroupList.jsx';
import CreateGroups from './components/CreateGroups.jsx';
import Groups from './components/Groups.jsx';
import History from './components/History.jsx';

const axios = require('axios');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
      history: [],
    };
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
  }

  handleOnAdd(user) {
    axios.post('/user', {
      user
    }).then(() => {
      axios.get('/users')
        .then((response) => {
          console.log(response.data);
          const newList = response.data.map((item) => {
            return item.name;
          });
          this.setState({
            users: newList
          });
        });
    })
    .catch(error => console.log(error));
  }

  handleOnCreate(newGroup) {
    const updatedHistory = this.state.history.slice();
    updatedHistory.push(newGroup);
    this.setState({
      groups: newGroup,
      history: updatedHistory
    });
  }

  handleOnRemove(user) {
    axios.post('/delete', {
      user
    }).then(() => {
      axios.get('/users')
        .then((response) => {
          console.log(response.data);
          const newList = response.data.map((item) => {
            return item.name;
          });
          this.setState({
            users: newList
          });
        });
    })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <div className="navbar">
          <button onClick={this.handleOnLogin} type="submit">Log In</button>
          <h1>Group Generator 3000</h1>
        </div>
        <div className="content">
          <AddUser add={this.handleOnAdd} />
          <GroupList names={this.state.users} delete={this.handleOnRemove} />
          <br />
          <CreateGroups names={this.state.users} create={this.handleOnCreate} />
          <br />
          <Groups groups={this.state.groups} />
        </div>
        <div className="sidebar">
          <History groups={this.state.history} />
        </div>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
