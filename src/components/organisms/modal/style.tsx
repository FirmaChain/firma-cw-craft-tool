import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const ModalTitleWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
    justify-content: center;
`;

export const ModalTitleHeaderWrap = styled.div`
    display: flex;
    gap: 8px;
    justify-content: center;
`;

export const ModalTitleHeaderIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export const ModalTitleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const ModalTitleDescTypo = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    white-space: pre-line;
`;

export const QrCodeWrap = styled.div`
    display: flex;
    flex-direction: column;
    // gap: 16px;
    margin-bottom: 28px;
`;

export const ModalContentWarningCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 20px;
    justify-content: center;
    border-radius: 8px;
    background: rgba(229, 82, 80, 0.18);
    gap: 2px;
`;

export const ModalContentWarningTypo = styled.div`
    color: var(--Status-Alert, var(--Primary-Base-White, #e55250));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ModalContentWarningDesc = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    white-space: pre-wrap;
    text-align: center;
`;

export const ModalContentCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
`;

export const ModalContentBlackCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 24px 16px;
    border-radius: 8px;
    background: var(--Gray-200, #141414);
`;

export const ItemWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
`;

export const ItemValueWrap = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
`;

export const ItemAmountValue = styled.div<{ $color?: string }>`
    color: ${({ $color }) => $color};
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ItemExecuteAmountValue = styled.div<{ $color?: string }>`
    color: ${({ $color }) => $color};
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ResultItemAmountTypo = styled.div`
    color: #e6e6e6;
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ItemAmountSymbol = styled.div`
    color: var(--Gray-600, #5a5a5a);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
`;

export const ItemLabel = styled.div`
    color: var(--Gray-700, #807e7e);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */

    white-space: pre;
`;

export const ItemValue = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ItemIcon = styled.img`
    width: 16px;
    height: 16px;
`;

export const ModalContentGrayCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px 24px;
    gap: 2px;
    justify-content: space-between;
    border-radius: 8px;
    background: var(--Gray-200, #1a1a1a);
`;

export const FeeLabel = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

export const FeeAmount = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const FCTSymbolIcon = styled.img`
    width: 14px;
    height: 14px;
`;

export const MyBalanceWrap = styled.div`
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
`;

export const MyBalanceValue = styled.div`
    color: var(--Gray-750, #999);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
`;

export const FCTSymbolMiniIcon = styled.img`
    width: 12px;
    height: 12px;
`;

export const ModalTitle = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ModalSubTitle = styled.div`
    width: 100%;
    color: #b4b4b4;
    text-align: center;
    font-size: 14px;
    margin-bottom: 10px;
`;

export const QRContainer = styled.div`
    width: 100%;
    height: 208px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
`;

export const ContactUsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40px;
`;

export const ContactUsLeftTypo = styled.div`
    font-size: 1.6rem;
    color: white;
    opacity: 0.5;
`;

export const ContactUsRightTypo = styled.div`
    text-align: right;
    font-size: 1.6rem;
    color: White;
    text-decoration: underline;
    cursor: pointer;
`;

export const TxConfirmWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
`;

export const TxConfirmTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-items: center;
`;

export const TxConfirmContentTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const TxCofirmTitleTypoWrapper = styled.div`
    display: flex;
    gap: 4px;
`;

export const TxConfirmModuleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmSuccessTypo = styled.div`
    color: var(--Status-Success, var(--Primary-Base-White, #57d962));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmFailedTypo = styled.div`
    color: rgb(229, 82, 80);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TxConfirmButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 24px;
`;

export const ModalBase = styled.div`
    position: relative;
    display: flex;
    padding: 48px 24px 24px 24px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    border-radius: 16px;
    background: var(--Gray-350, #262626);
    gap: 28px;
`;

export const TxResultTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    white-space: break-spaces;
    padding-bottom: 32px;
`;

export const SignTitle = styled.div`
    color: var(--Primary-Base-White, #fff);
    text-align: center;

    /* Heading/H3 - Bd */
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 100% */
`;

export const SignDesc = styled.div`
    color: var(--Gray-750, #999);

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    text-align: center;
`;

export const StepIcon = styled.div`
    width: 56px;
    aspect-ratio: 1/1;
    border-radius: 8px;
    background: var(--Gray-500, #383838);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 40px;
        aspect-ratio: 1/1;
    }
`;

export const StepDesc = styled.div`
    color: var(--Gray-850, #e6e6e6);
    text-align: center;

    /* Body/Body3 */
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */

    white-space: break-spaces;
`;

export const ModalContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const ModalButtonWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ModalCancelButton = styled(IconButton)`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-radius: 6px;
    background: var(--Gray-450, #313131);
    cursor: pointer;
`;

export const ModalCancelTypo = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ResultsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // gap: 14px;

    margin-bottom: 28px;
`;

export const ResultIcon = styled.img`
    width: 56px;
    height: 56px;

    margin-bottom: 16px;
`;

export const ResultsTitleWrap = styled.div`
    display: flex;
    gap: 8px;
`;

export const ResultsTitleExecuteTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

export const ResultsTitleSuccessTypo = styled.div`
    color: var(--Status-Success, var(--Primary-Base-White, #57d962));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const ResultsTitleFailedTypo = styled.div`
    color: var(--Status-Alert, var(--Primary-Base-White, #e55250));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const ResultsTitleMessage = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    margin-top: 14px;

    white-space: pre;
`;

export const ResultsContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    margin-bottom: 36px;

    border-radius: 8px;
    background: var(--Gray-150, #141414);
`;

export const ResultFailedTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;

    /* Body/Body2 - Md */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ResultFailedDesc = styled.div`
    color: var(--Gray-700, #807e7e);
    text-align: center;

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

export const ResultsContentSummeryWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px 24px 16px 24px;
    // border-radius: 8px 8px 0px 0px;
    // border-bottom: 1px dashed var(--Gray-400, #2c2c2c);
    // background: var(--Gray-150, #141414);
`;

export const ResultsItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ResultsItemLabel = styled.div`
    color: var(--Gray-700, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

export const ResultsItemValueWrap = styled.div`
    display: flex;
    gap: 6px;
`;

export const ResultsItemValue = styled.div`
    color: #e6e6e6;
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ResultsItemSymbol = styled.div`
    color: var(--Gray-600, #5a5a5a);
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
`;

export const ResultsContentHashWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 24px 18px;
    gap: 10px;
    // border-radius: 0px 0px 8px 8px;
    // background: var(--Gray-150, #141414);
`;

export const ItemHashValue = styled.div`
    color: var(--Green-700, #02a288);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

export const ResultsButtonWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
`;

export const ResultsConfirmButton = styled(IconButton)`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6px;
    background: var(--Gray-450, #313131);
    cursor: pointer;
`;

export const ResultsConfirmButtonTypo = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ResultsGoToMyMintetedTokenButton = styled(IconButton)`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6px;
    background: var(--Green-500, #02e191);
    cursor: pointer;
`;

export const ResultsGoToMyMintetedTokenButtonTypo = styled.div`
    color: var(--Gray-200, #1a1a1a);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

export const ExpirationTypo = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    .main-text {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Body/Body3 - Md */
        font-family: 'General Sans Variable';
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 138.462% */
    }

    .sub-text {
        color: var(--Gray-600, #5a5a5a);

        /* Body/Body4 - Md */
        font-family: 'General Sans Variable';
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px; /* 116.667% */
    }
`;

export const ItemUrlTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? '#444' : 'var(--Gray-900, var(--Primary-Base-White, #fff))')};
    text-align: right;

    /* Body/Body3 - Md */
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

export const FailedTransactionTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const FailedTransactionDescTypo = styled.div`
    color: var(--Gray-700, #807e7e);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

export const StationTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    text-align: center;

    /* Heading/H5 - Bd */
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */

    .highlight {
        color: var(--Green-500, #02e191);
        text-decoration: underline;
    }
`;

export const DownloadQRButton = styled(IconButton)`
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

export const MobileAppLinkBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 68px 46px 72px;

    align-items: center;
    gap: 32px;

    .icons-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }

    .help-text {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        color: var(--Gray-750, #999);
        text-align: center;

        /* Heading/H5 - Bd */
        font-family: 'General Sans Variable';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 122.222% */

        .highlight {
            color: #fff;
            text-decoration-line: underline;
            cursor: pointer;
        }
    }
`;

export const ModalAlertBox = styled.div`
    display: flex;
    padding: 12px 20px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    align-self: stretch;

    border-radius: 8px;
    background: rgba(255, 212, 38, 0.08);

    .typo {
        color: var(--Gray-800, #dcdcdc);
        text-align: center;

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
`;

export const ModalResultAddressTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: right;

    /* Body/Body3 - Md */
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

export const WalletConnectWarp = styled(ModalBase)`
    width: 544px;
    padding: 0;
    user-select: none;
    gap: 0;
    overflow: hidden;
`;

export const CloseIcon = styled.img`
    width: 24px;
    height: 24px;
    position: absolute;
    right: 24px;
    top: 24px;
    cursor: pointer;
`;

export const PrevButton = styled(IconButton)`
    display: flex;
    position: absolute;
    left: 24px;
    top: 24px;
`;

export const WalletConnectContentBox = styled.div<{ $isStationInfo?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${({ $isStationInfo }) => ($isStationInfo ? '56px 75px 42px' : '56px 75px 42px')};
`;

export const WalletConnectTitleBox = styled.div<{ $isStationInfo?: boolean }>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding-bottom: ${({ $isStationInfo }) => ($isStationInfo ? '24px' : '50px')};
`;

export const WalletConnectDescBox = styled.div<{ $isStationInfo?: boolean }>`
    position: relative;
    width: 100%;
    min-height: 172px;
    padding: ${({ $isStationInfo }) => ($isStationInfo ? '0' : '32px 0px')};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    background: var(--Gray-200, #1a1a1a);
`;

export const WalletConnectStepsDivider = styled.div`
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const WalletConnectStepWrap = styled.div`
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 40px;
    height: 64px;

    .step {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        width: 100px;
    }
`;

export const StationInfoButton = styled.div`
    width: 100%;
    background: var(--Gray-200, #1a1a1a);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 24px 75px 40px;
`;

export const ModalConfirmButton = styled(IconButton)`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-radius: 6px;
    background: var(--Green-500, #02e191);

    &:disabled {
        filter: unset;
        background: var(--Gray-650, #707070);

        > div {
            color: var(--Gray-550, #444);
        }
    }
`;

export const ModalConfirmTypo = styled.div`
    color: var(--Gray-100, #121212);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ModalButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
`;

export const LoadingDimBox = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #26262690;
    backdrop-filter: blur(1px);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LoadingBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
`;

export const LoadingTypo = styled.div`
    color: var(--Gray-850, #e6e6e6);
    text-align: center;

    /* Heading/H5 - Bd */
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ItemVerticalWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ItemDefaultTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

export const ItemContractAddressValue = styled.div`
    color: var(--Gray-800, #dcdcdc);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px; /* 138.462% */
`;

export const ItemInstantiateAmountValue = styled.div<{ $color?: string }>`
    color: ${({ $color }) => $color};
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
`;

export const TitleRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 20px;
`;

export const AcceptIcon = styled.img`
    width: 24px;
    height: 24px;
    min-width: 24px;
`;
