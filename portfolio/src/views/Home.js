import React from 'react';
import ResumeData from '../data/resume.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Helmet} from "react-helmet";
import Button from "react-bootstrap/Button";
import GitHubContribs from '../components/GitHubContribs.js';

class Home extends React.Component {

    constructor(props) {
        super();
    }

    render() {

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
                        <div className="resume-section">
                            <div className="avatar-container">
                                <img src="img/avatar.png" alt=""></img>
                            </div>
                        </div>
                        <div className="resume-section border-box-shadow">
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
                            <h1 className="resume-header">Hobbies</h1>
                            <ul>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <div className="resume-section">
                            <h1 className="res-name">{ResumeData.name}</h1>
                            <img src="http://ghchart.rshah.org/tim-ings" alt="tim-ings's Github chart" />
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
