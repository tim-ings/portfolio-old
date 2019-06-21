import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './views/Home.js';
import Portfolio from './views/Portfolio.js';
import Resume from './views/Resume.js';
import Header from './components/Header.js'
import './App.scss'
import {Helmet} from "react-helmet";

function App() {
    return (
        <>
        <Helmet>
            <title>Tim Ings</title>
        </Helmet>
        <BrowserRouter>
            <Header />
            <Route exact path="/" component={Home}></Route>
            <Route path="/portfolio" component={Portfolio}></Route>
            <Route path="/resume" component={Resume}></Route>
        </BrowserRouter>
        </>
    );
}

export default App;
