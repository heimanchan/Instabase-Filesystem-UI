import React from 'react';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      name: this.props.name,
      ancestor: this.props.ancestor,
      editingName: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.toggleInputField = this.toggleInputField.bind(this)
    this.changeNodeName = this.changeNodeName.bind(this)
    this.highlightAncestorChain = this.highlightAncestorChain.bind(this)
  }

  componentWillMount() {
    this.clickTimeout = null;
  }

  componentDidMount() {
    this.changeNodeName();
  }

  componentWillUnmount() {
    let inputField = document.getElementById(`input-${this.state.name}`);
    inputField.removeEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.toggleInputField();
      }
    });
  }

  doDoubleClick() {
    this.toggleInputField();
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
    this.highlightAncestorChain();
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

  highlightAncestorChain(node = this) {
    let currNode = document.getElementById(`anc-${node.state.name}`);

    if (node.state.ancestor === null) {
      console.log("root")
      return currNode.style.background = "yellow";
    }

    currNode.style.background = "yellow"
    console.log(node.state.name)
    this.highlightAncestorChain(node.state.ancestor)
  }

  render() {
    let showEditField = this.state.editingName ? { display: "block" } : { display: "none" };
    let showNodeName = this.state.editingName ? { display: "none" } : { display: "block" };

    return (
      <div>
        <h3
          id={`anc-${this.state.name}`}
          style={showNodeName}
          onDoubleClick={() => this.doDoubleClick()}
        >{this.state.name}</h3> 

        <input
          id={`input-${this.state.name}`}
          style={showEditField}
          value={this.state.name}
          onChange={this.handleChange}
          type="text"
        />
      </div>
    )
  }
}

export default File;