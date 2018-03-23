import React from 'react';

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="group">
        <h3>Group {this.props.num + 1}</h3>
        <ul>
          {this.props.group.map((name, index) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
