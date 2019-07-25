import React from 'react';

class File extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      name: this.props.name
    }

    // this.handleChange = this.handleChange.bind(this)
    // this.toggleInputField = this.toggleInputField.bind(this)
    // this.changeNodeName = this.changeNodeName.bind(this)
    // this.highlightAncestorChain = this.highlightAncestorChain.bind(this)
  }

  componentWillMount() {
    this.clickTimeout = null;
  }

  componentDidMount() {
    // this.changeNodeName();
  }

  componentWillUnmount() {
    let inputField = document.getElementById(`input-${this.state.name}`);
    inputField.removeEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.toggleInputField();
      }
    });
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