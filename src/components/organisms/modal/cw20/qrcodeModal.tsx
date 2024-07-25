import Modal from "@/components/modal";
import { ModalActions } from "@/redux/actions";
import { rootState } from "@/redux/reducers";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { FCTSymbolIcon, FCTSymbolMiniIcon, FeeAmount, FeeLabel, ItemValueWrap, ItemWrap, ModalBase, ModalCancelButton, ModalCancelTypo, ModalContent, ModalContentBlackCard, ModalContentGrayCard, ModalContentWrap, ModalTitle, ModalTitleDescTypo, ModalTitleTypo, ModalTitleWrap, MyBalanceValue, MyBalanceWrap, QrCodeWrap } from "../style";
import React, { useState } from "react";
import { useModalStore } from "@/hooks/useModal";
import { AmountItem, UrlItem, WalletItem } from "..";
import { IC_CLOSE, IC_FIRMACHAIN } from "@/components/atoms/icons/pngIcons";
import RequestQR from "@/components/organisms/requestQR/index2";
import { formatWithCommas, getTokenAmountFromUToken } from "@/utils/balance";
import { FirmaUtil } from "@firmachain/firma-js";

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
    params
}: {
    id: string;
    module: string;
    params: any;
}) => {
    const { enqueueSnackbar } = useSnackbar();

    const address = useSelector((state: rootState) => state.wallet.address);

    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);
    const [status, setStatus] = useState<'init' | 'success' | 'failure'>('init');

    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
    };

    return (
        <ModalBase
            style={{
                width: status === 'init' ? '544px' : 'fit-content',
                padding: status === 'init' ? '48px 24px 24px' : '48px 24px 24px'
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
                                    // onCloseModal();
                                    setStatus('failure');
                                    setError({ message: 'Failed to instantiate' });
                                    enqueueSnackbar('Failed to instantiate', {
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
                                    <MyBalanceValue>{formatWithCommas(getTokenAmountFromUToken(params.content.balance, "6"))}</MyBalanceValue>
                                    <FCTSymbolMiniIcon src={IC_FIRMACHAIN} alt={"FCT Symbol Mini Icon"} />
                                    <MyBalanceValue style={{ marginLeft: "-4px" }}>{`)`}</MyBalanceValue>
                                </MyBalanceWrap>
                            </ItemWrap>
                        </ModalContentGrayCard>
                    </ModalContentWrap>
                    <ModalCancelButton onClick={onCloseModal}>
                        <ModalCancelTypo>Cancel</ModalCancelTypo>
                    </ModalCancelButton>
                </>
            )}
            
        </ModalBase>
    )
}

export default React.memo(QRCodeModal);