import React from 'react';
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class HeaderItem extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        let innerLink = (
            <div className="hover-typewriter-container" style={{maxWidth: '200px', minWidth: '150px'}}>
                <div className="hover-typewriter">
                    {this.props.info.title}
                </div>
            </div>
        );
        let link = (
            <Link to={this.props.info.url} className="nav-link">{innerLink}</Link>
        );
        if (this.props.info.useATag) {
            // <Link> tags do not support external sites like guthub so use an <a> tag
            link = (
                <a href={this.props.info.url} className="nav-link" role="button">
                    {innerLink}
                </a>
            );
        }

        return (
            <>
            {link}
            </>
        )
    }
}

class Header extends React.Component {
    
    constructor(props) {
        super();
        this.navItemInfos = [
            {
                title: "Home",
                url: "/",
                side: "left"
            },
            {
                title: "Portfolio",
                url: "/portfolio",
                side: "left"
            },
            {
                title: "Résumé",
                url: "/resume",
                side: "left"
            },
            {
                title: "GitHub",
                url: "https://github.com/tim-ings",
                side: "left",
                useATag: true
            }
        ];
    }

    render() {
        let navItems = [];
        for (let i = 0; i < this.navItemInfos.length; i++) {
            navItems.push(<HeaderItem key={i} info={this.navItemInfos[i]}></HeaderItem>);
        }

        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
                <Navbar.Brand href="/">
                    <img
                        src="img/signature_light.png"
                        alt=""
                        height="30"
                        width="auto"
                        className="d-inline-block align-top"
                        style={{ paddingRight: "20px" }}
                    />
                    Tim Ings
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {navItems}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;
