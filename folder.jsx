import React from 'react';
import File from './file';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: this.props.children,
      ancestor: this.props.ancestor,
      hideChildren: true,
      editingName:false,
      highlight: false
    }

    this.doClick = this.doClick.bind(this)
    this.doDoubleClick = this.doDoubleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleInputField = this.toggleInputField.bind(this)
    this.changeNodeName = this.changeNodeName.bind(this)
    this.allAncestors = this.allAncestors.bind(this)
    this.highlightComponent = this.highlightComponent.bind(this)
  }

  componentWillMount() {
    this.clickTimeout = null;
  }

  componentDidMount() {
    this.changeNodeName();
    this.highlightComponent();
  }

  componentWillUnmount() {
    let inputField = document.getElementById(`input-${this.state.name}`);
    inputField.removeEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.toggleInputField();
      }
    });
  }

  handleClicks() {
    if (this.clickTimeout !== null) {
      this.doDoubleClick();

      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
    } else {
      this.clickTimeout = setTimeout(() => {
        this.doClick();

        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }, 250)
    }
  }

  doClick() {
    // this.allAncestors();
    this.setState({ hideChildren: !this.state.hideChildren });
  }

  doDoubleClick() {
    this.toggleInputField();
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
    this.allAncestors();
  }
  
  toggleInputField() {
    this.setState({ editingName: !this.state.editingName });
  }

  changeNodeName() {
    let inputField = document.getElementById(`input-${this.state.name}`);
    inputField.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.toggleInputField();
      }
    });
  }

  convertChildrenIntoComponent() {
    let children;

    if (this.state.children) {
      children = this.state.children.map(
        child => {
          if (child.type === "file") {
            return <li key={child.name}><File name={child.name} ancestor={this}/></li>
          } else {
            return <li key={child.name}><Folder name={child.name} children={child.children} ancestor={this}/></li>
          }
        })
    } else ""

    return children
  }

  allAncestors(node = this) {
    let currNode = document.getElementById(`anc-${node.state.name}`);

    if (node.state.ancestor === null) {
      console.log("root")
      return currNode.style.background = "yellow";
    }

    // this.setState({ highlight: true })
    currNode.style.background = "yellow"
    console.log(node.state.name)
    this.allAncestors(node.state.ancestor)
  }

  highlightComponent() {
    if (this.state.highlight) {
      // let node = document.getElementById(`anc-${this.state.name}`);
      // node.style.background = "yellow"
      console.log("hi")
    }
  }
  
  render() {
    let showChildren = this.state.hideChildren ? { display: "none" } : { display: "block" };
    let showEditField = this.state.editingName ? { display: "block" } : { display: "none" };
    let showNodeName = this.state.editingName ? { display: "none" } : { display: "block" };

    return (
      <div>
        <h3 
          id={`anc-${this.state.name}`}
          style={showNodeName} 
          onClick={() => this.handleClicks()}
        >{this.state.name}</h3>

        <input 
          id={`input-${this.state.name}`} 
          style={showEditField} 
          value={this.state.name}
          onChange={this.handleChange} 
          type="text" 
        />

        <ul style={showChildren}>{this.convertChildrenIntoComponent()}</ul>
      </div>
    )
  }
}

export default Folder;