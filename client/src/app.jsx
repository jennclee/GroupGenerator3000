import React from 'react';
import ReactDOM from 'react-dom';
import AddUser from './components/AddUser.jsx';
import GroupList from './components/GroupList.jsx';

// const axios = require('axios');

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
    };
    this.handleOnAdd = this.handleOnAdd.bind(this);
  }

  handleOnAdd(user) {
    const newList = this.state.users;
    newList.push(user);
    this.setState({
      users: newList,
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
        <div>
          <GroupList names={this.state.users} />
        </div>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
