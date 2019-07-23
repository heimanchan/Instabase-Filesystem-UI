import React from 'react';
import File from './file';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: this.props.children,
      hideChildren: true
    }
  }

  toggleChildren() {
    this.setState(
      {hideChildren: !this.state.hideChildren}
    );
  }

  render() {
    let children;
    let style = this.state.hideChildren ? { display: "none" } : { display: "block" };

    if (this.state.children) {
      children = this.state.children.map(
        child => <li key={child.name}>{child.name}</li>
      )
    } else ""

    return (
      <div>
        <h3 onClick={e => this.toggleChildren()}>{this.state.name}</h3>        
        <ul style={style}>{children}</ul>
      </div>
      
    )
  }
}

export default Folder;