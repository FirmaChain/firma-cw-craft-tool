import React, { useState, useEffect, useMemo } from 'react';

import { QRContainer, TimerTypo, TimerWrap, TxTimerTypo } from './style';
import ConnectQR from '@/components/atoms/connectQR';
import { CRAFT_CONFIGS } from '@/config';

import useAPI from '@/hooks/useAPI';
import { IC_RESET, IC_RESET_WHITE } from '@/components/atoms/icons/pngIcons';
import { getTransactionStatusCode } from '@/utils/transaction';

interface IProps {
    qrSize?: number;
    isTxModal?: boolean;
    module: string;
    onSuccess: (requestData: Object) => void;
    onFailed: (requestData: Object) => void;
    params?: Object;
    signer?: string;
}

const RequestQR = ({ qrSize = 198, isTxModal = false, module, onSuccess, onFailed, params = {}, signer = '' }: IProps) => {
    const { checkRequest, generateRequestQR } = useAPI();

    const [requestKey, setRequestKey] = useState('');
    const [qrcode, setQrcode] = useState('');
    const [expireDate, setExpireDate] = useState<Date | null>(null);
    const [timerText, setTimerText] = useState('02:59');
    const [activeQR, setActiveQR] = useState(false);

    const craftServerURI = CRAFT_CONFIGS.CRAFT_SERVER_URI;

    useEffect(() => requestQR(), []);

    const requestQR = () => {
        generateRequestQR(craftServerURI, module, { ...params, signer })
            .then((result) => {
                if (result !== null) {
                    setRequestKey(result.requestKey);
                    setQrcode(result.qrcode);
                    setExpireDate(result.expire);
                    setActiveQR(true);
                } else {
                    throw new Error('INVALID REQUEST');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const refreshRequestQR = () => {
        setRequestKey('');
        setQrcode('');
        setExpireDate(null);
        setActiveQR(false);

        requestQR();
    };

    const onTickCheckRequest = async () => {
        const requestData = await checkRequest(craftServerURI, requestKey);

        try {
            if (requestData?.status === '1') {
                setActiveQR(false);
                if (requestData?.type === 'LOGIN') {
                    onSuccess(requestData);
                } else {
                    const code = getTransactionStatusCode(requestData.signData);
                    if (code === 0) {
                        onSuccess(requestData);
                    } else {
                        onFailed(requestData);
                    }
                }
            } else if (requestData.status === '-2') {
                setActiveQR(false);
                onFailed(requestData);
            }
        } catch (error) {
            onFailed(requestData);
        }
    };

    return (
        <QRContainer style={{ gap: module === '/login' ? '20px' : '16px' }}>
            <ConnectQR
                qrSize={qrSize}
                qrcode={qrcode}
                expireDate={expireDate}
                isActive={activeQR}
                setTimerText={(value: string) => {
                    setTimerText(value);
                }}
                onExpired={() => {
                    setActiveQR(false);
                    refreshRequestQR();
                }}
                onTick={() => {
                    onTickCheckRequest();
                }}
            />
            <TimerWrap $isTxModal={isTxModal} onClick={() => qrcode !== '' && refreshRequestQR()}>
                {qrcode !== '00:00' && (
                    <>
                        {!isTxModal ? (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    {/* {timerText.split('').map((typo, idx) => ( */}
                                    <TimerTypo /*style={{ width: '10px', textAlign: 'center' }} key={idx}*/>{timerText}</TimerTypo>
                                    {/* ))} */}
                                </div>
                                <img src={IC_RESET} alt="reset" style={{ minWidth: '16px', maxWidth: '16px', height: '16px' }} />
                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    {/* {timerText.split('').map((typo, idx) => ( */}
                                    <TxTimerTypo /*style={{ width: '8px', textAlign: 'center' }} key={idx}*/>{timerText}</TxTimerTypo>
                                    {/* ))} */}
                                </div>
                                <img src={IC_RESET_WHITE} alt="reset" style={{ minWidth: '12px', maxWidth: '12px', height: '12px' }} />
                            </>
                        )}
                    </>
                )}
            </TimerWrap>
        </QRContainer>
    );
};

export default React.memo(RequestQR);
