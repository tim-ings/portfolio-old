import React from 'react';
import ProjectData from '../data/projects.json';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import {Helmet} from "react-helmet";

class Project extends React.Component {

    constructor(props) {
        super();
        this.baseGitHubUrl = "https://github.com/tim-ings/";
    }

    render() {
        // default to github releases
        let demo_url = this.baseGitHubUrl + this.props.data.slug + "/releases";
        let demo_label = "Download";
        let demo_icon = (<img style={{height: '1rem', transform: 'translateY(-2px)'}} src="img/logos/download_light.png" alt="" />);
        // check if a live demo is available
        if (this.props.data.live_demo_url) {
            demo_url = this.props.data.live_demo_url;
            demo_label = "Live Demo";
            demo_icon = (
                <svg 
                    viewBox="0 0 100 100" 
                    style={{
                        height: '1rem',
                        transform: 'translateY(-2px)'
                }}>
                    <circle cx="50" cy="50" r="50" style={{fill: 'red'}}/>
                </svg>);
        }
        // check if this project is on curse
        if (this.props.data.curse_url) {
            demo_url = this.props.data.curse_url;
            demo_label = "View on Curse";
            demo_icon = (<img style={{height: '1rem', transform: 'translateY(-2px)'}} src="img/logos/curse.png" alt="" />);
        }
        // generate demo button
        let btn_demo = (
            <Button target="_blank" rel="noopener noreferrer" style={{margin: '5px'}} href={demo_url}>
                {demo_icon}
                <span style={{marginLeft: '5px'}}>{demo_label}</span>
            </Button>
        );
        if (this.props.data.hide_download) {
            btn_demo = null;
        }

        // default to web server image for header
        let header_img_url = "img/headers/WebServer.png"
        if (this.props.data.header_img_url) {
            header_img_url = this.props.data.header_img_url;
        }

        // style the github button and logo
        let btn_github = (
            <Button target="_blank" rel="noopener noreferrer" style={{margin: '5px'}} href={this.baseGitHubUrl + this.props.data.slug}>
                <img style={{
                    height: '1rem',
                    transform: 'translateY(-2px)'
                }} src="img/logos/github_light.png" alt=""></img>
                <span style={{marginLeft: '5px'}}>GitHub</span>
            </Button>
        );

        // create tech tags that tell the user what was used to create this project
        let tech_tags = [];
        for (let i = 0; i < this.props.data.tech.length; i++) {
            tech_tags.push(
                <span key={i} className="tech-tag">
                    <span className={`tech-tag-icon tech-tag-${this.props.data.tech[i].toLowerCase()}`}></span>
                    {this.props.data.tech[i]}
                </span>);
        }

        // create curse download counter
        let download_counter = null;
        if (this.props.data.curse_downloads) {
            download_counter = (<div className="download-counter">{this.props.data.curse_downloads}+ downloads on curse</div>);
        }

        let col_bg = this.props.light ? "light" : "dark";
        let col_text = this.props.light ? "black" : "white";
        let col_border = this.props.light ? "light" : "dark";
        let col_back = this.props.light ? "" : "#383839";

        return (
            <Card bg={col_bg} text={col_text} border={col_border}>
                <Card.Img variant="top" src={header_img_url} />
                <Card.Body style={{backgroundColor: col_back}}>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <Card.Text>{this.props.data.description}</Card.Text>
                    {tech_tags}
                    <br />
                    {download_counter}
                    {btn_github}
                    {btn_demo}
                </Card.Body>
            </Card>
        )
    }
}

export default Project;
