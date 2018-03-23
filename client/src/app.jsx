import React from 'react';
import ReactDOM from 'react-dom';
import AddUser from './components/AddUser.jsx';
import GroupList from './components/GroupList.jsx';
import CreateGroups from './components/CreateGroups.jsx';
import Groups from './components/Groups.jsx';

// const axios = require('axios');

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
    const newList = this.state.users.slice();
    newList.push(user);
    this.setState({
      users: newList,
    });
  }

  handleOnCreate(newGroup) {
    this.setState({
      groups: newGroup
    });
  }

  handleOnRemove(user) {
    const idx = this.state.users.indexOf(user);
    const updatedList = this.state.users.slice();
    updatedList.splice(idx, 1);
    console.log(updatedList);
    this.setState({
      users: updatedList
    });
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <button onClick={this.handleOnLogin} type="submit">Log In</button>
          <h1>Group Generator 3000</h1>
          <AddUser add={this.handleOnAdd} />
        </div>
        <div className="content">
          <GroupList names={this.state.users} delete={this.handleOnRemove} />
          <br />
          <CreateGroups names={this.state.users} create={this.handleOnCreate} />
          <br />
          <Groups groups={this.state.groups} />
        </div>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
