import React from 'react';
import File from './file';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: this.props.children,
      hideChildren: true,
      editingName:false,
      highlight: false
    }

    this.doClick = this.doClick.bind(this)
    this.doDoubleClick = this.doDoubleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showInputField = this.showInputField.bind(this)
  }

  componentWillMount() {
    this.clickTimeout = null
  }

  handleClicks() {
    if (this.clickTimeout !== null) {
      this.doDoubleClick();
      console.log('double click executes')
      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
    } else {
      console.log("single click")
      this.clickTimeout = setTimeout(() => {
        this.doClick();
        console.log('first click executes ')
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }, 250)
    }
  }

  doClick() {
    this.setState({ hideChildren: !this.state.hideChildren });
  }

  doDoubleClick() {
    this.showInputField()
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
    let inputField = document.getElementById(`input-${this.state.name}`);
    inputField.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        console.log('Enter')
        this.setState({ editingName: !this.state.editingName });
      }
    });
  }
  
  showInputField() {
    this.setState({ editingName: !this.state.editingName });
  }

  convertChildrenIntoComponent() {
    let children;

    if (this.state.children) {
      children = this.state.children.map(
        child => {
          if (child.type === "file") {
            return <li key={child.name}><File name={child.name}/></li>
          } else {
            return <li key={child.name}><Folder name={child.name} children={child.children} /></li>
          }
        })
    } else ""

    return children
  }
  
  render() {
    let showChildren = this.state.hideChildren ? { display: "none" } : { display: "block" };
    let showEditField = this.state.editingName ? { display: "block" } : { display: "none" };
    let showNodeName = this.state.editingName ? { display: "none" } : { display: "block" };

    return (
      <div>
        <h3 style={showNodeName} 
          onClick={() => this.handleClicks()}>{this.state.name}
        </h3>

        <input id={`input-${this.state.name}`} 
          style={showEditField} 
          value={this.state.name}
          onChange={this.handleChange} 
          type="text" />

        <ul style={showChildren}>{this.convertChildrenIntoComponent()}</ul>
      </div>
    )
  }
}

export default Folder;