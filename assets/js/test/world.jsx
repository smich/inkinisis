import React from 'react';
import ReactDom from 'react-dom';


class World extends React.Component {
  render() {
    return <h1>World!!</h1>
  }
}

if (document.getElementById('world')) {
  ReactDom.render(<World/>, document.getElementById('world'));
}
