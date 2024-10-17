import Divider from '@/components/atoms/divider';
import { CardContainer, SectionContainer } from '../style';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useEffect, useMemo, useState } from 'react';
import StyledTable, { IColumn } from '@/components/atoms/table';
import Cell from '@/components/atoms/table/cells';
import IconButton from '@/components/atoms/buttons/iconButton';
import { Cw721Expires } from '@firmachain/firma-js';
import { format } from 'date-fns';
import {
    CardHeaderTypo,
    CardSpecific,
    ContractCard,
    NFTTableContainer,
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueBox,
    SpecificValueCover,
    SpecificValueTypo,
    SpecificSubValueType,
    SpecificValueWrapper,
    TableExpandButton
} from './style';
import NFTsTable from '../../../common/nftsTable';
import { IC_EXPAND, IC_WARNING_SIGN } from '@/components/atoms/icons/pngIcons';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import { useCW721NFTListContext } from '@/context/cw721NFTListContext';
import { useCW721OwnedNFTListContext } from '@/context/cw721OwnedNFTListContext';
import useCW721ExecuteAction from '../../../execute/hooks/useCW721ExecuteAction';
import useCW721ExecuteStore from '../../../execute/hooks/useCW721ExecuteStore';
import { compareStringNumbers } from '@/utils/balance';
import IconTooltip from '@/components/atoms/tooltip';
import { isValidAddress } from '@/utils/address';
import { SpecificDefaultTypo } from '../../../nftContractDetail/Content/body/ownerInformation/style';

