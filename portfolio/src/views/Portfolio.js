import React from 'react';
import ProjectData from '../data/projects.json';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class Project extends React.Component {

    constructor(props) {
        super();
        this.baseGitHubUrl = "https://github.com/tim-ings/";
    }

    render() {
        // send the user to the github releases unless a live demo exists
        let demo_url = this.baseGitHubUrl + this.props.data.slug + "/releases";
        let demo_label = "Download";
        if (this.props.data.live_demo) {
            demo_url = this.props.data.live_demo_url;
            demo_label = "Live Demo";
        }

        return (
            <div>
                <h1>{this.props.data.name}</h1>
                <p>{this.props.data.description}</p>
                <a href={this.baseGitHubUrl + this.props.data.slug}>GitHub</a>
                <a href={demo_url}>{demo_label}</a>
            </div>
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
            <Tabs>
                <Tab eventKey="websites" title="Websites">
                    {proj_websites}
                </Tab>
                <Tab eventKey="programs" title="Programs">
                    {proj_programs}
                </Tab>
                <Tab eventKey="games" title="Games">
                    {proj_games}
                </Tab>
                <Tab eventKey="addons" title="AddOns">
                    {proj_addons}
                </Tab>
            </Tabs>
        )
    }
}

class Portfolio extends React.Component {
    
    render() {
        return (
            <div>
                <ProjectTabs></ProjectTabs>
            </div>
        )
    }
}

export default Portfolio;
