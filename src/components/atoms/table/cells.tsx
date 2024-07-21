import CopyIconButton from '../buttons/copyIconButton';
import { IC_VALID_SHIELD, IC_WALLET_FILL_00827A } from '../icons/pngIcons';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import commaNumber from 'comma-number';
import Icons from '../icons';
import { DefaultTypo, TypeCover, TypeTypo, WalletAddressWrap } from './styles';

const WalletAddress = ({ address, sliceLength }: { address: string; sliceLength?: number }) => {
    return (
        <WalletAddressWrap>
            <img src={IC_WALLET_FILL_00827A} alt="wallet" style={{ width: '16px', marginRight: '6px' }} />
            <DefaultTypo style={{ color: 'var(--Green-800, #00827A)', marginRight: '2px' }}>
                {sliceLength
                    ? `${address.slice(0, sliceLength)}...${address.slice(address.length - sliceLength, address.length)}`
                    : address}
            </DefaultTypo>
            <img src={IC_VALID_SHIELD} alt="wallet" style={{ width: '20px' }} />
            <CopyIconButton text={address} width={'20px'} height={'20px'} />
        </WalletAddressWrap>
    );
};

const Hash = ({ hash, sliceLength = 10 }: { hash: string; sliceLength?: number }) => {
    const network = useSelector((state: rootState) => state.global.network);
    const explorerUrl = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const onClick = () => window.open(`${explorerUrl}/transactions/${hash}`);

    return (
        <DefaultTypo onClick={onClick} style={{ cursor: 'pointer', color: '#00827A', display: 'flex' }}>
            {hash.slice(0, sliceLength)}
            ...
            {hash.slice(hash.length - sliceLength, hash.length)}
        </DefaultTypo>
    );
};

const BlockHeight = ({ block, sliceLength = 12 }: { block: string; sliceLength?: number }) => {
    //? Similar with <Hash />
    const network = useSelector((state: rootState) => state.global.network);
    const explorerUrl = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const onClick = () => window.open(`${explorerUrl}/block/${block}`);
    return (
        <DefaultTypo onClick={onClick} style={{ cursor: 'pointer', color: '#00827A' }}>
            {commaNumber(block)}
        </DefaultTypo>
    );
};

const TransactionType = ({ type }: { type: string }) => {
    let bgColor = '';
    let typoColor = '';

    switch (type) {
        case 'Mint':
        case 'Transfer':
        case 'TransferFrom':
        case 'Burn':
        case 'BurnFrom':
            bgColor = 'rgba(80, 110, 229, 0.20)';
            typoColor = '#506EE5';
            break;

        case 'IncreaseAllowance':
        case 'DecreaseAllowance':
            bgColor = 'rgba(80, 209, 229, 0.10)';
            typoColor = '#50D1E5';
            break;

        case 'UpdateMinter':
        case 'UpdateMarketing':
        case 'UploadLogo':
            bgColor = 'rgba(130, 80, 229, 0.20)';
            typoColor = '#8250E5';
            break;
    }

    return (
        <TypeCover bgColor={bgColor}>
            <TypeTypo color={typoColor}>{type}</TypeTypo>
        </TypeCover>
    );
};

const ResultStatus = ({ isSuccess, typo }: { isSuccess: boolean; typo?: string }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
            {isSuccess ? (
                <>
                    <Icons.Success width={'16px'} height={'16px'} />
                    <DefaultTypo>{typo || 'Success'}</DefaultTypo>
                </>
            ) : (
                <>
                    <Icons.Failed width={'16px'} height={'16px'} />
                    <DefaultTypo>{typo || 'Failed'}</DefaultTypo>
                </>
            )}
        </div>
    );
};

const Cell = {
    Default: DefaultTypo,
    WalletAddress,
    Hash,
    TransactionType,
    BlockHeight,
    ResultStatus
};

export default Cell;
