import React from 'react';

const BadgeTemplate = (props) => {
    return (
        <React.Fragment>
            <span className={props.badgeClassName}>{props.data}</span>
        </React.Fragment>
    );

};

export default BadgeTemplate;