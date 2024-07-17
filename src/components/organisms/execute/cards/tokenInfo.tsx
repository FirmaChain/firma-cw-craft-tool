import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Icons from '../../../atoms/icons';
import { IC_DOTTED_DIVIDER, IC_VALID_SHIELD } from '../../../atoms/icons/pngIcons';
import { BASIC_LABEL } from '../../../../constants/cw20Types';
import CustomSelectInput from '../../../atoms/input/customSelectInput';
import Mint from './functions/mint';
import { useContractContext } from '../context/contractContext';
import { ITokenInfoState } from '../hooks/useExecueteHook';
import Burn from './functions/burn';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import BurnFrom from './functions/burnFrom';
import Transfer from './functions/transfer';
import UpdateMarketing from './functions/updateMarketing';
import IncreaseAllowance from './functions/increaseAllowance';
import DecreaseAllowance from './functions/decreaseAllowance';
import TransferFrom from './functions/transferFrom';
import UpdateMinter from './functions/updateMinter';

const Container = styled.div<{ $isSelectMenu: boolean }>`
    width: 100%;
    display: flex;
    padding: 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 24px;
    /* border: ; */
    border: ${(props) => (props.$isSelectMenu ? '1px solid var(--Green-500, #02e191)' : '1px solid var(--Green-500, #444)')};
    background: var(--200, #1e1e1e);
`;

const TokenInfoWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const TitleTypo = styled.div`
    color: var(--Gray-800, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const TokenBox = styled.div`
    display: flex;
    padding: 20px 24px;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    align-self: stretch;
    border-radius: 16px;
    background: var(--Gray-150, #141414);
`;

const ImageWrap = styled.div`
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const TokenInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
`;

const TokenTitleWrap = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
`;

const TokenSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const TokenNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ValidShieldIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const ContractTypeLabelWrap = styled.div`
    display: flex;
    padding: 2px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
`;

const ContractTypeTypo = styled.div`
    color: var(--Gray-700, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const DOTTED_DIVIDER = styled.img`
    width: 100%;
    height: auto;
`;

export interface IMenuItem {
    value: string;
    label: string;
}

const basicMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' }
];

const minterMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' },
    { value: 'updateMinter', label: 'Update Minter' }
];

const marketingMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' },
    { value: 'updateLogo', label: 'Update Logo' },
    { value: 'updateMarketing', label: 'Update Marketing' }
];

const allOwnerMenuItems: IMenuItem[] = [
    { value: 'select', label: 'Select' },
    { value: 'mint', label: 'Mint' },
    { value: 'burn', label: 'Burn' },
    { value: 'burnFrom', label: 'Burn From' },
    { value: 'increaseAllowance', label: 'Increase Allowance' },
    { value: 'decreaseAllowance', label: 'Decrease Allowance' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'transferFrom', label: 'Transfer From' },
    { value: 'updateMinter', label: 'Update Minter' },
    { value: 'updateLogo', label: 'Update Logo' },
    { value: 'updateMarketing', label: 'Update Marketing' }
];

interface IProps {
    tokenInfoState: ITokenInfoState;
}

const TokenInfo = ({ tokenInfoState }: IProps) => {
    const { address } = useSelector((state: rootState) => state.wallet);

    const { _setSelectMenu } = useContractContext();

    const [validTokenLogoUrl, setValidTokenLogoUrl] = useState<string>('');
    const [ownerMenus, setOwnerMenus] = useState<IMenuItem[]>([]);
    const [selectMenu, setSelectMenu] = useState<IMenuItem>({ value: 'select', label: 'Select' });

    const ContractTypeLabel = useMemo(() => {
        return BASIC_LABEL === tokenInfoState.label ? 'BASIC' : 'ADVANCED';
    }, [tokenInfoState.label]);

    useEffect(() => {
        if (tokenInfoState.marketingLogoUrl) {
            const img = new Image();
            img.src = tokenInfoState.marketingLogoUrl;
            img.onload = () => {
                setValidTokenLogoUrl(tokenInfoState.marketingLogoUrl);
            };
            img.onerror = () => {
                setValidTokenLogoUrl('');
            };
        } else {
            setValidTokenLogoUrl('');
        }
    }, [tokenInfoState.marketingLogoUrl]);

    useEffect(() => {
        let ruleMenus: IMenuItem[] = [];

        if (tokenInfoState.minter !== null) {
            console.log(`minter: ${tokenInfoState.minter.minter}`);
            console.log(`marketing: ${tokenInfoState.marketingAddress}`);
            if (tokenInfoState.minter.minter === address && tokenInfoState.marketingAddress === address) {
                console.log(1);
                ruleMenus = [...allOwnerMenuItems];
            } else if (tokenInfoState.minter.minter === address && tokenInfoState.marketingAddress !== address) {
                console.log(2);
                ruleMenus = [...minterMenuItems];
            } else if (tokenInfoState.minter.minter !== address && tokenInfoState.marketingAddress === address) {
                console.log(3);
                ruleMenus = [...marketingMenuItems];
            } else {
                ruleMenus = [...basicMenuItems];
            }
        } else {
            if (tokenInfoState.marketingAddress === address) {
                ruleMenus = [...marketingMenuItems];
            } else {
                ruleMenus = [...basicMenuItems];
            }
        }

        setOwnerMenus(ruleMenus);
    }, [tokenInfoState.marketingAddress, tokenInfoState.minter]);

    const RenderTokenLogo = useCallback(() => {
        const isValid = !Boolean(validTokenLogoUrl === '');
        return (
            <ImageWrap style={{ background: isValid ? 'transparent' : '#262626' }}>
                {isValid ? (
                    <img src={validTokenLogoUrl} style={{ width: '72px', height: '72px' }} />
                ) : (
                    <Icons.Picture width={'34px'} height={'34px'} />
                )}
            </ImageWrap>
        );
    }, [validTokenLogoUrl]);

    const handleChangeMenu = (menu: string) => {
        const _selectedMenu = ownerMenus.filter((item) => {
            return item.value === menu;
        });

        _setSelectMenu(_selectedMenu[0]);
        setSelectMenu(_selectedMenu[0]);
    };

    return (
        <Container $isSelectMenu={selectMenu.value === 'select' || selectMenu.value === ''}>
            <TokenInfoWrap>
                <TitleTypo>{'TOKEN INFO'}</TitleTypo>
                <TokenBox>
                    <RenderTokenLogo />
                    <TokenInfoBox>
                        <TokenTitleWrap>
                            <TokenSymbolTypo>{tokenInfoState.tokenSymbol}</TokenSymbolTypo>
                            <ValidShieldIcon src={IC_VALID_SHIELD} alt={'Firmachain Valid Contract'} />
                            <ContractTypeLabelWrap>
                                <ContractTypeTypo>{ContractTypeLabel}</ContractTypeTypo>
                            </ContractTypeLabelWrap>
                        </TokenTitleWrap>
                        <TokenNameTypo>{tokenInfoState.tokenName}</TokenNameTypo>
                    </TokenInfoBox>
                </TokenBox>
            </TokenInfoWrap>
            <CustomSelectInput menus={ownerMenus} onChangeMenu={handleChangeMenu} />
            {selectMenu.value !== 'select' && (
                <Fragment>
                    <DOTTED_DIVIDER src={IC_DOTTED_DIVIDER} alt={'Dotted Divider'} />
                    {selectMenu.value === 'mint' && (
                        <Mint
                            totalSupply={tokenInfoState.totalSupply}
                            minterCap={tokenInfoState.minter.cap}
                            tokenSymbol={tokenInfoState.tokenSymbol}
                            decimals={tokenInfoState.decimals}
                        />
                    )}
                    {selectMenu.value === 'burn' && <Burn decimals={tokenInfoState.decimals} addressAmount={tokenInfoState.addressAmount} />}
                    {selectMenu.value === 'burnFrom' && <BurnFrom decimals={tokenInfoState.decimals} tokenSymbol={tokenInfoState.tokenSymbol} />}
                    {selectMenu.value === 'transfer' && (
                        <Transfer
                            decimals={tokenInfoState.decimals}
                            tokenSymbol={tokenInfoState.tokenSymbol}
                            addressAmount={tokenInfoState.addressAmount}
                        />
                    )}
                    {selectMenu.value === 'increaseAllowance' && (
                        <IncreaseAllowance
                            decimals={tokenInfoState.decimals}
                            tokenSymbol={tokenInfoState.tokenSymbol}
                            userBalance={tokenInfoState.addressAmount}
                        />
                    )}
                    {selectMenu.value === 'decreaseAllowance' && (
                        <DecreaseAllowance
                            decimals={tokenInfoState.decimals}
                            tokenSymbol={tokenInfoState.tokenSymbol}
                            userBalance={tokenInfoState.addressAmount}
                        />
                    )}
                    {selectMenu.value === 'updateMarketing' && (
                        <UpdateMarketing
                            label={tokenInfoState.label}
                            marketingDescription={tokenInfoState.marketingDescription}
                            marketingAddress={tokenInfoState.marketingAddress}
                            marketingProject={tokenInfoState.marketingProject}
                        />
                    )}
                    {selectMenu.value === 'transferFrom' && (
                        <TransferFrom decimals={tokenInfoState.decimals} tokenSymbol={tokenInfoState.tokenSymbol} />
                    )}
                    {selectMenu.value === 'updateMinter' && <UpdateMinter minterAddress={tokenInfoState.minter.minter} />}
                </Fragment>
            )}
        </Container>
    );
};

export default TokenInfo;
