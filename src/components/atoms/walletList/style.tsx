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

export const AddWalletWrapper = styled(IconButton)<{ disabled?: boolean }>`
    width: 100%;
    padding: 8px 0px;
    display: flex;
    border-radius: 8px;
    border: 1px solid;
    border-color: ${({ disabled }) => (disabled ? 'var(--Gray-450, #313131)' : 'var(--Gray-600, #707070)')};
    align-items: center;
    justify-content: center;
    gap: 6px;

    div {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-700, #999)')};
    }
`;

export const AddWalletCountWrapper = styled.div`
    display: flex;
`;

export const AddWalletTypo = styled.div<{ $disabled?: boolean }>`
    color: var(--Gray-700, #999);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
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
        font-weight: 400;
        line-height: 14px; /* 116.667% */
        color: ${({ disabled }) => (disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-700, #999)')};
    }
`;
