import styled from 'styled-components';

export const ModalTitleWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
`;

export const ModalTitleTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; 
`;

export const ModalTitleDescTypo = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    white-space: pre-line;
`;

export const QrCodeWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ModalContentBlackCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 24px;
    border-radius: 8px;
    background: var(--Gray-200, #141414);
`;

export const ItemWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const ItemValueWrap = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
`;

export const ItemAmountValue = styled.div`
    color: #02E191;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;

export const ItemAmountSymbol = styled.div`
    color: var(--Gray-600, #5A5A5A);
    font-family: "General Sans Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
`;

export const ItemLabel = styled.div`
    color: var(--Gray-700, #807E7E);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

export const ItemValue = styled.div`
    color: var(--Gray-700, #807E7E);
    font-family: "General Sans Variable";
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
    background: var(--Gray-200, #1A1A1A);
`;

export const FeeLabel = styled.div`
    color: var(--Gray-650, #707070);
    font-family: "General Sans Variable";
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
`;

export const FeeAmount = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const FCTSymbolIcon = styled.img`
    width: 16px;
    height: 16px;
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
    font-family: "General Sans Variable";
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
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    text-align: center;
    font-family: "General Sans Variable";
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
    gap: 16px;
`;

export const ModalButtonWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ModalCancelButton = styled.div`
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
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ResultsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
`;

export const ResultsSuccessIcon = styled.img`
    width: 56px;
    height: 56px;
`;

export const ResultsTitleWrap = styled.div`
    display: flex;
    gap: 8px;
`;

export const ResultsTitleExecuteTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

export const ResultsTitleSuccessTypo = styled.div`
    color: var(--Status-Success, var(--Primary-Base-White, #57D962));
    font-family: "General Sans Variable";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const ResultsTitleMessage = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

export const ResultsContentWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const ResultsContentSummeryWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px 16px 24px 24px;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px dashed var(--Gray-400, #2C2C2C);
    background: var(--Gray-150, #141414);
`;

export const ResultsItemWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ResultsItemLabel = styled.div`
    color: var(--Gray-700, #807E7E);
    font-family: "General Sans Variable";
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
    color: #E6E6E6;
    font-family: "General Sans Variable";
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const ResultsItemSymbol = styled.div`
    color: var(--Gray-600, #5A5A5A);
    font-family: "General Sans Variable";
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 116.667% */
`;

export const ResultsContentHashWrap = styled.div`
    padding: 20px 16px 24px 24px;
    border-radius: 0px 0px 8px 8px;
    background: var(--Gray-150, #141414);
`;

export const ItemHashValue = styled.div`
    color: var(--Green-700, #02A288);
    text-align: center;
    font-family: "General Sans Variable";
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

export const ResultsConfirmButton = styled.div`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;border-radius: 6px;
    background: var(--Gray-450, #313131);
    cursor: pointer;
`;

export const ResultsConfirmButtonTypo = styled.div`
    color: var(--Gray-750, #999);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;

export const ResultsGoToMyMintetedTokenButton = styled.div`
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 6px;
    background: var(--Green-500, #02E191);
    cursor: pointer;
`;

export const ResultsGoToMyMintetedTokenButtonTypo = styled.div`
    color: var(--Gray-200, #1A1A1A);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */
`;