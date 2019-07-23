import React from 'react';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      name: this.props.name
    }
  }

  render() {
    return (
      <div>
        <h3>{this.state.name}</h3>
      </div>
    )
  }
}

export default File;