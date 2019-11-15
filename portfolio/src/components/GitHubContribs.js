import React from 'react';
import ResumeData from '../data/resume.json';
import Octokit from "@octokit/rest";
import Container from 'react-bootstrap/Container';
import TestEventData from './event_log.json';
import Octicon, { IssueOpened, RepoPush, Comment, Repo, IssueClosed, GitCommit } from '@primer/octicons-react';

class GitHubEventList extends React.Component {

    constructor(props) {
        super();
    }

    isUnique(arr, obj, key) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][key] === obj[key]) {
                return false;
            }
        }
        return true;
    }

    render() {
        if (this.props.events.length <= 0) {
            return (<></>);
        }


        let eventPushes = [];
        let commit_repoCommitCounts = {};
        let commit_count = 0;
        let commit_uniqueRepos = [];

        let eventCreates = [];

        let eventIssuesOpened = [];
        let issue_openedUniqueRepos = [];

        let eventIssuesClosed = [];
        let issue_closedUniqueRepos = [];
        
        let eventComments = [];
        let comment_uniqueRepos = [];

        for (let i = 0; i < this.props.events.length; i++) {
            let ghe = this.props.events[i];
            switch (ghe.type) {
                case "IssueCommentEvent": 
                    if (this.isUnique(comment_uniqueRepos, ghe.repo, "id"))
                        comment_uniqueRepos.push(ghe.repo);
                    eventComments.push(ghe);
                    break;
                case "PushEvent":
                    commit_count += ghe.payload.commits.length;
                    if (!(ghe.repo.id in commit_repoCommitCounts)) commit_repoCommitCounts[ghe.repo.id] = 0;
                    commit_repoCommitCounts[ghe.repo.id] += ghe.payload.commits.length;
                    if (this.isUnique(commit_uniqueRepos, ghe.repo, "id"))
                        commit_uniqueRepos.push(ghe.repo);
                    eventPushes.push(ghe);
                    break;
                case "IssuesEvent":
                    switch (ghe.payload.action) {
                        case "opened":
                            if (this.isUnique(issue_openedUniqueRepos, ghe.repo, "id"))
                                issue_openedUniqueRepos.push(ghe.repo);
                            eventIssuesOpened.push(ghe);
                            break;
                        case "closed":
                            if (this.isUnique(issue_closedUniqueRepos, ghe.repo, "id"))
                                issue_closedUniqueRepos.push(ghe.repo);
                            eventIssuesClosed.push(ghe);
                            break;
                        default: 
                            console.log("Unknown issue action:", ghe.payload.action);
                            break;
                    }
                    break;
                case "CreateEvent":
                    if (ghe.payload.ref_type === "repository") {
                        eventCreates.push(ghe);
                    }
                    break;
                default:
                    console.log("Unknown event type:", this.props.events.type);
            }
        }

        // commits
        let activityTags_commit = [];
        for (let i = 0; i < commit_uniqueRepos.length; i++) {
            let repo = commit_uniqueRepos[i];
            let commitTags = [];
            for (let j = 0; j < eventPushes.length; j++) {
                let ghe = eventPushes[j];
                for (let k = 0; k < ghe.payload.commits.length; k++) {
                    let commitRepoName = ghe.payload.commits[k].url.split("/");
                    commitRepoName = `${commitRepoName[4]}/${commitRepoName[5]}`;
                    if (commitRepoName === repo.name) {
                        commitTags.push(
                            <li key={`${j}${k}`}>
                                <Octicon icon={GitCommit} />
                                <a href={`https://github.com/tim-ings/tim-ings.com/commit/${ghe.payload.commits[k].sha}`}>
                                    {ghe.payload.commits[k].message}
                                </a>
                            </li>);
                    }
                }
            }
            activityTags_commit.push(
                <li key={i}>
                    <button
                    onClick={() => {document.querySelector(`#commits-list-repo-${repo.id}-${this.props.month}-${this.props.year}`).classList.toggle("hidden")}}
                    className="dropdown">
                        {commit_uniqueRepos[i].name} {commit_repoCommitCounts[commit_uniqueRepos[i].id]} commits
                    </button>
                    <ul id={`commits-list-repo-${repo.id}-${this.props.month}-${this.props.year}`} className="hidden">
                        {commitTags}
                    </ul>
                </li>
            );
        }

        // creates
        let activityTags_create = [];
        for (let i = 0; i < eventCreates.length; i++) {
            let ghe = eventCreates[i];
            activityTags_create.push(
                <li key={i}>
                    <a href={`https://github.com/${ghe.repo.name}`}>{ghe.repo.name}</a> 
                </li>
            );
        }
        
        // issues opened
        let activityTags_issuesOpened = [];
        for (let i = 0; i < issue_openedUniqueRepos.length; i ++) {
            let repo = issue_openedUniqueRepos[i];
            let issueTags = [];
            for (let j = 0; j < eventIssuesOpened.length; j++) {
                let ghe = eventIssuesOpened[j];
                if (ghe.repo.id === repo.id) {
                    issueTags.push(
                        <li key={j}>
                            <Octicon icon={IssueOpened} />
                            <a href={ghe.payload.issue.html_url}>
                                {ghe.payload.issue.title}
                            </a>
                        </li>
                    );
                }
            }
            activityTags_issuesOpened.push(
                <li key={i}>
                    <button 
                    onClick={() => {document.querySelector(`#issue-opened-list-repo-${repo.id}-${this.props.month}-${this.props.year}`).classList.toggle("hidden")}}
                    className="dropdown">
                        {repo.name}
                    </button>
                    <ul id={`issue-opened-list-repo-${repo.id}-${this.props.month}-${this.props.year}`} className="hidden">
                        {issueTags}
                    </ul>
                </li>
            );
        }

        // issues closed
        let activityTags_issuesClosed = [];
        for (let i = 0; i < issue_closedUniqueRepos.length; i ++) {
            let repo = issue_closedUniqueRepos[i];
            let issueTags = [];
            for (let j = 0; j < eventIssuesClosed.length; j++) {
                let ghe = eventIssuesClosed[j];
                if (ghe.repo.id === repo.id) {
                    issueTags.push(
                        <li key={j}>
                            <Octicon icon={IssueClosed} />
                            <a href={ghe.payload.issue.html_url}>
                                {ghe.payload.issue.title}
                            </a>
                        </li>
                    );
                }
            }
            activityTags_issuesClosed.push(
                <li key={i}>
                    <button
                    onClick={() => {document.querySelector(`#issue-closed-list-repo-${repo.id}-${this.props.month}-${this.props.year}`).classList.toggle("hidden")}}
                    className="dropdown">
                        {repo.name}
                    </button>
                    <ul id={`issue-closed-list-repo-${repo.id}-${this.props.month}-${this.props.year}`} className="hidden">
                        {issueTags}
                    </ul>
                </li>
            );
        }

        // comments
        let activityTags_comments = [];
        for (let i = 0; i < comment_uniqueRepos.length; i++) {
            let repo = comment_uniqueRepos[i];
            let commentTags = [];
            for (let j = 0; j < eventComments.length; j++) {
                let ghe = eventComments[j];
                if (ghe.repo.id === repo.id) {
                    console.log("adding a comment: ", ghe);
                    let issueType = ghe.payload.issue.pull_request ? "pull request" : "issue";
                    commentTags.push(
                        <li key={j}>
                            <span className="event-title">
                                Replied to {issueType} <a href={ghe.payload.issue.html_url} className="no-dec">
                                    <span className="event-issue-number">#{ghe.payload.issue.number}</span>
                                </a>
                            </span>
                            <div className="event-comment-container">
                                <Octicon icon={Comment} />
                                <span className="event-comment-body"><q>{ghe.payload.comment.body}</q></span>
                            </div>
                        </li>
                    );
                }
            }
            activityTags_comments.push(
                <li key={i}>
                    <button 
                    onClick={() => {document.querySelector(`#comments-repo-${repo.id}-${this.props.month}-${this.props.year}`).classList.toggle("hidden")}}
                    className="dropdown">
                        {repo.name}
                    </button>
                    <ul id={`comments-repo-${repo.id}-${this.props.month}-${this.props.year}`} className="hidden">
                        {commentTags}
                    </ul>
                </li>
            );
        }

        let commitsJsx = null;
        if (commit_count !== 0) {
            commitsJsx = (
                <div className="section section-commits">
                    <Octicon icon={RepoPush} />
                    <span>
                        Created {commit_count} commits in {commit_uniqueRepos.length} {commit_uniqueRepos.length === 1 ? "repository" : "repositories"}
                    </span>
                    <ul>
                        {activityTags_commit}
                    </ul>
                </div>
            );
        }

        let repoCreatesJsx = null;
        if (eventCreates.length !== 0) {
            repoCreatesJsx = (
                <div className="section section-creates">
                    <Octicon icon={Repo} />
                    <span>
                        Created {eventCreates.length} {eventCreates.length === 1 ? "repository" : "repositories"}
                    </span>
                    <ul>
                        {activityTags_create}
                    </ul>
                </div>
            );
        }

        let issueOpensJsx = null;
        if (eventIssuesOpened.length !== 0) {
            issueOpensJsx = (
                <div className="section section-issues section-issues-opened">
                    <Octicon icon={IssueOpened} />
                    <span>
                        Opened {eventIssuesOpened.length} {eventIssuesOpened.length === 1 ? "issue" : "issues"} in {issue_openedUniqueRepos.length} {issue_openedUniqueRepos.length === 1 ? "repository" : "repositories"}
                    </span>
                    <ul>
                        {activityTags_issuesOpened}
                    </ul>
                </div>
            );
        }

        let issueClosesJsx = null;
        if (eventIssuesClosed.length !== 0) {
            issueClosesJsx = (
                <div className="section section-issues section-issues-closed">
                    <Octicon icon={IssueClosed} />
                    <span>
                        Closed {eventIssuesClosed.length} {eventIssuesClosed.length === 1 ? "issue" : "issues"} in {issue_closedUniqueRepos.length} {issue_closedUniqueRepos.length === 1 ? "repository" : "repositories"}
                    </span>
                    <ul>
                        {activityTags_issuesClosed}
                    </ul>
                </div>
            );
        }

        let commentWritesJsx = null;
        if (eventComments.length !== 0) {
            commentWritesJsx = (
                <div className="section section-comments">
                    <Octicon icon={Comment} />
                    <span>
                        Wrote {eventComments.length} comments in {comment_uniqueRepos.length} {comment_uniqueRepos.length === 1 ? "repository" : "repositories"}
                    </span>
                    <ul>
                        {activityTags_comments}
                    </ul>
                </div>
            );
        }

        return (
            <div>
                <h1 className="section section-title">{this.props.title}</h1>
                {commitsJsx}
                {repoCreatesJsx}
                {issueOpensJsx}
                {issueClosesJsx}
                {commentWritesJsx}
            </div>
        );
    }
}

