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
    ModalConfirmButton,
    ModalConfirmTypo,
    ModalButtonBox,
    LoadingDimBox,
    LoadingBox,
    LoadingTypo,
    ModalTitleHeaderIcon,
    ModalContentCard,
    AcceptIcon
} from './style';
import useModalStore from '@/store/modalStore';
import { IC_ALERT_YELLOW, IC_CEHCK_ROUND, IC_CIRCLE_FAIL, IC_CLOSE, IC_FIRMACHAIN, IC_WARNING } from '@/components/atoms/icons/pngIcons';
import { useSnackbar } from 'notistack';
// import useInstantiateStore from '../instantiate/instaniateStore';
import useFormStore from '@/store/formStore';
import Divider from '@/components/atoms/divider';
import { scrollToTop } from '@/utils/common';

import { CRAFT_CONFIGS } from '@/config';
import { Cw721Expires, Expires, FirmaUtil } from '@firmachain/firma-js';
import { formatWithCommas, getTokenAmountFromUToken } from '@/utils/balance';
import LabelInput from '@/components/atoms/input/labelInput';
import useFirmaSDKInternal from '@/hooks/useFirmaSDKInternal';
import {
    AmountItem,
    ContractAddressItem,
    DefaultItem,
    ExecuteAmountItem,
    ExpirationItem,
    InstantiateAmount,
    NftItem,
    ResultNftIdItem,
    ResultWalletAdress,
    TransactionItem,
    UrlItem,
    WalletCount,
    WarningItem
} from '.';
import Connect from './connect/connect';
import FirmaLoading from '@/components/atoms/globalLoader/firmaLoad';
import useMyToken from '@/hooks/useMyToken';
import { useCW20MyTokenContext } from '@/context/cw20MyTokenContext';
import { useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
// import { useAddContractMutation, useUpdateTokenLogo } from '@/api/mutations';
// import { WalletActions } from '@/redux/actions';
// import { useDeleteContractFromDB } from '@/api/queries';
import { AddContractInfo, AddContractReq, DeleteContractFromDBReq, UpdateContractOwnerReq, UpdateTokenLogo } from '@/interfaces/common';
import ContractApi from '@/api/contractApi';
import useGlobalStore from '@/store/globalStore';
import useWalletStore from '@/store/walletStore';

type ModalType = 'INSTANTIATE' | 'EXECUTES';

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

interface IResultState {
    transactionHash: string;
    contractAddress?: string;
    code?: number;
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
    | '/cw721/updateOwnershipTransfer';

const TxModal = ({
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
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const {
        getFctBalance,
        getGasEstimationInstantiate,
        getGasEstimationCw20Mint,
        getGasEstimationCw20Burn,
        getGasEstimationCw20BurnFrom,
        getGasEstimationCw20IncreaseAllowance,
        getGasEstimationCw20DecreaseAllowance,
        getGasEstimationCw20Transfer,
        getGasEstimationCw20TransferFrom,
        getGasEstimationCw20UpdateLogo,
        getGasEstimationCw20UpdateMarketing,
        getGasEstimationCw20UpdateMinter,
        getGasEstimationCw721Mint,
        getGasEstimationCw721Burn,
        getGasEstimationCw721Transfer,
        getGasEstimationCw721Approve,
        getGasEstimationCw721ApproveAll,
        getGasEstimationCw721Revoke,
        getGasEstimationCw721RevokeAll,
        getGasEstimationCw721UpdateOwnershipAccept,
        getGasEstimationCw721UpdateOwnershipRenounce,
        getGasEstimationCw721UpdateOwnershipTransfer,
        instantiate,
        cw20Mint,
        cw20Burn,
        cw20BurnFrom,
        cw20IncreaseAllowance,
        cw20DecreaseAllowance,
        cw20Trnasfer,
        cw20TrnasferFrom,
        cw20UpdateLogo,
        cw20UpdateMarketing,
        cw20UpdateMinter,
        cw721Mint,
        cw721Burn,
        cw721Transfer,
        cw721Approve,
        cw721ApproveAll,
        cw721Revoke,
        cw721RevokeAll,
        cw721UpdateOwnerShipAccept,
        cw721UpdateOwnerShipRenounce,
        cw721UpdateOwnerShipTransfer
    } = useFirmaSDKInternal();

    const { getCW20ContractInfo } = useMyToken();
    const { getCW721ContractInfo } = useMyNFTContracts();
    const { updateContractInfo: updateCW20ContractInfo } = useCW20MyTokenContext();
    const { updateContractInfo: updateCW721ContractInfo, updateThumbnailInfo } = useCW721NFTContractsContext();

    const { address, fctBalance, passwordWallet, timeKey, handleFCTBalance } = useWalletStore();
    // useSelector((state: rootState) => state.wallet);
    // const address = useSelector((state: rootState) => state.wallet.address);
    // const fctBalance = useSelector((state: rootState) => state.wallet.fctBalance);

    const cwMode = useGlobalStore((v) => v.cwMode);
    // useSelector((v: rootState) => v.global.cwMode);

    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | IResultState>(null);

    const [status, setStatus] = useState<'init' | 'loading' | 'success' | 'failure'>('init');
    // const [fctBalance, setBalance] = useState('0');
    const [estimatedGas, setEstimatedGas] = useState<number>(0);
    const [inputPassword, setInputPassword] = useState<string>('');

    useEffect(() => {
        if (status === 'success') {
            updateContract();
        }
    }, [status]);

    useEffect(() => {
        getBalance();
        getEstimatedGas();
    }, [address]);

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

    // const { mutateAsync: addContractToDB } = useAddContractMutation(
    //     {
    //         type: cwMode.toLowerCase() as 'cw20' | 'cw721',
    //         address,
    //         contractAddress: result?.contractAddress,
    //         name: params.txParams.msg.name,
    //         symbol: params.txParams.msg.symbol,
    //         label: params.txParams.label,
    //         tokenLogoUrl: params.txParams.msg?.marketing?.logo?.url || ''
    //     },
    //     {
    //         onSuccess: ({ data }) => {
    //             if (data === null) {
    //                 enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
    //             }
    //         },
    //         onError: (error: any) => {
    //             console.log(error);
    //             enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
    //         },
    //         onSettled: () => {
    //             setStatus('success');
    //         }
    //     }
    // );
    const addContractToDB = async (params: AddContractReq) => {
        try {
            const data = await ContractApi.addContractToDB({ ...params });

            if (!data.success) {
                enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: 'Failed to save the contract address.', variant: 'error' });
        }
    };

    // const { mutateAsync: updateTokenLogo } = useUpdateTokenLogo(
    //     {
    //         type: cwMode.toLowerCase() as 'cw20' | 'cw721',
    //         contractAddress: params.txParams.contract,
    //         tokenLogoUrl: params.txParams.msg?.url || ''
    //     },
    //     {
    //         onSuccess: ({ data }) => {
    //             if (data === null) {
    //                 enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
    //             }
    //         },
    //         onError: (error: any) => {
    //             console.log(error);
    //             enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
    //         },
    //         onSettled: () => {
    //             setStatus('success');
    //         }
    //     }
    // );

    const updateTokenLogo = async (reqData: UpdateTokenLogo) => {
        try {
            const data = await ContractApi.updateTokenLogo({
                ...reqData
            });

            if (!data.success) {
                enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar({ message: 'Failed to update token logo.', variant: 'error' });
        }
    };

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
        }
    };

    const getEstimatedGas = async () => {
        try {
            switch (module) {
                case '/cw20/instantiateContract':
                    const cw20info = params.txParams;
                    const cw20InstantiateGas = await getGasEstimationInstantiate(
                        cw20info.admin,
                        cw20info.codeId,
                        cw20info.label,
                        JSON.stringify(cw20info.msg),
                        CRAFT_CONFIGS.CW20.MEMO
                    );
                    setEstimatedGas(cw20InstantiateGas);
                    return;
                case '/cw721/instantiateContract':
                    const cw721info = params.txParams;
                    const cw721InstantiateGas = await getGasEstimationInstantiate(
                        cw721info.admin,
                        cw721info.codeId,
                        cw721info.label,
                        JSON.stringify(cw721info.msg),
                        CRAFT_CONFIGS.CW721.MEMO
                    );
                    setEstimatedGas(cw721InstantiateGas);
                    return;
                case '/cw20/mintToken':
                    const cw20MintGas = await getGasEstimationCw20Mint(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw20MintGas);
                    return;
                case '/cw20/burnToken':
                    const amount = JSON.parse(JSON.stringify(params.txParams.msg)).amount;
                    const cw20BurnGas = await getGasEstimationCw20Burn(params.txParams.contract, amount);
                    setEstimatedGas(cw20BurnGas);
                    return;
                case '/cw20/burnFrom':
                    const cw20BurnFromGas = await getGasEstimationCw20BurnFrom(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw20BurnFromGas);
                    return;
                case '/cw20/increaseAllowance':
                    const cw20IncreaseInfo: { spender: string; amount: string; expires: Expires } = JSON.parse(
                        JSON.stringify(params.txParams.msg)
                    );
                    const cw20IncreaseGas = await getGasEstimationCw20IncreaseAllowance(
                        params.txParams.contract,
                        cw20IncreaseInfo.spender,
                        cw20IncreaseInfo.amount,
                        cw20IncreaseInfo.expires
                    );
                    setEstimatedGas(cw20IncreaseGas);
                    return;
                case '/cw20/decreaseAllowance':
                    const cw20DecreaseInfo: { spender: string; amount: string; expires: Expires } = JSON.parse(
                        JSON.stringify(params.txParams.msg)
                    );
                    const cw20DecreaseGas = await getGasEstimationCw20DecreaseAllowance(
                        params.txParams.contract,
                        cw20DecreaseInfo.spender,
                        cw20DecreaseInfo.amount,
                        cw20DecreaseInfo.expires
                    );
                    setEstimatedGas(cw20DecreaseGas);
                    return;
                case '/cw20/transfer':
                    const cw20TransferGas = await getGasEstimationCw20Transfer(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw20TransferGas);
                    return;
                case '/cw20/transferFrom':
                    const cw20TransferFromGas = await getGasEstimationCw20TransferFrom(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw20TransferFromGas);
                    return;
                case '/cw20/updateLogo':
                    const logo = JSON.parse(JSON.stringify(params.txParams.msg)).url;
                    const cw20UpdateLogoGas = await getGasEstimationCw20UpdateLogo(params.txParams.contract, logo);
                    setEstimatedGas(cw20UpdateLogoGas);
                    return;
                case '/cw20/updateMarketing':
                    const msg = JSON.parse(JSON.stringify(params.txParams.msg));
                    const description = msg.description;
                    const marketing = msg.marketing;
                    const project = msg.project;
                    const cw20UpdateMarketingGas = await getGasEstimationCw20UpdateMarketing(
                        params.txParams.contract,
                        description,
                        marketing,
                        project
                    );
                    setEstimatedGas(cw20UpdateMarketingGas);
                    return;
                case '/cw20/updateMinter':
                    const newMinter = JSON.parse(JSON.stringify(params.txParams.msg)).new_minter;
                    const cw20UpdateMinterGas = await getGasEstimationCw20UpdateMinter(params.txParams.contract, newMinter);
                    setEstimatedGas(cw20UpdateMinterGas);
                    return;
                case '/cw721/mint':
                    const cw721MintGas = await getGasEstimationCw721Mint(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw721MintGas);
                    return;
                case '/cw721/burn':
                    const cw721BurnGas = await getGasEstimationCw721Burn(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw721BurnGas);
                    return;
                case '/cw721/transfer':
                    const cw721TransferGas = await getGasEstimationCw721Transfer(
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg))
                    );
                    setEstimatedGas(cw721TransferGas);
                    return;
                case '/cw721/approve':
                    const approveExpires: Cw721Expires = params.txParams.msg.expires;
                    const spender: string = params.txParams.msg.spender;
                    const token_id: string = params.txParams.msg.token_id;
                    const cw721ApproveGas = await getGasEstimationCw721Approve(params.txParams.contract, spender, token_id, approveExpires);
                    setEstimatedGas(cw721ApproveGas);
                    return;
                case '/cw721/approveAll':
                    const approveAllAxpires: Cw721Expires = params.txParams.msg.expires;
                    const operator: string = params.txParams.msg.operator;
                    const cw721ApproveAllGas = await getGasEstimationCw721ApproveAll(params.txParams.contract, operator, approveAllAxpires);
                    setEstimatedGas(cw721ApproveAllGas);
                    return;
                case '/cw721/revoke':
                    const revokeSpender: string = params.txParams.msg.spender;
                    const revokeToken_id: string = params.txParams.msg.token_id;
                    const cw721RevokeGas = await getGasEstimationCw721Revoke(params.txParams.contract, revokeSpender, revokeToken_id);
                    setEstimatedGas(cw721RevokeGas);
                    return;
                case '/cw721/revokeAll':
                    const revokeOperator: string = params.txParams.msg.operator;
                    const cw721RevokeAllGas = await getGasEstimationCw721RevokeAll(params.txParams.contract, revokeOperator);
                    setEstimatedGas(cw721RevokeAllGas);
                    return;
                case '/cw721/updateOwnershipTransfer':
                    const new_owner: string = params.txParams.msg.new_owner;
                    const expiry: Cw721Expires = params.txParams.msg.expiry;
                    const cw721UpdateOwnershipTransferGas = await getGasEstimationCw721UpdateOwnershipTransfer(
                        params.txParams.contract,
                        new_owner,
                        expiry
                    );
                    setEstimatedGas(cw721UpdateOwnershipTransferGas);
                    return;
                case '/cw721/updateOwnershipAccept':
                    const cw721UpdateOwnershipAcceptGas = await getGasEstimationCw721UpdateOwnershipAccept(params.txParams.contract);
                    setEstimatedGas(cw721UpdateOwnershipAcceptGas);
                    return;
                case '/cw721/updateOwnershipRenounce':
                    const cw721UpdateOwnershipRenounceGas = await getGasEstimationCw721UpdateOwnershipRenounce(params.txParams.contract);
                    setEstimatedGas(cw721UpdateOwnershipRenounceGas);
                    return;
                default:
                    return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleTransaction();
        }
    };

    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
        if (status === 'success') {
            onClickConfirm();
        }
    };

    const onChangeInputPassword = (v: string) => {
        setInputPassword(v);
    };

    const onClickTransactionHash = (hash: string) => {
        window.open(`${CRAFT_CONFIGS.BLOCK_EXPLORER}/transactions/${hash}`);
    };

    const handleTransaction = async () => {
        if (isTxButtonDisabled) return;

        setStatus('loading');

        try {
            switch (module) {
                case '/cw20/instantiateContract':
                    const cw20info = params.txParams;
                    const cw20InstantiateResult = await instantiate(
                        inputPassword,
                        cw20info.admin,
                        cw20info.codeId,
                        cw20info.label,
                        JSON.stringify(params.txParams.msg),
                        estimatedGas,
                        CRAFT_CONFIGS.CW20.MEMO
                    );
                    setResult(cw20InstantiateResult);

                    if (cw20InstantiateResult.code === 0) {
                        await addContractToDB({
                            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
                            address,
                            contractAddress: cw20InstantiateResult?.contractAddress
                            // name: params.txParams.msg.name,
                            // symbol: params.txParams.msg.symbol,
                            // label: params.txParams.label,
                            // tokenLogoUrl: params.txParams.msg?.marketing?.logo?.url || ''
                        });

                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    // useInstantiateStore.getState().clearForm();
                    // useFormStore.getState().clearForm();
                    return;
                case '/cw721/instantiateContract':
                    const cw721info = params.txParams;
                    const cw721nstantiateResult = await instantiate(
                        inputPassword,
                        cw721info.admin,
                        cw721info.codeId,
                        cw721info.label,
                        JSON.stringify(params.txParams.msg),
                        estimatedGas,
                        CRAFT_CONFIGS.CW721.MEMO
                    );
                    setResult(cw721nstantiateResult);

                    if (cw721nstantiateResult.code === 0) {
                        await addContractToDB({
                            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
                            address,
                            contractAddress: cw721nstantiateResult?.contractAddress
                            // name: params.txParams.msg.name,
                            // symbol: params.txParams.msg.symbol,
                            // label: params.txParams.label,
                            // tokenLogoUrl: params.txParams.msg?.marketing?.logo?.url || ''
                        });

                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/mintToken':
                    const cw20MintResult = await cw20Mint(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw20MintResult);

                    if (cw20MintResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/burnToken':
                    const amount = JSON.parse(JSON.stringify(params.txParams.msg)).amount;
                    const cw20BurnResult = await cw20Burn(inputPassword, params.txParams.contract, amount, estimatedGas);
                    setResult(cw20BurnResult);

                    if (cw20BurnResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/burnFrom':
                    const cw20BurnFromResult = await cw20BurnFrom(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw20BurnFromResult);

                    if (cw20BurnFromResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/increaseAllowance':
                    const cw20IncreaseInfo: { spender: string; amount: string; expires: Expires } = JSON.parse(
                        JSON.stringify(params.txParams.msg)
                    );
                    const cw20IncreaseResulrt = await cw20IncreaseAllowance(
                        inputPassword,
                        params.txParams.contract,
                        cw20IncreaseInfo.spender,
                        cw20IncreaseInfo.amount,
                        cw20IncreaseInfo.expires,
                        estimatedGas
                    );
                    setResult(cw20IncreaseResulrt);

                    if (cw20IncreaseResulrt.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/decreaseAllowance':
                    const cw20DecreaseInfo: { spender: string; amount: string; expires: Expires } = JSON.parse(
                        JSON.stringify(params.txParams.msg)
                    );
                    const cw20DecreaseResulrt = await cw20DecreaseAllowance(
                        inputPassword,
                        params.txParams.contract,
                        cw20DecreaseInfo.spender,
                        cw20DecreaseInfo.amount,
                        cw20DecreaseInfo.expires,
                        estimatedGas
                    );
                    setResult(cw20DecreaseResulrt);

                    if (cw20DecreaseResulrt.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/transfer':
                    const cw20TransferResult = await cw20Trnasfer(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw20TransferResult);

                    if (cw20TransferResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/transferFrom':
                    const cw20TransferFromResult = await cw20TrnasferFrom(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw20TransferFromResult);

                    if (cw20TransferFromResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/updateLogo':
                    const logo = JSON.parse(JSON.stringify(params.txParams.msg)).url;
                    const cw20UpdateLogoResult = await cw20UpdateLogo(inputPassword, params.txParams.contract, logo, estimatedGas);
                    setResult(cw20UpdateLogoResult);

                    if (cw20UpdateLogoResult.code === 0) {
                        await updateTokenLogo({
                            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
                            contractAddress: params.txParams.contract
                            // tokenLogoUrl: params.txParams.msg?.url || ''
                        });

                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/updateMarketing':
                    const msg = JSON.parse(JSON.stringify(params.txParams.msg));
                    const description = msg.description;
                    const marketing = msg.marketing;
                    const project = msg.project;
                    const cw20UpdateMarketingesult = await cw20UpdateMarketing(
                        inputPassword,
                        params.txParams.contract,
                        description,
                        marketing,
                        project,
                        estimatedGas
                    );
                    setResult(cw20UpdateMarketingesult);

                    if (cw20UpdateMarketingesult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw20/updateMinter':
                    const newMinter = JSON.parse(JSON.stringify(params.txParams.msg)).new_minter;
                    const cw20UpdateMinterResult = await cw20UpdateMinter(inputPassword, params.txParams.contract, newMinter, estimatedGas);
                    setResult(cw20UpdateMinterResult);

                    if (cw20UpdateMinterResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/mint':
                    const cw721MintResult = await cw721Mint(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw721MintResult);

                    if (cw721MintResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/burn':
                    const cw721BurnResult = await cw721Burn(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw721BurnResult);

                    if (cw721BurnResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/transfer':
                    const cw721TransferResult = await cw721Transfer(
                        inputPassword,
                        params.txParams.contract,
                        JSON.parse(JSON.stringify(params.txParams.msg)),
                        estimatedGas
                    );
                    setResult(cw721TransferResult);

                    if (cw721TransferResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/approve':
                    const approveExpires: Cw721Expires = params.txParams.msg.expires;
                    const spender: string = params.txParams.msg.spender;
                    const token_id: string = params.txParams.msg.token_id;
                    const cw721ApproveResult = await cw721Approve(
                        inputPassword,
                        params.txParams.contract,
                        spender,
                        token_id,
                        approveExpires,
                        estimatedGas
                    );

                    setResult(cw721ApproveResult);

                    if (cw721ApproveResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/approveAll':
                    const approveAllExpires: Cw721Expires = params.txParams.msg.expires;
                    const operator: string = params.txParams.msg.operator;
                    const cw721ApproveAllResult = await cw721ApproveAll(
                        inputPassword,
                        params.txParams.contract,
                        operator,
                        approveAllExpires,
                        estimatedGas
                    );
                    setResult(cw721ApproveAllResult);

                    if (cw721ApproveAllResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/revoke':
                    const revokeSpender: string = params.txParams.msg.spender;
                    const revokeToken_id: string = params.txParams.msg.token_id;
                    const cw721RevokeResult = await cw721Revoke(
                        inputPassword,
                        params.txParams.contract,
                        revokeSpender,
                        revokeToken_id,
                        estimatedGas
                    );
                    setResult(cw721RevokeResult);

                    if (cw721RevokeResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/revokeAll':
                    const revokeOperator: string = params.txParams.msg.operator;
                    const cw721RevokeAllResult = await cw721RevokeAll(
                        inputPassword,
                        params.txParams.contract,
                        revokeOperator,
                        estimatedGas
                    );
                    setResult(cw721RevokeAllResult);

                    if (cw721RevokeAllResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/updateOwnershipTransfer':
                    const new_owner: string = params.txParams.msg.new_owner;
                    const expiry: Cw721Expires = params.txParams.msg.expiry;
                    const cw721UpdateOwnershipTransferResult = await cw721UpdateOwnerShipTransfer(
                        inputPassword,
                        params.txParams.contract,
                        new_owner,
                        expiry,
                        estimatedGas
                    );
                    setResult(cw721UpdateOwnershipTransferResult);

                    if (cw721UpdateOwnershipTransferResult.code === 0) {
                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/updateOwnershipAccept':
                    const cw721UpdateOwnershipAcceptResult = await cw721UpdateOwnerShipAccept(
                        inputPassword,
                        params.txParams.contract,
                        estimatedGas
                    );
                    setResult(cw721UpdateOwnershipAcceptResult);

                    if (cw721UpdateOwnershipAcceptResult.code === 0) {
                        await updateContractOwner({
                            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
                            contractAddress: params.txParams.contract,
                            address
                        });

                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                case '/cw721/updateOwnershipRenounce':
                    const cw721UpdateOwnershipRenounceResult = await cw721UpdateOwnerShipRenounce(
                        inputPassword,
                        params.txParams.contract,
                        estimatedGas
                    );
                    setResult(cw721UpdateOwnershipRenounceResult);

                    if (cw721UpdateOwnershipRenounceResult.code === 0) {
                        await deleteContractFromDB({
                            type: cwMode.toLowerCase() as 'cw20' | 'cw721',
                            contractAddress: params.txParams.contract,
                            address,
                            hash: cw721UpdateOwnershipRenounceResult?.transactionHash
                        });

                        setStatus('success');
                    } else {
                        setStatus('failure');
                    }

                    return;
                default:
                    return;
            }
        } catch (error) {
            enqueueSnackbar('Transaction failed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            setStatus('failure');
        }
    };

    const isConnectedWallet = useMemo(() => {
        return !Boolean(passwordWallet === '' || timeKey === '');
    }, [passwordWallet, timeKey]);

    const isTxButtonDisabled = useMemo(() => {
        return Boolean(inputPassword.length < 8 || Boolean(estimatedGas === 0));
    }, [inputPassword]);

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
            {isConnectedWallet ? (
                <Fragment>
                    {(status === 'init' || status === 'loading') && (
                        <div
                            style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
                        >
                            <ModalTitleWrap>
                                {module.includes('Accept') && <AcceptIcon src={IC_CEHCK_ROUND} alt={'accept-icon'} />}
                                {module.includes('Renounce') && <ModalTitleHeaderIcon src={IC_WARNING} />}
                                <ModalTitleTypo style={{ marginBottom: '28px' }}>
                                    {/* {params.modalType === 'INSTANTIATE' ? `${params.txParams.type?.toUpperCase()} ` : ''} */}
                                    {params.header.title}
                                </ModalTitleTypo>
                            </ModalTitleWrap>
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
                                            <FeeAmount>{FirmaUtil.getFCTStringFromUFCT(Number(estimatedGas))}</FeeAmount>
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
                                <div style={{ marginTop: '14px', width: '100%' }}>
                                    <LabelInput
                                        labelProps={{ label: 'Password' }}
                                        inputProps={{
                                            formId: `INPUT_PASSWORD`,
                                            value: inputPassword,
                                            onChange: onChangeInputPassword,
                                            onKeyDown: handleClickEnter,
                                            placeHolder: 'Enter Password',
                                            type: 'password'
                                        }}
                                    />
                                </div>
                            </ModalContentWrap>
                            <ModalButtonBox>
                                <ModalCancelButton
                                    onClick={() => {
                                        onCloseModal();
                                    }}
                                >
                                    <ModalCancelTypo>Cancel</ModalCancelTypo>
                                </ModalCancelButton>
                                <ModalConfirmButton disabled={isTxButtonDisabled} onClick={handleTransaction}>
                                    <ModalConfirmTypo>Confirm</ModalConfirmTypo>
                                </ModalConfirmButton>
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
                                    <ResultsTitleExecuteTypo>
                                        {/* {params.modalType === 'INSTANTIATE' ? `${params.txParams.type?.toUpperCase()} ` : ''} */}
                                        {params.header.title}
                                    </ResultsTitleExecuteTypo>
                                    <ResultsTitleSuccessTypo>Success</ResultsTitleSuccessTypo>
                                </ResultsTitleWrap>
                                <ResultsTitleMessage>
                                    {`${params.modalType === 'INSTANTIATE' ? 'Instantiation' : params.header.title} has succeeded.${module.includes('Renounce') ? '\nYou no longer have control over the contract.' : ''}`}
                                </ResultsTitleMessage>
                            </ResultsHeader>
                            <ResultsContentWrap>
                                {!hideContractInfo && (
                                    <>
                                        <ResultsContentSummeryWrap style={{ padding: '18px 24px 16px' }}>
                                            {params.contentParams.list.map((el, index) => {
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
                                            {params.contentParams.extraList && (
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
                                    {result.contractAddress && (
                                        <ContractAddressItem label={'Contract Address'} contractAddress={result.contractAddress} />
                                    )}
                                    <TransactionItem
                                        label={'Transaction Hash'}
                                        hash={result.transactionHash}
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
                                                result.contractAddress === undefined ? params.txParams.contract : result.contractAddress;
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
                                    <ResultFailedDesc>Please try again later.</ResultFailedDesc>
                                </ResultsContentSummeryWrap>
                                {result && (
                                    <>
                                        <Divider $direction={'horizontal'} $variant="dash" $color="var(--Gray-400, #2C2C2C)" />
                                        <ResultsContentHashWrap>
                                            <TransactionItem
                                                label={'Transaction Hash'}
                                                hash={result.transactionHash}
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
                <Connect closeModal={() => null} />
            )}
        </ModalBase>
    );
};

export default TxModal;
