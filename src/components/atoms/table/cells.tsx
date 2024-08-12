import CopyIconButton from '../buttons/copyIconButton';
import { IC_VALID_SHIELD, IC_WALLET_FILL_00827A } from '../icons/pngIcons';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import commaNumber from 'comma-number';
import Icons from '../icons';
import { DefaultTypo, TokenAmountSymbolTypo, TypeCover, TypeTypo, WalletAddressWrap } from './styles';
import { openLink, parseAmountWithDecimal2 } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import { format, formatDistanceToNow } from 'date-fns';

const WalletAddress = ({ address, sliceLength }: { address: string; sliceLength?: number }) => {
    const network = useSelector((state: rootState) => state.global.network);
    const explorerUrl = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const onClick = () => openLink(`${explorerUrl}/accounts/${address}`);

    return (
        <WalletAddressWrap>
            <img src={IC_WALLET_FILL_00827A} alt="wallet" style={{ width: '16px', marginRight: '6px' }} />
            <DefaultTypo
                style={{ color: 'var(--Green-800, #00827A)', marginRight: '2px' }}
                onClick={onClick}
                className="select-none pointer"
                data-tooltip-content={sliceLength > 0 ? address : ''}
                data-tooltip-id={TOOLTIP_ID.COMMON}
                data-tooltip-wrapper="span"
                data-tooltip-place="bottom"
            >
                {sliceLength
                    ? `${address.slice(0, sliceLength)}...${address.slice(address.length - sliceLength, address.length)}`
                    : address}
            </DefaultTypo>
            {/* <img src={IC_VALID_SHIELD} alt="wallet" style={{ width: '20px' }} /> */}
            <CopyIconButton text={address} width={'20px'} height={'20px'} />
        </WalletAddressWrap>
    );
};

const Hash = ({ hash, sliceLength = 10 }: { hash: string; sliceLength?: number }) => {
    const network = useSelector((state: rootState) => state.global.network);
    const explorerUrl = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const onClick = () => openLink(`${explorerUrl}/transactions/${hash}`);

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

    const onClick = () => openLink(`${explorerUrl}/blocks/${block}`);
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
        case 'Approve':
        case 'TransferNFT':
            bgColor = 'rgba(80, 110, 229, 0.20)';
            typoColor = '#506EE5';
            break;

        case 'IncreaseAllowance':
        case 'DecreaseAllowance':
        case 'Revoke':
        case 'ApproveAll':
            bgColor = 'rgba(80, 209, 229, 0.10)';
            typoColor = '#50D1E5';
            break;

        case 'UpdateMinter':
        case 'UpdateMarketing':
        case 'UploadLogo':
        case 'Revoke All':
        case 'UpdateOwnerShipTransfer':
        case 'UpdateOwnerShipAccept':
        case 'UpdateOwnerShipRenounce':
        case 'UpdateOwnership':
        case 'RevokeAll':
            bgColor = 'rgba(130, 80, 229, 0.20)';
            typoColor = '#8250E5';
            break;
    }

    return (
        <TypeCover $bgColor={bgColor}>
            <TypeTypo $color={typoColor}>{type}</TypeTypo>
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

const TokenAmount = ({ amount, decimals, symbol }: { amount: string; decimals: string; symbol: string }) => {
    return (
        <Cell.Default
            data-tooltip-content={Number(decimals) > 2 ? parseAmountWithDecimal2(amount, decimals) : ''}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            {parseAmountWithDecimal2(amount, decimals, true)} <TokenAmountSymbolTypo>{symbol}</TokenAmountSymbolTypo>
        </Cell.Default>
    );
};

const TimeAgo = ({ timestamp }: { timestamp?: string }) => {
    const utcDate = new Date(timestamp);
    const timezoneOffset = utcDate.getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - timezoneOffset * 60 * 1000);

    const nowTimeStamp = new Date();

    const isLessThanAMinute = Number(nowTimeStamp) - Number(localDate) < 60 * 1000;

    return (
        <Cell.Default
            data-tooltip-content={format(localDate, 'yyyy-MM-dd HH:mm:ss')}
            data-tooltip-id={TOOLTIP_ID.COMMON}
            data-tooltip-wrapper="span"
            data-tooltip-place="bottom"
        >
            {isLessThanAMinute ? '< 1 minute ago' : formatDistanceToNow(localDate, { addSuffix: true }).replace('about ', '')}
        </Cell.Default>
    );
};

const Cell = {
    Default: DefaultTypo,
    WalletAddress,
    Hash,
    TransactionType,
    BlockHeight,
    ResultStatus,
    TokenAmount,
    TimeAgo
};

export default Cell;
