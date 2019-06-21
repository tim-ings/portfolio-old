import React from 'react';
import ProjectData from '../data/projects.json';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';
import {Helmet} from "react-helmet";
import Project from "./Project";

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

export default ProjectTabs;
