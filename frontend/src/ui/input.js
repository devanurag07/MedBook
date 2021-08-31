import React from 'react';

const Input = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={props.elementClassName}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={props.elementClassName}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={props.elementClassName}
                    value={props.value}
                    onChange={props.changed}>
                    <option value={false}>{props.elementConfig.filterLabel}</option>
                    {props.elementConfig.options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option[props.elementConfig.optionKey]}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={props.elementClassName}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={props.className}>
            {props.label && <label className={props.labelClassName}>{props.label}</label>}
            {inputElement}
        </div>
    );

};

export default Input;