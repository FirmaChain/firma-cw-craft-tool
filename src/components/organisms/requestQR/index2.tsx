import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { QRContainer, TimerTypo } from './style';
import ConnectQR from '@/components/atoms/connectQR/index2';
import { CRAFT_CONFIGS } from '@/config';
import { rootState } from '@/redux/reducers';
import useAPI from '@/hooks/useAPI';
import { IC_RESET } from '@/components/atoms/icons/pngIcons';

interface IProps {
    module: string;
    onSuccess: (requestData: Object) => void;
    onFailed: (requestData: Object) => void;
    params?: Object;
    signer?: string;
}

const RequestQR = ({ module, onSuccess, onFailed, params = {}, signer = '' }: IProps) => {
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

    return (
        <QRContainer>
            <ConnectQR
                qrSize={198}
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
            {qrcode !== '' && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        height: '30px',
                        padding: '0 12px',
                        borderRadius: '32px',
                        background: 'var(--Green-500, #02E191)',
                        userSelect: 'none',
                        cursor: 'pointer'
                    }}
                    onClick={() => refreshRequestQR()}
                >
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {timerText.split('').map((typo, idx) => (
                            <TimerTypo style={{ width: '10px', textAlign: 'center' }} key={idx}>
                                {typo}
                            </TimerTypo>
                        ))}
                    </div>
                    <img src={IC_RESET} alt="reset" style={{ width: '16px', height: '16px' }} />
                </div>
            )}
        </QRContainer>
    );
};

export default React.memo(RequestQR);
