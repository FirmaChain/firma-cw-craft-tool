import { rootState } from "@/redux/reducers";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { ResultsContentHashWrap, ResultsContentSummeryWrap, ResultsContentWrap, ResultsHeader, ResultsSuccessIcon, ResultsTitleExecuteTypo, ResultsTitleMessage, ResultsTitleSuccessTypo, ResultsTitleWrap, FCTSymbolIcon, FCTSymbolMiniIcon, FeeAmount, FeeLabel, ItemValueWrap, ItemWrap, ModalBase, ModalCancelButton, ModalCancelTypo, ModalContentBlackCard, ModalContentGrayCard, ModalContentWrap, ModalTitleDescTypo, ModalTitleTypo, ModalTitleWrap, MyBalanceValue, MyBalanceWrap, QrCodeWrap, ResultsButtonWrap, ResultsConfirmButton, ResultsConfirmButtonTypo, ResultsGoToMyMintetedTokenButton, ResultsGoToMyMintetedTokenButtonTypo, ResultsTitleFailedTypo } from "../style";
import React, { useState } from "react";
import { useModalStore } from "@/hooks/useModal";
import { AmountItem, TransactionItem, UrlItem, WalletItem } from "..";
import { IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN } from "@/components/atoms/icons/pngIcons";
import RequestQR from "@/components/organisms/requestQR/index2";
import { formatWithCommas, getTokenAmountFromUToken } from "@/utils/balance";
import { FirmaUtil } from "@firmachain/firma-js";
import { getTransactionHash } from "@/utils/transaction";
import { useNavigate } from "react-router-dom";
import { CRAFT_CONFIGS } from "@/config";

interface SuccessData {
    addedAt: string;
    extra: string;
    message: string;
    signData: string;
    signer: string;
    status: string;
    type: string;
}

