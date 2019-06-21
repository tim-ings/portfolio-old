import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

export default Work;
