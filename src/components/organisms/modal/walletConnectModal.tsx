import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import { WalletActions } from '@/redux/actions';
import {
    CloseIcon,
    MobileAppLinkBox,
    PrevButton,
    SignDesc,
    SignTitle,
    StationInfoButton,
    StationTypo,
    StepDesc,
    StepIcon,
    WalletConnectContentBox,
    WalletConnectDescBox,
    WalletConnectStepWrap,
    WalletConnectStepsDivider,
    WalletConnectTitleBox,
    WalletConnectWarp
} from './style';
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
import Connect from './connect/connect';

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

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
        <WalletConnectWarp>
            <CloseIcon src={IC_CLOSE} alt="close" onClick={onCloseModal} />

            {showStationInfo && (
                <PrevButton onClick={() => setShowStationInfo(false)}>
                    <Icons.LeftArrow width="24px" height="24px" />
                </PrevButton>
            )}
            {!USE_WALLET_CONNECT ? (
                <Connect closeModal={onCloseModal} />
            ) : (
                <>
                    <WalletConnectContentBox $isStationInfo={showStationInfo}>
                        <WalletConnectTitleBox>
                            <SignTitle>{showStationInfo ? 'What is Firma Station?' : 'Connect to Mobile'}</SignTitle>
                            <SignDesc>
                                {showStationInfo
                                    ? `Firma Station is a comprehensive blockchain platform\ndeveloped by FIRMACHAIN.`
                                    : 'Securely connect your wallet with the firmastation app.'}
                            </SignDesc>
                        </WalletConnectTitleBox>

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
                    </WalletConnectContentBox>
                    <WalletConnectDescBox $isStationInfo={showStationInfo}>
                        {showStationInfo ? (
                            <MobileAppLinkBox>
                                <div className="icons-row">
                                    <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => onClickOpenLink({ type: 'ios' })}>
                                        <img src={IMG_IOS_STORE} alt="apple-store-link" style={{ width: '216px', height: '64px' }} />
                                    </IconButton>
                                    <IconButton
                                        style={{ display: 'flex', padding: 0 }}
                                        onClick={() => onClickOpenLink({ type: 'android' })}
                                    >
                                        <img src={IMG_ANDROID_STORE} alt="play-store-link" style={{ width: '216px', height: '64px' }} />
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
                                <WalletConnectStepsDivider>
                                    <img
                                        src={IC_ROUND_ARROW_UP}
                                        alt="arrow"
                                        style={{ width: '16px', aspectRatio: '1/1', transform: 'rotate(90deg)' }}
                                    />
                                </WalletConnectStepsDivider>
                                <WalletConnectStepWrap>
                                    <div className="step">
                                        <StepIcon>
                                            <img src={IC_FIRMA_LOGO} alt="firma-logo" />
                                        </StepIcon>
                                        <StepDesc>{`1. Station app\nopen`}</StepDesc>
                                    </div>

                                    <div className="step">
                                        <StepIcon>
                                            <img src={IC_SCAN} alt="firma-logo" />
                                        </StepIcon>
                                        <StepDesc>{`2. Log in after\nscanning the QR`}</StepDesc>
                                    </div>
                                </WalletConnectStepWrap>
                            </>
                        )}
                    </WalletConnectDescBox>
                    {!showStationInfo && (
                        <>
                            <div style={{ width: '100%', padding: '0 32px' }}>
                                <Divider $direction={'horizontal'} $variant="dash" $color="#444" />
                            </div>
                            <StationInfoButton onClick={() => setShowStationInfo(true)} className="pointer">
                                <StationTypo>
                                    What is <span className="highlight">‘FIRMA STATION’</span> wallet ?
                                </StationTypo>
                            </StationInfoButton>
                        </>
                    )}
                </>
            )}
        </WalletConnectWarp>
    );
};

export default React.memo(WalletConnectModal);
