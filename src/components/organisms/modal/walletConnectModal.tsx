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
import styled from 'styled-components';

const ConnectModalBox = styled(ModalBase)`
    width: 544px;
    padding: 0;
    user-select: none;
    gap: 0;
    overflow: hidden;

    .close-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 24px;
        top: 24px;
        cursor: pointer;
    }

    .back-button {
        display: flex;
        position: absolute;
        left: 24px;
        top: 24px;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 56px 75px 40px 75px;
    height: 410px;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const SubContentBox = styled.div`
    height: 254px;
    width: 100%;
    background: var(--Gray-200, #1a1a1a);
    display: flex;
    flex-direction: column;
`;

const ScanStepBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 32px;

    height: 168px;
    position: relative;
    width: 100%;
    padding: 40px 0 24px;
`;

const WalletConnectModal = ({ id }: { id: string }) => {
    const [showStationInfo, setShowStationInfo] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const closeModal = useModalStore((state) => state.closeModal);

    const onCloseModal = () => {
        closeModal(id);
    };

    const LINK = CRAFT_CONFIGS.COMMON.STATION_DOWNLOAD_URL;

    const onClickOpenLink = ({ type }: { type: 'android' | 'ios' }) => {
        if (type === 'android') openLink(LINK.ANDROID);
        if (type === 'ios') openLink(LINK.IOS);
    };

    return (
        <ConnectModalBox>
            <img src={IC_CLOSE} alt="close" onClick={onCloseModal} className="close-icon" />

            {showStationInfo && (
                <IconButton className="back-button" onClick={() => setShowStationInfo(false)}>
                    <Icons.LeftArrow width="24px" height="24px" />
                </IconButton>
            )}
            <ContentBox>
                <TitleBox>
                    <SignTitle>{showStationInfo ? 'What is Firma Station?' : 'Connect to Mobile'}</SignTitle>
                    <SignDesc>
                        {showStationInfo
                            ? `Firma Station is a comprehensive blockchain platform\ndeveloped by FIRMACHAIN.`
                            : 'Securely connect your wallet with the firmastation app.'}
                    </SignDesc>
                </TitleBox>

                {showStationInfo ? (
                    <StationQR />
                ) : (
                    <RequestQR
                        qrSize={144}
                        module="/login"
                        onSuccess={(requestData: any) => {
                            if (FirmaUtil.isValidAddress(requestData.signer)) {
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
            </ContentBox>
            <SubContentBox>
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
                        <ScanStepBox>
                            <div style={{ position: 'relative' }}>
                                <StepIcon>
                                    <img src={IC_FIRMA_LOGO} alt="firma-logo" />
                                </StepIcon>
                                <StepDesc
                                    style={{
                                        position: 'absolute',
                                        whiteSpace: 'pre',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        paddingTop: '12px'
                                    }}
                                >{`1. Firma Station\napp open`}</StepDesc>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', height: '56px' }}>
                                <img
                                    src={IC_ROUND_ARROW_UP}
                                    alt="arrow"
                                    style={{ width: '16px', aspectRatio: '1/1', transform: 'rotate(90deg)' }}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <StepIcon>
                                    <img src={IC_SCAN} alt="firma-logo" />
                                </StepIcon>
                                <StepDesc
                                    style={{
                                        position: 'absolute',
                                        whiteSpace: 'pre',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        paddingTop: '12px'
                                    }}
                                >{`2. Log in after\nscanning the QR`}</StepDesc>
                            </div>
                        </ScanStepBox>

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
            </SubContentBox>
        </ConnectModalBox>
    );
};

export default React.memo(WalletConnectModal);
