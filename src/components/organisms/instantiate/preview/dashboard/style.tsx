import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styled from 'styled-components';

export const DashboardWrapper = styled.div`
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 40px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

export const IconBackground = styled.div`
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #313131);
`;

export const TextGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const TitleText = styled.div`
    color: var(--Green-300, #63f6a5);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

export const TitleDescription = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

export const DashboardBody = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const StyledOverlayScrollbar = styled(OverlayScrollbarsComponent)`
    .os-scrollbar {
        --os-size: 16px;
        --os-padding-perpendicular: 5px;
        // --os-padding-axis: 30px;
        --os-track-border-radius: 50%;
        --os-handle-bg: var(--Gray-550, #444);
        --os-handle-bg-hover: var(--Gray-550, #444);
        --os-handle-bg-active: var(--Gray-550, #444);
    }

    .os-scrollbar-vertical {
        padding: 20px 5px;
    }
`;
