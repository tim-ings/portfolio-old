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
        // send the user to the github releases unless a live demo exists
        let demo_url = this.baseGitHubUrl + this.props.data.slug + "/releases";
        let demo_label = "Download";
        let demo_icon = (<img style={{height: '1rem', transform: 'translateY(-2px)'}} src="img/logos/download_light.png" alt="" />);
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
        if (this.props.data.curse_url) {

        }

        let header_img_url = "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzEwNC84MTkvb3JpZ2luYWwvY3V0ZS1raXR0ZW4uanBn"
        if (this.props.data.header_img_url) {
            header_img_url = this.props.data.header_img_url;
        }

        return (
            <Card bg="dark" text="white" border="dark">
                <Card.Img variant="top" src={header_img_url} />
                <Card.Body>
                    <Card.Title>{this.props.data.name}</Card.Title>
                    <Card.Text>{this.props.data.description}</Card.Text>
                    <Button target="_blank" rel="noopener noreferrer" style={{margin: '5px'}} href={this.baseGitHubUrl + this.props.data.slug}>
                        <img style={{
                            height: '1rem',
                            transform: 'translateY(-2px)'
                        }} src="img/logos/github_light.png"></img>
                        <span style={{marginLeft: '5px'}}>GitHub</span>
                    </Button>
                    <Button target="_blank" rel="noopener noreferrer" style={{margin: '5px'}} href={demo_url}>
                        {demo_icon}
                        <span style={{marginLeft: '5px'}}>{demo_label}</span>
                    </Button>
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
                <Tabs>
                    <Tab eventKey="websites" title="Websites">
                        <CardColumns>
                            {proj_websites}
                        </CardColumns>
                    </Tab>
                    <Tab eventKey="programs" title="Programs">
                        <CardColumns>
                            {proj_programs}
                        </CardColumns>
                    </Tab>
                    <Tab eventKey="games" title="Games">
                        <CardColumns>
                            {proj_games}
                        </CardColumns>
                    </Tab>
                    <Tab eventKey="addons" title="WoW AddOns">
                        <CardColumns>
                            {proj_addons}
                        </CardColumns>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

class Portfolio extends React.Component {
    
    render() {
        return (
            <ProjectTabs></ProjectTabs>
        )
    }
}

export default Portfolio;
