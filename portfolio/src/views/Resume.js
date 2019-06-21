import React from 'react';
import ResumeData from '../data/resume.json';
import WorkData from '../data/work.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Helmet} from "react-helmet";
import Button from "react-bootstrap/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import School from "../components/School";
import Work from "../components/Work";

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
        // handle rpint to pdf case
        let throbber = null;
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
                <p className="print-info" style={{marginLeft: "-100%"}}>
                    Generated on {new Date(Date.now()).toDateString()}
                    <br />
                    View an up to date version at <a href="https://www.tim-ings.com/resume">https://tim-ings.com/resume</a>
                </p>
                </>);
            throbber = (
                <div className="throbber-container">
                    <img className="throbber" src="img/throbber.gif" alt="print to pdf throbber"/>
                </div>
            );
        }

        let hobbies = [];
        for (let i = 0; i < ResumeData.hobbies.length; i++) {
            hobbies.push(<li key={i}>{ResumeData.hobbies[i]}</li>);
        }

        let titles = [];
        for (let i = 0; i < ResumeData.titles.length; i++) {
            titles.push(<h1 key={i} className="res-title">{ResumeData.titles[i]}</h1>);
        }

        let schools = [];
        for (let i = 0; i < ResumeData.schools.length; i++) {
            schools.push(<School key={i} data={ResumeData.schools[i]} />);
        }

        let works = [];
        for (let i = 0; i < WorkData.length; i++) {
            works.push(<Work key={i} data={WorkData[i]} />);
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
            {throbber}
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
                                {hobbies}
                            </ul>
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <div className="resume-section">
                            <h1 className="res-name">{ResumeData.name}</h1>
                            {titles}
                        </div>
                        <div className="resume-section">
                            <h1 className="res-header">Education</h1>
                            {schools}
                        </div>
                        <div className="resume-section">
                            <h1 className="res-header">Work Experience</h1>
                            {works}
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

export default Resume;
