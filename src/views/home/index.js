import React from 'react';
import { Link } from "react-router-dom"
import style from './style.module.scss'
export default class Home extends React.Component {
  render () {
    return (
      <nav className={style.navigate}>
        <Link to="/viewer?type=page">Viewer Page</Link>
        <Link to="/viewer?type=app">Viewer App</Link>
        <Link to="/editor?type=page">Editor Page</Link>
        <Link to="/editor?type=app">Editor APP</Link>
      </nav>
    )
  }
}