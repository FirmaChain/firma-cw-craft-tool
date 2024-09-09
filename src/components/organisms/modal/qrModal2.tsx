import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ResultsContentHashWrap,
    ResultsContentSummeryWrap,
    ResultsContentWrap,
    ResultsHeader,
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
    ModalTitleTypo,
    ModalTitleWrap,
    MyBalanceValue,
    MyBalanceWrap,
    ResultsButtonWrap,
    ResultsConfirmButton,
    ResultsConfirmButtonTypo,
    ResultsGoToMyMintetedTokenButton,
    ResultsGoToMyMintetedTokenButtonTypo,
    ResultsTitleFailedTypo,
    ResultFailedTypo,
    ResultFailedDesc,
    ModalAlertBox,
    ResultIcon,
    ModalButtonBox,
    LoadingDimBox,
    LoadingBox,
    LoadingTypo,
    ModalTitleDescTypo,
    QrCodeWrap,
    ModalTitleHeaderIcon,
    ModalContentCard
} from './style';
import { useModalStore } from '@/hooks/useModal';
import { IC_ALERT_YELLOW, IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN, IC_WARNING } from '@/components/atoms/icons/pngIcons';
import { useSnackbar } from 'notistack';
import Divider from '@/components/atoms/divider';
import { scrollToTop } from '@/utils/common';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { FirmaUtil } from '@firmachain/firma-js';
import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import useFirmaSDKInternal from '@/hooks/useFirmaSDKInternal';
import {
    AmountItem,
    ContractAddressItem,
    DefaultItem,
    ExecuteAmountItem,
    ExpirationItem,
    NftIdItem,
    NftItem,
    ResultNftIdItem,
    ResultWalletAdress,
    TransactionItem,
    UrlItem,
    // WalletAdress,
    WalletCount,
    WarningItem
} from '.';
// import Connect from './connect/connect';
import FirmaLoading from '@/components/atoms/globalLoader/firmaLoad';
import useMyToken from '@/hooks/useMyToken';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import RequestQR from '../requestQR';
import { GlobalActions } from '@/redux/actions';
import { getTransactionHash } from '@/utils/transaction';

export type ModalType = 'INSTANTIATE' | 'EXECUTES';

export interface ModalParameters {
    modalType: ModalType;
    header: {
        title: string;
    };
    txParams: TransactionParameters;
    contentParams: ContentParameters;
}

export interface TransactionParameters {
    admin?: string;
    codeId?: string;
    label?: string;
    msg: Record<string, any>;
    type?: string;
    totalLength?: number;
    walletLength?: number;
    contract?: string;
}

export interface ContentParameters {
    decimals?: string;
    symbol?: string;
    fctAmount?: string;
    feeAmount?: string;
    alert?: string;
    list?: {
        label: string;
        value: string;
        type: string;
        initColor: string;
        resultColor: string;
    }[];
    extraList?: {
        label: string;
        value: string;
        type: string;
        initColor: string;
        resultColor: string;
    }[];
}

interface SuccessData {
    addedAt: string;
    extra: string;
    message: string;
    signData: string;
    signer: string;
    status: string;
    type: string;
}

type ModuleTypes =
    | '/cw20/instantiateContract'
    | '/cw20/burnToken'
    | '/cw20/burnFrom'
    | '/cw20/decreaseAllowance'
    | '/cw20/increaseAllowance'
    | '/cw20/mintToken'
    | '/cw20/transfer'
    | '/cw20/transferFrom'
    | '/cw20/updateLogo'
    | '/cw20/updateMarketing'
    | '/cw20/updateMinter'
    | '/cw721/instantiateContract'
    | '/cw721/approve'
    | '/cw721/approveAll'
    | '/cw721/burn'
    | '/cw721/mint'
    | '/cw721/revoke'
    | '/cw721/revokeAll'
    | '/cw721/transfer'
    | '/cw721/updateOwnershipAccept'
    | '/cw721/updateOwnershipRenounce'
    | '/cw721/updateOwnershipTransfer'
    | '/cosmwasm/instantiateContract';

