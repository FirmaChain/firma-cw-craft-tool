import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { FirmaUtil } from '@firmachain/firma-js';

import { WalletActions } from '@/redux/actions';
import { DownloadQRButton, MobileAppLinkBox, ModalBase, SignDesc, SignTitle, StationTypo, StepDesc, StepIcon } from './style';
import RequestQR from '../requestQR';
import { IC_CLOSE, IC_FIRMA_LOGO, IC_ROUND_ARROW_UP, IC_SCAN, IMG_ANDROID_STORE, IMG_IOS_STORE } from '@/components/atoms/icons/pngIcons';
import { useModalStore } from '@/hooks/useModal';
import Divider from '@/components/atoms/divider';
import Icons from '@/components/atoms/icons';
import IconButton from '@/components/atoms/buttons/iconButton';
import StationQR from '@/components/atoms/connectQR/stationQR';
import { CRAFT_CONFIGS } from '@/config';
import { openLink } from '@/utils/common';
import { isValidAddress } from '@/utils/address';

const WalletConnectModal = ({ id }: { id: string }) => {
    const [showStationInfo, setShowStationInfo] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const closeModal = useModalStore((state) => state.closeModal);

    const onCloseModal = () => {
        closeModal(id);
    };

    const LINK = CRAFT_CONFIGS.STATION_DOWNLOAD_URL;

    const onClickOpenLink = ({ type }: { type: 'android' | 'ios' }) => {
        if (type === 'android') openLink(LINK.ANDROID);
        if (type === 'ios') openLink(LINK.IOS);
    };

    return (
        <ModalBase style={{ width: '544px', padding: '0', userSelect: 'none', gap: 0, overflow: 'hidden' }}>
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 24, top: 24, cursor: 'pointer' }}
            />

            {showStationInfo && (
                <IconButton style={{ display: 'flex', position: 'absolute', left: 24, top: 24 }} onClick={() => setShowStationInfo(false)}>
                    <Icons.LeftArrow width="24px" height="24px" />
                </IconButton>
            )}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: showStationInfo ? '56px 75px 48px' : '56px 75px 32px'
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
                    <SignTitle>{showStationInfo ? 'What is Firma Station?' : 'Connect to Mobile'}</SignTitle>
                    <SignDesc>
                        {showStationInfo
                            ? `Firma Station is a comprehensive blockchain platform\ndeveloped by FIRMACHAIN.`
                            : 'Securely connect your wallet with the firmastation app.'}
                    </SignDesc>
                </div>

                {showStationInfo ? (
                    <StationQR />
                ) : (
                    <RequestQR
                        qrSize={144}
                        module="/login"
                        onSuccess={(requestData: any) => {
                            if (isValidAddress(requestData.signer)) {
                                WalletActions.handleInit(true);
                                WalletActions.handleAddress(requestData.signer);
                                onCloseModal();
                            } else {
                                enqueueSnackbar('Successfully connected to wallet.', {
                                    variant: 'success',
                                    autoHideDuration: 2000
                                });
                            }
                        }}
                        onFailed={() => {
                            onCloseModal();
                            enqueueSnackbar('failed connect to wallet.', {
                                variant: 'error',
                                autoHideDuration: 2000
                            });
                        }}
                    />
                )}
            </div>
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    minHeight: '168px',
                    padding: showStationInfo ? '0' : '32px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '20px',
                    background: 'var(--Gray-200, #1A1A1A)'
                }}
            >
                {showStationInfo ? (
                    <MobileAppLinkBox>
                        <div className="icons-row">
                            <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => onClickOpenLink({ type: 'ios' })}>
                                <img src={IMG_IOS_STORE} alt="apple-store-link" style={{ width: '216px' }} />
                            </IconButton>
                            <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => onClickOpenLink({ type: 'android' })}>
                                <img src={IMG_ANDROID_STORE} alt="play-store-link" style={{ width: '216px' }} />
                            </IconButton>
                        </div>
                        <div className="help-text">
                            <span>Need help?</span>
                            <a className="highlight" href={'mailto:info@firmachain.org'}>
                                ‘Contact Us’
                            </a>
                        </div>
                    </MobileAppLinkBox>
                ) : (
                    <>
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
                                gap: '40px',
                                height: '64px'
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
                                <StepDesc>{`1. Station app\nopen`}</StepDesc>
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
                                <StepDesc>{`2. Log in after\nscanning the QR`}</StepDesc>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {!showStationInfo && (
                <>
                    <div style={{ width: '100%', padding: '0 32px' }}>
                        <Divider $direction={'horizontal'} $variant="dash" $color="#444" />
                    </div>
                    <div
                        onClick={() => setShowStationInfo(true)}
                        className="pointer"
                        style={{
                            width: '100%',
                            height: '86px',
                            background: 'var(--Gray-200, #1A1A1A)',
                            paddingBottom: '40px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}
                    >
                        <StationTypo>
                            What is <span className="highlight">‘FIRMA STATION’</span> wallet ?
                        </StationTypo>
                    </div>
                </>
            )}
        </ModalBase>
    );
};

export default React.memo(WalletConnectModal);
