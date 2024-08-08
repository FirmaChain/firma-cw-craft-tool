import styled from 'styled-components';
import { Container, HeaderDescTypo, HeaderTitleTypo, TitleWrap, SummeryCard, HeaderWrap } from './styles';
import TransferNFTInputList from '@/components/atoms/walletList/transferNFTInputList';
import Divider from '@/components/atoms/divider';
import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import { useEffect, useMemo, useRef } from 'react';
import useFormStore from '@/store/formStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { useFirmaSDKContext } from '@/context/firmaSDKContext';

const ItemWrap = styled.div`
    display: flex;
    gap: 4px;
`;

const TotalTransferLabelTypo = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const TotalTransferAmountTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

const MyWalletLabelTypo = styled.div`
    color: var(--Gray-550, #444);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const MyWalletAmountTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const Transfer = () => {
    const address = useSelector((v: rootState) => v.wallet.address);
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const myNftList = useCW721ExecuteStore((state) => state.myNftList);
    const transferInfo = useCW721ExecuteStore((v) => v.transfer);
    const approveInfoById = useCW721ExecuteStore((v) => v.approveInfoById);
    const setTransfer = useCW721ExecuteStore((v) => v.setTransfer);
    const clearTransferForm = useCW721ExecuteStore((v) => v.clearTransferForm);
    const setApproveInfoById = useCW721ExecuteStore((v) => v.setApproveInfoById);
    const { setFctBalance, setMyNftList } = useCW721ExecuteAction();
    const { firmaSDK } = useFirmaSDKContext();

    const setFormError = useFormStore((v) => v.setFormError);
    const clearFormError = useFormStore((v) => v.clearFormError);

    const transferIds = useMemo(() => {
        const idsMap = new Map();

        transferInfo.forEach((v) => v.token_ids.filter((v) => v !== '').map((id) => idsMap.set(BigInt(id).toString(), true)));
        return Array.from(idsMap.keys());
    }, [transferInfo]);

    const approvalCheckIds = useMemo(() => {
        //? does not own + not in approval info (undefined) -> check requested
        return transferIds.filter((id) => !myNftList.includes(id) && approveInfoById[id] === undefined);
    }, [approveInfoById, myNftList, transferIds]);

    const chkApproval = async () => {
        if (approvalCheckIds.length === 0) return;

        const newInfo = { ...approveInfoById };

        for (const id of approvalCheckIds) {
            try {
                const nftInfo = await firmaSDK.Cw721.getNftData(contractAddress, id);

                if (nftInfo.access.owner.toLowerCase() === address.toLowerCase()) {
                    //? IF owner is connected user
                    newInfo[id] = true;
                    continue;
                }

                const expiration = nftInfo.access.approvals.find(({ spender }) => spender.toLowerCase() === address.toLowerCase());
                if (expiration) {
                    //? user is included on approval list, time to validate expiration
                    if (expiration.expires['never']) {
                        //? approved forever. always true
                        newInfo[id] = true;
                        continue;
                    }

                    if (expiration.expires['at_time']) {
                        //? approved to certain time. need to check
                        const expirationTimestamp = BigInt(expiration.expires['at_time']) / BigInt(1_000_000);

                        if (expirationTimestamp > BigInt(Number(new Date()))) {
                            newInfo[id] = true;
                            continue;
                        }
                    }

                    if (expiration.expires['at_height']) {
                        //? approved to certain block height. need to check block height

                        const expirationBlockHeight = BigInt(expiration.expires['at_height']);
                        const { latest_block_height } = await firmaSDK.BlockChain.getChainSyncInfo();

                        if (expirationBlockHeight > BigInt(latest_block_height)) {
                            newInfo[id] = true;
                            continue;
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }

            newInfo[id] = false;
        }

        // console.log('newInfo', newInfo);
        setApproveInfoById({ ...newInfo });
    };

    // console.log('approveInfoById', approveInfoById);

    useEffect(() => {
        //? check if un-approved, or un-owned nft id included
        //? duplicate check is included in transferNFTInput

        transferInfo.forEach(({ id, token_ids }) => {
            const currentIdMap = new Map();
            token_ids.map((v) => currentIdMap.set(BigInt(v).toString(), true));
            const currentIds = Array.from(currentIdMap.keys());

            if (currentIds.length !== token_ids.length) {
                setFormError({ id: `${id}_Token ID`, type: 'DUPLICATED_ID', message: `Duplicated NFT id encluded.` });
                return;
            } else {
                clearFormError({ id: `${id}_Token ID`, type: 'DUPLICATED_ID' });
            }

            const flatList = [];
            const idsFromOthers = transferInfo.filter(({ id: _id }) => _id !== id).map(({ token_ids }) => token_ids);
            idsFromOthers.forEach((v) => flatList.push(...v));
            if (token_ids.some((nftId) => flatList.includes(nftId))) {
                setFormError({ id: `${id}_Token ID`, type: 'DUPLICATED_ID', message: `Duplicated NFT id encluded.` });
                return;
            } else {
                clearFormError({ id: `${id}_Token ID`, type: 'DUPLICATED_ID' });
            }

            if (token_ids.some((id) => !myNftList.includes(id) && approveInfoById[id] === false)) {
                setFormError({
                    id: `${id}_Token ID`,
                    type: 'NOT_OWN_OR_ALLOWED',
                    message: 'Contains an NFT ID that is not approved or owned.'
                });
                return;
            } else {
                clearFormError({ id: `${id}_Token ID`, type: 'NOT_OWN_OR_ALLOWED' });
            }
        });
    }, [transferInfo, approveInfoById, myNftList]);

    //? Debounce async approval checklist
    const isCheckingApproval = useRef<null | NodeJS.Timeout>(null);
    useEffect(() => {
        if (isCheckingApproval.current) {
            // if waiting update, cancel update and re-start timer
            clearTimeout(isCheckingApproval.current);
            isCheckingApproval.current = null;

            isCheckingApproval.current = setTimeout(() => {
                chkApproval();
                isCheckingApproval.current = null;
            }, 500);
        } else {
            // if not waiting, set timer to start function
            isCheckingApproval.current = setTimeout(() => {
                chkApproval();
                isCheckingApproval.current = null;
            }, 500);
        }
    }, [approvalCheckIds]);

    useEffect(() => {
        if (contractAddress === null) return;

        setFctBalance(address);
        setMyNftList(contractAddress, address);

        return () => {
            clearTransferForm();
            useFormStore.getState().clearForm();
        };
    }, []);

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Transfer</HeaderTitleTypo>
                    <HeaderDescTypo>Move an NFT from one address to another</HeaderDescTypo>
                </TitleWrap>
                <SummeryCard>
                    <ItemWrap>
                        <TotalTransferLabelTypo>Total Transfer Amount :</TotalTransferLabelTypo>
                        <TotalTransferAmountTypo>{transferIds.length}</TotalTransferAmountTypo>
                        <TotalTransferAmountTypo>NFT</TotalTransferAmountTypo>
                    </ItemWrap>
                    <Divider $direction={'horizontal'} $variant="dash" $color="#444" />
                    <ItemWrap>
                        <MyWalletLabelTypo>My Wallet Balance :</MyWalletLabelTypo>
                        <MyWalletAmountTypo>{myNftList?.length}</MyWalletAmountTypo>
                        <MyWalletAmountTypo>NFT</MyWalletAmountTypo>
                    </ItemWrap>
                </SummeryCard>
            </HeaderWrap>
            <TransferNFTInputList list={transferInfo} onChangeWalletList={(v) => setTransfer(v)} />
        </Container>
    );
};

export default Transfer;
