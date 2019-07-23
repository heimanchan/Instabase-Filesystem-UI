import React from 'react';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: []
    }
  }

  render() {
    let children = this.state.children.map(child => <li>{child.name}</li>)

    return (
      <div>
        <h2>{this.state.name}</h2>
        <ul>
          {children}
        </ul>
      </div>
      
    )
  }
}

export default Folder;