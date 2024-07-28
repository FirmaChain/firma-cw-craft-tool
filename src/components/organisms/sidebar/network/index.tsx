import { NETWORK_TYPE } from '@/constants/common';
import { MenuHeader, NetworkMenuContainer } from './style';
import NetworkSelect from '@/components/atoms/select/networkSelect';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useModalStore } from '@/hooks/useModal';
import NetworkChangeModal from '../../modal/networkChangeModal';

interface IProps {
    onChange: (type: NETWORK_TYPE) => void;
}

const options = [
    { value: 'MAINNET', label: 'MAINNET' },
    { value: 'TESTNET', label: 'TESTNET' }
];

export const NetworkMenu = ({ onChange }: IProps) => {
    const modal = useModalStore();
    const network = useSelector((state: rootState) => state.global.network);

    const onChangeActiveMenu = (newTypo: NETWORK_TYPE) => {
        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => <NetworkChangeModal id={id} params={{ network: newTypo }} onConfirm={() => onChange(newTypo)} />
        });
    };

    return (
        <NetworkMenuContainer>
            <MenuHeader>Network</MenuHeader>
            <NetworkSelect value={network} options={options} onChange={onChangeActiveMenu} />
        </NetworkMenuContainer>
    );
};

export default NetworkMenu;
