import React from 'react';
import File from './file';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: this.props.children
    }
  }

  render() {
    let children = this.state.children;
    // children ? children.map(child => <li>{child.name}</li>) : "";
    console.log(children)

    return (
      <div>
        <h2>{this.state.name}</h2>
        <ul>
          {/* {children} */}
        </ul>
      </div>
      
    )
  }
}

export default Folder;