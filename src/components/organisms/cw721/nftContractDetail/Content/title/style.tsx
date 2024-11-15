import IconButton from '@/components/atoms/buttons/iconButton';
import { styled } from 'styled-components';

export const TitleContainer = styled.div`
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
    gap: 0;
`;

export const TokenInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
`;

export const SymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export const NameTypo = styled.div`
    color: var(--Gray-650, #707070);

    font-family: 'General Sans Variable';
    font-size: 16px;

    font-weight: 400;
    line-height: 22px; /* 137.5% */

    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    color: var(--Green-500, #02e191);

    /* Body/Body1 - Rg */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    .bold {
        font-weight: 600;
    }
`;

export const GoToExecuteButton = styled(IconButton)<{ disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px 24px;
    border-radius: 8px;
    border: 1px solid var(--Green-500, #02e191);
    background: var(--Gray-350, #262626);

    filter: unset !important;

    &:hover {
        background: #02e191;
        border-color: #02e191;
        > * {
            color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838) !important' : '#121212 !important')};
        }
    }

    ${({ disabled }) =>
        disabled &&
        `
    
    border-color: var(--Gray-450, #313131) !important;
    background: var(--200, #1E1E1E) !important;
    > * {
        color: var(--Gray-500, #383838) !important;
    }
    `}
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
