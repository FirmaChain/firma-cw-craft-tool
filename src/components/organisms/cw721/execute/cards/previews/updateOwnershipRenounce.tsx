import ColorButton from "@/components/atoms/buttons/colorButton";
import { QRCodeModal } from "@/components/organisms/modal";
import { useModalStore } from "@/hooks/useModal";
import styled from "styled-components";
import useCW721ExecuteStore from "../../hooks/useCW721ExecuteStore";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/reducers";
import { CRAFT_CONFIGS } from "@/config";
import { IC_WARNING } from "@/components/atoms/icons/pngIcons";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 36px;
    justify-content: center;
    align-items: center;
`;

const WarningTextWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 12px 20px;
    gap: 16px;
    width: 100%;
    border-radius: 8px;
    background: rgba(229, 82, 80, 0.20);
`;

const WarningIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const WarningTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #FFF));
    font-family: "General Sans Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
`;

const UpdateOwnershipRenouncePreview = () => {
    const WARNING_TEXT: string = 'If you renounce ownership of the NFT contract, the contract will be deleted.';
    const WARNING_MODAL_TEXT: string = 'Are you sure you want to renounce ownership of the NFT contract?\nIf you renounce ownership, the contract will be permanently deleted.';

    const network = useSelector((state: rootState) => state.global.network);
    
    const contractAddress = useCW721ExecuteStore((state) => state.contractAddress);
    const fctBalance = useCW721ExecuteStore((state) => state.fctBalance);
    const setContractInfo = useCW721ExecuteStore((state) => state.setContractInfo);
    const setSelectMenu = useCW721ExecuteStore((state) => state.setSelectMenu);

    const modal = useModalStore();
    
    const craftConfig = useMemo(() => {
        const config = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return config;
    }, [network]);

    const onClickRenounce = () => {
        const feeAmount = craftConfig.DEFAULT_FEE;

        const params = {
            header: {
                title: 'Update Ownership Renounce'
            },
            content: {
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Warning :',
                        value: WARNING_MODAL_TEXT,
                        type: 'Warning'
                    }
                ]
            },
            contract: contractAddress,
            msg: { update: "renounce_ownership" }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => (
                <QRCodeModal
                    module="/cw721/updateOwnershipRenounce"
                    id={id}
                    params={params}
                    onClickConfirm={() => {
                        setSelectMenu({ value: 'select', label: 'Select' });
                    }}
                />
            )
        });
    };

    return (
        <Container>
            <WarningTextWrap>
                <WarningIcon src={IC_WARNING} alt={"Preview Warning Icon"} />
                <WarningTypo>{WARNING_TEXT}</WarningTypo>
            </WarningTextWrap>
            <ColorButton
                width={'168px'}
                height={'40px'}
                color={'#E55250B3'}
                text={'Connect Wallet'}
                sx={{ color: '#121212', fontStyle: 'normal', fontSize: '14px', fontWeight: 600 }}
                onClick={onClickRenounce}
            />
        </Container>
    )
}

export default UpdateOwnershipRenouncePreview;