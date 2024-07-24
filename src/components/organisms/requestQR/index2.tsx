import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { QRContainer, TimerTypo, TimerWrap, TxTimerTypo } from './style';
import ConnectQR from '@/components/atoms/connectQR/index2';
import { CRAFT_CONFIGS } from '@/config';
import { rootState } from '@/redux/reducers';
import useAPI from '@/hooks/useAPI';
import { IC_RESET, IC_RESET_WHITE } from '@/components/atoms/icons/pngIcons';

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
    const { network } = useSelector((state: rootState) => state.global);
    const { checkRequest, generateRequestQR } = useAPI();

    const [requestKey, setRequestKey] = useState('');
    const [qrcode, setQrcode] = useState('');
    const [expireDate, setExpireDate] = useState<Date | null>(null);
    const [timerText, setTimerText] = useState('02:59');
    const [activeQR, setActiveQR] = useState(false);

    const craftServerURI = useMemo(() => {
        const craftURI = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.CRAFT_SERVER_URI : CRAFT_CONFIGS.TESTNET.CRAFT_SERVER_URI;
        return craftURI;
    }, [network]);

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
        checkRequest(craftServerURI, requestKey).then((requestData) => {
            if (requestData.status === '1') {
                setActiveQR(false);
                onSuccess(requestData);
            } else if (requestData.status === '-2') {
                setActiveQR(false);
                onFailed(requestData);
            }
        });
    };

    console.log(isTxModal);

    return (
        <QRContainer>
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
            {/* {qrcode !== '' && ( */}
            {/* <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    minWidth: !isTxModal ? '70px' : '70px',
                    height: '40px',
                    padding: '12px 22px !important',
                    borderRadius: '32px',
                    background: !isTxModal ? 'var(--Green-500, #02E191)' : 'var(--Gray-500, #383838)',
                    userSelect: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => qrcode !== '' && refreshRequestQR()}
            > */}
            <TimerWrap $isTxModal={isTxModal} onClick={() => qrcode !== '' && refreshRequestQR()}>
                {qrcode !== '' && (
                    <>
                        {!isTxModal ? (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    {timerText.split('').map((typo, idx) => (
                                        <TimerTypo style={{ width: '10px', textAlign: 'center' }} key={idx}>
                                            {typo}
                                        </TimerTypo>
                                    ))}
                                </div>
                                <img src={IC_RESET} alt="reset" style={{ width: '16px', height: '16px' }} />
                            </>
                        ) : (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    {timerText.split('').map((typo, idx) => (
                                        <TxTimerTypo style={{ width: '10px', textAlign: 'center' }} key={idx}>
                                            {typo}
                                        </TxTimerTypo>
                                    ))}
                                </div>
                                <img src={IC_RESET_WHITE} alt="reset" style={{ width: '12px', height: '12px' }} />
                            </>
                        )
                    }
                    </>
                )}
            </TimerWrap>
            {/* )} */}
        </QRContainer>
    );
};

export default React.memo(RequestQR);
