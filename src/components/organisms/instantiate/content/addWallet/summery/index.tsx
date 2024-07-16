import React from 'react';
import { SummeryAttribute, SummeryAttributeKey, SummeryAttributeValue, SummeryContainer } from './style';
import commaNumber from 'comma-number';

interface IProps {
    totalSupply: string;
    tokenSymbol: string;
    decimals: string;
}

const Summery = ({ totalSupply, tokenSymbol, decimals }: IProps) => {
    return (
        <SummeryContainer>
            <SummeryAttribute>
                <SummeryAttributeKey>Total Amount :</SummeryAttributeKey>
                {/* <SummeryAttributeValue>{getUTokenStrFromTokenStr(totalSupply, decimals)}</SummeryAttributeValue> */}
                <SummeryAttributeValue>{commaNumber(totalSupply)}</SummeryAttributeValue>
                <SummeryAttributeValue>{tokenSymbol}</SummeryAttributeValue>
            </SummeryAttribute>
        </SummeryContainer>
    );
};

export default React.memo(Summery);
