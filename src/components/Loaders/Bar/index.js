import React, { Component } from 'react'

import './style.css';

export default class Loader extends Component {
   render() {
      return (
         <div className="loading">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
         </div>
      )
   }
}
