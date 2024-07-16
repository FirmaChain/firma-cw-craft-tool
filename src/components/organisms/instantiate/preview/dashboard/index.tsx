import React from 'react';
import { useSelector } from 'react-redux';

import Icons from '@/components/atoms/icons';
import {
    DashboardBody,
    DashboardWrapper,
    IconBackground,
    StyledOverlayScrollbar,
    TextGroupWrapper,
    TitleDescription,
    TitleText,
    TitleWrapper
} from './style';
import { rootState } from '@/redux/reducers';
import TokenInfo from './tokenInfo';
import Amount from './amount';
import { IWallet } from '@/interfaces/wallet';
import Marketing from './marketing';

interface IProps {
    isBasic: boolean;
    tokenLogoUrl: string;
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    minterble: boolean;
    minterCap: string;
    minterAddress: string;
    totalSupply: string;
    walletList: IWallet[];
    decimals: string;
    label: string;
    marketingAddress: string;
    marketingProject: string;
}

const Dashboard = ({
    isBasic,
    tokenLogoUrl,
    tokenName,
    tokenSymbol,
    tokenDescription,
    minterble,
    minterCap,
    minterAddress,
    totalSupply,
    walletList,
    decimals,
    label,
    marketingAddress,
    marketingProject
}: IProps) => {
    const cw20Mode = useSelector((state: rootState) => state.global.cw20Mode);

    return (
        <DashboardWrapper>
            <TitleWrapper>
                <IconBackground>
                    <Icons.Preview width={'32px'} height={'32px'} />
                </IconBackground>
                <TextGroupWrapper>
                    <TitleText>PREVIEW</TitleText>
                    <TitleDescription>View all token informations at a glance.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>

            <DashboardBody>
                <StyledOverlayScrollbar
                    defer
                    overflow={{
                        x: 'hidden'
                    }}
                >
                    <TokenInfo
                        tokenLogoUrl={tokenLogoUrl}
                        tokenName={tokenName}
                        tokenSymbol={tokenSymbol}
                        tokenDescription={tokenDescription}
                    />
                    {cw20Mode === 'ADVANCED' && (
                        <Marketing
                            label={label}
                            decimals={decimals}
                            marketingAddress={marketingAddress}
                            marketingProject={marketingProject}
                        />
                    )}
                    <Amount
                        minterble={minterble}
                        minterCap={minterCap}
                        tokenSymbol={tokenSymbol}
                        minterAddress={minterAddress}
                        totalSupply={totalSupply}
                        walletList={walletList}
                        decimals={decimals}
                    />
                </StyledOverlayScrollbar>
            </DashboardBody>
        </DashboardWrapper>
    );
};

export default React.memo(Dashboard);
