import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';

import { ModalBase } from '../style';
import { IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';
import RequestQR from '../../requestQR';
import { rootState } from '@/redux/reducers';
import useInstantiateStore from '../../cw721/instantiate/instantiateStore';
import useFormStore from '@/store/formStore';
import { FirmaUtil } from '@firmachain/firma-js';
import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import useExecuteHook from '../../execute/hooks/useExecueteHook';
import IconButton from '@/components/atoms/buttons/iconButton';
import Divider from '@/components/atoms/divider';
import { TransactionItem } from '..';
import { getTransactionHash } from '@/utils/transaction';
import { CRAFT_CONFIGS } from '@/config';

const ModalTitleWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    // gap: 16px;
    justify-content: center;
    margin-top: 25px;
`;

const ModalTitleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const ModalTitleDescTypo = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    white-space: pre-line;
`;

const QrCodeWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModalContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

const ModalContentBlackCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 24px;
    border-radius: 8px;
    background: var(--Gray-200, #141414);
`;

const ItemWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemRightWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ModalItemLabelTypo = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

const ModalItemValueTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

const ModalContentGrayCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 24px;
    gap: 2px;
    justify-content: space-between;
    border-radius: 8px;
    background: var(--Gray-200, #1a1a1a);
`;

const FeeLabel = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

const ItemValueWrap = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
`;

const FeeAmount = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const FCTSymbolIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const MyBalanceValue = styled.div`
    color: var(--Gray-750, #999);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */

    display: flex;
    align-items: center;
`;

const FCTSymbolMiniIcon = styled.img`
    width: 12px;
    height: 12px;
    margin-left: 4px;
`;

const ModalCancelButton = styled(IconButton)`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-radius: 6px;
    background: var(--Gray-450, #313131);
    cursor: pointer;
`;

const ModalCancelTypo = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ResultsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // gap: 14px;

    margin-bottom: 28px;
`;

const ResultIcon = styled.img`
    width: 56px;
    height: 56px;

    margin-bottom: 16px;
`;

const ResultsTitleWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const ResultsTitleExecuteTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const ResultsTitleSuccessTypo = styled.div`
    color: var(--Status-Success, var(--Primary-Base-White, #57d962));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const ResultsTitleFailedTypo = styled.div`
    color: var(--Status-Alert, var(--Primary-Base-White, #e55250));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

const ResultsTitleMessage = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    margin-top: 14px;
`;

const ResultsContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-bottom: 36px;

    border-radius: 8px;
    background: var(--Gray-150, #141414);
`;

const ResultFailedTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;

    /* Body/Body2 - Md */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ResultFailedDesc = styled.div`
    color: var(--Gray-700, #807e7e);
    text-align: center;

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ResultsContentSummeryWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px 24px 16px 24px;
    // border-radius: 8px 8px 0px 0px;
    // border-bottom: 1px dashed var(--Gray-400, #2c2c2c);
    // background: var(--Gray-150, #141414);
`;

const ResultsItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ResultsItemLabel = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

const ResultsItemValueWrap = styled.div`
    display: flex;
    gap: 6px;
`;

const ResultsItemValue = styled.div`
    color: #e6e6e6;
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

const ResultsItemSymbol = styled.div`
    color: var(--Gray-600, #5a5a5a);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
`;

const ResultsContentHashWrap = styled.div`
    padding: 16px 24px 20px 24px;
    // border-radius: 0px 0px 8px 8px;
    // background: var(--Gray-150, #141414);
`;

const ItemHashValue = styled.div`
    color: var(--Green-700, #02a288);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

const ResultsButtonWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
`;

const ResultsConfirmButton = styled(IconButton)`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6px;
    background: var(--Gray-450, #313131);
    cursor: pointer;
`;

const ResultsConfirmButtonTypo = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

const ResultsGoToMyMintetedTokenButton = styled(IconButton)`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6px;
    background: var(--Green-500, #02e191);
    cursor: pointer;
`;

const ResultsGoToMyMintetedTokenButtonTypo = styled.div`
    color: var(--Gray-200, #1a1a1a);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

interface SuccessData {
    addedAt: string;
    extra: string;
    message: string;
    signData: string;
    signer: string;
    status: string;
    type: string;
}

interface ModalDatas {
    header: {
        title: string;
    };
    amount: {
        fee: string;
        fct: string;
    };
    list?: {
        label: string;
        value: string;
    }[];
}

const InstantitateModal = ({
    id,
    module,
    datas,
    params
}: {
    id: string;
    module: string;
    datas: ModalDatas;
    params: { admin: string; codeId: string; label: string; msg: string; type: string };
}) => {
    const { firmaSDK } = useExecuteHook();
    const address = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);

    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const closeModal = useModalStore().closeModal;

    const [status, setStatus] = useState<'init' | 'success' | 'failure'>('init');
    const [result, setResult] = useState<null | SuccessData>(null);
    const [balance, setBalance] = useState<null | string>('');

    useEffect(() => {
        const getBalance = async () => {
            setBalance(await firmaSDK.Bank.getBalance(params.admin));
        };

        getBalance();
    }, []);

    useEffect(() => {
        console.log('status', status);
    }, [status]);

    const parsedData = useMemo(() => {
        if (result === null) return null;
        const { message, signData, ...rest } = result;
        const parsedMessage = JSON.parse(message);

        const { address, chainId, rawData } = JSON.parse(signData);
        const { code, gasUsed, gasWanted, height, rawLog, transactionHash } = JSON.parse(rawData);
        const parsedLogs = JSON.parse(rawLog)[0];

        const _rawData = { code, gasUsed, gasWanted, height, rawLog: parsedLogs, transactionHash };
        const _signData = { address, chainId, rawData: _rawData };

        const contractAddress = parsedLogs.events[0].attributes[0].value;

        return {
            message: parsedMessage,
            signData: _signData,
            contractAddress,
            transactionHash,
            ...rest
        };
    }, [result]);

    console.log('parsedData', parsedData);

    const onCloseModal = () => {
        closeModal(id);
    };

    const onClickTransactionHash = (hash: string) => {
        const blockExplorerLink = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
        window.open(`${blockExplorerLink}/transactions/${hash}`);
    };

    return (
        <ModalBase style={{ width: '480px', padding: '24px 24px 36px', gap: '32px' }}>
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 24, top: 24, cursor: 'pointer' }}
            />
            {status === 'init' && (
                <>
                    <ModalTitleWrap>
                        <ModalTitleTypo style={{ marginBottom: '20px' }}>{datas.header.title}</ModalTitleTypo>
                        <ModalTitleDescTypo style={{ marginBottom: '24px' }}>
                            {'Scan the QR code\nwith your mobile Firma Station for transaction.'}
                        </ModalTitleDescTypo>
                        <QrCodeWrap>
                            <RequestQR
                                isTxModal
                                qrSize={144}
                                module={module}
                                params={params}
                                signer={address}
                                onSuccess={(requestData: any) => {
                                    setResult(requestData);
                                    setStatus('success');
                                    useInstantiateStore.getState().clearForm();
                                    useFormStore.getState().clearForm();
                                }}
                                onFailed={(requestData: any) => {
                                    setStatus('failure');
                                    enqueueSnackbar('[CW721] Instantiation failed', {
                                        variant: 'error',
                                        autoHideDuration: 2000
                                    });
                                }}
                            />
                        </QrCodeWrap>
                    </ModalTitleWrap>
                    <ModalContentWrap>
                        <ModalContentBlackCard>
                            {datas.list.map((elem, index) => {
                                return (
                                    <ItemWrap key={index}>
                                        <ModalItemLabelTypo>{elem.label}</ModalItemLabelTypo>
                                        <ModalItemValueTypo>{elem.value}</ModalItemValueTypo>
                                    </ItemWrap>
                                );
                            })}
                        </ModalContentBlackCard>
                        <ModalContentGrayCard>
                            <ItemWrap>
                                <FeeLabel>{`Instantiate Fee (FCT)`}</FeeLabel>
                                <ItemValueWrap>
                                    <FeeAmount>{FirmaUtil.getFCTStringFromUFCT(Number(datas.amount.fee))}</FeeAmount>
                                    <FCTSymbolIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Icon'} />
                                </ItemValueWrap>
                            </ItemWrap>
                            <ItemRightWrap>
                                <MyBalanceValue>
                                    {`(My Balance : ${formatWithCommas(FirmaUtil.getFCTStringFromUFCTStr(balance))}`}
                                    <FCTSymbolMiniIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Mini Icon'} />
                                    {')'}
                                </MyBalanceValue>
                            </ItemRightWrap>
                        </ModalContentGrayCard>
                    </ModalContentWrap>
                    <ModalCancelButton
                        onClick={() => {
                            onCloseModal();
                        }}
                    >
                        <ModalCancelTypo>Cancel</ModalCancelTypo>
                    </ModalCancelButton>
                </>
            )}
            {status === 'success' && parsedData && (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <ResultsHeader>
                        <ResultIcon src={IC_CEHCK_ROUND} alt={'Modal Results'} />
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{datas.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleSuccessTypo>Success</ResultsTitleSuccessTypo>
                        </ResultsTitleWrap>
                        <ResultsTitleMessage>{`${datas.header.title} has been Succeeded.`}</ResultsTitleMessage>
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            {datas.list.map((elem, index) => {
                                return (
                                    <ItemWrap key={index}>
                                        <ModalItemLabelTypo>{elem.label}</ModalItemLabelTypo>
                                        <ModalItemValueTypo>{elem.value}</ModalItemValueTypo>
                                    </ItemWrap>
                                );
                            })}
                        </ResultsContentSummeryWrap>
                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                        <ResultsContentHashWrap>
                            <TransactionItem
                                label={'Transaction Hash'}
                                hash={getTransactionHash(result.signData)}
                                onClickHash={(hash) => onClickTransactionHash(hash)}
                            />
                        </ResultsContentHashWrap>
                    </ResultsContentWrap>
                    <ResultsButtonWrap>
                        <ResultsConfirmButton
                            onClick={() => {
                                onCloseModal();
                            }}
                        >
                            <ResultsConfirmButtonTypo>Confirm</ResultsConfirmButtonTypo>
                        </ResultsConfirmButton>
                        <ResultsGoToMyMintetedTokenButton
                            onClick={() => {
                                navigate(`/cw721/mynft/detail/${parsedData.contractAddress}`);
                                onCloseModal();
                            }}
                        >
                            <ResultsGoToMyMintetedTokenButtonTypo>Go to My NFT Contracts</ResultsGoToMyMintetedTokenButtonTypo>
                        </ResultsGoToMyMintetedTokenButton>
                    </ResultsButtonWrap>
                </div>
            )}
            {status === 'failure' && (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <ResultsHeader>
                        <ResultIcon src={IC_CIRCLE_FAIL} alt={'Modal Results'} />
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{datas.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleFailedTypo>Failed</ResultsTitleFailedTypo>
                        </ResultsTitleWrap>
                        {/* <ResultsTitleMessage>{`${params.header.title} has been Succeeded.`}</ResultsTitleMessage> */}
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            <ResultFailedTypo>{`${datas.header.title} has been Failed.`}</ResultFailedTypo>
                            <ResultFailedDesc>Please try again later.</ResultFailedDesc>
                        </ResultsContentSummeryWrap>
                        {result?.signData && (
                            <>
                                <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                                <ResultsContentHashWrap>
                                    <TransactionItem
                                        label={'Transaction Hash'}
                                        hash={getTransactionHash(result?.signData)}
                                        onClickHash={(hash) => onClickTransactionHash(hash)}
                                    />
                                </ResultsContentHashWrap>
                            </>
                        )}
                    </ResultsContentWrap>

                    <ResultsConfirmButton
                        style={{ width: '100%' }}
                        onClick={() => {
                            onCloseModal();
                        }}
                    >
                        <ResultsConfirmButtonTypo>Confirm</ResultsConfirmButtonTypo>
                    </ResultsConfirmButton>
                </div>
            )}
        </ModalBase>
    );
};

export default InstantitateModal;