const TokenInfo = () => {
    const { address } = useSelector((state: rootState) => state.wallet);
    const { contractDetail, nftsInfo, ownedNftsInfo } = useNFTContractDetailStore((state) => state);
    const { handleCW721NFTIdList, handleCW721OwnedNFTIdList } = useNFTContractDetail();
    const { nfts, addNFTs, updateNFTs, clearCW721NFTListData, currentPage, setCurrentPage } = useCW721NFTListContext();
    const {
        nfts: ownedNfts,
        addNFTs: addOwnedNFTs,
        updateNFTs: updateOwnedNFTs,
        clearCW721NFTListData: clearCW721OwnedNFTListData,
        currentPage: currentOwnedPage,
        setCurrentPage: setCurrentOwnedPage
    } = useCW721OwnedNFTListContext();

    const contractAddress = contractDetail?.contractAddress || '';
    const codeId = contractDetail?.codeId || '';
    const minter = contractDetail.minter;
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const codeID = contractDetail?.codeId || '';
    const label = contractDetail?.label;
    const totalSupply = nftsInfo?.totalSupply || '0';

    const isBasic = useMemo(() => {
        return codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    }, [codeId]);

    const [expandTotal, setExpandTotal] = useState(true);
    const [expandOwned, setExpandOwned] = useState(true);

    const handleOwnedNFTIdList = async (contractAddress: string) => {
        try {
            handleCW721OwnedNFTIdList(contractAddress, address);
        } catch (error) {
            console.log(error);
        }
    };

    const myNFTsCountTypo = useMemo(() => {
        if (!ownedNftsInfo) return null;

        if (ownedNftsInfo.totalNftIds.length > 99) return '99+';
        else return ownedNftsInfo.totalNftIds.length;
    }, [ownedNftsInfo]);

    return (
        <SectionContainer>
            <CardHeaderTypo>Contract Information</CardHeaderTypo>

            <CardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Address</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {contractAddress ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{contractAddress}</SpecificValueTypo>
                                <CopyIconButton text={contractAddress} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Name</SpecificLabelTypo>
                    {contractName ? (
                        <SpecificValueTypo className="clamp-single-line">{contractName}</SpecificValueTypo>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Symbol</SpecificLabelTypo>
                    {contractSymbol ? (
                        <SpecificValueTypo className="clamp-single-line">{contractSymbol}</SpecificValueTypo>
                    ) : (
                        <Skeleton width="100px" height="22px" />
                    )}
                </SpecificItem>

                {!isBasic && (
                    <SpecificItem style={{ height: '28px' }}>
                        <SpecificLabelTypo>Label</SpecificLabelTypo>
                        {typeof label === 'string' ? (
                            <SpecificValueCover>{label}</SpecificValueCover>
                        ) : (
                            <Skeleton width="100px" height="22px" />
                        )}
                    </SpecificItem>
                )}
                {/* <SpecificItem>
                    <SpecificLabelTypo>Code ID</SpecificLabelTypo>
                    {codeID ? <SpecificValueTypo>{codeID}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem> */}
                <SpecificItem $isNFTList style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    <SpecificValueBox style={{ gap: 0 }}>
                        <IconButton
                            onClick={() => setExpandTotal(!expandTotal)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <SpecificValueWrapper>
                                {nftsInfo === null ? (
                                    <Skeleton width="80px" height="22px" />
                                ) : (
                                    <SpecificValueTypo style={{ display: 'flex' }}>
                                        {totalSupply}
                                        <span>{'NFT'}</span>
                                    </SpecificValueTypo>
                                )}
                            </SpecificValueWrapper>
                            <TableExpandButton $expand={expandTotal} src={IC_EXPAND} alt={'expand'} />
                        </IconButton>
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: expandTotal ? '1500px' : '0px',
                                overflow: 'hidden',
                                transition: 'all 0.5s ease'
                            }}
                        >
                            <div
                                style={{
                                    minHeight: '16px'
                                }}
                            />
                            <NFTTableContainer $expand={expandTotal}>
                                <NFTsTable
                                    codeId={codeId}
                                    contractAddress={contractAddress}
                                    nftsInfo={nftsInfo}
                                    nfts={nfts}
                                    currentPage={currentPage}
                                    handleNFTIdList={handleCW721NFTIdList}
                                    addNFTs={addNFTs}
                                    updateNFTs={updateNFTs}
                                    clearListData={clearCW721NFTListData}
                                    setCurrentPage={setCurrentPage}
                                    imageGap={{ horizontal: '16px' }}
                                />
                            </NFTTableContainer>
                        </div>
                    </SpecificValueBox>
                </SpecificItem>
                {address && (
                    <SpecificItem $isNFTList style={{ alignItems: 'flex-start' }}>
                        <SpecificLabelTypo>My NFTs</SpecificLabelTypo>
                        <SpecificValueBox style={{ gap: 0 }}>
                            <IconButton
                                onClick={() => setExpandOwned(!expandOwned)}
                                style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                            >
                                <SpecificValueWrapper>
                                    {myNFTsCountTypo === null ? (
                                        <Skeleton width="80px" height="22px" />
                                    ) : (
                                        <SpecificValueTypo>
                                            {myNFTsCountTypo}
                                            <span>{'NFT'}</span>
                                        </SpecificValueTypo>
                                    )}
                                </SpecificValueWrapper>
                                <TableExpandButton $expand={expandOwned} src={IC_EXPAND} alt={'expand'} />
                            </IconButton>
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxHeight: expandOwned ? '1500px' : '0px',
                                    overflow: 'hidden',
                                    transition: 'all 0.5s ease'
                                }}
                            >
                                <div
                                    style={{
                                        minHeight: '16px'
                                    }}
                                />
                                <NFTTableContainer $expand={expandOwned}>
                                    <NFTsTable
                                        codeId={codeId}
                                        contractAddress={contractAddress}
                                        nftsInfo={ownedNftsInfo}
                                        nfts={ownedNfts}
                                        currentPage={currentOwnedPage}
                                        handleNFTIdList={handleOwnedNFTIdList}
                                        addNFTs={addOwnedNFTs}
                                        updateNFTs={updateOwnedNFTs}
                                        clearListData={clearCW721OwnedNFTListData}
                                        setCurrentPage={setCurrentOwnedPage}
                                        imageGap={{ horizontal: '16px' }}
                                    />
                                </NFTTableContainer>
                            </div>
                        </SpecificValueBox>
                    </SpecificItem>
                )}
            </CardSpecific>
        </SectionContainer>
    );
};

