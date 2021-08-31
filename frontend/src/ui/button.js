import React from 'react';

const button = (props:any) => (
    <button type="submit"
        disabled={props.disabled}
        className={props.className}
        onClick={props.clicked}>{props.children}</button>
);

export default button;