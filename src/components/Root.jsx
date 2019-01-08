import React from 'react';
import Main from '../containers/Main';
import Process from '../containers/Process';
import Result from '../containers/Result';
import Update from '../containers/Update';

const Root = () => (
    <div className="container">
        <Main />
        <Process />
        <Result />
        <Update />
    </div>
);

export default Root;
