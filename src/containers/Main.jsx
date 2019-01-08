import React from 'react';
import { connect } from 'react-redux';
import { changeOption, toggleOption } from '../actions/MainActions';
import { start } from '../actions/ProcessActions';
import Footer from '../components/Footer';
import Checkbox from '../components/ui/Checkbox';

import '../../public/styles/Main.postcss';
import '../../public/styles/Elements.postcss';

const Main = ({ threads, retry, deep, external, level, input, changeOption, toggleOption, start }) => (
    <div className="main-page-container">
        <div className="main-page-content">
            <div className="blocks-row">
                <div className="block middle wo-title">
                    <div className="content no-flex no-bot">
                        <Checkbox id="retry" name="retry" checked={retry} onChange={toggleOption} text="Retry" />
                        <Checkbox id="deep" name="deep" checked={deep} onChange={toggleOption} text="Deep" />
                        <Checkbox id="external" name="external" checked={external} onChange={toggleOption} text="External" />
                    </div>
                </div>
            </div>
            <div className="blocks-row">
                <div className="block slider middle">
                    <div className="title">
                        <span className="name">Threads</span>
                        <span className="value">{threads}</span>
                    </div>
                    <div className="content no-bot">
                        <input type="range" name="threads" min="1" max="500" onChange={changeOption} value={threads} />
                    </div>
                </div>
                <div className="block slider middle">
                    <div className="title">
                        <span className="name">Deep level</span>
                        <span className="value">{level}</span>
                    </div>
                    <div className="content no-bot">
                        <input type="range" name="level" min="1" max="15" onChange={changeOption} value={level} />
                    </div>
                </div>
            </div>
            <div className="blocks-row">
                <div className="block large">
                    <div className="title">
                        <span className="name">Urls</span>
                    </div>
                    <div className="content no-bot">
                        <textarea
                            name="input"
                            autoComplete="off"
                            className="input-area"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck="false"
                            rows="10"
                            onChange={changeOption}
                            value={input}
                        />
                    </div>
                </div>
            </div>
            <div className="blocks-row">
                <div className="block large">
                    <div className="content no-bot">
                        <button onClick={start}>Parse</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
);

const mapStateToProps = state => ({
    ...state.main
});

const mapDispatchToProps = {
    changeOption,
    toggleOption,
    start
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
