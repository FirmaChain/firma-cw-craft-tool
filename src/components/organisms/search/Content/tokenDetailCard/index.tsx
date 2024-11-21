import Divider from '@/components/atoms/divider';
import { CardContainer, LabelTypo, SectionContainer, WhiteTypo } from '../style';
// import useSearchStore from '../../searchStore';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import TokenLogo from '@/components/atoms/icons/TokenLogo';
import { IC_ROUND_ARROW_UP } from '@/components/atoms/icons/pngIcons';
import JsonViewer from '@/components/atoms/viewer/jsonViewer';

import { CRAFT_CONFIGS } from '@/config';
import { useEffect, useMemo, useRef, useState } from 'react';
import SearchInput2 from '@/components/atoms/input/searchInput';
import Icons from '@/components/atoms/icons';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import { openLink } from '@/utils/common';
import commaNumber from 'comma-number';
import { TokenDescriptionClampTypo } from '@/components/organisms/instantiate/preview/dashboard/tokenInfo/style';
import Skeleton from '@/components/atoms/skeleton';
import CopyMetadata from '@/components/atoms/buttons/copyMetadata';
import IconButton from '@/components/atoms/buttons/iconButton';
import { compareStringNumbers, getTokenAmountFromUToken } from '@/utils/balance';
import { useMeasure } from 'react-use';
import { WALLET_ADDRESS_REGEX } from '@/constants/regex';
import TextEllipsis from '@/components/atoms/ellipsis';
import styled from 'styled-components';
import { useCW20Search } from '@/context/cw20SearchContext';
import useWalletStore from '@/store/walletStore';

const TokenInfo = () => {
    const { address: userAddress } = useWalletStore();
    // const userAddress = useSelector((v: rootState) => v.wallet.address);
    const { contractInfo, tokenInfo, minterInfo, userBalance } = useCW20Search();

    const contractAddress = contractInfo?.address;
    const minterAddress = minterInfo?.minter;
    const tokenName = tokenInfo?.name;
    const symbol = tokenInfo?.symbol;
    const decimals = tokenInfo?.decimals || 0;
    const label = contractInfo?.contract_info?.label;
    const totalSupply = tokenInfo?.total_supply;
    const minterCap = minterInfo?.cap;
    // const userBalance = useSearchStore((state) => state.userBalance);
    const codeId = contractInfo?.contract_info.code_id;
    const isBasic = codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;

    return (
        <SectionContainer>
            <div className="section-title">Token Information</div>

            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Contract Address</div>
                    <div className="box-value">
                        <TextEllipsis CustomDiv={WhiteTypo} text={contractAddress} breakMode={'letters'} />
                        {/* <div className="white-typo single-line-clamp">{contractAddress}</div> */}
                        {contractAddress && <CopyIconButton width="22px" height="22px" text={contractAddress} />}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Name</div>
                    <div className="box-value">
                        <TextEllipsis CustomDiv={WhiteTypo} text={tokenName} breakMode={'letters'} />
                        {/* <div className="white-typo clamp-single-line">{tokenName}</div> */}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Symbol</div>
                    <div className="box-value">
                        <TextEllipsis CustomDiv={WhiteTypo} text={symbol} breakMode={'letters'} />
                        {/* <div className="white-typo clamp-single-line">{symbol}</div> */}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Decimals</div>
                    <div className="box-value">
                        <TextEllipsis CustomDiv={WhiteTypo} text={String(decimals)} breakMode={'letters'} />
                        {/* <div className="white-typo">{decimals}</div> */}
                    </div>
                </div>

                <div className="box-row" style={{ height: '28px' }}>
                    <div className="box-title">Label</div>
                    {label && (
                        <div className="box-value">
                            <div className="label">
                                <TextEllipsis CustomDiv={LabelTypo} text={label} breakMode={'letters'} />
                                {/* <div className="label-typo clamp-single-line">{label}</div> */}
                            </div>
                        </div>
                    )}
                </div>

                <div className="box-row">
                    <div className="box-title">Total Supply</div>
                    {totalSupply && (
                        <div className="box-value">
                            <TextEllipsis
                                CustomDiv={WhiteTypo}
                                text={commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}
                                breakMode={'letters'}
                            />
                            {/* <div className="white-typo clamp-single-line">
                                {commaNumber(getTokenAmountFromUToken(totalSupply, String(decimals)))}
                            </div> */}
                            <div className="gray-typo">{symbol}</div>
                        </div>
                    )}
                </div>
                {minterAddress && (
                    <div className="box-row">
                        <div className="box-title">Minter Address</div>
                        <div className="box-value">
                            <TextEllipsis CustomDiv={WhiteTypo} text={minterAddress} breakMode={'letters'} />
                            {/* <div className="white-typo single-line-clamp">{minterAddress}</div> */}
                            {minterAddress && <CopyIconButton width="22px" height="22px" text={minterAddress} />}
                        </div>
                    </div>
                )}
                {minterCap && (
                    <div className="box-row">
                        <div className="box-title">Minter Cap</div>

                        <div className="box-value">
                            <TextEllipsis
                                CustomDiv={WhiteTypo}
                                text={commaNumber(getTokenAmountFromUToken(minterCap, String(decimals)))}
                                breakMode={'letters'}
                            />
                            {/* <div className="white-typo clamp-single-line">
                                {commaNumber(getTokenAmountFromUToken(minterCap, String(decimals)))}
                            </div> */}
                            <div className="gray-typo">{symbol}</div>
                        </div>
                    </div>
                )}
                {userAddress && (
                    <div className="box-row">
                        <div className="box-title">My Balance</div>
                        {userBalance ? (
                            <div className="box-value">
                                <TextEllipsis
                                    CustomDiv={WhiteTypo}
                                    text={commaNumber(getTokenAmountFromUToken(userBalance, String(decimals)))}
                                    breakMode={'letters'}
                                />
                                {/* <div className="white-typo clamp-single-line">
                                    {commaNumber(getTokenAmountFromUToken(userBalance, String(decimals)))}
                                </div> */}
                                <div className="gray-typo">{symbol}</div>
                            </div>
                        ) : (
                            <Skeleton width="100px" height="22px" />
                        )}
                    </div>
                )}
            </div>
        </SectionContainer>
    );
};

