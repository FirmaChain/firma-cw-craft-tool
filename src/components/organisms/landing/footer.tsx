import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    min-height: 40px;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 12px 80px;

    gap: 12px;

    @media (max-width: 1000px) {
        padding: 12px 20px;
    }

    @media (max-width: 375px) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 8px;
    }
`;

const FooterTypo = styled.div`
    color: #aeaeae;
    font-family: 'General Sans Variable';
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px; /* 116.667% */
    user-select: none;
`;

const MailTo = styled.a`
    &:hover {
        filter: brightness(0.85);
    }

    &:active {
        filter: brightness(0.7);
    }
`;

const DesktopFooter = () => {
    return (
        <Container>
            <FooterTypo>Copyrightⓒ FirmaChain Pte. Ltd.</FooterTypo>
            <MailTo href="mailto:contact@firmachain.org">
                <FooterTypo>contact@firmachain.org</FooterTypo>
            </MailTo>
        </Container>
    );
};

export default DesktopFooter;
