import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ItemWrapper = styled(IconButton)`
    width: 100%;
    height: 72px;
    padding: 12px 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #222;
    border-radius: 24px;
`;

export const ItemLeft = styled.div`
    display: flex;
    flex-direction: row;
    gap: 32px;
    align-items: center;
`;

export const TokenLogoImage = styled.div`
    min-width: 48px;
    height: 48px;
    background-color: #262626;
    border-radius: 50%;
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
    align-items: center;

    gap: 12px;
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

export const Divider = styled.div`
    width: 1px;
    height: 12px;
    background: var(--Gray-450, #313131);
`;

export const TokenInfoNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 16px;
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
    align-items: flex-end;
`;

export const TotalSupplyTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const SupplySymbolTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

export const PaginationButton = styled(IconButton)`
    display: flex;
    padding: 0;
    align-items: center;
    background: none;
    border: none;
    color: white;
`;

export const CurrentPageNumber = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    margin-left: 12px;
    margin-right: 12px;
`;
