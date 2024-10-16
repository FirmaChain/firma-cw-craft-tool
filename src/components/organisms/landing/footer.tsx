import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    min-height: 4rem;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 4.6rem;

    gap: 1.2rem;

    @media (max-width: 1200px) {
        padding: 1.2rem 2rem;
    }

    @media (max-width: 37.5rem) {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 0.8rem;
    }
`;

const FooterTypo = styled.div`
    color: var(--Gray-600, #5a5a5a);
    font-family: 'General Sans Variable';
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4rem; /* 116.667% */
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
            <MailTo href="mailto:info@firmachain.org">
                <FooterTypo>info@firmachain.org</FooterTypo>
            </MailTo>
        </Container>
    );
};

export default DesktopFooter;
