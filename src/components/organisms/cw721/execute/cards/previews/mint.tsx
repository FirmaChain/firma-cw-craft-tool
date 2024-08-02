import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { IC_COIN_STACK, IC_COIN_STACK2, IC_LINK_GRAY, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import ArrowToggleButton from '@/components/atoms/buttons/arrowToggleButton';
import { useModalStore } from '@/hooks/useModal';
import Divider from '@/components/atoms/divider';
import IconTooltip from '@/components/atoms/tooltip';
import GreenButton from '@/components/atoms/buttons/greenButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { addStringAmount, getUTokenAmountFromToken } from '@/utils/balance';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { QRCodeModal } from '@/components/organisms/modal';
import { isValidAddress } from '@/utils/address';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
`;

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    gap: 24px;
`;

const TokenInfoWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const TokenTitleWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TokenInfoLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

const TokenInfoIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const TokenInfoTitleTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    opacity: 0.8;
`;

const TokenInfoRightWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const TokenInfoMintAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const TokeInfoMintSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const WalletListWrap = styled.div`
    height: auto;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const WalletLeftItemWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 16px;
`;

const WalletItemIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const WalletItemAddressTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#383838' : '#707070')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

const WalletItemWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const TokenInfoSubTitleTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const TotalSupplyWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const TotalSupplyAmount = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const TotalSupplySymbol = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MintPreview = () => {
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const totalNfts = useCW721ExecuteStore((state) => state.totalNfts);
    
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const mintRecipientAddress = useCW721ExecuteStore((state) => state.mintRecipientAddress);
    const mintList = useCW721ExecuteStore((state) => state.mintList);

    const clearMintForm = useCW721ExecuteStore((state) => state.clearMintForm);

    const modal = useModalStore();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const mintSupply = useMemo(() => {
        if (mintList.length === 1 && mintList[0].token_id === '' && mintList[0].token_uri === '') {
            return '0';
        }

        return mintList.length.toString();
    }, [mintList]);

    const isEnableButton = useMemo(() => {
        if (!isValidAddress(mintRecipientAddress)) return false;
        if (mintList.length > 0) {
            for (const mintData of mintList) {
                if (mintData.token_id === '') return false;
                if (mintData.token_uri === '') return false;
            }
        }
        return true;
    }, [mintRecipientAddress, mintList]);

    const willTotalSupply = useMemo(() => {
        return addStringAmount(mintSupply, totalNfts);
    }, [totalNfts, mintSupply]);

    const onClickMint = () => {
        const convertMintList: { owner: string, token_id: string, extension: {}, token_uri: string }[] = [];
        const feeAmount = mintList.length * 15000;

        for (const mintData of mintList) {
            convertMintList.push({
                owner: mintRecipientAddress,
                token_id: mintData.token_id,
                extension: {},
                token_uri: mintData.token_uri
            });
        }
        
        const params = {
            header: {
                title: 'Mint'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Mint Supply',
                        value: mintList.length.toString(),
                        type: 'nft'
                    }
                ]
            },
            contract: contractAddress,
            msg: convertMintList
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/mint"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearMintForm();
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap>
                <TokenTitleWrap>
                    <TokenInfoWrap>
                        <TokenInfoLeft>
                            <TokenInfoIcon src={IC_COIN_STACK} alt={'Mint Execute Title Icon'} />
                            <TokenInfoTitleTypo>Total Mint Supply</TokenInfoTitleTypo>
                        </TokenInfoLeft>
                        <TokenInfoRightWrap>
                            <TokenInfoMintAmountTypo>{mintSupply}</TokenInfoMintAmountTypo>
                            <TokeInfoMintSymbolTypo>NFT</TokeInfoMintSymbolTypo>
                            <ArrowToggleButton onToggle={setIsOpen} />
                        </TokenInfoRightWrap>
                    </TokenInfoWrap>
                    {!isOpen && (
                        <WalletListWrap>
                            <WalletLeftItemWrap>
                                <WalletItemIcon src={IC_WALLET} alt={'Wallet Item'} />
                                <WalletItemAddressTypo $disabled={mintRecipientAddress === ''}>{mintRecipientAddress === '' ? 'Wallet Address' : mintRecipientAddress}</WalletItemAddressTypo>
                            </WalletLeftItemWrap>
                            <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                            <WalletItemWrap>
                                {mintList.length === 1 && mintList[0].token_id === '' && mintList[0].token_uri === '' && (
                                    <WalletLeftItemWrap>
                                        <WalletItemIcon src={IC_LINK_GRAY} alt={'Wallet Item'} />
                                        <WalletItemAddressTypo $disabled={true}>NFT Url</WalletItemAddressTypo>
                                    </WalletLeftItemWrap>
                                )}
                                {mintList.length >= 1 && (mintList[0].token_id !== '' || mintList[0].token_uri !== '') && (
                                    mintList.map((value, index) => (
                                        <WalletLeftItemWrap key={index}>
                                            <WalletItemIcon src={IC_LINK_GRAY} alt={'Wallet Item'} />
                                            <WalletItemAddressTypo $disabled={false}>{value.token_uri}</WalletItemAddressTypo>
                                        </WalletLeftItemWrap>
                                    ))
                                )}
                            </WalletItemWrap>
                        </WalletListWrap>
                    )}
                </TokenTitleWrap>
                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />
                <TokenInfoWrap>
                    <TokenInfoLeft>
                        <TokenInfoIcon src={IC_COIN_STACK2} alt={'Mint Execute Subtitle Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <TokenInfoSubTitleTypo>Total Supply</TokenInfoSubTitleTypo>
                            <IconTooltip
                                size="14px"
                                tooltip={`Total Supply is the sum of the existing Total\nSupply and the newly minted amount.`}
                            />
                        </div>
                    </TokenInfoLeft>
                    <TokenInfoRightWrap>
                        <TotalSupplyWrap>
                            <TotalSupplyAmount>{willTotalSupply}</TotalSupplyAmount>
                            <TotalSupplySymbol>NFT</TotalSupplySymbol>
                        </TotalSupplyWrap>
                    </TokenInfoRightWrap>
                </TokenInfoWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickMint}>
                    <div className="button-text">Mint</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default MintPreview;