class GitHubContribs extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            githubEvents: [],
            failedFetch: false,
            error: null
        }
    }

    componentDidMount() {
        let githubEvents_age = parseInt(localStorage.getItem("githubEvents_age"));
        if (githubEvents_age) {
            let eventsAge = new Date(githubEvents_age);
            eventsAge.setHours(eventsAge.getHours() + 1);
            if (eventsAge > new Date()) {
                console.log("Got GitHub event data from localstorage");
                let ghEvents = localStorage.getItem("githubEvents");
                this.setState({
                    githubEvents: JSON.parse(ghEvents),
                    failedFetch: false,
                })
                return;
            }
        }

        const gh = new Octokit({
            userAgent: 'tim-ings.com portfolio site'
        });

        // do not get rate limited by github while running in dev mode
        if (window.location.hostname === "localhost" && false) {
            console.warn("USING SAMPLE DATA:", TestEventData);
            this.setState({
                githubEvents: TestEventData,
                failedFetch: false
            });
            return
        }

        // get all our activity
        gh.activity.listEventsForUser({
            username: ResumeData.contacts.github,
            per_page: 100,
            page: 1,
        }).then((res) => {
            console.log("Got activity.listEventsForUser from github:", res);
            localStorage.setItem("githubEvents", JSON.stringify(res.data));
            localStorage.setItem("githubEvents_age", Date.now());
            this.setState({
                githubEvents: res.data,
                failedFetch: false,
            })
        }).catch((err) => {
            console.log("GitHub is rate limiting this IP address");
            this.setState({
                githubEvents: [],
                failedFetch: true,
                error: err
            })
        });
    }

    render() {
        // display error msg if github did not return any data
        if (this.state.failedFetch) {
            return (
                <Container className="contrib-container">
                    <h1>GitHub Activity</h1>
                    <p style={{whiteSpace:'normal'}}>Unable to fetch data from GitHub at this time.</p>
                    <p style={{whiteSpace:'normal'}}>GitHub may be rate limiting this IP address.</p>
                </Container>
            );
        }
        // display throbber while fetching data
        if (this.state.githubEvents.length === 0 && !this.state.failedFetch) {
            return (
                <Container className="contrib-container">
                    <h1>GitHub Activity</h1>
                    <p style={{textAlign:'center'}}>Fetching activity data...</p>
                    <div className="github-throbber-container">
                        <img className="github-throbber" src="img/throbber.gif" alt="github fetch throbber"/>
                    </div>
                </Container>
            );
        }

        let dateNow = new Date();
        let dateLastYear = dateNow.setYear(dateNow.getYear() - 1);
        let months = {};
        for (let i = 0; i < 12; i ++)
            months[i] = [];
        for (let i = 0; i < this.state.githubEvents.length; i++) {
            let eventDate = new Date(this.state.githubEvents[i].created_at);
            // only add events that occured within the last year
            if (eventDate > dateLastYear) {
                months[eventDate.getMonth()].push(this.state.githubEvents[i]);
            }
        }

        let monthNames = [
            "January",
            "Febuary",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        let year = new Date().getFullYear();

        let monthTags = [];
        for (let k in months) {
            monthTags.push(
                <GitHubEventList 
                    key={k} 
                    events={months[k]} 
                    title={`${monthNames[k]} ${year}`}
                    month={k}
                    year={year} />
            );
        }
        monthTags.reverse();

        return (
            <Container className="contrib-container">
            <h1>GitHub Activity</h1>
                {monthTags}
            </Container>
        )
    }
}

export default GitHubContribs;
