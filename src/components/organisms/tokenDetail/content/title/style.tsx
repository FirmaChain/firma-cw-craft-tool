import IconButton from '@/components/atoms/buttons/iconButton';
import { Button } from '@mui/material';
import { styled } from 'styled-components';

export const TitleContainer = styled.div`
    width: calc(100% - 80px);
    display: flex;
    padding: 28px 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    background: var(--200, #1e1e1e);
    gap: 32px;
`;

export const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 32px;
    align-items: center;
`;

export const TitleLogoImage = styled.div`
    min-width: 72px;
    height: 72px;
    background-color: #262626;
    border-radius: 153.409px;
    border: 1px solid #383838;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const IconBackground = styled.div`
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #262626);
`;

export const TokenInfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TokenInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const TokenSymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const TokenNameTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const TotalSupplyWrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

export const TotalSupplyBalanceTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TotalSupplyTypo = styled.div`
    color: #02e191;

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    filter: brightness(0.6);
`;

export const TotalSupplySymbolTypo = styled.div`
    color: var(--Green-500, #02e191);

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    .bold {
        font-weight: 600;
    }
`;

export const GoToExecuteButton = styled(IconButton)`
    // width: calc(150px - 48px);
    // height: calc(40px - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px 24px;
    border-radius: 8px;
    border: 1px solid var(--Green-500, #02e191);
    background: var(--Gray-350, #262626);

    // cursor: pointer;
    // transition: background-color 0.3s ease;
    // &:hover {
    //     cursor: pointer;
    // }
`;

export const GoToButtonTypo = styled.div`
    color: var(--Green-500, #02e191);
    text-align: center;

    /* Body/Body2 - Bd */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 142.857% */

    white-space: pre;
`;
