import React, { Component } from 'react'
import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/home/home' 

export class routes extends Component {
  render() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    )
  }
}


export default routes