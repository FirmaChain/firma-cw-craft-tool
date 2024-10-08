import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    max-width: 1600px;
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

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
`;

export const ContractCardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

export const ContractCardBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
    gap: 32px;
`;
