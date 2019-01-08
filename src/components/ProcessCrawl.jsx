import React from 'react';
import ProcessCrawlLevel from './ProcessCrawlLevel';

const ProcessCrawl = ({ crawling }) => (
    <section className="stage">
        <h3>Crawling</h3>
        {crawling.map(item => (
            <ProcessCrawlLevel {...item} key={`level-${item.level}`} />
        ))}
    </section>
);

export default ProcessCrawl;
