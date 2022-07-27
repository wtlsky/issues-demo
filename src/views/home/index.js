import React from 'react';
import { Link } from "react-router-dom"
import style from './style.module.scss'
export default class Home extends React.Component {
  render () {
    return (
      <nav className={style.navigate}>
        <Link to="/viewer">Viewer</Link>
        <Link to="/editor">Editor</Link>
      </nav>
    )
  }
}