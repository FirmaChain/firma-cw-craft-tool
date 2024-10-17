import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 28px 40px;
    flex-direction: row;
    align-items: center;
    gap: 32px;

    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    background: var(--200, #1e1e1e);
`;

export const Logo = styled.div`
    min-width: 72px;
    min-height: 72px;
    display: flex;

    .img-placeholder {
        min-width: 72px;
        min-height: 72px;
        border-radius: 50%;
        border: 1px solid var(--Gray-500, #383838);
        background: var(--Gray-350, #262626);
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const TokenNameBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .token-name-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
    }

    .token-symbol {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Heading/H4 - Bd */
        font-family: 'General Sans Variable';
        font-size: 22px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px; /* 109.091% */
    }

    .verified-icon {
        width: 24px;
        height: 24px;
    }

    .owner-tag {
        display: flex;
        height: 24px;
        padding: 1px 12px;

        justify-content: center;
        align-items: center;

        border-radius: 24px;
        border: 1px solid var(--Gray-550, #444);

        margin-left: 10px;

        .owner-box-text {
            color: var(--Gray-750, #999);
            text-align: center;

            /* Body/Body2 - Md */
            font-family: 'General Sans Variable';
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
        }
    }

    .divider {
        height: 12px;
        width: 1px;
        background: var(--Gray-400, #2c2c2c);

        margin: 0 16px;
    }

    .token-name {
        color: var(--Gray-650, #707070);

        /* Body/Body1 - Rg */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */

        margin-right: 16px;
    }
`;

export const LabelWrap = styled.div`
    display: flex;
    padding: 2px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: var(--Gray-150, #141414);

    margin-right: 16px;
`;

export const LabelBasicTypo = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
`;

export const LabelAdvancedTypo = styled.div`
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    background: linear-gradient(90deg, #00bf7a 0%, #0e9ab0 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const TotalSupplyBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;

    .title {
        color: #02e191;

        /* Body/Body2 - Rg */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
        opacity: 0.6;

        white-space: pre;
    }

    .amount {
        color: var(--Green-500, #02e191);

        /* Body/Body1 - Bd */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }

    .bold {
        font-weight: 600;
    }
`;

export const TotalSupplyTitle = styled.div`
    color: #02e191;

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    opacity: 0.6;

    white-space: pre;
`;

export const TotalSupplyAmount = styled.div`
    color: var(--Green-500, #02e191);

    /* Body/Body1 - Bd */
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */

    font-weight: 600;
`;
