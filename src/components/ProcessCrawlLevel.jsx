import React from 'react';
import { splitByKK } from '../misc/text';

const ProcessCrawlLevel = ({ level, links }) => {
    const progressStyle = {
        width: Math.floor((links.passed / links.all) * 100) + '%'
    };

    return (
        <div className="crawl-level">
            <div className="stats">
                <span className="level">Deep level {level + 1}</span>
                <span className="found-links">Found New Links: {splitByKK(links.found)}</span>
            </div>
            <div className="progress-bar">
                <div className="fill" style={progressStyle} />
                <span>
                    Crawled links {splitByKK(links.passed)} of {splitByKK(links.all)}
                </span>
            </div>
        </div>
    );
};

export default ProcessCrawlLevel;
