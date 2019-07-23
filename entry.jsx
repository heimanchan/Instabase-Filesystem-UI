import React from 'react';
import ReactDOM from 'react-dom';

function Root() {
  return (
    <div className="main">
      <h1>Test</h1>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Root />, document.getElementById("root"));
})