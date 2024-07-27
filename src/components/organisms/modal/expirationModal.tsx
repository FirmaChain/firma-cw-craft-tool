import { IC_CLOSE } from '@/components/atoms/icons/pngIcons';
import { ModalBase } from './style';
import { useModalStore } from '@/hooks/useModal';
import { styled } from 'styled-components';
import CustomDatePicker from '@/components/atoms/datePicker/datePicker';
import IconButton from '@/components/atoms/buttons/iconButton';
import { useState } from 'react';

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-content: center;
    align-items: center;

    padding-bottom: 28px;
`;

const HeaderTitle = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    text-align: center;
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const HeaderDesc = styled.div`
    color: var(--Gray-650, #707070);
    text-align: center;
    font-family: 'General Sans Variable';
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
    background: var(--Gray-200, #1a1a1a);

    margin-bottom: 36px;
`;

const ContentTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
`;

const CloseBtnBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    margin-bottom: 4px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direciton: row;
    gap: 12px;
`;

const CancelBtn = styled(IconButton)`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--Gray-450, #313131);

    .typo {
        color: var(--Gray-750, #999);
        text-align: center;

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
`;

const ConfirmBtn = styled(IconButton)`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background: var(--Green-500, #02e191);

    .typo {
        color: var(--Gray-200, #1a1a1a);
        text-align: center;

        /* Body/Body2 - Bd */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
    }
`;

const ExpirationModal = ({ id, setExpirationDate }: { id: string; setExpirationDate: (timestamp: string) => void }) => {
    const closeModal = useModalStore().closeModal;

    const [targetTimestamp, setTargetTimestamp] = useState<string>('');

    const onCloseModal = () => {
        closeModal(id);
    };

    const onClickOK = () => {
        setExpirationDate(targetTimestamp);
        closeModal(id);
    };

    return (
        <ModalBase
            style={{
                width: '480px',
                padding: '24px 28px 36px',
                gap: 0
            }}
        >
            <CloseBtnBox>
                <img src={IC_CLOSE} alt="close" onClick={onCloseModal} style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
            </CloseBtnBox>
            <HeaderWrap>
                <HeaderTitle>Set the Expiration date and time</HeaderTitle>
                <HeaderDesc>{`Please select the expiration date and time\nfor the decreasing allowance`}</HeaderDesc>
            </HeaderWrap>
            <ContentCard>
                <ContentTypo>Expiration date</ContentTypo>
                <CustomDatePicker setTargetTimestamp={(v) => setTargetTimestamp(v)} />
            </ContentCard>
            <ButtonWrapper>
                <CancelBtn onClick={onCloseModal}>
                    <div className="typo">Cancel</div>
                </CancelBtn>
                <ConfirmBtn onClick={onClickOK}>
                    <div className="typo">Set</div>
                </ConfirmBtn>
            </ButtonWrapper>
        </ModalBase>
    );
};

export default ExpirationModal;
