import React from 'react';
import { splitByKK } from '../misc/text';

export default class ResultCountryItem extends React.PureComponent {
    toggle = () => {
        const { toggleCountry, code, active } = this.props;
        toggleCountry(code, !active);
    };

    toggleAll = () => {
        const { toggleCountry, code, active } = this.props;
        toggleCountry(code, !active, true);
    };

    render = () => {
        const { active, flag, name, items } = this.props;

        return (
            <div className={`country-item ${active ? 'active' : 'unactive'}`} onClick={this.toggle} onDoubleClick={this.toggleAll}>
                <div className={`ico ${flag} png`} />
                <div className="merge">
                    <div className="name">{name}</div>
                    <div className="count">Proxies: {splitByKK(items.length)}</div>
                </div>
            </div>
        );
    };
}
