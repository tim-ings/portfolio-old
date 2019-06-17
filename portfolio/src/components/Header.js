import React from 'react';
import { Link } from "react-router-dom";

class HeaderItem extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        const classeNames = `item ${this.props.info.side}`;
        return (
            <div className={classeNames}>
                <Link className="link" to={this.props.info.url}>
                    <div className="hover-typewriter-container" style={{width: 150 + 'px'}}>
                        <div className="hover-typewriter">
                            {this.props.info.title}
                        </div>
                    </div>
                </Link>
            </div>
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
                side: "left"
            },
            {
                title: "About",
                url: "/about",
                side: "left"
            }
        ];
    }

    render() {
        let navItems = [];
        for (let i = 0; i < this.navItemInfos.length; i++) {
            navItems.push(<HeaderItem key={i} info={this.navItemInfos[i]}></HeaderItem>);
        }

        return (
            <nav className="header">
                <div className="item-container">
                    {navItems}
                </div>
            </nav>
        )
    }
}

export default Header;
