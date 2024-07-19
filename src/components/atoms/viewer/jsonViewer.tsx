import { StyledOverlayScrollbar } from '@/components/organisms/instantiate/preview/dashboard/style';
import React, { useId } from 'react';
import { Key, Value, Wrapper, Container } from './styles';

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
        <div style={{ height: '100%', overflow: 'hidden' }}>
            <Wrapper style={{ maxHeight: '400px' }}>
                <StyledOverlayScrollbar defer>
                    <Container>
                        <div key={`${id}_start`}>{'{'}</div>
                        <>{renderJson(data)}</>
                        <div key={`${id}_end`}>{'}'}</div>
                    </Container>
                </StyledOverlayScrollbar>
            </Wrapper>
        </div>
    );
};

export default JsonViewer;
