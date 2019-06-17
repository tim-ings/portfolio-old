import React from 'react';

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

export default Project;
