import styled from 'styled-components';

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, SummeryCard, TitleWrap } from './styles';
import WalletList from '@/components/atoms/walletList';
import { IWallet } from '@/interfaces/wallet';
import { useId, useState } from 'react';
import { useContractContext } from '../../context/contractContext';
import LabelInput2 from '@/components/atoms/input/labelInput2';
import InputAddressAmount from '@/components/atoms/input/inputAddressAmount';
import { FirmaUtil } from '@firmachain/firma-js';
import { getTokenStrFromUTokenStr, getUTokenStrFromTokenStr } from '@/utils/common';
import IconButton from '@/components/atoms/buttons/iconButton';
import VariableInput2 from '@/components/atoms/input/variableInput2';

const UserBalanceTypo = styled.div`
    color: var(--Gray-550, #444);

    /* Body/Body4 */
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

const InputTitle = styled.div`
    color: var(--Gray-800, #dcdcdc);

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ExpirationTypButton = styled(IconButton)<{ $selected?: boolean }>`
    width: 152px;
    height: 36px;
    border-radius: 8px;
    // padding: 8px 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--Gray-500, #383838);
    background: ${({ $selected }) => ($selected ? 'var(--Gray-800, #dcdcdc)' : 'transparent')};

    span {
        color: ${({ $selected }) =>
            $selected ? 'var(--Gray-250, var(--200, #1e1e1e))' : 'var(--Gray-900, var(--Primary-Base-White, #FFF))'};

        /* Body/Body2 - Bd */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
        line-height: 20px; /* 142.857% */
    }
`;

enum ExpirationType {
    Height = 'Height',
    Time = 'Time',
    Forever = 'Forever'
}

interface IProps {
    decimals: string;
    tokenSymbol: string;
    userBalance: string;
}

const DecreaseAllowance = ({ decimals, tokenSymbol, userBalance }: IProps) => {
    const inputId = 'DECREASE_ALLOWANCE';

    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [expirationTyp, setExpirationTyp] = useState<ExpirationType>(ExpirationType.Height);
    const [expInputValue, setExpInputValue] = useState('');

    const handleChangeAddress = (value: string) => {
        setAddress(value);
    };

    const handleChangeAmount = (value: string) => {
        setAmount(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Decrease Allowance</HeaderTitleTypo>
                    <HeaderDescTypo>Reduce the amount of tokens someone is allowed to use</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                {/* Address / Amount Input */}
                <div style={{ display: 'flex', width: '100%', minHeight: '76px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', gap: '8px' }}>
                            <LabelInput2
                                labelProps={{ label: 'Recipient Address' }}
                                inputProps={{
                                    formId: `${inputId}_ADDRESS`,
                                    value: address,
                                    onChange: handleChangeAddress,
                                    placeHolder: 'Input Wallet Address'
                                    // emptyErrorMessage: 'Please input firmachain wallet address'
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                minWidth: '212px',
                                gap: '8px'
                            }}
                        >
                            <LabelInput2
                                labelProps={{ label: 'Increaes Amount' }}
                                inputProps={{
                                    formId: `${inputId}_AMOUNT`,
                                    value: amount,
                                    onChange: handleChangeAmount,
                                    placeHolder: '0',
                                    type: 'number',
                                    decimal: decimals ? Number(decimals) : 6,
                                    // emptyErrorMessage: 'Please input mint amount',
                                    textAlign: 'right',
                                    maxValue: Number(getTokenStrFromUTokenStr(userBalance, decimals))
                                }}
                            />

                            <UserBalanceTypo>Balance: {getTokenStrFromUTokenStr(userBalance, decimals)}</UserBalanceTypo>
                        </div>
                    </div>
                </div>
                {/* Expiration Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <InputTitle>Expiration</InputTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                        {Object.values(ExpirationType).map((type) => (
                            <ExpirationTypButton
                                key={`EXPIRATION_TYPE_${type}`}
                                $selected={expirationTyp === type}
                                onClick={() => {
                                    setExpInputValue('');
                                    setExpirationTyp(ExpirationType[type]);
                                }}
                            >
                                <span>
                                    {type !== ExpirationType.Forever && 'At '}
                                    {type}
                                </span>
                            </ExpirationTypButton>
                        ))}
                    </div>
                </div>
                <VariableInput2
                    value={expInputValue}
                    placeHolder={
                        expirationTyp === ExpirationType.Height
                            ? 'ex) 7216240'
                            : expirationTyp === ExpirationType.Time
                              ? 'ex) MM-DD-YYYY  HH:MM:SS'
                              : 'Forever'
                    }
                    type={expirationTyp === ExpirationType.Time ? 'date' : 'number'}
                    onChange={(v) => setExpInputValue(v)}
                    readOnly={expirationTyp === ExpirationType.Forever}
                    decimal={0}
                />
            </div>
        </Container>
    );
};

export default DecreaseAllowance;
