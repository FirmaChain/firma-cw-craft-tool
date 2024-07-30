import React, { useEffect, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { PuffLoader } from 'react-spinners';

import styled, { keyframes, css } from 'styled-components';
import { IC_FIRMACHAIN_QRCODE } from '../icons/pngIcons';

export const scaleAnim = keyframes`
  0% {
    opacity:0;
  }
  100% {
    opacity:1;
  }
`;

export const QRWrapper = styled.div<{ $isLoading: boolean }>`
    padding: 6px;
    ${(props) => (props.$isLoading ? '' : 'background-color: white;')}
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: none;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
    ${(props) =>
        props.$isLoading === false &&
        css`
            animation-name: ${scaleAnim};
        `}
`;

interface IProps {
    qrSize: number;
    qrcode: string;
    expireDate: Date | null;
    isActive: boolean;
    setTimerText: (timerText: string) => void;
    onExpired: () => void;
    onTick: () => void;
}

const ConnectQR = ({ qrSize, qrcode, expireDate, isActive, setTimerText, onExpired, onTick }: IProps) => {
    const tick = () => {
        onTick();
    };

    const expired = () => {
        onExpired();
    };

    useInterval(
        () => {
            if (expireDate === null) return;
            if (isActive === false) return;

            tick();

            const now = new Date();
            const diff = expireDate.getTime() - now.getTime();

            if (diff < 0) {
                expired();
                return;
            }

            let diffMin = Math.floor((diff / (1000 * 60)) % 60);
            let diffSec = Math.floor((diff / 1000) % 60);

            diffMin = diffMin === -1 ? 0 : diffMin;
            diffSec = diffSec === -1 ? 0 : diffSec;

            setTimerText(`${('00' + diffMin).slice(-2)}:${('00' + diffSec).slice(-2)}`);
        },
        isActive ? 500 : null
    );

    return (
        <QRWrapper $isLoading={qrcode === ''}>
            {qrcode === '' ? (
                <div style={{ width: qrSize, height: qrSize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PuffLoader loading={true} color={'#FFFFFF'} />
                </div>
            ) : (
                <div style={{ background: '#FFF', display: 'flex', justifyContent: 'center', borderRadius: '12px' }}>
                    <QRCode
                        value={`${qrcode}`}
                        size={qrSize}
                        quietZone={0}
                        logoImage={IC_FIRMACHAIN_QRCODE}
                        logoWidth={40}
                        logoHeight={40}
                    />
                </div>
            )}
        </QRWrapper>
    );
};

const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef<() => void>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) savedCallback.current();
        };

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

export default React.memo(ConnectQR);
