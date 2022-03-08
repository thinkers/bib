import React, { Component, useEffect } from 'react';
import SettingsBar from '../components/SettingsBar.js';
import TopBar from '../components/TopBar.js';
import { checkSelection } from '../components/Selection/selector.js';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2, transform } from 'react-html-parser';

export default class Repository extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repository: props.pageContext.repository,
            showSettings: false,
            localStyle: "",
            content: props.pageContext.repository._content
        };
    }


    getElementByXpathNode = (path) => {
        return document.evaluate("/html/body/" + path, document.getElementById("contentContainer"), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    getElementByXpath = (path) => {
        return document.evaluate('//*[@id="contentContainer"]' + path, document.getElementById("contentContainer"), null, XPathResult.STRING_TYPE, null).stringValue;
    }
    setAnnotationsToState = () => {

        let tmpContent = this.state.content;
        let cache = JSON.parse(localStorage.getItem('store'));
        if (cache) {
            for (let { text, highlightId, startOffset, endOffset, startContainer, endContainer, typename } of cache) {
                let xpathStart = this.getElementByXpath(startContainer);
                let xpathEnd = this.getElementByXpath(endContainer);
                let matchedString = xpathStart.substring(startOffset, endOffset);
                if (matchedString !== text) {
                    //  TODO
                } else {
                    let startPos = tmpContent.indexOf(xpathStart);
                    if (startPos) {

                        let startTag = "<span class='mark'>";
                        let endTag = "</span>";
                        tmpContent = [tmpContent.slice(0, startPos + endOffset), endTag, tmpContent.slice(startPos + endOffset)].join('');
                        tmpContent = [tmpContent.slice(0, startPos + startOffset), startTag, tmpContent.slice(startPos + startOffset)].join('');

                    }
                    this.setState({ content: tmpContent });
                }
            }
        }
    }

    componentDidMount = () => {
        this.setAnnotationsToState();
    }


    showSettingsHandler = () => {
        this.setState({ showSettings: !this.state.showSettings });
    }

    triggerCheckSelection = () => {
        checkSelection();
        this.setAnnotationsToState();
    }

    render() {
        return (
            <HighlightPop popoverItems={itemClass => (
                <span className={itemClass} onClick={this.triggerCheckSelection} >
                    Comment
                </span>
            )}>

                <div id="mainContent" className="container" >
                    <div className="sidebar left"></div>

                    <TopBar showSettings={this.showSettingsHandler}></TopBar>

                    {this.state.showSettings && <SettingsBar ></SettingsBar>}

                    <div id="contentContainer" className="content">
                        <div className="breadcrumb">
                            <p>test {'>'} test {'>'} test</p>
                        </div>

                        <div className="innerContent">
                            <div className="title">
                                <h1>{this.state.repository._title}</h1>
                            </div>
                            <div className="subtitle">
                                <p>{this.state.repository._subtitle}</p>
                            </div>
                            <div className="authors">
                                {
                                    this.state.repository._authors.map(author => (

                                        <div className="author">
                                            <span className="authorRole">{author._role} </span>
                                            <span className="authorName">{author._firstname} {author._firstname} </span>
                                            <span className="authorRole">({author._extraRole})</span>
                                        </div>

                                    ))

                                }
                            </div>
                            <div className="summary">
                                <p>{this.state.repository._summary}</p>
                            </div>

                            <div className="body">
                                {/* <p>{ReactHtmlParser(this.state.repository._content)}</p> */}
                                <p>{ReactHtmlParser(this.state.content)}</p>
                            </div>

                        </div>
                    </div>
                    <div className="sidebar right"></div>

                </div>
            </HighlightPop>

        );
    }
};