const MoreInfo = () => {
    const { marketingInfo, contractHistory, contractInfo } = useCW20Search();

    const tokenLogo = marketingInfo?.logo?.url;
    const marketingDesc = marketingInfo?.description;
    const marketingAddr = marketingInfo?.marketing;
    const marketingProj = marketingInfo?.project;
    // const contractHistory = useSearchStore((v) => v.contractHistory);
    const contractAddress = contractInfo?.address;
    const codeId = contractInfo?.contract_info.code_id;
    const isBasic = codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;

    const metadata = contractHistory === null ? '' : contractHistory[0];

    const blockExplorerLink = CRAFT_CONFIGS.BLOCK_EXPLORER;

    const goContractPage = () => {
        openLink(`${blockExplorerLink}/accounts/${contractAddress}`);
    };

    const [ref, { width }] = useMeasure();

    const descRef = useRef<HTMLDivElement>();
    const [needClamp, setNeedClamp] = useState(false);
    const [isClamped, setIsClamped] = useState(true);

    const openClamp = () => setIsClamped(false);
    const closeClamp = () => setIsClamped(true);

    useEffect(() => {
        const height = descRef.current?.clientHeight;

        if (height > 66) {
            if (!needClamp) setNeedClamp(true);
        } else {
            //? height < 66px
            if (needClamp) setNeedClamp(false);
            setIsClamped(true);
        }
    }, [marketingDesc, width]);

    return (
        <SectionContainer ref={ref}>
            <div className="section-title">Additional Information</div>

            <div className="information-box">
                <div className="box-row" style={{ alignItems: 'flex-start' }}>
                    {isBasic ? <div className="box-title">Token Logo</div> : <div className="box-title">Marketing Logo</div>}
                    <div className="box-value">
                        <TokenLogo src={tokenLogo} size="90px" showTooltip />
                    </div>
                </div>
                {!isBasic && (
                    <div className="box-row">
                        <div className="box-title">Marketing Address</div>
                        <div className="box-value">
                            {!marketingAddr ? (
                                <div className="disabled-typo">Marketing Address</div>
                            ) : (
                                <>
                                    <TextEllipsis CustomDiv={WhiteTypo} text={marketingAddr} breakMode={'letters'} />
                                    {/* <div className="white-typo clamp-single-line">{marketingAddr}</div> */}
                                    {!marketingAddr === false && <CopyIconButton text={marketingAddr} width={'20px'} height={'20px'} />}
                                </>
                            )}
                        </div>
                    </div>
                )}
                <div className="box-row" style={{ alignItems: 'flex-start' }}>
                    <div className="box-title">{isBasic ? 'Token' : 'Marketing'} Description</div>
                    <div className="box-value">
                        {!marketingDesc ? (
                            <div className="disabled-typo">{isBasic ? 'Token' : 'Marketing'} Description</div>
                        ) : (
                            <div className="white-typo">{marketingDesc || 'Description'}</div>
                        )}
                    </div>
                </div>
                {!isBasic && (
                    <>
                        <div className="box-row" style={{ alignItems: 'flex-start' }}>
                            <div className="box-title">Marketing Project</div>
                            <div className="box-value">
                                {!marketingProj ? (
                                    <div className="disabled-typo">Marketing Project</div>
                                ) : (
                                    <>
                                        <TextEllipsis CustomDiv={WhiteTypo} text={marketingProj} breakMode={'letters'} />
                                        {marketingProj && <CopyIconButton text={marketingProj} width={'20px'} height={'20px'} />}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="box-row" style={{ alignItems: 'flex-start' }}>
                            <div className="box-title">Metadata</div>
                            <div
                                className="box-value"
                                style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px', overflow: 'hidden' }}
                            >
                                <CopyMetadata metaData={metadata} />
                                <JsonViewer data={metadata} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </SectionContainer>
    );
};

const AllAccounts = () => {
    const { allAccounts, tokenInfo } = useCW20Search();

    // const allAccounts = useSearchStore((v) => v.allAccounts);
    const decimals = tokenInfo?.decimals || '0';
    const symbol = tokenInfo?.symbol;

    const [keyword, setKeyword] = useState<string>('');

    const columns: IColumn[] = [
        {
            id: 'address',
            label: 'Wallet Address',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} />,
            width: '60%',
            minWidth: '450px'
        },
        {
            id: 'balance',
            label: 'Balance',
            renderCell: (id, row) => <Cell.TokenAmount amount={row[id]} decimals={String(decimals)} symbol={symbol} />,
            width: '40%',
            minWidth: '200px'
        }
    ];

    const rows = useMemo(() => {
        if (!allAccounts || allAccounts.length === 0) return [];

        let result = allAccounts?.filter((one) => BigInt(one.balance) > BigInt(0));

        if (keyword.length > 0) result = result.filter((one) => one.address?.toLowerCase().includes(keyword.toLowerCase()));

        return result.sort((a, b) => {
            return compareStringNumbers(b.balance, a.balance);
        });
    }, [allAccounts, keyword]);

    return (
        <SectionContainer>
            <div className="section-title-search">
                <div className="section-title">All Accounts</div>
                <SearchInput2
                    placeHolder={'Search by CW20 Wallet Address'}
                    value={keyword}
                    onChange={(v) => setKeyword(v.replace(WALLET_ADDRESS_REGEX, ''))}
                    adornment={{
                        end: (
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                                {keyword.length > 0 && (
                                    <IconButton style={{ display: 'flex', padding: 0 }} onClick={() => setKeyword('')}>
                                        <Icons.CloseIcon width="18px" height="18px" />
                                    </IconButton>
                                )}
                                {/* <Icons.Search width={'15px'} height={'15px'} /> */}
                            </div>
                        )
                    }}
                    maxWidth="564px"
                />
            </div>
            <StyledTable columns={columns} rows={rows || []} />
        </SectionContainer>
    );
};

const Transactions = () => {
    const { allTransactions = [] } = useCW20Search();
    //useSearchStore((v) => v.allTransactions) || [];

    const columns: IColumn[] = [
        { id: 'hash', label: 'Hash', renderCell: (id, row) => <Cell.Hash hash={row[id]} />, minWidth: '280px' },
        { id: 'type', label: 'Type', renderCell: (id, row) => <Cell.TransactionType type={row[id]} />, minWidth: '200px' },
        { id: 'height', label: 'Block', renderCell: (id, row) => <Cell.BlockHeight block={row[id]} />, minWidth: '120px' },
        {
            id: 'address',
            label: 'From (Wallet Address)',
            renderCell: (id, row) => <Cell.WalletAddress address={row[id]} sliceLength={10} />,
            minWidth: '250px'
        },
        { id: 'success', label: 'Result', renderCell: (id, row) => <Cell.ResultStatus isSuccess={row[id]} />, minWidth: '120px' },
        {
            id: 'timestamp',
            label: 'Time',
            renderCell: (id, row) => <Cell.TimeAgo timestamp={row[id]} />,
            minWidth: '120px'
        }
    ];

    return (
        <SectionContainer>
            <div className="section-title-subtitle" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                <div className="section-title">Transactions</div>
                <span className="section-title-desc">The lastest 15 records</span>
            </div>

            <StyledTable columns={columns} rows={allTransactions} rowsPerPage={15} disablePagination slim />
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
