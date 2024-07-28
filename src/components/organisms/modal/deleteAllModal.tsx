import styled from 'styled-components';
import { ModalBase } from './style';
import Icons from '@/components/atoms/icons';
import IconButton from '@/components/atoms/buttons/iconButton';
import { useModalStore } from '@/hooks/useModal';

const CloseBtnBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const CloseButton = styled.div`
    cursor: pointer;
`

const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    margin-bottom: 36px;
`;

const Title = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));

    /* Heading/H4 - Bd */
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 109.091% */
`;

const Description = styled.div`
    color: var(--Gray-650, #707070);

    /* Body/Body2 - Rg */
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */

    white-space: break-spaces;
    text-align: center;
`;

const BtnBox = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
`;

const CancelBtn = styled(IconButton)`
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: var(--Gray-450, #313131);

    .typo {
        color: var(--Gray-750, #999);

        /* Body/Body2 - Md */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px; /* 142.857% */
    }
`;

const ConfirmBtn = styled(IconButton)`
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;

    border-radius: 6px;
    background: var(--Green-500, #02e191);

    .typo {
        color: var(--Gray-200, #1a1a1a);

        /* Body/Body2 - Bd */
        font-family: 'General Sans Variable';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 20px; /* 142.857% */
    }
`;

const DeleteAllModal = ({ id, onConfirm }: { id: string; onConfirm: () => void }) => {
    const modal = useModalStore();

    const onClickCancel = () => modal.closeModal(id);

    const onClickConfirm = () => {
        onConfirm();
        modal.closeModal(id);
    };

    return (
        <ModalBase style={{ padding: '24px 28px 36px', width: '384px', gap: 0 }}>
            <CloseBtnBox>
                <CloseButton onClick={onClickCancel}>
                    <Icons.Close width="24px" height="24px" />
                </CloseButton>
            </CloseBtnBox>
            <TitleBox>
                <Title>Delete All?</Title>
                <Description>{`Are you sure you want to delete all?\nThis action cannot be undone.`}</Description>
            </TitleBox>
            <BtnBox>
                <CancelBtn onClick={onClickCancel}>
                    <span className="typo">Cancel</span>
                </CancelBtn>
                <ConfirmBtn onClick={onClickConfirm}>
                    <span className="typo">Delete All</span>
                </ConfirmBtn>
            </BtnBox>
        </ModalBase>
    );
};

export default DeleteAllModal;
