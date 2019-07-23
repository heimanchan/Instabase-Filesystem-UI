import React from 'react';
import File from './file';

class Folder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      children: this.props.children,
      hideChildren: true,
      timer: 0,
      delay: 250,
      prevent: false
    }

    // this.getClickHandler = this.getClickHandler.bind(this)
    this.doClick = this.doClick.bind(this)
    this.doDoubleClick = this.doDoubleClick.bind(this)
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
    console.log("Double!")
  }

  // getClickHandler(onClick, onDblClick, delay = 1000) {
  //   let timeoutID = null;

  //   if (!timeoutID) {
  //     timeoutID = setTimeout(function () {
  //       console.log("Single!")  
  //       onClick();
  //       timeoutID = null
  //     }, delay);
  //   } else {
  //     timeoutID = clearTimeout(timeoutID);
  //     console.log("Double Click!")          
  //     onDblClick();
  //   }
  // }

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
    let style = this.state.hideChildren ? { display: "none" } : { display: "block" };

    return (
      <div>
        <h3 onClick={e => 
          this.handleClicks()
          }>{this.state.name}</h3>
        <ul style={style}>{this.convertChildrenIntoComponent()}</ul>
      </div>
      
    )
  }
}

export default Folder;