const QRModal2 = ({
    id,
    module,
    params,
    onClickConfirm,
    hideGotoDetail = false
}: {
    id: string;
    module: ModuleTypes;
    params: ModalParameters;
    onClickConfirm: () => void;
    hideGotoDetail?: boolean;
}) => {
    const isInit = useSelector((v: rootState) => v.wallet.isInit);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { getFctBalance } = useFirmaSDKInternal();

    const { getCW20ContractInfo } = useMyToken();
    const { getCW721ContractInfo } = useMyNFTContracts();
    const { updateContractInfo: updateCW20ContractInfo } = useCW20MyTokenContext();
    const { updateContractInfo: updateCW721ContractInfo } = useCW721NFTContractsContext();

    // const { passwordWallet, timeKey } = useSelector((state: rootState) => state.wallet);
    const cwMode = useSelector((v: rootState) => v.global.cwMode);
    const address = useSelector((state: rootState) => state.wallet.address);

    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);
    const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'failure'>('init');
    const [balance, setBalance] = useState('0');
    // const [estimatedGas, setEstimatedGas] = useState<number>(0);
    // const [inputPassword, setInputPassword] = useState<string>('');

    const instantiateFee = useMemo(() => {
        try {
            let resultFee = CRAFT_CONFIGS.DEFAULT_FEE;

            if (params.txParams.totalLength > 1200) {
                const multipleCount = (Number(params.txParams.totalLength.toString().length) - 1200) / 100;
                resultFee = resultFee + multipleCount * Number(CRAFT_CONFIGS.INSTANTIATE_LENGTH_FEE);
            }

            if (params.txParams.walletLength >= 2) {
                const defaultLength = Number(params.txParams.walletLength) - 1;
                const fee = defaultLength * CRAFT_CONFIGS.INSTANTIATE_WALLET_FEE;
                return resultFee + fee;
            } else {
                return resultFee;
            }
        } catch (error) {
            return 0;
        }
    }, [params.txParams]);

    const getBalance = () => {
        getFctBalance(address)
            .then((result) => {
                setBalance(result);
            })
            .catch((error) => {
                console.log(error);
                setBalance('0');
            });
    };

    const updateContract = async () => {
        try {
            const isCW20 = module.includes('cw20');
            if (params.txParams.contract === '') return;
            if (params.modalType === 'INSTANTIATE') return;

            if (isCW20) {
                const newInfo = await getCW20ContractInfo(params.txParams.contract);
                updateCW20ContractInfo(newInfo);
            } else {
                const newInfo = await getCW721ContractInfo(params.txParams.contract);
                updateCW721ContractInfo(newInfo);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (status === 'success') {
            updateContract();
        }
    }, [status]);

    useEffect(() => {
        getBalance();
    }, [address]);

    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
        if (status === 'success') {
            onClickConfirm();
        }
    };

    const onClickTransactionHash = (hash: string) => {
        window.open(`${CRAFT_CONFIGS.BLOCK_EXPLORER}/transactions/${hash}`);
    };

    const RenderItem = useCallback(
        ({ type, label, value, color }: { type: string; label: string; value: string, color: string }) => {
            if (type === 'amount') {
                return (
                    <AmountItem
                        label={label}
                        decimals={params.contentParams.decimals}
                        amount={value}
                        symbol={params.contentParams.symbol}
                        color={color}
                    />
                );
            } else if (type === 'execute_amount') {
                return (
                    <ExecuteAmountItem
                        label={label}
                        decimals={params.contentParams.decimals}
                        amount={value}
                        symbol={params.contentParams.symbol}
                        color={color}
                    />
                );
            } else if (type === 'wallet') {
                return <ResultWalletAdress label={label} address={value} color={color} />;
            } else if (type === 'url') {
                return <UrlItem label={label} logo={value} color={color} />;
            } else if (type === 'wallet-count') {
                return <WalletCount label={label} count={value} color={color} />;
            } else if (['at_time', 'at_height', 'never'].includes(type)) {
                return <ExpirationItem value={value} type={type} color={color} />;
            } else if (type === 'nft') {
                return <NftItem label={label} value={value} color={color} />;
            } else if (type === 'nft_id') {
                return <ResultNftIdItem label={label} value={value} color={color} />;
            } else if (type === 'warning') {
                return <WarningItem label={label} value={value} />;
            } else if (type === 'default') {
                return <DefaultItem label={label} value={value} color={color} />;
            }
        },
        [params]
    );

    const parsedData = useMemo(() => {
        if (result === null) return null;

        const { message, signData, status, ...rest } = result;

        const parsedMessage = JSON.parse(message);

        if (status !== "1" || signData === "") {
            setStatus('failure');
            return {
                message: parsedMessage,
                signData: signData,
                contractAddress: '',
                transactionHash: '',
                ...rest
            };
        }

        const { address, chainId, rawData } = JSON.parse(signData);
        const { code, gasUsed, gasWanted, height, rawLog, transactionHash } = JSON.parse(rawData);
        let tmpParsedLogs = '';
        let tmpContractAddress = '';

        if (code !== 0) {
            setStatus('failure');
        } else {
            // write logs on succesful transactions
            const parsedLogs = JSON.parse(rawLog)[0]; // would fail on reverted transactions
            const contractAddress = parsedLogs.events[0].attributes[0].value;
            tmpParsedLogs = parsedLogs;
            tmpContractAddress = contractAddress;
        }

        const _rawData = { code, gasUsed, gasWanted, height, rawLog: tmpParsedLogs, transactionHash };
        const _signData = { address, chainId, rawData: _rawData };

        return {
            message: parsedMessage,
            signData: _signData,
            contractAddress: tmpContractAddress,
            transactionHash,
            ...rest
        };
    }, [result]);

    return (
        <ModalBase style={{ width: '544px', padding: '52px 28px 36px', gap: 0 }}>
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 24, top: 24, cursor: 'pointer' }}
            />
            {isInit ? (
                <Fragment>
                    {(status === 'init' || status === 'loading') && (
                        <div
                            style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        >
                            <ModalTitleWrap>
                                {module.includes('Renounce') && <ModalTitleHeaderIcon src={IC_WARNING} />}
                                <ModalTitleTypo style={{ marginBottom: '20px' }}>{params.header.title}</ModalTitleTypo>
                            </ModalTitleWrap>
                            <ModalTitleDescTypo style={{ marginBottom: '24px' }}>
                                {'Scan the QR code\nwith your mobile Firma Station for transaction.'}
                            </ModalTitleDescTypo>
                            <QrCodeWrap>
                                <RequestQR
                                    qrSize={144}
                                    isTxModal={true}
                                    module={module.includes('instantiate') ? '/cosmwasm/instantiateContract' : module}
                                    params={params.txParams}
                                    signer={address}
                                    onSuccess={(requestData: any) => {
                                        setResult(requestData);
                                        setStatus('success');
                                        GlobalActions.handleFetchedBalance(true);
                                    }}
                                    onFailed={(requestData: any) => {
                                        setResult(requestData);
                                        setStatus('failure');
                                        setError({ message: `Failed to ${params.header.title}` });
                                        enqueueSnackbar(`Failed to ${params.header.title}`, {
                                            variant: 'error',
                                            autoHideDuration: 2000
                                        });
                                        GlobalActions.handleFetchedBalance(true);
                                    }}
                                />
                            </QrCodeWrap>
                            <ModalContentWrap style={{ marginBottom: '36px' }}>
                                {params.contentParams.alert && (
                                    <ModalAlertBox>
                                        <img src={IC_ALERT_YELLOW} alt="alert" style={{ width: '16px' }} />
                                        <span className="typo">{params.contentParams.alert}</span>
                                    </ModalAlertBox>
                                )}

                                <ModalContentCard>
                                    <ModalContentBlackCard
                                        style={
                                            params.contentParams.extraList
                                                ? { borderRadius: '8px 8px 0px 0px', borderBottom: '1px solid var(--Gray-400, #2C2C2C)' }
                                                : module === '/cw721/updateOwnershipRenounce'
                                                    ? { background: 'rgba(229, 82, 80, 0.18)' }
                                                    : { background: '#141414', borderRadius: '8px' }
                                        }
                                    >
                                        {params.contentParams.list.map((el, index) => {
                                            return <RenderItem key={`item-${index}`} type={el.type} label={el.label} value={el.value} color={el.initColor} />;
                                        })}
                                    </ModalContentBlackCard>
                                    {params.contentParams.extraList && (
                                            <ModalContentBlackCard style={{ borderRadius: '0px 0px 8px 8px' }}>
                                                {/* <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" $variant="line" /> */}
                                                {params.contentParams.extraList.map((el, index) => {
                                                    console.log(params.contentParams.extraList);
                                                    return (
                                                        <RenderItem
                                                            key={`extra-item-${index}`}
                                                            type={el.type}
                                                            label={el.label}
                                                            value={el.value}
                                                            color={el.initColor}
                                                        />
                                                    );
                                                })}
                                            </ModalContentBlackCard>
                                        )}
                                </ModalContentCard>
                                
                                <ModalContentGrayCard>
                                    <ItemWrap>
                                        <FeeLabel>{`${params.header.title} Fee`}</FeeLabel>
                                        <ItemValueWrap>
                                            <FeeAmount>{FirmaUtil.getFCTStringFromUFCT(Number(instantiateFee))}</FeeAmount>
                                            <FCTSymbolIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Icon'} />
                                        </ItemValueWrap>
                                    </ItemWrap>
                                    <ItemWrap>
                                        <FeeLabel>{'(FCT)'}</FeeLabel>
                                        <MyBalanceWrap>
                                            <MyBalanceValue>{`(My Balance :`}</MyBalanceValue>
                                            <MyBalanceValue>{formatWithCommas(getTokenAmountFromUToken(balance, '6'))}</MyBalanceValue>
                                            <FCTSymbolMiniIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Mini Icon'} />
                                            <MyBalanceValue style={{ marginLeft: '-4px' }}>{`)`}</MyBalanceValue>
                                        </MyBalanceWrap>
                                    </ItemWrap>
                                </ModalContentGrayCard>
                            </ModalContentWrap>
                            <ModalButtonBox>
                                <ModalCancelButton
                                    onClick={() => {
                                        onCloseModal();
                                    }}
                                >
                                    <ModalCancelTypo>Cancel</ModalCancelTypo>
                                </ModalCancelButton>
                            </ModalButtonBox>
                            {status === 'loading' && (
                                <LoadingDimBox>
                                    <LoadingBox>
                                        <FirmaLoading size={'50px'} />
                                        <LoadingTypo>{`${params.header.title} in process`}</LoadingTypo>
                                    </LoadingBox>
                                </LoadingDimBox>
                            )}
                        </div>
                    )}
                    {status === 'success' && (
                        <div
                            style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        >
                            <ResultsHeader>
                                <ResultIcon src={IC_CEHCK_ROUND} alt={'Modal Results'} />
                                <ResultsTitleWrap>
                                    <ResultsTitleExecuteTypo>{params.header.title}</ResultsTitleExecuteTypo>
                                    <ResultsTitleSuccessTypo>Success</ResultsTitleSuccessTypo>
                                </ResultsTitleWrap>
                                <ResultsTitleMessage>{`${params.header.title} has succeeded.${module.includes('Renounce') ? '\nYou no longer have control over the contract.' : ''}`}</ResultsTitleMessage>
                            </ResultsHeader>
                            <ResultsContentWrap>
                                {!module.includes('Renounce') && (
                                    <ResultsContentSummeryWrap>
                                        {params.modalType === "EXECUTES" && params.contentParams.list.map((el, index) => {
                                            if (el.type !== 'warning')
                                                return (
                                                    <RenderItem key={`item-${index}`} type={el.type} label={el.label} value={el.value} color={el.resultColor}/>
                                                );
                                        })}
                                        {params.modalType === "EXECUTES" && params.contentParams.extraList && (
                                            <Fragment>
                                                <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" $variant="line" />
                                                {params.contentParams.extraList.map((el, index) => {
                                                    return (
                                                        <RenderItem
                                                            key={`extra-item-${index}`}
                                                            type={el.type}
                                                            label={el.label}
                                                            value={el.value}
                                                            color={el.resultColor}
                                                        />
                                                    );
                                                })}
                                            </Fragment>
                                        )}
                                    </ResultsContentSummeryWrap>
                                )}
                                {!module.includes('Renounce') && (
                                    <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                                )}
                                <ResultsContentHashWrap>
                                    {params.modalType === 'INSTANTIATE' && parsedData.contractAddress && (
                                        <ContractAddressItem label={'Contract Address'} contractAddress={parsedData.contractAddress} />
                                    )}
                                    <TransactionItem
                                        label={'Transaction Hash'}
                                        hash={getTransactionHash(result?.signData)}
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
                                {!hideGotoDetail && (
                                    <ResultsGoToMyMintetedTokenButton
                                        onClick={() => {
                                            const contract =
                                                parsedData.contractAddress === undefined
                                                    ? params.txParams.contract
                                                    : parsedData.contractAddress;
                                            const url =
                                                cwMode === 'CW20' ? `/mytoken/detail/${contract}` : `/cw721/mynft/detail/${contract}`;
                                            navigate(url);
                                            scrollToTop();
                                            onCloseModal();
                                        }}
                                    >
                                        <ResultsGoToMyMintetedTokenButtonTypo>
                                            {cwMode === 'CW20' ? 'Go to My Token Details' : 'Go to My NFT detail'}
                                        </ResultsGoToMyMintetedTokenButtonTypo>
                                    </ResultsGoToMyMintetedTokenButton>
                                )}
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
                            </ResultsHeader>
                            <ResultsContentWrap>
                                <ResultsContentSummeryWrap>
                                    <ResultFailedTypo>{`${params.header.title} has failed.`}</ResultFailedTypo>
                                    <ResultFailedDesc>
                                        {result.signData !== '' ? 'Please try again later.' : 'The transaction has been rejected.'}
                                    </ResultFailedDesc>
                                </ResultsContentSummeryWrap>
                                {result && result.signData !== '' && (
                                    <>
                                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                                        <ResultsContentHashWrap>
                                            <TransactionItem
                                                label={'Transaction Hash'}
                                                hash={getTransactionHash(result.signData)}
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
                </Fragment>
            ) : (
                <></>
                // <Connect closeModal={() => null} />
            )}
        </ModalBase>
    );
};

export default QRModal2;
