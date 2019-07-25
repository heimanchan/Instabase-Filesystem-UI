import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './folder';
const data = require("./input_data.json");

function Root() {
  let folders = data.globalInputData.map(
    folder => {
      return (
        <li>
          <Folder 
            name={folder.name} 
            children={folder.children}
            ancestor={null} />
        </li>
      )
    }
  )
  
  return (
    <div>
      <ul>
        {folders}
      </ul>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Root />, document.getElementById("root"));
})