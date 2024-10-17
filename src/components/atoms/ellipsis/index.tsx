import { TOOLTIP_ID } from '@/constants/tooltip';
import React from 'react';
import { useMeasure } from 'react-use';

const TextEllipsis = ({
    CustomDiv,
    customDivProps,
    text,
    breakMode,
    tooltip,
    className
}: {
    CustomDiv: React.ComponentType<any>;
    text: string;
    breakMode: 'words' | 'letters';
    tooltip?: string;
    customDivProps?: any;
    className?: string;
}) => {
    const [visibleRef, { height: visibleHeight }] = useMeasure();
    const [hiddenRef, { height: hiddenHeight }] = useMeasure();

    const isEllipsis = visibleHeight !== hiddenHeight;

    return (
        <div style={{ width: 'fit-content', position: 'relative' }}>
            <CustomDiv
                ref={visibleRef}
                className={`clamp-single-line ${className}`}
                style={{ wordBreak: breakMode === 'words' ? 'break-word ' : 'break-all' }}
                data-tooltip-id={TOOLTIP_ID.COMMON}
                data-tooltip-content={isEllipsis ? tooltip || text : ''}
                {...customDivProps}
            >
                {text}
            </CustomDiv>

            <CustomDiv
                ref={hiddenRef}
                {...customDivProps}
                style={{
                    color: breakMode === 'words' ? 'red' : 'blue',
                    wordBreak: breakMode === 'words' ? 'break-word' : 'break-all',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    userSelect: 'none',
                    zIndex: Number.MAX_SAFE_INTEGER * -1,
                    opacity: 0
                }}
            >
                {text}
            </CustomDiv>
        </div>
    );
};

export default TextEllipsis;
