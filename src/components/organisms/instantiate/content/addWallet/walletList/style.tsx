import IconButton from '@/components/atoms/buttons/iconButton';
import { styled } from 'styled-components';

export const WalletListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
`;

export const WalletListSummery = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const DeleteAllButton = styled.button<{ length: number }>`
    display: flex;
    padding: 6px 12px;
    align-items: flex-start;
    gap: 8px;
    border-radius: 6px;
    border: 1px solid var(--Gray-600, #707070);
    background: var(--200, #1e1e1e);
    color: var(--Gray-700, #999);
    text-align: right;
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
    cursor: pointer;
`;

export const TotalWalletWrapper = styled.div`
    display: flex;
    gap: 8px;
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

export const AddWalletWrapper = styled(IconButton)`
    width: 100%;
    padding: 8px 0px;
    display: flex;
    border-radius: 8px;
    border: 1px solid var(--Gray-600, #707070);
    align-items: center;
    justify-content: center;
    gap: 6px;
`;

export const AddWalletCountWrapper = styled.div`
    display: flex;
`;

export const AddWalletTypo = styled.div`
    color: var(--Gray-700, #999);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
`;
