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
    ModalContentCard,
    AcceptIcon,
    TitleRow
} from './style';
import useModalStore from '@/store/modalStore';
import { IC_ALERT_YELLOW, IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN, IC_WARNING } from '@/components/atoms/icons/pngIcons';
import { useSnackbar } from 'notistack';
import Divider from '@/components/atoms/divider';
import { scrollToTop } from '@/utils/common';

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
    InstantiateAmount,
    NftIdItem,
    NftItem,
    ResultNftIdItem,
    ResultWalletAdress,
    TransactionItem,
    UrlItem,
    WalletCount,
    WarningItem
} from '.';
import FirmaLoading from '@/components/atoms/globalLoader/firmaLoad';
import useMyToken from '@/hooks/useMyToken';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import RequestQR from '../requestQR';
// import { /*GlobalActions,*/ WalletActions } from '@/redux/actions';
import { getTransactionHash } from '@/utils/transaction';
import { useAddContractMutation, useUpdateTokenLogo } from '@/api/mutations';
import { DeleteContractFromDBReq, UpdateContractOwnerReq } from '@/interfaces/common';
import ContractApi from '@/api/contractApi';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

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
    _signData: any;
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
    const { isInit, address, fctBalance, handleFCTBalance } = useWalletStore();
    // const isInit = useSelector((v: rootState) => v.wallet.isInit);
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const fctBalance = useSelector((state: rootState) => state.wallet.fctBalance);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { getFctBalance } = useFirmaSDKInternal();

    const { getCW20ContractInfo } = useMyToken();
    const { getCW721ContractInfo } = useMyNFTContracts();
    const { updateContractInfo: updateCW20ContractInfo } = useCW20MyTokenContext();
    const { updateContractInfo: updateCW721ContractInfo, updateThumbnailInfo } = useCW721NFTContractsContext();

    const { cwMode, handleFetchedBalance } = useGlobalStore();
    // const cwMode = useSelector((v: rootState) => v.global.cwMode);

    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);
    const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'failure'>('init');
    // const [fctBalance, setBalance] = useState('0');

    const parsedData = useMemo(() => {
        if (result === null) return null;

        const { message, signData, status, ...rest } = result;

        const parsedMessage = JSON.parse(message);

        if (status !== '1' || signData === '') {
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
            contractAddress: tmpContractAddress,
            transactionHash,
            _signData,
            ...rest
        };
    }, [result]);

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
                handleFCTBalance(result);
                // setBalance(result);
            })
            .catch((error) => {
                console.log(error);
                handleFCTBalance('0');
                // setBalance('0');
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
                updateThumbnailInfo(params.txParams.contract, { reqUpdate: true });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { mutateAsync: addContractToDB } = useAddContractMutation(
        {
            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
            address,
            contractAddress: parsedData?.contractAddress
            // name: params.txParams.msg.name,
            // symbol: params.txParams.msg.symbol,
            // label: params.txParams.label,
            // tokenLogoUrl: params.txParams.msg?.marketing?.logo?.url || ''
        },
        {
            onSuccess: ({ data, success }) => {
                if (data === null || !success) {
                    enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
                }
            },
            onError: (error: any) => {
                console.log(error);
                enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
            },
            onSettled: () => {
                setStatus('success');
            }
        }
    );

    const { mutateAsync: updateTokenLogo } = useUpdateTokenLogo(
        {
            type: 'cw20',
            contractAddress: params.txParams.contract
            // tokenLogoUrl: params.txParams.msg?.url || ''
        },
        {
            onSuccess: ({ data, success }) => {
                if (data === null || !success) {
                    enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
                }
            },
            onError: (error: any) => {
                console.log(error);
                enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
            },
            onSettled: () => {
                setStatus('success');
            }
        }
    );

    const deleteContractFromDB = async (reqData: DeleteContractFromDBReq) => {
        try {
            const data = await ContractApi.deleteContractFromDB({
                ...reqData
            });

            if (!data.success) {
                enqueueSnackbar({ message: 'Failed to update contract information.', variant: 'error' });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: 'Failed to update contract information.', variant: 'error' });
        } finally {
            setStatus('success');
        }
    };

    const updateContractOwner = async (reqData: UpdateContractOwnerReq) => {
        try {
            const data = await ContractApi.updateContractOwner({ ...reqData });

            if (!data.success) {
                enqueueSnackbar({ message: 'Failed to update contract information.', variant: 'error' });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: 'Failed to update contract information.', variant: 'error' });
        } finally {
            setStatus('success');
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

    useEffect(() => {
        const code = typeof parsedData?._signData?.rawData?.code === 'number' ? parsedData?._signData?.rawData?.code : -1;

        if (code === 0) {
            if ((module === '/cw20/instantiateContract' || module === '/cw721/instantiateContract') && parsedData?.contractAddress) {
                addContractToDB();
            }

            if (module === '/cw20/updateLogo') updateTokenLogo();

            if (module === '/cw721/updateOwnershipAccept')
                updateContractOwner({
                    type: 'cw721',
                    contractAddress: params.txParams.contract,
                    address
                });

            if (module === '/cw721/updateOwnershipRenounce')
                deleteContractFromDB({
                    type: 'cw721',
                    contractAddress: params.txParams.contract,
                    address,
                    hash: parsedData.transactionHash
                });
        }
    }, [parsedData, module]);

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
        ({ type, label, value, color }: { type: string; label: string; value: string; color: string }) => {
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
            } else if (type === 'instantiate-amount') {
                return (
                    <InstantiateAmount
                        label={label}
                        decimals={params.contentParams.decimals}
                        amount={value}
                        symbol={params.contentParams.symbol}
                        color={color}
                    />
                );
            }
        },
        [params]
    );

    const hideContractInfo = useMemo(() => {
        if (module.toLowerCase().includes('renounce')) return true;
        if (module.toLowerCase().includes('instantiate')) return true;
        else return false;
    }, [module]);

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
                                {module.includes('Accept') && <AcceptIcon src={IC_CEHCK_ROUND} alt={'accept-icon'} />}
                                {module.includes('Renounce') && <ModalTitleHeaderIcon src={IC_WARNING} />}
                                <ModalTitleTypo style={{ marginBottom: '28px' }}>{params.header.title}</ModalTitleTypo>
                            </ModalTitleWrap>

                            <ModalTitleDescTypo style={{ marginBottom: '24px', fontSize: '16px' }}>
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
                                        if (
                                            ![
                                                '/cw20/instantiateContract',
                                                '/cw721/instantiateContract',
                                                '/cw20/updateLogo',
                                                '/cw721/updateOwnershipRenounce',
                                                '/cw721/updateOwnershipAccept'
                                            ].includes(module)
                                        )
                                            setStatus('success');
                                        handleFetchedBalance(true);
                                    }}
                                    onFailed={(requestData: any) => {
                                        setResult(requestData);
                                        setStatus('failure');
                                        setError({ message: `Failed to ${params.header.title}` });
                                        enqueueSnackbar(`Failed to ${params.header.title}`, {
                                            variant: 'error',
                                            autoHideDuration: 2000
                                        });
                                        handleFetchedBalance(true);
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
                                    {params.contentParams.list && (
                                        <ModalContentBlackCard
                                            style={{
                                                ...(params.contentParams.extraList
                                                    ? {
                                                          borderRadius: '8px 8px 0px 0px',
                                                          borderBottom: '1px solid var(--Gray-400, #2C2C2C)'
                                                      }
                                                    : module === '/cw721/updateOwnershipRenounce'
                                                      ? {
                                                            background: 'rgba(229, 82, 80, 0.18)',
                                                            padding: '16px 20px',
                                                            whiteSpace: 'pre-wrap'
                                                        }
                                                      : { background: '#141414', borderRadius: '8px' }),
                                                ...(params.modalType === 'EXECUTES' &&
                                                !params.contentParams.extraList &&
                                                module !== '/cw721/updateOwnershipRenounce'
                                                    ? { padding: '16px 24px 18px' }
                                                    : {})
                                            }}
                                        >
                                            {params.contentParams.list.map((el, index) => {
                                                return (
                                                    <RenderItem
                                                        key={`item-${index}`}
                                                        type={el.type}
                                                        label={el.label}
                                                        value={el.value}
                                                        color={el.initColor}
                                                    />
                                                );
                                            })}
                                        </ModalContentBlackCard>
                                    )}
                                    {params.contentParams.extraList && (
                                        <ModalContentBlackCard
                                            style={
                                                params.contentParams.list
                                                    ? { borderRadius: '0px 0px 8px 8px', padding: '16px 24px 18px' }
                                                    : { padding: '16px 24px 18px' }
                                            }
                                        >
                                            {/* <Divider $direction={'horizontal'} $color="var(--Gray-400, #2C2C2C)" $variant="line" /> */}
                                            {params.contentParams.extraList.map((el, index) => {
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

                                <ModalContentGrayCard style={{ paddingBottom: '14px' }}>
                                    <ItemWrap>
                                        <FeeLabel>{`${params.modalType === 'INSTANTIATE' ? 'Instantiation' : params.header.title} Fee`}</FeeLabel>
                                        <ItemValueWrap>
                                            <FeeAmount>{FirmaUtil.getFCTStringFromUFCT(Number(instantiateFee))}</FeeAmount>
                                            <FCTSymbolIcon src={IC_FIRMACHAIN} alt={'FCT Symbol Icon'} />
                                        </ItemValueWrap>
                                    </ItemWrap>
                                    <ItemWrap>
                                        <FeeLabel>{'(FCT)'}</FeeLabel>
                                        <MyBalanceWrap>
                                            <MyBalanceValue>{`(My Balance :`}</MyBalanceValue>
                                            <MyBalanceValue>{formatWithCommas(getTokenAmountFromUToken(fctBalance, '6'))}</MyBalanceValue>
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
                                <ResultsTitleMessage>{`${params.modalType === 'INSTANTIATE' ? 'Instantiation' : params.header.title} has succeeded.${module.includes('Renounce') ? '\nYou no longer have control over the contract.' : ''}`}</ResultsTitleMessage>
                            </ResultsHeader>
                            <ResultsContentWrap>
                                {!hideContractInfo && (
                                    <>
                                        <ResultsContentSummeryWrap style={{ padding: '18px 24px 16px' }}>
                                            {params.modalType === 'EXECUTES' &&
                                                params.contentParams.list.map((el, index) => {
                                                    if (el.type !== 'warning')
                                                        return (
                                                            <RenderItem
                                                                key={`item-${index}`}
                                                                type={el.type}
                                                                label={el.label}
                                                                value={el.value}
                                                                color={el.resultColor}
                                                            />
                                                        );
                                                })}
                                            {params.modalType === 'EXECUTES' && params.contentParams.extraList && (
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

                                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                                    </>
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
                                            {cwMode === 'CW20' ? 'Go to My Token Details' : 'Go to My NFT Details'}
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
                                    <ResultFailedTypo>{`${params.modalType === 'INSTANTIATE' ? 'Instantiation' : params.header.title} has failed.`}</ResultFailedTypo>
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
            )}
        </ModalBase>
    );
};

export default QRModal2;
