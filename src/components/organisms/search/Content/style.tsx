import IconButton from '@/components/atoms/buttons/iconButton';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 36px 96px 115px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ContractWarp = styled.div`
    display: flex;
    width: 100%;
    max-width: 1600px;
    padding: 40px 48px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    border-radius: 24px;
    border: 1px solid var(--Green-500, #02e191);
    background: var(--Gray-350, #262626);
`;

export const NoticeText = styled.div`
    font-size: 18px;
    color: #999999;
    font-weight: 500;
`;

export const CardContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;

    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

export const SectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 28px;

    .section-title-search {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;

        @media (max-width: 1300px) {
            flex-direction: column;
            gap: 20px;

            > div {
                max-width: unset;
            }
        }
    }

    .section-title-subtitle {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }

    .section-title {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Heading/H5 - Bd */
        font-family: 'General Sans Variable';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px; /* 122.222% */
    }

    .section-title-desc {
        color: var(--Gray-650, #707070);

        /* Body/Body2 - Rg */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 142.857% */
    }

    .information-box {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .box-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 32px;
    }

    .box-value {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: center;
        gap: 8px;
    }

    .box-title {
        min-width: 224px;
        max-width: 224px;
        color: var(--Gray-750, #999);

        /* Body/Body1 - Rg */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }

    .white-typo {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Body/Body1 - Md */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 137.5% */

        word-break: break-all;
    }

    .disabled-typo {
        color: var(--Gray-500, #383838);
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
    }

    .label {
        display: flex;
        padding: 3px 12px;

        border-radius: 100px;
        border: 1px solid var(--Gray-500, #383838);
        background: var(--Gray-400, #2c2c2c);

        .label-typo {
            color: var(--Gray-750, #999);

            /* Body/Body2 - Md */
            font-family: 'General Sans Variable';
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 20px; /* 142.857% */
        }
    }

    .gray-typo {
        color: var(--Gray-650, #707070);

        /* Body/Body1 - Rg */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }

    .table-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        align-self: stretch;
    }

    .table-title {
        color: var(--Gray-750, #999);

        /* Body/Body1 - Rg */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }

    .single-line-clamp {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`;

export const CardTitle = styled.div`
    color: var(--Green-500, #02e191);

    /* Heading/H5 - Bd */
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 122.222% */
`;

export const WalletBalance = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;

    .balance-amount {
        color: var(--Gray-900, var(--Primary-Base-White, #fff));

        /* Body/Body1 - Md */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 137.5% */
    }

    .balance-symbol {
        color: var(--Gray-650, #707070);

        /* Body/Body1 - Rg */
        font-family: 'General Sans Variable';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
    }
`;

export const LogoBackground = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

export const SearchButton = styled(IconButton)`
    //? outside
    width: 168px;
    height: 40px;
    border-radius: 8px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    //? inside
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 40px;
    flex-shrink: 0;
    background: ${({ disabled }) => (disabled ? 'var(--Gray-600, #707070)' : 'var(--Green-500, #02e191)')};

    //? button text
    .button-text {
        color: ${({ disabled }) => (disabled ? 'var(--Gray-550, #444)' : 'var(--Gray-100, #121212)')};
        text-align: center;
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px;
    }
`;

export const TokenDescriptionClampTypo = styled.span`
    color: var(--Gray-750, #dcdcdc);

    /* Body/Body2 - Semibd */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
`;
