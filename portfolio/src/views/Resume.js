import React from 'react';
import SchoolData from '../data/schools.json';
import WorkData from '../data/work.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Helmet} from "react-helmet";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

class School extends React.Component {
    
    constructor(props) {
        super();
    }

    render() {
        let courseWork = [];
        for (let i = 0; i < this.props.data.coursework.length; i++) {
            let cw = this.props.data.coursework[i];
            courseWork.push(
                <li key={i} className="course-work-itme">
                    {cw.title}
                    <span className="course-code">{cw.code}</span>
                </li>
            );
        }

        return (
            <Container className="school">
                <Row>
                    <Col>
                        <h1 className="school-name">{this.props.data.name}</h1>
                    </Col>
                    <Col>
                        <h1 className="school-dates">{this.props.data.start} - {this.props.data.end}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="school-major">{this.props.data.major1}</h1>
                    </Col>
                    <Col>
                        <h1 className="school-location">{this.props.data.location}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h1 className="school-major">{this.props.data.major2}</h1>
                    </Col>
                    <Col></Col>
                </Row>
                <br />
                <p>Coursework:</p>
                <ul className="course-work-list">
                    {courseWork}
                </ul>
            </Container>
        )
    }
}

class SchoolList extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        let schools = [];
        for (let i = 0; i < SchoolData.length; i++) {
            schools.push(<School key={i} data={SchoolData[i]} />);
        }

        return (
            <div>
                {schools}
            </div>
        );
    }
}

class Work extends React.Component {
    
    constructor(props) {
        super();
    }

    render() {
        return (
            <Container className="school">
                <Row>
                    <Col>
                        <h1 className="school-name">{this.props.data.name}</h1>
                    </Col>
                    <Col>
                        <h1 className="school-dates">{this.props.data.start} - {this.props.data.end}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 className="school-location">{this.props.data.location}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="work-desc">{this.props.data.description}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

class WorkList extends React.Component {

    constructor(props) {
        super();
    }

    render() {

        let works = [];
        for (let i = 0; i < WorkData.length; i++) {
            works.push(<Work key={i} data={WorkData[i]} />);
        }

        return (
            <div>
                {works}
            </div>
        );
    }
}


class Resume extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            renderForPrint: false
        };
    }

    downloadPDF(sender) {
        sender.setState({ renderForPrint: true });
		html2canvas(document.querySelector('#resume-print-parent')).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
			pdf.save("tim-ings-resume.pdf");
            sender.setState({ renderForPrint: false });
        });
    }

    render() {
        let downloadButton = (
            <Button id="download-pdf-button" className="download-button" onClick={() => { this.downloadPDF(this) }}>
                <img style={{
                    height: '1rem', 
                    marginRight: '5px', 
                    transform: 'translateY(-2px)'
                }} src="img/logos/download_light.png" alt="" />
                Download as PDF
            </Button>
        );
        if (this.state.renderForPrint) {
            downloadButton = (
                <>
                <p className="download-button" style={{marginLeft: "-100%"}}>
                    Generated on {new Date(Date.now()).toDateString()}
                </p>
                <p>
                    View an up to date version at <a href="https://www.tim-ings.com/resume">https://tim-ings.com/resume</a>
                </p>
                </>);
        }

        return (
            <>
            <Helmet>
                <title>Résumé | Tim Ings</title>
            </Helmet>
            <div className="portfolio-header">
                <p className="code">
                    user@tim-ings.com:~/resume$ ./view.sh
                </p>
                <h1>
                    Tim's Résumé
                </h1>
            </div>
            <Container id="resume-print-parent" className={"resume-page " + (this.state.renderForPrint ? "print-colors" : "")}>
                {downloadButton}
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
                                Tim Ings is a West Australian Computer Scientist. Tim grew up in Rossmoyne, WA and graduated Rossymone Senior High School in 2014 before attending the University of Western Australia.
                            </p>
                            <h1 className="resume-header">Contact</h1>
                            <ul>
                                <li>Phone: 0406 840 009</li>
                                <li>Email: <a href="mailto:tim@tim-ings.com">tim@tim-ings.com</a></li>
                                <li>Website: <a href="https://tim-ings.com">tim-ings.com</a></li>
                                <li>GitHub: <a href="https://github.com/tim-ings">github.com/tim-ings</a></li>
                            </ul>
                            <br />
                            <h1 className="resume-header">Hobbies</h1>
                            <ul>
                                <li>Web Development</li>
                                <li>Programming</li>
                                <li>Game Development</li>
                                <li>Game Modding</li>
                                <li>PC Building</li>
                                <li>Cars/Motor Sport</li>
                                <li>Gym/Weight Lifting</li>
                                <li>Music</li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <div className="resume-section">
                            <h1 className="res-name">Tim Ings</h1>
                            <h1 className="res-title">Bachelor of Computer Science</h1>
                            <h1 className="res-title">Bachelor of Data Science</h1>
                        </div>
                        <div className="resume-section">
                            <h1 className="res-header">Education</h1>
                            <SchoolList />
                        </div>
                        <div className="resume-section">
                            <h1 className="res-header">Work Experience</h1>
                            <WorkList />
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default Resume;
