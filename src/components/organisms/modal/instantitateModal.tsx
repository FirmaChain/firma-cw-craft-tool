import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '@/components/atoms/icons';
import { ModalBase } from './style';
import { useModalStore } from '@/hooks/useModal';
import { IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_FIRMA_LOGO, IC_NAVIGATION, IC_SYMBOL_GRAY } from '@/components/atoms/icons/pngIcons';
import RequestQR from '../requestQR';
import { useSnackbar } from 'notistack';
import useInstantiateStore from '../instantiate/instaniateStore';
import useFormStore from '@/store/formStore';
import styled from 'styled-components';
import IconButton from '@/components/atoms/buttons/iconButton';
import Divider from '@/components/atoms/divider';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { addDecimals, openLink, parseAmountWithDecimal2, shortenAddress } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import useExecuteHook from '../execute/hooks/useExecueteHook';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';

const CloseBtnBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
`;

const SignTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    padding-bottom: 24px;
`;

const SignTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));

    /* Heading/H4 - Bd */
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */

    .success {
        color: var(--Status-Success, var(--Primary-Base-White, #57d962));
    }

    .failure {
        color: var(--Status-Alert, var(--Primary-Base-White, #e55250));
    }
`;

const SignDesc = styled.div`
    color: var(--Gray-700, #807e7e);
    text-align: center;

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    white-space: break-spaces;
`;

const InfoBox = styled.div`
    border-radius: 8px;
    background: var(--Gray-150, #141414);
    width: 100%;

    padding: 20px 0;
    gap: 16px;

    display: flex;
    flex-direction: column;

    margin-top: 28px;
    margin-bottom: 14px;
`;

const InfoBoxSection = styled.div`
    display: flex;
    padding: 0 24px;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;

    .row {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .row-key {
        width: 103px;

        color: var(--Gray-700, #807e7e);

        /* Body/Body3 - Rg */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
    }

    .normal-typo {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));
        text-align: right;

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 138.462% */
    }

    .amount-box {
        display: flex;
        align-items: baseline;
        gap: 6px;
    }

    .amount-highlight {
        color: #02e191;
        text-align: right;

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 138.462% */
    }

    .amount-gray {
        color: var(--Gray-750, #999);

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 138.462% */
    }

    .symbol-typo {
        color: var(--Gray-600, #5a5a5a);

        /* Body/Body4 - Md */
        font-family: 'General Sans Variable';
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px; /* 116.667% */
    }
`;

const FeeBox = styled.div`
    display: flex;
    padding: 12px 24px 14px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    width: 100%;

    border-radius: 8px;
    background: var(--Gray-200, #1a1a1a);

    margin-bottom: 36px;

    .key {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        color: var(--Gray-650, #707070);

        /* Body/Body3 - Rg */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */

        .symbol {
            color: var(--Gray-600, #5a5a5a);

            /* Body/Body3 - Rg */
            font-family: 'General Sans Variable';
            font-size: 13px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
        }
    }

    .fee-amount-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
    }

    .fee-amount {
        color: var(--Gray-750, #999);
        text-align: center;

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */

        display: flex;
        flex-direction: row;
        align-items: center;

        .logo {
            width: 16px;
            height: 16px;
        }
    }

    .user-balance {
        display: flex;
        flex-direction: row;
        align-items: center;

        text-align: right;

        .typo {
            padding-right: 4px;
            color: var(--Gray-750, #999);
            /* Body/Body4 - Rg */
            font-family: 'General Sans Variable';
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 14px; /* 116.667% */
        }

        .logo {
            width: 12px;
            height: 12px;
        }
    }
`;

const ResultTitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    padding-bottom: 28px;
`;

const ResultIcon = styled.img`
    width: 56px;
    height: 56px;
    margin-bottom: 2px;
`;

const CancelBtn = styled(IconButton)`
    display: flex;
    width: 100%;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: var(--Gray-450, #313131);

    .typo {
        color: var(--Gray-750, #999);

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
`;

const ResultInfoBox = styled.div`
    border-radius: 8px;
    background: var(--Gray-150, #141414);

    padding: 18px 0;
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 16px;

    margin-bottom: 36px;
`;

const ResultInfoSection = styled.div`
    width: 100%;
    display: flex;
    padding: 0 24px;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
    }

    .row-key {
        color: var(--Gray-700, #807e7e);

        /* Body/Body3 - Rg */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
    }

    .normal-typo {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));
        text-align: right;

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 138.462% */
    }

    .address {
        color: var(--Green-700, #02a288);
    }
`;

const ResultIconBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 12px;
`;

const CloseButton = styled(IconButton)`
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: var(--Gray-450, #313131);

    .typo {
        color: var(--Gray-750, #999);

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
`;

const ConfirmButton = styled(IconButton)`
    display: flex;
    width: 100%;
    padding: 10px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: var(--Green-500, #02e191);

    .typo {
        color: var(--Gray-200, #1a1a1a);

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
    }
`;

const FailureInfoSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 8px;

    text-align: center;

    .reason {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));
        text-align: center;

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }

    .desc {
        color: var(--Gray-700, #807e7e);
        text-align: center;

        /* Body/Body3 - Rg */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px; /* 138.462% */
    }
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

const InstantitateModal = ({
    id,
    module,
    params
}: {
    id: string;
    module: string;
    params: { admin: string; codeId: string; label: string; msg: string, type: string };
}) => {
    const { firmaSDK } = useExecuteHook();
    const walletAddress = useSelector((state: rootState) => state.wallet.address);
    const network = useSelector((state: rootState) => state.global.network);
    const explorerUrl = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const [balance, setBalance] = useState<null | string>('');
    const [status, setStatus] = useState<'init' | 'success' | 'failure'>('init');
    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
    };

    const requestData = JSON.parse(params.msg);

    const supplyAmount = useMemo(() => {
        try {
            if (requestData?.initial_balances.length === 0) return '0';
            else {
                return addDecimals(...requestData?.initial_balances.map((one) => one.amount));
            }
        } catch (error) {
            return '0';
        }
    }, [requestData]);

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

    const openContractAddress = () => openLink(`${explorerUrl}/accounts/${parsedData?.contractAddress}`);
    const openHash = () => openLink(`${explorerUrl}/transactions/${parsedData?.transactionHash}`);

    const onClickGoToMyTokens = () => {
        closeModal(id);
        navigate(`/mytoken/detail/${parsedData?.contractAddress}`);
    };

    useEffect(() => {
        const getBalance = async () => {
            setBalance(await firmaSDK.Bank.getBalance(params.admin));
        };

        getBalance();
    }, []);

    return (
        <ModalBase style={{ width: '480px', padding: '24px 24px 36px', gap: 0 }}>
            <CloseBtnBox>
                <IconButton style={{ display: 'flex', padding: 0 }} onClick={onCloseModal}>
                    <Icons.Close width="24px" height="24px" strokeWidth="2.4" />
                </IconButton>
            </CloseBtnBox>
            {status === 'init' && (
                <>
                    <SignTitleBox>
                        <SignTitle>CW20 Instantiation</SignTitle>
                        <SignDesc>{`Scan the QR code\nwith your mobile Firma Station for transaction.`}</SignDesc>
                    </SignTitleBox>

                    <RequestQR
                        isTxModal
                        qrSize={144}
                        module={module}
                        params={params}
                        signer={walletAddress}
                        onSuccess={(requestData: any) => {
                            setResult(requestData);
                            setStatus('success');
                            useInstantiateStore.getState().clearForm();
                            useFormStore.getState().clearForm();
                        }}
                        onFailed={(requestData: any) => {
                            setStatus('failure');
                            setError({ message: 'Instantiation failed' });
                            enqueueSnackbar('Instantiation failed', {
                                variant: 'error',
                                autoHideDuration: 2000
                            });
                        }}
                    />

                    <InfoBox>
                        <InfoBoxSection>
                            <div className="row">
                                <div className="row-key">Token Name</div>
                                <div className="normal-typo">{requestData.name}</div>
                            </div>

                            <div className="row">
                                <div className="row-key">Token Symbol</div>
                                <div className="normal-typo">{requestData.symbol}</div>
                            </div>
                        </InfoBoxSection>

                        <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" $variant="line" />

                        <InfoBoxSection>
                            <div className="row">
                                <div className="row-key">Supply Amount</div>
                                <div className="amount-box">
                                    <div
                                        className="amount-highlight"
                                        data-tooltip-content={parseAmountWithDecimal2(supplyAmount, requestData?.decimals)}
                                        data-tooltip-id={TOOLTIP_ID.COMMON}
                                        data-tooltip-wrapper="span"
                                        data-tooltip-place="bottom"
                                    >
                                        {parseAmountWithDecimal2(supplyAmount, requestData?.decimals, true)}
                                    </div>
                                    <div className="symbol-typo">{requestData?.symbol}</div>
                                </div>
                            </div>

                            {requestData?.mint && (
                                <div className="row">
                                    <div className="row-key">Minter Cap</div>
                                    <div className="amount-box">
                                        <div
                                            className="amount-gray"
                                            data-tooltip-content={parseAmountWithDecimal2(requestData.mint?.cap, requestData?.decimals)}
                                            data-tooltip-id={TOOLTIP_ID.COMMON}
                                            data-tooltip-wrapper="span"
                                            data-tooltip-place="bottom"
                                        >
                                            {parseAmountWithDecimal2(requestData.mint?.cap, requestData.decimals, true)}
                                        </div>
                                        <div className="symbol-typo">{requestData.symbol}</div>
                                    </div>
                                </div>
                            )}
                        </InfoBoxSection>
                    </InfoBox>

                    <FeeBox>
                        <div className="key">
                            <div>Instantiation Fee</div>
                            <div className="symbol">(FCT)</div>
                        </div>
                        <div className="fee-amount-box">
                            <div className="fee-amount">
                                <div>0.03833</div>
                                <img src={IC_SYMBOL_GRAY} alt="firma-logo" className="logo" />
                            </div>
                            <div
                                className="user-balance"
                                data-tooltip-content={parseAmountWithDecimal2(balance, '6')}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                <span className="typo">
                                    (My balance : {balance ? parseAmountWithDecimal2(balance, '6', true) : 'Loading'}
                                </span>
                                <img src={IC_SYMBOL_GRAY} alt="firma-logo" className="" style={{ width: '12px', height: '12px' }} />
                                <span className="typo" style={{ padding: 0 }}>
                                    )
                                </span>
                            </div>
                        </div>
                    </FeeBox>

                    <CancelBtn onClick={onCloseModal}>
                        <span className="typo">Cancel</span>
                    </CancelBtn>
                </>
            )}
            {status === 'success' && parsedData && (
                <>
                    <ResultTitleBox>
                        <ResultIcon src={IC_CEHCK_ROUND} alt="success" />
                        <SignTitle>
                            CW20 Instantiation <span className="success">Success</span>
                        </SignTitle>
                        <SignDesc>Token Instantiation has been succeeded.</SignDesc>
                    </ResultTitleBox>

                    <ResultInfoBox>
                        <ResultInfoSection>
                            <div className="row">
                                <div className="row-key">Token Name</div>
                                <div className="normal-typo">{requestData?.name}</div>
                            </div>

                            <div className="row">
                                <div className="row-key">Token Symbol</div>
                                <div className="normal-typo">{requestData?.symbol}</div>
                            </div>
                        </ResultInfoSection>
                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                        <ResultInfoSection>
                            <div className="row">
                                <div className="row-key">CW20 Contract Address</div>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
                                    <div className="normal-typo pointer" onClick={openContractAddress}>
                                        {shortenAddress(parsedData.contractAddress, 12, 12)}
                                    </div>
                                    <CopyIconButton text={parsedData.contractAddress} width={'16px'} height={'16px'} />
                                </div>
                            </div>

                            <div className="row">
                                <div className="row-key">Transaction Hash</div>

                                <div
                                    className="pointer"
                                    onClick={openHash}
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}
                                >
                                    <div className="normal-typo address">{shortenAddress(parsedData.transactionHash, 12, 12)}</div>
                                    <img
                                        src={IC_NAVIGATION}
                                        alt="external-link"
                                        style={{ width: '16px', height: '16px' }}
                                        className="pointer"
                                    />
                                </div>
                            </div>
                        </ResultInfoSection>
                    </ResultInfoBox>
                    <ResultIconBox>
                        <CloseButton onClick={onCloseModal}>
                            <span className="typo">Confirm</span>
                        </CloseButton>
                        <ConfirmButton onClick={onClickGoToMyTokens}>
                            <span className="typo">Go to My Minted Tokens</span>
                        </ConfirmButton>
                    </ResultIconBox>
                </>
            )}
            {status === 'failure' && (
                <>
                    <ResultTitleBox>
                        <ResultIcon src={IC_CIRCLE_FAIL} alt="success" />
                        <SignTitle>
                            CW20 Instantiation <span className="failure">Failed</span>
                        </SignTitle>
                    </ResultTitleBox>

                    <ResultInfoBox style={{ padding: '16px 0' }}>
                        <FailureInfoSection>
                            <div className="reason">CW20 Instantiate failed.</div>
                            <div className="desc">Please try again later.</div>
                        </FailureInfoSection>
                    </ResultInfoBox>
                    <ResultIconBox>
                        <CloseButton onClick={onCloseModal}>
                            <span className="typo">Close</span>
                        </CloseButton>
                    </ResultIconBox>
                </>
            )}
        </ModalBase>
    );
};

export default InstantitateModal;