const QRCodeModal = ({
    id,
    module,
    params,
    onClickConfirm,
}: {
    id: string;
    module: string;
    params: any;
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
        window.open(`${blockExplorerLink}/transactions/${hash}`)
    };

    return (
        <ModalBase
            style={{
                // width: status === 'success' || status === 'failure' ? '544px' : 'fit-content',
                width: '544px',
                padding: status === 'success' || status === 'failure' ? '48px 24px 24px' : '48px 24px 24px'
            }}
        //  width={'534px'} visible={true} closable={true} onClose={onCloseModal}
        >
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 12, top: 12, cursor: 'pointer' }}
            />
            {status === "init" && (
                <>
                    <ModalTitleWrap>
                        <ModalTitleTypo>{params.header.title}</ModalTitleTypo>
                        <ModalTitleDescTypo>{'Scan the QR code\nwith your mobile Firma Station for transaction.'}</ModalTitleDescTypo>
                        <QrCodeWrap>
                            <RequestQR
                                qrSize={144}
                                isTxModal={true}
                                module={module}
                                params={params}
                                signer={address}
                                onSuccess={(requestData: any) => {
                                    setResult(requestData);
                                    setStatus('success');
                                }}
                                onFailed={(requestData: any) => {
                                    setResult(requestData);
                                    setStatus('failure');
                                    setError({ message: `Failed to ${params.header.title}` });
                                    enqueueSnackbar(`Failed to ${params.header.title}`, {
                                        variant: 'error',
                                        autoHideDuration: 2000
                                    });
                                }}
                            />
                        </QrCodeWrap>
                    </ModalTitleWrap>
                    <ModalContentWrap>
                        <ModalContentBlackCard>
                            {params.content.list.map((elem) => {
                                if (elem.type === "amount") {
                                    return (
                                        <AmountItem label={elem.label} decimals={params.content.decimals} amount={elem.value} symbol={params.content.symbol} />
                                    )
                                } else if (elem.type === "wallet") {
                                    return (
                                        <WalletItem label={elem.label} count={elem.value} />
                                    )
                                } else if (elem.type === "url") {
                                    return (
                                        <UrlItem label={elem.label} logo={elem.value} />
                                    )
                                }
                            })}
                        </ModalContentBlackCard>
                        <ModalContentGrayCard>
                            <ItemWrap>
                                <FeeLabel>{`${params.header.title} Fee`}</FeeLabel>
                                <ItemValueWrap>
                                    <FeeAmount>{formatWithCommas(FirmaUtil.getFCTStringFromUFCT(params.content.feeAmount))}</FeeAmount>
                                    <FCTSymbolIcon src={IC_FIRMACHAIN} alt={"FCT Symbol Icon"} />
                                </ItemValueWrap>
                            </ItemWrap>
                            <ItemWrap>
                                <FeeLabel>{"(FCT)"}</FeeLabel>
                                <MyBalanceWrap>
                                    <MyBalanceValue>{`(My Balance :`}</MyBalanceValue>
                                    <MyBalanceValue>{formatWithCommas(getTokenAmountFromUToken(params.content.fctAmount, "6"))}</MyBalanceValue>
                                    <FCTSymbolMiniIcon src={IC_FIRMACHAIN} alt={"FCT Symbol Mini Icon"} />
                                    <MyBalanceValue style={{ marginLeft: "-4px" }}>{`)`}</MyBalanceValue>
                                </MyBalanceWrap>
                            </ItemWrap>
                        </ModalContentGrayCard>
                    </ModalContentWrap>
                    <ModalCancelButton onClick={() => {
                            onCloseModal();
                        }
                    }>
                        <ModalCancelTypo>Cancel</ModalCancelTypo>
                    </ModalCancelButton>
                </>
            )}
            {status === "success" && (
                <>
                    <ResultsHeader>
                        <ResultsSuccessIcon src={IC_CEHCK_ROUND} alt={"Modal Results"}/>
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{params.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleSuccessTypo>Success</ResultsTitleSuccessTypo>
                        </ResultsTitleWrap>
                        <ResultsTitleMessage>{`${params.header.title} has been Succeeded.`}</ResultsTitleMessage>
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            {params.content.list.map((elem) => {
                                if (elem.type === "amount") {
                                    return (
                                        <AmountItem label={elem.label} decimals={params.content.decimals} amount={elem.value} symbol={params.content.symbol} />
                                    )
                                } else if (elem.type === "wallet") {
                                    return (
                                        <WalletItem label={elem.label} count={elem.value} />
                                    )
                                } else if (elem.type === "url") {
                                    return (
                                        <UrlItem label={elem.label} logo={elem.value} />
                                    )
                                }
                            })}
                        </ResultsContentSummeryWrap>
                        <ResultsContentHashWrap>
                            <TransactionItem label={"Transaction Hash"} hash={getTransactionHash(result.signData)} onClickHash={(hash) => onClickTransactionHash(hash)}/>
                        </ResultsContentHashWrap>
                    </ResultsContentWrap>
                    <ResultsButtonWrap>
                        <ResultsConfirmButton onClick={() => {
                            onCloseModal();
                            onClickConfirm();
                        }}>
                            <ResultsConfirmButtonTypo>Confirm</ResultsConfirmButtonTypo>
                        </ResultsConfirmButton>
                        <ResultsGoToMyMintetedTokenButton onClick={() => {
                            navigate(`/mytoken/detail/${params.contract}`);
                            onCloseModal();
                        }}>
                            <ResultsGoToMyMintetedTokenButtonTypo>Go to My Minted Tokens</ResultsGoToMyMintetedTokenButtonTypo>
                        </ResultsGoToMyMintetedTokenButton>
                    </ResultsButtonWrap>
                </>
            )}
            {status === "failure" && (
                <>
                    <ResultsHeader>
                        <ResultsSuccessIcon src={IC_CIRCLE_FAIL} alt={"Modal Results"}/>
                        <ResultsTitleWrap>
                            <ResultsTitleExecuteTypo>{params.header.title}</ResultsTitleExecuteTypo>
                            <ResultsTitleFailedTypo>Failed</ResultsTitleFailedTypo>
                        </ResultsTitleWrap>
                        <ResultsTitleMessage>{`${params.header.title} has been Succeeded.`}</ResultsTitleMessage>
                    </ResultsHeader>
                    <ResultsContentWrap>
                        <ResultsContentSummeryWrap>
                            
                        </ResultsContentSummeryWrap>
                        <ResultsContentHashWrap>
                            <TransactionItem label={"Transaction Hash"} hash={getTransactionHash(result.signData)} onClickHash={(hash) => onClickTransactionHash(hash)}/>
                        </ResultsContentHashWrap>
                    </ResultsContentWrap>
                </>
            )}
        </ModalBase>
    )
}

export default React.memo(QRCodeModal);