import React from 'react';

export default class Groups extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render() {
    return (
      <div>
        {this.props.groups.map((group, index) => (
          <div className="group" key={index}>
            <ul>
              <li>{group}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
