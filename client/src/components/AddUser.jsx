import React from 'react';

export default class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      user: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.add(this.state.user);
    document.getElementById('userForm').reset();
  }

  render() {
    return (
      <div>
        <form id="userForm">
          <input onChange={this.handleOnChange} type="text" />
          <button onClick={this.handleOnSubmit} type="submit">Add User</button>
        </form>
      </div>
    );
  }
}
