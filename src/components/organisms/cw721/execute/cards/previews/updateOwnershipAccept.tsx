import { styled } from "styled-components";
import { Container } from "../functions/styles";
import { IC_CHECK_SQUARE, IC_ROUND_ARROW_DOWN, IC_ROUND_ARROW_UP, IC_WALLET } from "@/components/atoms/icons/pngIcons";
import { useState } from "react";

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    gap: 20px;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ContentTitleWrap = styled.div`
    display: flex;
    gap: 17px;
    align-items: center;
`;

const TitleIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const TitleTypo = styled.div`
    color: #02E191;
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const FoldingButton = styled.div`
    cursor: pointer;
`;

const FoldingIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ContentBodyWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 32px;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const ContentItemWrap = styled.div`
    display: flex;
    gap: 16px;
`;

const ContentItemIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ContentItemValue = styled.div<{ $hasData: boolean }>`
    /* color: var(--Gray-500, #383838); */
    color: ${({ $hasData: hasData }) => (hasData ? '#707070' : '#383838')};
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;


const UpdateOwnershipAccept = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onClickFolding = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <ContentWrap>
                <ContentHeader>
                    <ContentTitleWrap>
                        <TitleIcon src={IC_CHECK_SQUARE} alt={'Update Ownership Accept Header Icon'}/>
                        <TitleTypo>Update Ownership Info</TitleTypo>
                    </ContentTitleWrap>
                    <FoldingButton onClick={onClickFolding}>
                        <FoldingIcon src={isOpen ? IC_ROUND_ARROW_DOWN : IC_ROUND_ARROW_UP} alt={'Update Ownership Accept Folding Icon'}/>
                    </FoldingButton>
                </ContentHeader>
                <ContentBodyWrap>
                    <ContentItemWrap>
                        <ContentItemIcon src={IC_WALLET} />
                        {/* <ContentItemValue>{}</ContentItemValue> */}
                    </ContentItemWrap>
                    <ContentItemWrap>
                        <ContentItemIcon src={IC_WALLET} />
                        {/* <ContentItemValue>{}</ContentItemValue> */}
                    </ContentItemWrap>
                </ContentBodyWrap>
            </ContentWrap>
        </Container>
    )
};

export default UpdateOwnershipAccept;