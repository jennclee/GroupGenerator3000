import React from 'react';
import HistoryGroup from './HistoryGroup.jsx';

export default class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="history">
        {this.props.groups.map((group, index) => (
          <HistoryGroup key={index} group={group} num={this.props.groups.length - index} />
        ))}
      </div>
    );
  }
}
