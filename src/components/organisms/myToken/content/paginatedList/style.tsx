import { Button } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ItemWrapper = styled(Button)`
    width: calc(100% - 64px);
    height: 72px;
    padding: 12px 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;
    align-items: center !important;
    background: #222 !important;
    border-radius: 24px !important;
`;

export const ItemLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    align-items: center;
`;

export const TokenLogoImage = styled.div`
    width: 48px;
    height: 48px;
    background-color: #262626;
    border-radius: 153.409px;
    border: 1px solid #383838;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const IconBackground = styled.div`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

export const TokenInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TokenSymbolWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const TokenInfoSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const EmptyVerify = styled.div`
    width: 24px;
`;

export const TokenInfoNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const ItemRight = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const SupplyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
`;

export const TotalSupplyTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const SupplySymbolTyop = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;
