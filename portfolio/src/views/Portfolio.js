import React from 'react';
import ProjectData from '../data/projects.json';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';

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
                <span className="tech-tag">
                    <span className={`tech-tag-icon tech-tag-${this.props.data.tech[i].toLowerCase()}`}></span>
                    {this.props.data.tech[i]}
                </span>);
        }

        // create curse download counter
        let download_counter = null;
        if (this.props.data.curse_downloads) {
            download_counter = (<span className="download-counter">{this.props.data.curse_downloads}+ downloads on curse</span>);
        }

        return (
            <Card bg="dark" text="white" border="dark">
                <Card.Img variant="top" src={header_img_url} />
                <Card.Body>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <Card.Text>{this.props.data.description}</Card.Text>
                    {tech_tags}
                    <br />
                    {btn_github}
                    {btn_demo}
                    {download_counter}
                </Card.Body>
            </Card>
        )
    }
}

class ProjectTabs extends React.Component {
    
    constructor(props) {
        super();
    }

    render() {
        const proj_websites = [];
        const proj_programs = [];
        const proj_games = [];
        const proj_addons = [];
        for (let i = 0; i < ProjectData.length; i++) {
            let proj = (<Project key={i} data={ProjectData[i]} />);
            switch(ProjectData[i].category) {
                case "website": proj_websites.push(proj); break;
                case "program": proj_programs.push(proj); break;
                case "game": proj_games.push(proj); break;
                case "wow-addon": proj_addons.push(proj); break;
                default: proj_programs.push(proj); break;
            }
        }

        return (
            <Container>
                <Tabs defaultActiveKey="websites" onSelect={key => this.props.onSelect(key)}>
                    <Tab eventKey="websites" title="Websites">
                        <div className="portfolio-tab">
                            <h1>I have built a few websites over the years all utilising different technologies such as ReactJS, NodeJS, Django, Flask, JQuery, and raw HTML/JavaScript.</h1>
                            <CardColumns>
                                {proj_websites}
                            </CardColumns>
                        </div>
                    </Tab>
                    <Tab eventKey="programs" title="Programs">
                        <div className="portfolio-tab">
                            <h1>Below are some programs and scripts I have written in languages such as Python, C#, and C/C++</h1>
                            <CardColumns>
                                {proj_programs}
                            </CardColumns>
                        </div>
                    </Tab>
                    <Tab eventKey="games" title="Games">
                        <div className="portfolio-tab">
                        <h1>Some of my firends and I began programming in high school because of a desire to create our own games and game modifications. Here are some of my projects utilising professionally developed engines such as Unity as well my own custom engine built on top of XNA/MonoGame.</h1>
                        <CardColumns>
                                {proj_games}
                            </CardColumns>
                        </div>
                    </Tab>
                    <Tab eventKey="addons" title="WoW AddOns">
                        <div className="portfolio-tab">
                            <h1>
                                Here you can find some of my user interface modifications for the game World of Warcraft. The World of Warcraft interface runs on Lua and I have learnt a lot about this scripting language in the process of writing these AddOns. Clicking on an AddOn's "View on Curse" button will take you to its curse forge page which displays the number of times my AddOn has been downloaded by other players for free.
                                <br />
                                <br />
                                My AddOn's have a total of nearly 80,000 downloads on curse forge.
                            </h1>
                            <CardColumns>
                                {proj_addons}
                            </CardColumns>
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

class Portfolio extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            projTabsKey: "websites"
        }
    }

    render() {
        return (
            <>
                <div className="portfolio-header">
                    <p className="code">
                        user@tim-ings.com:~/portfolio$ ./view.sh {this.state.projTabsKey}
                    </p>
                    <h1>
                        Welcome to Tim's Portfolio
                    </h1>
                    <p>
                        Below you can find a collection of my work sorted by project type. Each project may either have a live demo or a download link along with a link to the project on GitHub.
                    </p>
                </div>
                <ProjectTabs tabKey={this.state.projTabsKey} onSelect={key => this.setState({projTabsKey: key})} />
            </>
        )
    }
}

export default Portfolio;
