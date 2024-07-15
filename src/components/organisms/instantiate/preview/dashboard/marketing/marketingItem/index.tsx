import React from 'react';
import { ItemCoverValue, ItemLeftWrapper, ItemText, ItemValue, ItemValueCover, ItemWrapper } from './style';

interface IProps {
    imageChild: React.ReactNode;
    name: string;
    value: string;
    isCover?: boolean;
}

const MarketingItem = ({ imageChild, name, value, isCover = false }: IProps) => {
    return (
        <ItemWrapper $isCover={isCover}>
            <ItemLeftWrapper>
                {imageChild}
                <ItemText>{name}</ItemText>
            </ItemLeftWrapper>
            {!isCover ? (
                <ItemValue>{value}</ItemValue>
            ) : (
                <ItemValueCover $visible={value.length > 0}>
                    <ItemCoverValue>{value}</ItemCoverValue>
                </ItemValueCover>
            )}
        </ItemWrapper>
    );
};

export default MarketingItem;
