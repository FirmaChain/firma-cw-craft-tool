import { CRAFT_CONFIGS } from '@/config';
import { QRCode } from 'react-qrcode-logo';
import { IC_FIRMACHAIN_QRCODE } from '../icons/pngIcons';
import { useRef } from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';

const DownloadQRButton = styled(IconButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 143px;
    height: 38px;
    border-radius: 32px;
    border: 1px solid var(--Gray-750, #999);

    .typo {
        color: var(--Gray-800, #dcdcdc);

        /* Body/Body1 - Bd */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 137.5% */
    }
`;

const stationUrl = CRAFT_CONFIGS?.COMMON?.STATION_DOWNLOAD_URL.WEB;

const StationQR = () => {
    const canvasRef = useRef<HTMLDivElement>();

    const handleDownload = () => {
        const canvas = canvasRef.current?.querySelector('canvas');
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'FIRMA_STATION_QRCODE.png';
        link.click();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <DownloadQRButton onClick={handleDownload}>
                <span className="typo">Download QR</span>
            </DownloadQRButton>
            <div
                style={{
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#FFFFFF'
                }}
                ref={canvasRef}
            >
                <QRCode value={stationUrl} size={144} quietZone={0} logoImage={IC_FIRMACHAIN_QRCODE} logoWidth={40} logoHeight={40} />
            </div>
        </div>
    );
};

export default StationQR;
