import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { rootState } from '@/redux/reducers';
import { ModalActions } from '@/redux/actions';
import { Modal } from '@/components/modal/index';
import Icons from '@/components/atoms/icons';
import {
    TxCofirmTitleTypoWrapper,
    TxConfirmWrapper,
    TxConfirmFailedTypo,
    TxConfirmModuleTypo,
    TxConfirmSuccessTypo,
    TxConfirmTitle,
    TxResultTypo,
    TxConfirmButtonWrapper
} from './style';
import ColorButton from '@/components/atoms/buttons/colorButton';

const TxConfirmModal = () => {
    const navigate = useNavigate();

    const { data } = useSelector((state: rootState) => state.modal);

    const onCloseModal = () => {
        ModalActions.handleTxConfirm(false);
    };

    const onClickGoToMyTokens = () => {
        ModalActions.handleTxConfirm(false);
        navigate(`/mytoken`);
    };

    return (
        <Modal width={'364px'} visible={true} closable={true} maskClosable={true} onClose={onCloseModal}>
            <TxConfirmWrapper>
                <TxConfirmTitle>
                    {data.result ? (
                        <>
                            <Icons.Success width={'56px'} height={'56px'} />
                            <TxCofirmTitleTypoWrapper>
                                <TxConfirmModuleTypo>{data.module}</TxConfirmModuleTypo>
                                <TxConfirmSuccessTypo>Success</TxConfirmSuccessTypo>
                            </TxCofirmTitleTypoWrapper>
                        </>
                    ) : (
                        <>
                            <Icons.Failed width={'56px'} height={'56px'} />
                            <TxCofirmTitleTypoWrapper>
                                <TxConfirmModuleTypo>{data.module}</TxConfirmModuleTypo>
                                <TxConfirmFailedTypo>Failed</TxConfirmFailedTypo>
                            </TxCofirmTitleTypoWrapper>
                        </>
                    )}
                </TxConfirmTitle>
                <TxResultTypo>{data.message}</TxResultTypo>
                <TxConfirmButtonWrapper>
                    {data.result ? (
                        <>
                            <ColorButton
                                width={'152px'}
                                height={'40px'}
                                color={'#383838'}
                                text={'Confirm'}
                                sx={{ color: '#999', fontStyle: 'normal', fontSize: '14px', fontWeight: 500 }}
                                onClick={onCloseModal}
                            />
                            <ColorButton
                                width={'152px'}
                                height={'40px'}
                                color={'#02E191'}
                                text={'Go to My Tokens'}
                                sx={{ color: '#1A1A1A', fontStyle: 'normal', fontSize: '14px', fontWeight: 500 }}
                                onClick={onClickGoToMyTokens}
                            />
                        </>
                    ) : (
                        <ColorButton
                            width={'152px'}
                            height={'40px'}
                            color={'#383838'}
                            text={'Confirm'}
                            sx={{ color: '#999', fontStyle: 'normal', fontSize: '14px', fontWeight: 500 }}
                            onClick={onCloseModal}
                        />
                    )}
                </TxConfirmButtonWrapper>
            </TxConfirmWrapper>
        </Modal>
    );
};

export default React.memo(TxConfirmModal);
