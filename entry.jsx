import React from 'react';
import ReactDOM from 'react-dom';
import Folder from './folder';
const data = require("./input_data.json");

function Root() {
  let folders = data.globalInputData.map(
    folder => 
    <li>
      <Folder name={folder.name} children={folder.children} />
    </li>
  )
    
  return (
    <div className="main">
      <ul>
        {folders}
      </ul>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Root />, document.getElementById("root"));
})