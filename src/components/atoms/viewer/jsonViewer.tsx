import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { useId } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border-radius: 24px;
    background-color: #141414;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Container = styled.div<{ $maxHeight?: string }>`
    background-color: #141414;
    max-width: calc(750px - 48px);
    padding: 24px;
    // border-radius: 24px;
    color: white;
    font-family: 'Courier New', Courier, monospace;
    // max-height: ${({ $maxHeight }) => $maxHeight || '100%'};
    // overflow-y: scroll;

    // &::-webkit-scrollbar {
    //     display: none;
    // }
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

const StyledOverlayScrollbar = styled(OverlayScrollbarsComponent)`
    // .os-scrollbar {
    //     --os-size: 16px;
    //     --os-padding-perpendicular: 5px;
    //     --os-padding-axis: 20px;
    //     --os-track-border-radius: 50%;
    //     --os-handle-bg: var(--Gray-550, #444);
    //     --os-handle-bg-hover: var(--Gray-550, #444);
    //     --os-handle-bg-active: var(--Gray-550, #444);
    // }
`;

const JsonViewer = ({ data }) => {
    const id = useId();

    const renderJson = (data: any, indent: number = 1): React.ReactNode => {
        return Object.keys(data).map((key) => {
            const value = data[key];
            const padding = { paddingLeft: `${indent * 20}px` };

            if (typeof value === 'object' && value !== null) {
                return (
                    <div key={key}>
                        <div style={padding}>
                            <Key>"{key}"</Key>: {'{'}
                        </div>
                        <div style={{ paddingLeft: `${indent * 20}px` }}>{renderJson(value, indent)}</div>
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

    return (
        <StyledOverlayScrollbar defer>
            <Wrapper style={{ maxHeight: '400px' }}>
                <Container>
                    <div key={`${id}_start`}>{'{'}</div>
                    <>{renderJson(data)}</>
                    <div key={`${id}_end`}>{'}'}</div>
                </Container>
            </Wrapper>
        </StyledOverlayScrollbar>
    );
};

export default JsonViewer;
