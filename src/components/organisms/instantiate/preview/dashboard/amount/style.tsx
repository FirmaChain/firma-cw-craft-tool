import styled from 'styled-components';

export const AmountWrapper = styled.div<{ $isMinterble: boolean }>`
    width: 100%;
    box-sizing: border-box;
    // width: 552px;
    padding: 32px 44px;
    padding-right: 33px;
    display: flex;
    flex-direction: column;
    // border-radius: 0px 0px 24px 24px;
    border-top: 1px solid var(--Gray-550, #444);
    overflow: hidden;
`;

export const MinterCapWrapper = styled.div`
    display: flex;
    flex-direction: column;
    // gap: 20px;
`;

export const MinterCapHeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
`;

export const HeaderLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const HeaderMinterCapText = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    white-space: pre;
`;

export const HeaderRightWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
`;

export const HeaderMinterCapAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Primary-Base-White, #fff)')};
    // var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const HeaderMinterCapTokenSymbol = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const DetailWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    padding: 24px 32px;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
    gap: 16px;
    height: fit-content;
    overflow: hidden;
    transition: all 0.2s ease;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        opacity: 1 !important;
        padding: 24px 32px !important;
        max-height: 100% !important;

        > div {
            max-height: 100% !important; 
        }
    `
            : `
        opacity: 0 !important;
        padding: 0px 32px !important;
        max-height: 0px !important;

        > div {
            max-height: 0px !important; 
        }
    `}
`;

export const DetailLeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    // height: fit-content;
    // overflow: hidden;
    // transition: all 0.15s ease;
`;

export const DetailAddressText = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    white-space: pre;
`;

export const DetailMinterCapAmount = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-700, #807E7E)')};
    // var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const MinterCapAccordianBox = styled.div<{ $open?: boolean }>`
    padding: 0;
    gap: 0;
    max-height: ${({ $open }) => ($open ? '161px' : 0)};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    transition: all 0.2s;
    transition-delay: 0.2s;
`;

export const MinterCapInfoBox = styled.div<{ $open?: boolean }>`
    width: 100%;
    height: fit-content;
    max-height: ${({ $open }) => ($open ? '88px' : '0px')};
    transition: all 0.2s ease;
    padding: 0;
    overflow: hidden;
`;

export const DividerBox = styled.div`
    padding: 0;
    width: 100%;
    height: 1px;
    margin: 24px 0px;
`;
