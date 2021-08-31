import React from 'react';

const ActionTemplate = (props) => {
    return (
        <React.Fragment><div className="d-flex">
            {props.column.actions.map((actionItem, rowIndex) => {
                if (actionItem.label === 'Approve') {
                    if (!props.data.document_verified) {
                        return <button type="button" title={actionItem.label} key={rowIndex}
                            disabled={actionItem.disabled}
                            className={actionItem.className}
                            onClick={props.actionHandler.bind(this, { ...actionItem, 'rowData': props.data })}>
                            {!actionItem.icon &&
                                <React.Fragment>
                                    {actionItem.label}
                                </React.Fragment>
                            }
                            {actionItem.icon &&
                                <React.Fragment>
                                    <i className={actionItem.iconClass} />
                                </React.Fragment>
                            }
                        </button>
                    }
                    else {
                        return null
                    }
                }
                return <button type="button" title={actionItem.label} key={rowIndex}
                    disabled={actionItem.disabled}
                    className={actionItem.className}
                    onClick={props.actionHandler.bind(this, { ...actionItem, 'rowData': props.data })}>
                    {!actionItem.icon &&
                        <React.Fragment>
                            {actionItem.label}
                        </React.Fragment>
                    }
                    {actionItem.icon &&
                        <React.Fragment>
                            <i className={actionItem.iconClass} />
                        </React.Fragment>
                    }
                </button>
            })}
        </div></React.Fragment>
    );

};

export default ActionTemplate;