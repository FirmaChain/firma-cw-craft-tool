import { IC_CLOSE } from "@/components/atoms/icons/pngIcons";
import { ModalBase } from "./style";
import { useModalStore } from "@/hooks/useModal";
import { styled } from "styled-components";
import CustomDatePicker from "@/components/atoms/datePicker/datePicker";

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
    align-items: center;
`;

const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const HeaderDesc = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: "General Sans Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    white-space: pre-line;
`;

const ContentCard = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px 24px;
    border-radius: 8px;
    background: var(--Gray-200, #1A1A1A);
`;

const ContentTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
`;


const ExpirationModal = ({
    id,
    setExpirationDate,
}: {
    id: string;
    setExpirationDate: (timestamp: string) => void;
}) => {
    const closeModal = useModalStore().closeModal;

    const onCloseModal = () => {
        closeModal(id);
    };

    return (
        <ModalBase
            style={{
                width: '480px',
                padding: '24px 24px',
                marginBottom: '250px'
            }}
        >
            <img
                src={IC_CLOSE}
                alt="close"
                onClick={onCloseModal}
                style={{ width: '24px', height: '24px', position: 'absolute', right: 12, top: 12, cursor: 'pointer' }}
            />
            <HeaderWrap>
                <HeaderTitle>Set the Expiration date and time</HeaderTitle>
                <HeaderDesc>{`Please select the expiration date and time\nfor the decreasing allowance`}</HeaderDesc>
            </HeaderWrap>
            <ContentCard>
                <ContentTypo>Expiration date</ContentTypo>
                <CustomDatePicker />
            </ContentCard>
        </ModalBase>
    )
};

export default ExpirationModal;