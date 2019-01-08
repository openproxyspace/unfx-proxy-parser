import React from 'react';
import { splitByKK } from '../misc/text';

const ProcessParse = ({ parsing }) => {
    const progressStyle = {
        width: Math.floor((parsing.done / parsing.all) * 100) + '%'
    };

    return (
        <section className="stage">
            <h3>Parsing</h3>
            <div className="progress-bar">
                <div className="fill" style={progressStyle} />
                <span>
                    Parsed links {splitByKK(parsing.done)} of {splitByKK(parsing.all)}
                </span>
            </div>
        </section>
    );
};

export default ProcessParse;
