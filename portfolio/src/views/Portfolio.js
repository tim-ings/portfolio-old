import React from 'react';
import {Helmet} from "react-helmet";
import ProjectTabs from "../components/ProjectTabs";

class Portfolio extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            projTabsKey: "websites"
        }
    }

    render() {
        return (
            <>
            <Helmet>
                <title>Portfolio | Tim Ings</title>
            </Helmet>
            <div className="portfolio-header">
                <p className="code">
                    user@tim-ings.com:~/portfolio$ ./view.sh {this.state.projTabsKey}
                </p>
                <h1>
                    Tim's Portfolio
                </h1>
                <p>
                    Below you can find a collection of my work sorted by project type. Each project may either have a live demo or a download link along with a link to the project on GitHub.
                </p>
            </div>
            <ProjectTabs tabKey={this.state.projTabsKey} onSelect={key => this.setState({projTabsKey: key})} />
            </>
        )
    }
}

export default Portfolio;