import Divider from '@/components/atoms/divider';
import { CardContainer, SectionContainer } from '../style';
import useCW721SearchStore from '../../cw721SearchStore';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useState } from 'react';
import Icons from '@/components/atoms/icons';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import commaNumber from 'comma-number';
import IconButton from '@/components/atoms/buttons/iconButton';
import { Cw721Expires } from '@firmachain/firma-js';
import { format } from 'date-fns';
import NftTable from '@/components/atoms/table/nftTable';

const TokenInfo = () => {
    const network = useSelector((v: rootState) => v.global.network);
    const contractAddress = useCW721SearchStore((state) => state.contractInfo?.address);
    const minter = useCW721SearchStore((v) => v?.minterInfo);
    const nftName = useCW721SearchStore((state) => state.nftInfo?.name);
    const nftSymbol = useCW721SearchStore((state) => state.nftInfo?.symbol);
    const label = useCW721SearchStore((state) => state.contractInfo?.contract_info?.label);
    const codeId = useCW721SearchStore((state) => state.contractInfo?.contract_info.code_id);
    const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
    const isBasic = codeId === craftConfig.CW20.BASIC_CODE_ID;

    const [showTotalSupply, setShowTotalSupply] = useState(true);

    const [showMyNft, setShowMyNFT] = useState(true);

    return (
        <SectionContainer>
            <div className="section-title">Token Information</div>

            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Contract Address</div>
                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{contractAddress}</div>
                        {contractAddress && <CopyIconButton width="22px" height="22px" text={contractAddress} />}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Minter</div>
                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{minter || '-'}</div>
                        {minter && <CopyIconButton width="22px" height="22px" text={minter} />}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Name</div>
                    <div className="box-value">
                        <div className="white-typo">{nftName}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Token Symbol</div>
                    <div className="box-value">
                        <div className="white-typo">{nftSymbol}</div>
                    </div>
                </div>
                {!isBasic && (
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
                )}
                <div className="box-row">
                    <div className="box-title">Code Id</div>
                    <div className="box-value">
                        <div className="white-typo">{codeId}</div>
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">Total Supply</div>

                    <div className="box-value" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                        <IconButton
                            onClick={() => setShowTotalSupply(!showTotalSupply)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <div className="white-typo">{commaNumber(0)}</div>
                            <div className="gray-typo">NFT</div>
                            <Icons.PrevPage
                                width="20px"
                                height="20px"
                                stroke="#FFFFFF"
                                style={{ transform: showTotalSupply ? 'rotate(90deg)' : 'rotate(270deg)' }}
                            />
                        </IconButton>
                        {showTotalSupply && <NftTable />}
                    </div>
                </div>
                <div className="box-row">
                    <div className="box-title">My NFTs</div>

                    <div className="box-value" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                        <IconButton
                            onClick={() => setShowMyNFT(!showMyNft)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <div className="white-typo">{commaNumber(0)}</div>
                            <div className="gray-typo">NFT</div>
                            <Icons.PrevPage
                                width="20px"
                                height="20px"
                                stroke="#FFFFFF"
                                style={{ transform: showMyNft ? 'rotate(90deg)' : 'rotate(270deg)' }}
                            />
                        </IconButton>
                        {showMyNft && <NftTable />}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const PendingExpiery = ({ expireInfo }: { expireInfo: Cw721Expires | null }) => {
    if (!expireInfo) return <div></div>;

    if (expireInfo['at_height'])
        return (
            <div className="white-typo">
                {expireInfo['at_height']} <div className="gray-typo">Block</div>
            </div>
        );

    if (expireInfo['at_time']) return <div className="white-typo">{format(expireInfo['at_time'], 'yyyy-MM-dd HH:mm:ss')}</div>;

    if (expireInfo['never']) return <div className="white-typo">Forever</div>;

    return <div></div>;
};

const OwnerInfo = () => {
    const admin2 = useCW721SearchStore((v) => v.contractInfo?.contract_info?.admin);
    const admin = useCW721SearchStore((v) => v.ownerInfo?.owner);

    const pendingOwner = useCW721SearchStore((v) => v.ownerInfo?.pending_owner);
    const pendingExpiry = useCW721SearchStore((v) => v.ownerInfo?.pending_expiry);

    const minter = useCW721SearchStore((v) => v.minterInfo);

    return (
        <SectionContainer>
            <div className="section-title">Owner Information</div>
            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Admin</div>
                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{admin || '-'}</div>
                        {admin && <CopyIconButton width="22px" height="22px" text={admin} />}
                    </div>
                </div>
            </div>
            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Pending Owner</div>

                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{pendingOwner || '-'}</div>
                        {pendingOwner && <CopyIconButton width="22px" height="22px" text={pendingOwner} />}
                    </div>
                </div>
            </div>
            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Pending Expiry</div>

                    <div className="box-value">
                        {pendingExpiry ? <PendingExpiery expireInfo={pendingExpiry} /> : <div className="white-typo">-</div>}
                    </div>
                </div>
            </div>
            <div className="information-box">
                <div className="box-row">
                    <div className="box-title">Minter</div>

                    <div className="box-value">
                        <div className="white-typo single-line-clamp">{minter || '-'}</div>
                        {minter && <CopyIconButton width="22px" height="22px" text={minter} />}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

const Transactions = () => {
    const allTransactions = useCW721SearchStore((v) => v.allTransactions) || [];

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
            <div className="section-title-search" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '16px' }}>
                <div className="section-title">Transactions</div>
                <span className="section-title-desc">The lastest 15 records</span>
            </div>

            <StyledTable columns={columns} rows={allTransactions} rowsPerPage={15} disablePagination />
        </SectionContainer>
    );
};

const TokenDetailCard = () => {
    return (
        <CardContainer>
            <TokenInfo />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <OwnerInfo />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <Transactions />
        </CardContainer>
    );
};

export default TokenDetailCard;
