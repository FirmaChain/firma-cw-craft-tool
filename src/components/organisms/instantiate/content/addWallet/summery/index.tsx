import React from 'react';
import { SummeryAttribute, SummeryAttributeKey, SummeryAttributeValue, SummeryContainer } from './style';
import commaNumber from 'comma-number';
import TextEllipsis from '@/components/atoms/ellipsis';

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
                <TextEllipsis CustomDiv={SummeryAttributeValue} text={commaNumber(totalSupply)} breakMode={'letters'} />
                {/* <SummeryAttributeValue className="clamp-single-line">{commaNumber(totalSupply)}</SummeryAttributeValue> */}

                <SummeryAttributeValue style={{ fontWeight: 'normal' }}>{tokenSymbol}</SummeryAttributeValue>
            </SummeryAttribute>
        </SummeryContainer>
    );
};

export default React.memo(Summery);
