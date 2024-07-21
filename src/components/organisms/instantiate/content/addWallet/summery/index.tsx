import React from 'react';
import { SummeryAttribute, SummeryAttributeKey, SummeryAttributeValue, SummeryContainer } from './style';
import commaNumber from 'comma-number';
import { parseAmountWithDecimal } from '@/utils/common';

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
                <SummeryAttributeValue>{commaNumber(parseAmountWithDecimal(totalSupply, '0'))}</SummeryAttributeValue>
                <SummeryAttributeValue>{tokenSymbol}</SummeryAttributeValue>
            </SummeryAttribute>
        </SummeryContainer>
    );
};

export default React.memo(Summery);
