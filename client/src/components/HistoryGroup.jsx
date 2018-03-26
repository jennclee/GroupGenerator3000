import React from 'react';
import HistoryGroupItem from './HistoryGroupItem.jsx';

export default class HistoryGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="group">
        <h3>Historical Grouping # {this.props.num}</h3>
        {this.props.group.map((items, index) => (
          <ul>
            <HistoryGroupItem items={items} />
          </ul>
        ))}
      </div>
    );
  }
}
