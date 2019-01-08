import React from 'react';
import { connect } from 'react-redux';
import { splitByKK } from '../misc/text';
import { save, close, toggleCountry } from '../actions/ResultActions';
import ResultCountryItem from '../components/ResultCountryItem';

import '../../public/styles/Result.postcss';
import '../../public/styles/Icons.postcss';

const Result = ({ active, proxiesByCountries, save, close, toggleCountry }) => {
    const activeCountries = proxiesByCountries.filter(item => item.active);
    const selectedProxiesCount = activeCountries.reduce((prev, curr) => prev + curr.items.length, 0);

    return (
        <div className={`result-container ${active ? 'active' : 'unactive'}`}>
            <div className="result-content">
                <div className="content-header">
                    <div className="selected-counts">
                        <span>
                            Selected: {activeCountries.length} of {proxiesByCountries.length}
                        </span>
                        <span>Proxies: {splitByKK(selectedProxiesCount)}</span>
                    </div>
                    <div className="controls">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 49 49" onClick={save}>
                            <path d="M39.914,0H37.5h-28h-9v49h7h33h8V8.586L39.914,0z M35.5,2v14h-24V2H35.5z M9.5,47V28h29v19H9.5z M46.5,47h-6V26h-33v21h-5   V2h7v16h28V2h1.586L46.5,9.414V47z" />
                            <path d="M13.5,33h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,33,13.5,33z" />
                            <path d="M23.5,35h-10c-0.553,0-1,0.447-1,1s0.447,1,1,1h10c0.553,0,1-0.447,1-1S24.053,35,23.5,35z" />
                            <path d="M25.79,35.29c-0.181,0.189-0.29,0.45-0.29,0.71s0.109,0.52,0.29,0.71C25.979,36.89,26.229,37,26.5,37   c0.26,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71C26.84,34.92,26.16,34.92,25.79,35.29z" />
                            <path d="M33.5,4h-6v10h6V4z M31.5,12h-2V6h2V12z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" onClick={close}>
                            <path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z" />
                            <path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z" />
                        </svg>
                    </div>
                </div>
                <div className="countries">
                    {proxiesByCountries.map(country => (
                        <ResultCountryItem toggleCountry={toggleCountry} {...country} key={country.code} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    ...state.result
});

const mapDispatchToProps = {
    save,
    close,
    toggleCountry
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Result);
