import { rootState } from '@/redux/reducers';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
    ResultsContentHashWrap,
    ResultsContentSummeryWrap,
    ResultsContentWrap,
    ResultsHeader,
    ResultIcon,
    ResultsTitleExecuteTypo,
    ResultsTitleMessage,
    ResultsTitleSuccessTypo,
    ResultsTitleWrap,
    FCTSymbolIcon,
    FCTSymbolMiniIcon,
    FeeAmount,
    FeeLabel,
    ItemValueWrap,
    ItemWrap,
    ModalBase,
    ModalCancelButton,
    ModalCancelTypo,
    ModalContentBlackCard,
    ModalContentGrayCard,
    ModalContentWrap,
    ModalTitleDescTypo,
    ModalTitleTypo,
    ModalTitleWrap,
    MyBalanceValue,
    MyBalanceWrap,
    QrCodeWrap,
    ResultsButtonWrap,
    ResultsConfirmButton,
    ResultsConfirmButtonTypo,
    ResultsGoToMyMintetedTokenButton,
    ResultsGoToMyMintetedTokenButtonTypo,
    ResultsTitleFailedTypo,
    ResultFailedTypo,
    ResultFailedDesc
} from './style';
import React, { useState } from 'react';
import { useModalStore } from '@/hooks/useModal';
import { AmountItem, ExpirationItem, ResultAmountItem, TransactionItem, UrlItem, WalletAdress, WalletItem } from '.';
import { IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN } from '@/components/atoms/icons/pngIcons';
import RequestQR from '@/components/organisms/requestQR';
import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import { FirmaUtil } from '@firmachain/firma-js';
import { getTransactionHash } from '@/utils/transaction';
import { useNavigate } from 'react-router-dom';
import { CRAFT_CONFIGS } from '@/config';
import Divider from '@/components/atoms/divider';

interface SuccessData {
    addedAt: string;
    extra: string;
    message: string;
    signData: string;
    signer: string;
    status: string;
    type: string;
}

interface ModalParameters {
    header: {
        title: string;
    };
    content: {
        decimals?: string;
        symbol?: string;
        fctAmount?: string;
        feeAmount?: string;
        list?: {
            label: string;
            value: string;
            type: string;
        }[];
    };
    contract: string;
    msg: Record<string, any>;
}

