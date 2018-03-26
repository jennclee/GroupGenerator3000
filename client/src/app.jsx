import React from 'react';
import ReactDOM from 'react-dom';
import AddUser from './components/AddUser.jsx';
import UserList from './components/UserList.jsx';
import CreateGroups from './components/CreateGroups.jsx';
import Groups from './components/Groups.jsx';
import History from './components/History.jsx';

const axios = require('axios');

const parseData = (data) => {
  const results = [];
  let histTracker;
  let groupTracker;
  let histIdx = 0;
  let groupIdx = 0;
  for (let i = 0; i < data.length; i++) {
    const { group_id, history_id, name } = data[i];
    if (results.length === 0) {
      results.push([[name]]);
      histTracker = history_id;
      groupTracker = group_id;
    } else if (groupTracker !== group_id && histTracker === history_id) {
      groupTracker = group_id;
      groupIdx += 1;
      results[histIdx].push([name]);
    } else if (groupTracker !== group_id && histTracker !== history_id) {
      groupTracker = group_id;
      histTracker = history_id;
      groupIdx = 0;
      histIdx += 1;
      results.push([[name]]);
    } else if (groupTracker === group_id && histTracker === history_id) {
      results[histIdx][groupIdx].push(name);
    }
  }
  return results;
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      groups: [],
      history: [],
      group_num: 1,
      history_num: 1,
    };
    this.handleOnAdd = this.handleOnAdd.bind(this);
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
    this.handleCreateHistory = this.handleCreateHistory.bind(this);
  }

  handleOnAdd(user) {
    axios.post('/user', {
      user
    }).then(() => {
      axios.get('/users')
        .then((response) => {
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
    this.setState({
      groups: newGroup,
    });
  }

  handleCreateHistory(newGroup) {
    let histNum = this.state.history_num;
    let groupNum = this.state.group_num;
    const history = [];
    for (let i = 0; i < newGroup.length; i++) {
      for (let j = 0; j < newGroup[i].length; j++) {
        history.push([groupNum, newGroup[i][j], histNum]);
      }
      groupNum++;
    }
    histNum++;
    axios.post('/history', {
      history
    }).then(() => {
      axios.get('/history')
        .then((response) => {
          console.log('history: ', response);
          const { data } = response;
          const newHist = parseData(data);
          this.setState({
            history_num: histNum,
            group_num: groupNum,
            history: newHist
          });
        });
    });
  }

  handleOnRemove(user) {
    axios.post('/delete', {
      user
    }).then(() => {
      axios.get('/users')
        .then((response) => {
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
          <h1>Group Generator 3000</h1>
          <button onClick={this.handleOnLogin} type="submit">Log In</button>
        </div>
        <div className="content">
          <AddUser add={this.handleOnAdd} />
          <UserList names={this.state.users} delete={this.handleOnRemove} />
          <br />
          <CreateGroups names={this.state.users} create={this.handleOnCreate} hist={this.handleCreateHistory} />
          <br />
          <Groups groups={this.state.groups} />
        </div>
        <div className="sidebar">
          <h3>Grouping History</h3>
          <History groups={this.state.history} />
        </div>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
