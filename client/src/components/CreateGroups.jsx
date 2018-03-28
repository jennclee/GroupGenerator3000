import React from 'react';


// const createGroups = (min, group) => {
//   const randomizedGroup = {};
//   for (let i = 0; i < group.length; i++) {
//     const idx = Math.random();
//     randomizedGroup[group[i]] = idx;
//   }
//   const sortableGroup = [];
//   for (let key in randomizedGroup) {
//     sortableGroup.push([key, randomizedGroup[key]]);
//   }
//   const sortedGroup = sortableGroup.sort((a, b) => {
//     return a[1] - b[1];
//   });

//   const groupings = [];
//   let miniGroup = [];
//   let position = 0;
//   const leftover = group.length % min;
//   for (let j = 0; j < sortedGroup.length - leftover; j++) {
//     if (miniGroup.length === min - 1) {
//       miniGroup.push(sortedGroup[j][0]);
//       groupings.push(miniGroup);
//       miniGroup = [];
//       position++;
//     } else if (miniGroup.length < min - 1) {
//       miniGroup.push(sortedGroup[j][0]);
//       position++;
//     }
//   }

//   if (leftover === min - 1 && leftover !== 1) {
//     const leftoverGroup = [];
//     for (position; position < group.length; position++) {
//       leftoverGroup.push(sortedGroup[position][0]);
//     }
//     groupings.push(leftoverGroup);
//   } else if (leftover !== 0) {
//     if (leftover === 1 && min === 2) {
//       position--;
//     }
//     for (let k = 0; k < leftover; k++) {
//       groupings[k].push(sortedGroup[position][0]);
//       position++;
//     }
//   }

//   return groupings;
// };

const createGroups = (min, group) => {
  let temp;
  const groupings = [];
  if (group.length < 2 || min >= group.length) {
    return [group];
  }
  for (let i = 0; i < group.length; i++) {
    const idx = Math.floor(Math.random() * group.length);
    temp = group[i];
    group[i] = group[idx];
    group[idx] = temp;
  }

  let miniGroup = [];
  let position = 0;
  const leftover = group.length % min;
  for (let j = 0; j < group.length - leftover; j++) {
    if (miniGroup.length === min - 1) {
      miniGroup.push(group[j]);
      groupings.push(miniGroup);
      miniGroup = [];
      position++;
    } else if (miniGroup.length < min - 1) {
      miniGroup.push(group[j]);
      position++;
    }
  }

  if (leftover === min - 1) {
    const leftoverGroup = [];
    for (position; position < group.length; position++) {
      leftoverGroup.push(group[position]);
    }
    groupings.push(leftoverGroup);
  } else if (leftover !== 0) {
    for (let k = 0; k < leftover; k++) {
      groupings[k].push(group[position - 1]);
      position++;
    }
  }

  return groupings;
};


export default class CreateGroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimum: 3
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
    const groupings = createGroups(this.state.minimum, this.props.names);
    this.props.create(groupings);
    this.props.hist(groupings);
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
