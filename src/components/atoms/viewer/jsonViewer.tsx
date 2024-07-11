import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    background-color: #141414;
    max-width: calc(750px - 48px);
    padding: 24px;
    border-radius: 5px;
    color: white;
    font-family: 'Courier New', Courier, monospace;
`;

const Key = styled.span`
    color: #506ee5;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

const Value = styled.span`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

const JsonViewer = ({ data }) => {
    const renderJson = (data: any, indent: number = 0): React.ReactNode => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            const padding = { paddingLeft: `${indent * 20}px` };

            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <div style={padding}>
                            <Key>"{key}"</Key>: {'{'}
                        </div>
                        <div style={{ paddingLeft: `${(indent + 1) * 20}px` }}>{renderJson(value, indent + 1)}</div>
                        <div style={padding}>{'}'}</div>
                    </div>
                );
            }

            return (
                <div key={key} style={padding}>
                    <Key>"{key}"</Key>: <Value>{JSON.stringify(value)}</Value>
                </div>
            );
        });
    };

    return <Container>{renderJson(data)}</Container>;
};

export default JsonViewer;
