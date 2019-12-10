import React, { Component } from 'react'

import './style.css';

export default class Loader extends Component {
   render() {
      return (
         <div className="load-bar">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
         </div>
      )
   }
}
