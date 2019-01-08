import React from 'react';
import { connect } from 'react-redux';
import ProcessCrawl from '../components/ProcessCrawl';
import ProcessParse from '../components/ProcessParse';

import '../../public/styles/Process.postcss';

const Process = ({ active, deep, stage, crawling, parsing }) => (
    <div className={`process-container ${active ? 'active' : 'unactive'}`}>
        <div className="process-content">
            {deep && (
                <ProcessCrawl crawling={crawling} />
            )}
            {stage > 1 && (
                <ProcessParse parsing={parsing} />
            )}
        </div>
    </div>
);

export default connect(state => ({ ...state.process, deep: state.main.deep }))(Process);
