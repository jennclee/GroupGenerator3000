import React from 'react';


const createGroups = (min, group) => {
  const randomizedGroup = {};
  for (let i = 0; i < group.length; i++) {
    const idx = Math.random();
    randomizedGroup[group[i]] = idx;
  }
  const sortableGroup = [];
  for (let key in randomizedGroup) {
    sortableGroup.push([key, randomizedGroup[key]]);
  }
  const sortedGroup = sortableGroup.sort((a, b) => {
    return a[1] - b[1];
  });

  const groupings = [];
  let miniGroup = [];
  let position = 0;
  const leftover = group.length % min;
  for (let j = 0; j < sortedGroup.length - leftover; j++) {
    if (miniGroup.length === min - 1) {
      miniGroup.push(sortedGroup[j][0]);
      groupings.push(miniGroup);
      miniGroup = [];
      position++;
    } else if (miniGroup.length < min - 1) {
      miniGroup.push(sortedGroup[j][0]);
      position++;
    }
  }

  if (leftover === min - 1) {
    const leftoverGroup = [];
    for (position; position < group.length; position++) {
      leftoverGroup.push(sortedGroup[position][0]);
    }
    groupings.push(leftoverGroup);
  } else if (leftover !== 0) {
    for (let k = 0; k < leftover; k++) {
      groupings[k].push(sortedGroup[position - 1][0]);
      position++;
    }
  }

  return groupings;
};


export default class CreateGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimum: 3,
      groups: []
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      minimum: event.target.value
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.create(createGroups(this.state.minimum, this.props.names));
    document.getElementById('groupForm').reset();
  }

  render() {
    return (
      <div>
        <p>Minimum number of people per group (default is 3): </p>
        <form id="groupForm">
          <input onChange={this.handleOnChange} type="text" />
          <button onClick={this.handleOnSubmit} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
