import React from 'react';
import ResumeData from '../data/resume.json';
import Octokit from "@octokit/rest";
import Container from 'react-bootstrap/Container';
import TestEventData from './event_log.json';

class GitHubEvent extends React.Component {

    constructor(props) {
        super();
        console.log(props.data.type);
    }

    renderIssueCommentEvent(data) {
        let commentBody = data.payload.comment.body;
        let commentAuthor = data.payload.comment.user.login;
        let commentAuthorUrl = data.payload.comment.user.html_url;

        let issueNumber = data.payload.issue.number;
        let issueUrl = data.payload.issue.html_url;
        let issueTitle = data.payload.issue.title;
        let repoUrlParts = data.payload.issue.repository_url.split("/");
        let issueRepoOwner = repoUrlParts[repoUrlParts.length - 2];
        let issueRepoName = repoUrlParts[repoUrlParts.length - 1];
        let repoUrl = `https://github.com/${issueRepoOwner}/${issueRepoName}`;

        return (
            <div className="event-container">
                <span class="event-title">
                    <a href={commentAuthorUrl} className="no-dec">{commentAuthor}</a> commented on <a href={issueUrl} className="no-dec">
                        {issueTitle} <span className="event-issue-number">#{issueNumber}</span>
                    </a>
                    in <a href={repoUrl} className="no-dec">{issueRepoOwner}/{issueRepoName}</a>
                </span>
                <div className="event-comment-container">
                    <span className="event-comment-body"><q>{commentBody}</q></span>
                </div>
            </div>);
    }

    renderPushEvent(data) {
        let authorName = data.actor.display_login;
        let authorUrl = `https://github.com/${data.actor.display_login}`;
        let repoName = data.repo.name;
        let repoUrl = `https://github.com/${repoName}`;
        let commitCount = data.payload.commits.length;
        let commitPlural = commitCount === 1 ? "commit" : "commits";

        let commitMsgs = [];
        for (let i = 0; i < data.payload.commits.length; i++) {
            let commitHash = data.payload.commits[i].sha;
            let commitMsg = data.payload.commits[i].message;
            commitMsgs.push(
                <li key={i}>
                    <a href={`${repoUrl}/commit/${commitHash}`}
                    className="event-commit-sha no-dec">
                        #{commitHash.substring(0,7)}
                    </a>
                    {commitMsg}
                </li>);
        }

        return (
            <div className="event-container">
                <span className="event-title">
                    <a href={authorUrl} className="no-dec">{authorName}</a> pushed {commitCount} {commitPlural} to <a href={repoUrl} className="no-dec">{repoName}</a>
                </span>
                <span className="event-commit-container">
                    <ul className="event-commit-list">
                        {commitMsgs}
                    </ul>
                </span>
            </div>);
    }

    renderIssuesEvent(data) {
        let issueNumber = data.payload.issue.number;
        let issueUrl = data.payload.issue.html_url;
        let issueTitle = data.payload.issue.title;
        let issueAuthor = data.payload.issue.user.login;
        let issueAuthorUrl = data.payload.issue.user.html_url;
        let repoUrlParts = data.payload.issue.repository_url.split("/");
        let issueRepoOwner = repoUrlParts[repoUrlParts.length - 2];
        let issueRepoName = repoUrlParts[repoUrlParts.length - 1];
        let repoUrl = `https://github.com/${issueRepoOwner}/${issueRepoName}`;

        return (
            <div className="event-container">
                <span class="event-title">
                    <a href={issueAuthorUrl} className="no-dec">{issueAuthor}</a> created an issue in <a href={repoUrl} className="no-dec">{issueRepoOwner}/{issueRepoName}</a>
                </span>
                <span className="event-issue-container">
                    <a href={issueUrl} className="no-dec">
                        <span className="event-issue-number">#{issueNumber}</span> {issueTitle}
                    </a>
                </span>
            </div>);
    }

    render() {
        let event = null;
        switch (this.props.data.type) {
            case "IssueCommentEvent": 
                event = this.renderIssueCommentEvent(this.props.data); 
                break;
            case "PushEvent":
                event = this.renderPushEvent(this.props.data); 
                break;
            case "IssuesEvent":
                event = this.renderIssuesEvent(this.props.data); 
                break;
            default:
                console.log("unknown event type:", this.props.data.type);
        }

        return (
            <>
            {event}
            </>
        );
    }
}

class GitHubEventList extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

class GitHubContribs extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            githubEvents: [],
            githubRepos: []
        }
    }

    componentDidMount() {
        console.log(ResumeData.github)

        const gh = new Octokit({
            userAgent: 'tim-ings.com portfolio site'
        });

        //////////////////////////////////// TEST
        console.log("Got activity.listEventsForUser from github:", TestEventData);
        this.setState({
            githubEvents: TestEventData
        });
        return
        //////////////////////////////////// ENDTEST

        // get all our repos
        if (this.state.githubEvents)
        gh.repos.listForUser({
            username: ResumeData.contacts.github
        }).then((res) => {
            console.log("Got repos.listForUser from github:", res);
            this.setState({
                githubRepos: res.data
            })
        });

        // get all our activity
        gh.activity.listEventsForUser({
            username: ResumeData.contacts.github
        }).then((res) => {
            console.log("Got activity.listEventsForUser from github:", res);
            this.setState({
                githubEvents: res.data
            })
        });
    }

    render() {
        let events = [];
        for (let i = 0; i < this.state.githubEvents.length; i++) {
            events.push(<GitHubEvent key={i} data={this.state.githubEvents[i]} />);
        }

        return (
            <Container>
                <h1>Contribution activity</h1>
                {events}
            </Container>
        )
    }
}

export default GitHubContribs;
