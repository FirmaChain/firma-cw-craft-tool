import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '@/components/atoms/icons';
import {
    TxCofirmTitleTypoWrapper,
    TxConfirmFailedTypo,
    TxConfirmModuleTypo,
    TxConfirmSuccessTypo,
    TxConfirmTitle,
    TxResultTypo,
    ModalBase,
    SignTitle,
    SignDesc,
    StepIcon,
    StepDesc
} from './style';
import ColorButton from '@/components/atoms/buttons/colorButton';
import { useModalStore } from '@/hooks/useModal';
import { IC_CEHCK_ROUND, IC_CLOSE, IC_FIRMA_LOGO, IC_ROUND_ARROW_UP, IC_SCAN } from '@/components/atoms/icons/pngIcons';
import RequestQR from '../requestQR/index2';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

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
    params: { admin: string; codeId: string; label: string; msg: string };
}) => {
    const walletAddress = useSelector((state: rootState) => state.wallet.address);

    const [status, setStatus] = useState<'init' | 'success' | 'failure'>('init');
    const [error, setError] = useState<any>(null);
    const [result, setResult] = useState<null | SuccessData>(null);

    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const closeModal = useModalStore().closeModal;

    const parsedData = useMemo(() => {
        if (result === null) return null;

        const { message, signData, ...rest } = result;

        const parsedMessage = JSON.parse(message);
        const { address, chainId, rawData } = JSON.parse(signData);
        const { code, gasUsed, gasWanted, height, rawLog, transactionHash } = JSON.parse(rawData);
        const parsedLogs = JSON.parse(rawLog)[0];

        const _rawData = { code, gasUsed, gasWanted, height, rawLog: parsedLogs, transactionHash };
        const _signData = { address, chainId, rawData: _rawData };

        return {
            message: parsedMessage,
            signData: _signData,
            ...rest
        };
    }, [result]);

    const onCloseModal = () => {
        closeModal(id);
    };

    const onClickGoToMyTokens = () => {
        closeModal(id);
        navigate(`/mytoken`);
    };

    return (
        <ModalBase
            style={{
                width: status === 'init' ? '544px' : 'fit-content',
                padding: status === 'init' ? '48px 0px 0px' : '48px 24px 24px'
            }}
        >
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 12, top: 12, cursor: 'pointer' }}
            />
            {status === 'init' && (
                <>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: '40px'
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                paddingBottom: '40px'
                            }}
                        >
                            <SignTitle>Instantiate</SignTitle>
                            <SignDesc>Instantiate your own CW20 token with the firmastation app.</SignDesc>
                        </div>

                        <RequestQR
                            module={module}
                            params={params}
                            signer={walletAddress}
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
                    </div>
                    <div
                        style={{
                            position: 'relative',
                            width: '100%',
                            height: '104px',
                            padding: '32px 0',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            gap: '20px',
                            background: 'var(--Gray-200, #1A1A1A)'
                        }}
                    >
                        <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={IC_ROUND_ARROW_UP}
                                alt="arrow"
                                style={{ width: '16px', aspectRatio: '1/1', transform: 'rotate(90deg)' }}
                            />
                        </div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '32px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '40px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    width: '100px'
                                }}
                            >
                                <StepIcon>
                                    <img src={IC_FIRMA_LOGO} alt="firma-logo" />
                                </StepIcon>
                                <StepDesc>{`1. Open station\napp`}</StepDesc>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    width: '100px'
                                }}
                            >
                                <StepIcon>
                                    <img src={IC_SCAN} alt="firma-logo" />
                                </StepIcon>
                                <StepDesc>{`2. Sign transaction`}</StepDesc>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {status === 'success' && result !== null && (
                <>
                    <TxConfirmTitle style={{ paddingBottom: '20px' }}>
                        {Number(parsedData.status) === 1 ? (
                            <>
                                <img src={IC_CEHCK_ROUND} alt="success" style={{ width: '56px', height: '56px' }} />
                                <TxCofirmTitleTypoWrapper>
                                    <TxConfirmModuleTypo>Instantiation</TxConfirmModuleTypo>
                                    <TxConfirmSuccessTypo>Success</TxConfirmSuccessTypo>
                                </TxCofirmTitleTypoWrapper>
                            </>
                        ) : (
                            <>
                                <Icons.Failed width={'56px'} height={'56px'} />
                                <TxCofirmTitleTypoWrapper>
                                    <TxConfirmModuleTypo>Instantiation</TxConfirmModuleTypo>
                                    <TxConfirmFailedTypo>Failed</TxConfirmFailedTypo>
                                </TxCofirmTitleTypoWrapper>
                            </>
                        )}
                    </TxConfirmTitle>
                    <TxResultTypo>{`Token Instantiation has been\nsuccessfully completed.`}</TxResultTypo>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                        {Number(parsedData.status) === 1 ? (
                            <>
                                <ColorButton
                                    width={'152px'}
                                    height={'40px'}
                                    color={'#383838'}
                                    text={'Confirm'}
                                    sx={{
                                        color: '#999',
                                        fontStyle: 'normal',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        textTransform: 'unset',
                                        borderRadius: '8px'
                                    }}
                                    onClick={onCloseModal}
                                />
                                <ColorButton
                                    width={'152px'}
                                    height={'40px'}
                                    color={'#02E191'}
                                    text={'Go to My Tokens'}
                                    sx={{
                                        color: '#1A1A1A',
                                        fontStyle: 'normal',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        textTransform: 'unset',
                                        borderRadius: '8px'
                                    }}
                                    onClick={onClickGoToMyTokens}
                                />
                            </>
                        ) : (
                            <ColorButton
                                width={'152px'}
                                height={'40px'}
                                color={'#383838'}
                                text={'Confirm'}
                                sx={{
                                    color: '#999',
                                    fontStyle: 'normal',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    textTransform: 'unset',
                                    borderRadius: '8px'
                                }}
                                onClick={onCloseModal}
                            />
                        )}
                    </div>
                </>
            )}
        </ModalBase>
    );
};

export default InstantitateModal;
