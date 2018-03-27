import React from 'react';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnDelete = this.handleOnDelete.bind(this);
  }

  handleOnDelete(nameObj) {
    this.props.delete(nameObj['key']);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.names.map((name) => (
            <li key={name}>{name} <button onClick={() => this.handleOnDelete({ key: name })}>x</button></li>
          ))}
        </ul>
      </div>
    );
  }
}