const OwnerInformation = () => {
    const contractInfo = useNFTContractDetailStore((state) => state.contractDetail);
    const blockHeight = useCW721ExecuteStore((state) => state.blockHeight);

    const { setBlockHeight } = useCW721ExecuteAction();

    const admin = contractInfo?.ownerInfo.owner;
    const pending_owner = contractInfo?.ownerInfo.pending_owner;
    const pending_expiry = contractInfo?.ownerInfo.pending_expiry;
    const minter = contractInfo?.minter;

    useEffect(() => {
        setBlockHeight();
    }, []);

    const PendingExpiery = ({
        pendingOwner,
        expireInfo,
        expireBlockHeight
    }: {
        pendingOwner: string;
        expireInfo: Cw721Expires | null;
        expireBlockHeight: string;
    }) => {
        if (!pendingOwner && !expireInfo) return <SpecificDefaultTypo>Expires</SpecificDefaultTypo>;

        if (!expireInfo) return <SpecificValueTypo>Forever</SpecificValueTypo>;

        if (expireInfo['at_height']) {
            if (expireInfo['at_height'] !== '0' && expireBlockHeight !== '0') {
                if (compareStringNumbers(expireInfo['at_height'].toString(), expireBlockHeight) === 1) {
                    return (
                        <SpecificValueTypo>
                            {expireInfo['at_height']}
                            <SpecificSubValueType>Block</SpecificSubValueType>
                        </SpecificValueTypo>
                    );
                } else {
                    return (
                        <SpecificValueWrapper>
                            <IconTooltip size={'24px'} tooltip={'The height has expired.'} TooltipIcon={IC_WARNING_SIGN} />
                            <SpecificValueTypo style={{ color: '#5A5A5A' }}>{expireInfo['at_height']}</SpecificValueTypo>
                        </SpecificValueWrapper>
                    );
                }
            }
        }

        if (expireInfo['at_time']) {
            const nowTimestamp = new Date().getTime();
            const timeInMs = Math.floor(Number(expireInfo['at_time']) / 1000000);

            if (compareStringNumbers(timeInMs.toString(), nowTimestamp.toString()) === 1) {
                return <SpecificValueTypo>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</SpecificValueTypo>;
            } else {
                return (
                    <SpecificValueWrapper>
                        <IconTooltip size={'24px'} tooltip={'The time has expired.'} TooltipIcon={IC_WARNING_SIGN} />
                        <SpecificValueTypo style={{ color: '#5A5A5A' }}>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</SpecificValueTypo>
                    </SpecificValueWrapper>
                );
            }
        }

        return <SpecificValueTypo></SpecificValueTypo>;
    };

    return (
        <ContractCard>
            <CardHeaderTypo>{'Owner Information'}</CardHeaderTypo>
            <CardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>{'Admin'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {/*//! if ownership is renounced, admin value will be "None Assigned" so validation is requried */}
                        {!contractInfo ? (
                            <Skeleton width="100px" height="22px" />
                        ) : admin ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{admin}</SpecificValueTypo>
                                <CopyIconButton text={admin} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificValueTypo style={{ color: '#707070' }}>{'None Assigned'}</SpecificValueTypo>
                        )}
                        {/* {admin && isValidAddress(admin) ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{admin}</SpecificValueTypo>
                                <CopyIconButton text={admin} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificDefaultTypo>{admin || 'Admin Address'}</SpecificDefaultTypo>
                        )} */}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Pending Owner'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {!contractInfo ? (
                            <Skeleton width="100px" height="22px" />
                        ) : pending_owner ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{pending_owner}</SpecificValueTypo>
                                <CopyIconButton text={pending_owner} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificDefaultTypo>{'Wallet Address'}</SpecificDefaultTypo>
                        )}
                        {/* {pending_owner ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{pending_owner}</SpecificValueTypo>
                                <CopyIconButton text={pending_owner} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificDefaultTypo>{'Pending Owner'}</SpecificDefaultTypo>
                        )} */}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Pending Expiry'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {!contractInfo ? (
                            <Skeleton width="100px" height="22px" />
                        ) : (
                            <PendingExpiery pendingOwner={pending_owner} expireInfo={pending_expiry} expireBlockHeight={blockHeight} />
                        )}
                        {/* <PendingExpiery pendingOwner={pending_owner} expireInfo={pending_expiry} expireBlockHeight={blockHeight} /> */}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Minter'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {/*//! if ownership is renounced, admin value will be "None Assigned" so validation is requried */}
                        {!contractInfo ? (
                            <Skeleton width="100px" height="22px" />
                        ) : minter ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{minter}</SpecificValueTypo>
                                <CopyIconButton text={minter} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificDefaultTypo style={{ color: '#707070' }}>{'None Assigned'}</SpecificDefaultTypo>
                        )}
                        {/* {minter && isValidAddress(minter) ? (
                            <>
                                <SpecificValueTypo className="clamp-single-line">{minter}</SpecificValueTypo>
                                <CopyIconButton text={minter} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificDefaultTypo>{minter || 'Minter Address'}</SpecificDefaultTypo>
                        )} */}
                    </SpecificValueWrapper>
                </SpecificItem>
            </CardSpecific>
        </ContractCard>
    );
};

const Transactions = () => {
    const transactions = useNFTContractDetailStore((state) => state.transactions);

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

            <StyledTable columns={columns} rows={transactions || []} rowsPerPage={15} disablePagination slim />
        </SectionContainer>
    );
};

const TokenDetailCard = () => {
    return (
        <CardContainer>
            <TokenInfo />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <OwnerInformation />
            <Divider $direction="horizontal" $variant="dash" $color={'#383838'} />
            <Transactions />
        </CardContainer>
    );
};

export default TokenDetailCard;
