import React from 'react';
import { ItemCoverValue, ItemLeftWrapper, ItemText, ItemValue, ItemValueCover, ItemWrapper } from './style';
import styled from 'styled-components';
import { TOOLTIP_ID } from '@/constants/tooltip';

interface IProps {
    imageChild: React.ReactNode;
    name: string;
    value: string;
    isCover?: boolean;
    defaultValue?: string;
    tooltip?: string;
}

const ItemEmptyValue = styled.div`
    color: var(--Gray-500, #383838);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ItemEmptyValueCover = styled.div`
    display: flex;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid var(--Gray-500, #383838);
    background: var(--Gray-400, #1e1e1e);
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const MarketingItem = ({ imageChild, name, value, isCover = false, defaultValue, tooltip }: IProps) => {
    return (
        <ItemWrapper $isCover={isCover}>
            <ItemLeftWrapper>
                {imageChild}
                <ItemText>{name}</ItemText>
            </ItemLeftWrapper>
            {!isCover ? (
                value ? (
                    <ItemValue
                        data-tooltip-content={tooltip || ''}
                        data-tooltip-id={TOOLTIP_ID.COMMON}
                        data-tooltip-wrapper="span"
                        data-tooltip-place="bottom"
                    >
                        {value}
                    </ItemValue>
                ) : (
                    <ItemEmptyValue>{defaultValue}</ItemEmptyValue>
                )
            ) : value ? (
                <ItemValueCover
                    $visible={value.length > 0}
                    data-tooltip-content={tooltip || ''}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    <ItemCoverValue>{value}</ItemCoverValue>
                </ItemValueCover>
            ) : (
                <ItemEmptyValueCover>
                    <ItemCoverValue style={{ color: 'var(--Gray-500, #383838)' }}>{defaultValue}</ItemCoverValue>
                </ItemEmptyValueCover>
            )}
        </ItemWrapper>
    );
};

export default MarketingItem;
