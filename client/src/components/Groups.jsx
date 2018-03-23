import React from 'react';
import User from './User.jsx';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="group-list">
        {this.props.groups.map((group, index) => (
          <User key={index} group={group} num={index} />
        ))}
      </div>
    );
  }
}
