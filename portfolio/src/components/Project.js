import React from 'react';

class Project extends React.Component {

    constructor(props) {
        super();
        this.state = {
            baseGitHubUrl: "https://github.com/tim-ings/"
        }
    }

    render() {
        // send the user to the github releases unless a live demo exists
        let demo_url = this.state.baseGitHubUrl + this.props.data.slug + "/releases";
        if (this.props.data.live_demo)
            demo_url = this.props.data.live_demo_url;

        return (
            <div>
                <h1>{this.props.data.name}</h1>
                <p>{this.props.data.description}</p>
                <a href={this.state.baseGitHubUrl + this.props.data.slug}>GitHub</a>
                <a href={demo_url}>Demo</a>
            </div>
        )
    }
}

export default Project;