const QRCodeModal = ({
    id,
    module,
    params,
    onClickConfirm
}: {
    id: string;
    module: string;
    params: ModalParameters;
    onClickConfirm: () => void;
}) => {
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    const network = useSelector((v: rootState) => v.global.network);
    const address = useSelector((state: rootState) => state.wallet.address);

    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);
    const [status, setStatus] = useState<'init' | 'success' | 'failure'>('init');

    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
    };

    const onClickTransactionHash = (hash: string) => {
        const blockExplorerLink = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;
        window.open(`${blockExplorerLink}/transactions/${hash}`);
    };

    return (
        <ModalBase style={{ width: '544px', padding: '52px 28px 36px', gap: 0 }}>
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 24, top: 24, cursor: 'pointer' }}
            />
            {status === 'init' && (
                <>
                    <ModalTitleWrap>
                        <ModalTitleTypo style={{ marginBottom: '20px' }}>{params.header.title}</ModalTitleTypo>
                        <ModalTitleDescTypo style={{ marginBottom: '24px' }}>
                            {'Scan the QR code\nwith your mobile Firma Station for transaction.'}
                        </ModalTitleDescTypo>
                        <QrCodeWrap>
                            <RequestQR
                                qrSize={144}
                                isTxModal={true}
                                module={module}
                                params={params}
                                signer={address}
                                onSuccess={(requestData: any) => {
                                    console.log("requestData: ", requestData);
                                    setResult(requestData);
                                    setStatus('success');
                                }}
                                onFailed={(requestData: any) => {
                                    setResult(requestData);
                                    setStatus('failure');
                                    setError({ message: `Failed to ${params.header.title}` });
                                    enqueueSnackbar(`[CW20] Failed to ${params.header.title}`, {
                                        variant: 'error',
                                        autoHideDuration: 2000
                                    });
                                }}
                            />
                        </QrCodeWrap>
                    </ModalTitleWrap>
                    <ModalContentWrap style={{ marginBottom: '36px' }}>
                        <ModalContentBlackCard>
                            {params.content.list.map((el, index) => {
                                if (el.type === 'amount') {
                                    return (
                                        <AmountItem
                                            key={index}
                                            label={el.label}
                                            decimals={params.content.decimals}
                                            amount={el.value}
                                            symbol={params.content.symbol}
                                        />
                                    );
                                } else if (el.type === 'wallet') {
                                    return <WalletAdress label={el.label} address={el.value} />;
                                } else if (el.type === 'url') {
                                    return <UrlItem label={el.label} logo={el.value} />;
                                } else if (el.type === 'wallet-count') {
                                    return <WalletItem label={el.label} count={el.value} />;
                                } else if (['at_time', 'at_height', 'never'].includes(el.type)) {
                                    return <ExpirationItem value={el.value} type={el.type} />;
                                }
                            })}
                        </ModalContentBlackCard>
                        <ModalContentGrayCard>
                            <ItemWrap>
                                <FeeLabel>{`${params.header.title} Fee`}</FeeLabel>
                                <ItemValueWrap>
                                    <FeeAmount>{FirmaUtil.getFCTStringFromUFCT(Number(params.content.feeAmount))}</FeeAmount>
                                    <FCTSymbolIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Icon'} />
                                </ItemValueWrap>
                            </ItemWrap>
                            <ItemWrap>
                                <FeeLabel>{'(FCT)'}</FeeLabel>
                                <MyBalanceWrap>
                                    <MyBalanceValue>{`(My Balance :`}</MyBalanceValue>
                                    <MyBalanceValue>
                                        {formatWithCommas(getTokenAmountFromUToken(params.content.fctAmount, '6'))}
                                    </MyBalanceValue>
                                    <FCTSymbolMiniIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Mini Icon'} />
                                    <MyBalanceValue style={{ marginLeft: '-4px' }}>{`)`}</MyBalanceValue>
                                </MyBalanceWrap>
                            </ItemWrap>
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
            {status === 'success' && (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <ResultsHeader>
                        <ResultIcon src={IC_CEHCK_ROUND} alt={'Modal Results'} />
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{params.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleSuccessTypo>Success</ResultsTitleSuccessTypo>
                        </ResultsTitleWrap>
                        <ResultsTitleMessage>{`${params.header.title} has been Succeeded.`}</ResultsTitleMessage>
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            {params.content.list.map((el, index) => {
                                if (el.type === 'amount') {
                                    return (
                                        <ResultAmountItem
                                            key={index}
                                            label={el.label}
                                            decimals={params.content.decimals}
                                            amount={el.value}
                                            symbol={params.content.symbol}
                                        />
                                    );
                                } else if (el.type === 'wallet') {
                                    return <WalletAdress label={el.label} address={el.value} />;
                                } else if (el.type === 'url') {
                                    return <UrlItem label={el.label} logo={el.value} />;
                                } else if (el.type === 'wallet-count') {
                                    return <WalletItem label={el.label} count={el.value} />;
                                } else if (['at_time', 'at_height', 'never'].includes(el.type)) {
                                    return <ExpirationItem value={el.value} type={el.type} />;
                                }
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
                                onClickConfirm();
                            }}
                        >
                            <ResultsConfirmButtonTypo>Confirm</ResultsConfirmButtonTypo>
                        </ResultsConfirmButton>
                        <ResultsGoToMyMintetedTokenButton
                            onClick={() => {
                                navigate(`/mytoken/detail/${params.contract}`);
                                onCloseModal();
                            }}
                        >
                            <ResultsGoToMyMintetedTokenButtonTypo>Go to My Minted Tokens</ResultsGoToMyMintetedTokenButtonTypo>
                        </ResultsGoToMyMintetedTokenButton>
                    </ResultsButtonWrap>
                </div>
            )}
            {status === 'failure' && (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                    <ResultsHeader>
                        <ResultIcon src={IC_CIRCLE_FAIL} alt={'Modal Results'} />
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{params.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleFailedTypo>Failed</ResultsTitleFailedTypo>
                        </ResultsTitleWrap>
                        {/* <ResultsTitleMessage>{`${params.header.title} has been Succeeded.`}</ResultsTitleMessage> */}
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            <ResultFailedTypo>{`${params.header.title} has been Failed.`}</ResultFailedTypo>
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

export default React.memo(QRCodeModal);