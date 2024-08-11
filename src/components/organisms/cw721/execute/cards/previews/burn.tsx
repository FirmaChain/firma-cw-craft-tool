import styled from 'styled-components';
import { IC_COIN_STACK, IC_COIN_STACK2 } from '@/components/atoms/icons/pngIcons';
import IconTooltip from '@/components/atoms/tooltip';
import Divider from '@/components/atoms/divider';
import GreenButton from '@/components/atoms/buttons/greenButton';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useMemo } from 'react';
import { subtractStringAmount } from '@/utils/balance';
import { QRCodeModal } from '@/components/organisms/modal';
import { useModalStore } from '@/hooks/useModal';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';

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

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ItemLeftWrap = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;
`;

const CoinStackIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const BurnInfoTitleTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    opacity: 0.8;
`;

const ItemRightWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const BurnAmountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const BurnSymbolTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const CoinStack2Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const UpdatedBalanceLabelTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const UpdatedBalanceTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 137.5% */
`;

const UpdatedSymbolTypo = styled.div`
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

const BurnPreview = () => {
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);
    
    const nftContractInfo = useCW721ExecuteStore((state) => state.nftContractInfo);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const totalSupply = useCW721ExecuteStore((state) => state.totalNfts);
    const burnList = useCW721ExecuteStore((state) => state.burnList);
    const nftDatas = useCW721ExecuteStore((state) => state.nftDatas);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const clearBurnForm = useCW721ExecuteStore((state) => state.clearBurnForm);
    const { setMyNftList } = useCW721ExecuteAction();

    const modal = useModalStore();

    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const totalBurnCount = useMemo(() => {
        if (burnList.length === 0) return 0;
        return burnList.split(',').filter((one) => one !== '').length;
    }, [burnList]);

    const updatedBurnCount = useMemo(() => {
        return subtractStringAmount(myNftList.length.toString(), totalBurnCount.toString());
    }, [myNftList, totalBurnCount]);

    const isEnableButton = useMemo(() => {
        if (Number(updatedBurnCount) <= -1) return false;
        if (totalBurnCount === 0) return false;

        //! if ends with comma
        if (burnList.endsWith(',')) return false;

        //? get all burn ids
        const splited = burnList.split(',').filter((v) => v !== ''); //? filter empty value after comma
        const idMap = new Map();
        splited.forEach((v) => {
            const parsed = BigInt(v).toString();
            idMap.set(parsed, parsed);
        });

        const burnIds = Array.from(idMap.keys());

        //! if tring to burn id that user does not own
        if (burnIds.length !== nftDatas.length) return false;

        //! if duplicted id included
        if (splited.length > 1 && burnIds.length !== splited.length) return false;

        return true;
    }, [updatedBurnCount, totalBurnCount, burnList, nftDatas]);

    const onClickBurn = () => {
        const convertList: { token_id: string }[] = [];
        const feeAmount = burnList.length === 1
        ? Number(craftConfig.DEFAULT_FEE) : burnList.length * Number(craftConfig.BULK_FEE);

        const token_ids = burnList.split(',');

        for (const burnData of token_ids) {
            convertList.push({
                token_id: burnData
            });
        }

        const params = {
            header: {
                title: 'Burn'
            },
            content: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Total Burn Amount',
                        value: totalBurnCount.toString(),
                        type: 'nft'
                    }
                ]
            },
            contract: contractAddress,
            msg: convertList
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/burn"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        clearBurnForm();
                        setMyNftList(contractAddress, address);
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStackIcon src={IC_COIN_STACK} alt={'Burn Title Icon'} />
                        <BurnInfoTitleTypo>Total Burn Amount</BurnInfoTitleTypo>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <BurnAmountTypo>{totalBurnCount}</BurnAmountTypo>
                        <BurnSymbolTypo>NFT</BurnSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>

                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-500, #383838)" />

                <ItemWrap>
                    <ItemLeftWrap>
                        <CoinStack2Icon src={IC_COIN_STACK2} alt={'Burn Update Balance Icon'} />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                            <UpdatedBalanceLabelTypo>Updated Balance</UpdatedBalanceLabelTypo>
                            <IconTooltip
                                size="14px" 
                                tooltip={`This is the total supply of NFTs after burning.`}
                            />
                        </div>
                    </ItemLeftWrap>
                    <ItemRightWrap>
                        <UpdatedBalanceTypo>{updatedBurnCount}</UpdatedBalanceTypo>
                        <UpdatedSymbolTypo>NFT</UpdatedSymbolTypo>
                    </ItemRightWrap>
                </ItemWrap>
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={!isEnableButton} onClick={onClickBurn}>
                    <div className="button-text">Burn</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default BurnPreview;
