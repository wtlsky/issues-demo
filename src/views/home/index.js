import React from 'react';
import { Link } from "react-router-dom"
export default class Home extends React.Component {
  render () {
    return (
      <nav className='navigate'>
        <Link to="/viewer">Viewer</Link>
        <Link to="/editor">Editor</Link>
      </nav>
    )
  }
}