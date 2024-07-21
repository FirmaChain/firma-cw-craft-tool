import Divider from '@/components/atoms/divider';
import { CardContainer, SectionContainer } from '../style';
import useSearchStore from '../../searchStore';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import IconButton from '@/components/atoms/buttons/iconButton';
import { IC_NAVIGATION } from '@/components/atoms/icons/pngIcons';
import JsonViewer from '@/components/atoms/viewer/jsonViewer';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useState } from 'react';
import SearchInput2 from '@/components/atoms/input/searchInput';
import Icons from '@/components/atoms/icons';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import { parseAmountWithDecimal2 } from '@/utils/common';
import { TOOLTIP_ID } from '@/constants/tooltip';
import commaNumber from 'comma-number';
import { formatDistanceToNow, parseISO } from 'date-fns';

const TokenInfo = () => {
    const contractAddress = useSearchStore((state) => state.contractInfo?.address);
    const minterAddress = useSearchStore((state) => state.minterInfo?.minter);
    const tokenName = useSearchStore((state) => state.tokenInfo?.name);
    const symbol = useSearchStore((state) => state.tokenInfo?.symbol);
    const decimals = useSearchStore((state) => state.tokenInfo?.decimals);
    const label = useSearchStore((state) => state.contractInfo?.contract_info?.label);
    const totalSupply = useSearchStore((state) => state.tokenInfo?.total_supply);
    const minterCap = useSearchStore((state) => state.minterInfo?.cap);
    const userBalance = useSearchStore((state) => state.userBalance);

    return (
        <SectionContainer>
            <div className="section-title">Token Information</div>

            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Contract Address</div>
                    <div className="box-value">
                        <div className="white-typo">{contractAddress}</div>
                        {contractAddress && <CopyIconButton width="22px" height="22px" text={contractAddress} />}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Name</div>
                    <div className="box-value">
                        <div className="white-typo">{tokenName}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Symbol</div>
                    <div className="box-value">
                        <div className="white-typo">{symbol}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Decimals</div>
                    <div className="box-value">
                        <div className="white-typo">{decimals}</div>
                    </div>
                </div>
                <div className="box-row" style={{ height: '28px' }}>
                    <div className="box-title">Label</div>
                    {label && (
                        <div className="box-value">
                            <div className="label">
                                <div className="label-typo">{label}</div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="box-row">
                    <div className="box-title">Total Supply</div>
                    {totalSupply && (
                        <div className="box-value">
                            <div
                                className="white-typo"
                                data-tooltip-content={commaNumber(parseAmountWithDecimal2(totalSupply, String(decimals)))}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                {commaNumber(parseAmountWithDecimal2(totalSupply, String(decimals), true))}
                            </div>
                            <div className="gray-typo">{symbol}</div>
                        </div>
                    )}
                </div>
                {minterAddress && (
                    <div className="box-row">
                        <div className="box-title">Minter Address</div>
                        <div className="box-value">
                            <div className="white-typo">{minterAddress}</div>
                            {minterAddress && <CopyIconButton width="22px" height="22px" text={minterAddress} />}
                        </div>
                    </div>
                )}
                {minterCap && (
                    <div className="box-row">
                        <div className="box-title">Minter Cap</div>

                        <div className="box-value">
                            <div
                                className="white-typo"
                                data-tooltip-content={commaNumber(parseAmountWithDecimal2(minterCap, String(decimals)))}
                                data-tooltip-id={TOOLTIP_ID.COMMON}
                                data-tooltip-wrapper="span"
                                data-tooltip-place="bottom"
                            >
                                {commaNumber(parseAmountWithDecimal2(minterCap, String(decimals), true))}
                            </div>
                            <div className="gray-typo">{symbol}</div>
                        </div>
                    </div>
                )}
                <div className="box-row">
                    <div className="box-title">My Balance</div>
                    <div className="box-value">
                        <div
                            className="white-typo"
                            data-tooltip-content={commaNumber(parseAmountWithDecimal2(userBalance, String(decimals)))}
                            data-tooltip-id={TOOLTIP_ID.COMMON}
                            data-tooltip-wrapper="span"
                            data-tooltip-place="bottom"
                        >
                            {commaNumber(parseAmountWithDecimal2(userBalance, String(decimals), true))}
                        </div>
                        <div className="gray-typo">{symbol}</div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const MoreInfo = () => {
    const network = useSelector((v: rootState) => v.global.network);
    const tokenLogo = useSearchStore((v) => v.marketingInfo?.logo?.url);
    const marketingDesc = useSearchStore((v) => v.marketingInfo?.description);
    const marketingAddr = useSearchStore((v) => v.marketingInfo?.marketing);
    const marketingProj = useSearchStore((v) => v.marketingInfo?.project);
    const contractHistory = useSearchStore((v) => v.contractHistory);
    const contractAddress = useSearchStore((v) => v.contractInfo?.address);

    const metadata = contractHistory === null ? '' : contractHistory[0];

    const blockExplorerLink = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.BLOCK_EXPLORER : CRAFT_CONFIGS.TESTNET.BLOCK_EXPLORER;

    const goContractPage = () => {
        window.open(`${blockExplorerLink}/accounts/${contractAddress}`);
    };

    //? Optional values (hide unfilled values of not)
    // const HIDE_DESC = !marketingDesc || marketingDesc.toLowerCase() === 'null';
    // const HIDE_ADDR = !marketingAddr || marketingAddr.toLowerCase() === 'null';
    // const HIDE_PROJ = !marketingProj || marketingDesc.toLowerCase() === 'null';

    return (
        <SectionContainer>
            <div className="section-title">Additional Information</div>

            <div className="information-box">
                <div className="box-row" style={{ alignItems: 'flex-start' }}>
                    <div className="box-title">Marketing Logo</div>
                    <div className="box-value">
                        <TokenLogo src={tokenLogo} size="90px" />
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Marketing Description</div>
                    <div className="box-value">
                        <div className="white-typo">{marketingDesc}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Marketing Address</div>
                    <div className="box-value">
                        <div className="white-typo">{marketingAddr}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Marketing Project</div>
                    <div className="box-value">
                        <div className="white-typo">{marketingProj}</div>
                    </div>
                </div>
                <div className="box-row" style={{ alignItems: 'flex-start' }}>
                    <div className="box-title">Metadata</div>
                    <div className="box-value" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                        <IconButton style={{ padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }} onClick={goContractPage}>
                            <span className="white-typo" style={{ color: 'var(--Green-700, #02A288)' }}>
                                View Metadata
                            </span>
                            <img src={IC_NAVIGATION} alt="navigation" style={{ width: '20px', height: '20px' }} />
                        </IconButton>
                        <JsonViewer data={metadata} />
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const AllAccounts = () => {
    const allAccounts = useSearchStore((v) => v.allAccounts);
    const decimals = useSearchStore((v) => v.tokenInfo?.decimals) || '0';

    const [keyword, setKeyword] = useState<string>('');

    const columns: IColumn[] = [
        {
            id: 'address',
            label: 'Wallet Address',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '60%'
        },
        {
            id: 'balance',
            label: 'Balance',
            renderCell: (id, row) => (
                <Cell.Default
                    data-tooltip-content={commaNumber(parseAmountWithDecimal2(row[id], String(decimals)))}
                    data-tooltip-id={TOOLTIP_ID.COMMON}
                    data-tooltip-wrapper="span"
                    data-tooltip-place="bottom"
                >
                    {commaNumber(parseAmountWithDecimal2(row[id], String(decimals), true))}
                </Cell.Default>
            ),

            width: '40%'
        }
    ];

    const filtereRows = allAccounts?.filter((row) => row.address.toLowerCase().includes(keyword));

    return (
        <SectionContainer>
            <div className="section-title-search">
                <div className="section-title">All Accounts</div>
                <SearchInput2
                    placeHolder={'Search Wallet Address'}
                    value={keyword}
                    onChange={(v) => setKeyword(v)}
                    adornment={{
                        end: <Icons.Search width={'15px'} height={'15px'} />
                    }}
                    maxWidth="564px"
                />
            </div>
            <StyledTable columns={columns} rows={filtereRows || []} />
        </SectionContainer>
    );
};

const Transactions = () => {
    const allTransactions = useSearchStore((v) => v.allTransactions) || [];

    const columns: IColumn[] = [
        { id: 'hash', label: 'Hash', renderCell: (id, row) => <Cell.Hash hash={row[id]} />, minWidth: '280px' },
        { id: 'type', label: 'Type', renderCell: (id, row) => <Cell.TransactionType type={row[id]} />, minWidth: '150px' },
        { id: 'height', label: 'Block', renderCell: (id, row) => <Cell.BlockHeight block={row[id]} />, minWidth: '100px' },
        {
            id: 'address',
            label: 'From (Wallet Address)',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} sliceLength={10} />,
            minWidth: '250px'
        },
        { id: 'success', label: 'Result', renderCell: (id, row) => <Cell.ResultStatus isSuccess={row[id]} />, minWidth: '100px' },
        {
            id: 'timestamp',
            label: 'Time',
            renderCell: (id, row) => (
                <Cell.Default>{formatDistanceToNow(parseISO(row[id]), { addSuffix: true }).replace('about ', '')}</Cell.Default>
            ),
            minWidth: '120px'
        }
    ];

    return (
        <SectionContainer>
            <div className="section-title-search" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                <div className="section-title">Transactions</div>
                <span className="section-title-desc">The lastest 15 records</span>
            </div>

            <StyledTable columns={columns} rows={allTransactions} />
        </SectionContainer>
    );
};

const TokenDetailCard = () => {
    return (
        <CardContainer>
            <TokenInfo />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <MoreInfo />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <AllAccounts />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <Transactions />
        </CardContainer>
    );
};

export default TokenDetailCard;
