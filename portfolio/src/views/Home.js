import React from 'react';
import ResumeData from '../data/resume.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Helmet} from "react-helmet";
import GitHubContribs from '../components/GitHubContribs.js';
import Project from '../components/Project';
import ProjectData from '../data/projects.json'
import { Link } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        let projectIndex = null;
        while (projectIndex === null) {
            let nextIndex = Math.floor(Math.random() * Math.floor(ProjectData.length));
            if (ProjectData[nextIndex].homepage) {
                projectIndex = nextIndex;
                break;
            }
        }

        return (
            <>
            <Helmet>
                <title>Tim Ings</title>
            </Helmet>
            <div className="portfolio-header">
                <p className="code">
                    user@tim-ings.com:~$ ./view.sh
                </p>
                <h1>
                    tim-ings.com
                </h1>
            </div>
            <Container className="resume-page">
                <Row>
                    <Col md={3}>
                        <div className="resume-section border-box-shadow">
                            <div className="resume-section">
                                <div className="avatar-container">
                                    <img src="img/avatar.png" alt=""></img>
                                </div>
                            </div>
                            <div>
                                <h1 className="resume-header">Profile</h1>
                                <p className="res-bio">
                                    {ResumeData.bio}
                                </p>
                                <h1 className="resume-header">Contact</h1>
                                <ul>
                                    <li>Phone: {ResumeData.contacts.phone}</li>
                                    <li>Email: <a href={`mailto:${ResumeData.contacts.email}`}>{ResumeData.contacts.email}</a></li>
                                    <li>Website: <a href={`https://${ResumeData.contacts.website}`}>{ResumeData.contacts.website}</a></li>
                                    <li>GitHub: <a href={`https://github.com/${ResumeData.contacts.github}`}>github.com/{ResumeData.contacts.github}</a></li>
                                </ul>
                                <br />
                            </div>
                        </div>
                    </Col>
                    <Col md={5} style={{padding:'0'}}>
                        <div className="resume-section border-box-shadow" style={{ textAlign: 'center' }}>
                            <h3>Random Project</h3>
                            <Link to="/portfolio" style={{paddingBottom: "20px"}}>View more in my portfolio</Link>
                            <Project light data={ProjectData[projectIndex]} />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="github-activity-container">
                            <GitHubContribs />
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default Home;
