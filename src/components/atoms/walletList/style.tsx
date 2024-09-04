import { styled } from 'styled-components';
import IconButton from '../buttons/iconButton';

export const WalletListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const WalletListSummery = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TotalWalletWrapper = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

export const TotalWalletTypo = styled.div`
    color: var(--Gray-750, #dcdcdc);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
`;

export const WalletCountWrapper = styled.div`
    display: flex;
`;

export const NowWalletCountTypo = styled.div`
    color: var(--Green-500, #02e191);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const MaxWalletCountTypo = styled.div`
    color: var(--Gray-600, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const DeleteAllButton = styled.button<{ $length: number; disabled?: boolean }>`
    //? outside
    height: 26px;
    border-radius: 6px;
    border: 1px solid ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-600, #707070)')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    //? inside
    display: flex;
    padding: 6px 12px;
    align-items: center;
    justify-content: center;
    background: var(--200, #1e1e1e);
    gap: 8px;

    //? inside-text
    .button-text {
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 14px; /* 116.667% */
        color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-700, #999)')};
    }

    &:hover {
        background: ${({ disabled }) => (disabled ? 'var(--200, #1e1e1e)' : 'var(--Gray-800, #DCDCDC)')};
        .button-text {
            color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-250, var(--200, #1E1E1E))')};
        }
    }

    &:active {
        background: ${({ disabled }) => (disabled ? 'var(--200, #1e1e1e)' : 'var(--Gray-800, #DCDCDC)')};
        .button-text {
            color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-250, var(--200, #1E1E1E))')};
        }
    }
`;

export const NftListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px
`;

export const NftListHeaderWrap = styled.div`
    display: flex;
    gap: 12px;
`;

export const NftListHeaderToken = styled.div`
    width: 133px;
    height: fit-content;
`;

export const NftListHeaderTypo = styled.div`
    color: var(--Gray-800, #DCDCDC);
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;

export const NftListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;