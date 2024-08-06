import Divider from '@/components/atoms/divider';
import { CardContainer, SectionContainer } from '../style';
import useCW721SearchStore from '../../cw721SearchStore';
import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import { useMemo, useState } from 'react';
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
    SpecificValueWrapper,
    TableExpandButton
} from './style';
import NFTsTable from '../../../common/nftsTable';
import { IC_EXPAND } from '@/components/atoms/icons/pngIcons';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import { useCW721NFTListContext } from '@/context/cw721NFTListContext';
import { useCW721OwnedNFTListContext } from '@/context/cw721OwnedNFTListContext';

const TokenInfo = () => {
    const network = useSelector((v: rootState) => v.global.network);
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
        const craftConfig = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET : CRAFT_CONFIGS.TESTNET;
        return codeId === craftConfig.CW20.BASIC_CODE_ID;
    }, [network, codeId]);

    const [expandTotal, setExpandTotal] = useState(true);
    const [expandOwned, setExpandOwned] = useState(true);

    const handleOwnedNFTIdList = async (contractAddress: string) => {
        try {
            handleCW721OwnedNFTIdList(contractAddress, address);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SectionContainer>
            <CardHeaderTypo>Contract Information</CardHeaderTypo>

            <CardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Address</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {contractAddress ? (
                            <>
                                <SpecificValueTypo>{contractAddress}</SpecificValueTypo>
                                <CopyIconButton text={contractAddress} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Name</SpecificLabelTypo>
                    {contractName ? <SpecificValueTypo>{contractName}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>Contract Symbol</SpecificLabelTypo>
                    {contractSymbol ? <SpecificValueTypo>{contractSymbol}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
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
                <SpecificItem>
                    <SpecificLabelTypo>Code ID</SpecificLabelTypo>
                    {codeID ? <SpecificValueTypo>{codeID}</SpecificValueTypo> : <Skeleton width="100px" height="22px" />}
                </SpecificItem>
                <SpecificItem $isNFTList style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>Total Supply</SpecificLabelTypo>
                    <SpecificValueBox>
                        <IconButton
                            onClick={() => setExpandTotal(!expandTotal)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <SpecificValueWrapper>
                                <SpecificValueTypo>
                                    {`${totalSupply === null ? 0 : totalSupply}`}
                                    <span>{'NFT'}</span>
                                </SpecificValueTypo>
                            </SpecificValueWrapper>
                            <TableExpandButton $expand={expandTotal} src={IC_EXPAND} alt={'expand'} />
                        </IconButton>
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
                            />
                        </NFTTableContainer>
                    </SpecificValueBox>
                </SpecificItem>
                <SpecificItem $isNFTList style={{ alignItems: 'flex-start' }}>
                    <SpecificLabelTypo>My NFTs</SpecificLabelTypo>
                    <SpecificValueBox>
                        <IconButton
                            onClick={() => setExpandOwned(!expandOwned)}
                            style={{ padding: 0, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                        >
                            <SpecificValueWrapper>
                                <SpecificValueTypo>
                                    <span style={{ paddingLeft: 0 }}>{'NFT'}</span>
                                </SpecificValueTypo>
                            </SpecificValueWrapper>
                            <TableExpandButton $expand={expandOwned} src={IC_EXPAND} alt={'expand'} />
                        </IconButton>
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
                            />
                        </NFTTableContainer>
                    </SpecificValueBox>
                </SpecificItem>
            </CardSpecific>
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

const OwnerInformation = () => {
    const contractInfo = useNFTContractDetailStore((state) => state.contractDetail);

    const admin = contractInfo?.admin || null;
    const pending_owner = contractInfo?.ownerInfo.pending_owner;
    const pending_expiry = contractInfo?.ownerInfo.pending_expiry;
    const minter = contractInfo?.minter;

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

    return (
        <ContractCard>
            <CardHeaderTypo>{'Owner Information'}</CardHeaderTypo>
            <CardSpecific>
                <SpecificItem>
                    <SpecificLabelTypo>{'Admin'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {admin ? (
                            <>
                                <SpecificValueTypo>{admin}</SpecificValueTypo>
                                <CopyIconButton text={admin} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <Skeleton width="200px" height="22px" />
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Pending Owner'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {pending_owner ? (
                            <>
                                <SpecificValueTypo>{pending_owner}</SpecificValueTypo>
                                <CopyIconButton text={pending_owner} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificValueTypo>{'-'}</SpecificValueTypo>
                        )}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Pending Expiry'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {pending_expiry ? <PendingExpiery expireInfo={pending_expiry} /> : <SpecificValueTypo>{'-'}</SpecificValueTypo>}
                    </SpecificValueWrapper>
                </SpecificItem>
                <SpecificItem>
                    <SpecificLabelTypo>{'Minter'}</SpecificLabelTypo>
                    <SpecificValueWrapper>
                        {minter ? (
                            <>
                                <SpecificValueTypo>{minter}</SpecificValueTypo>
                                <CopyIconButton text={minter} width={'22px'} height={'22px'} />
                            </>
                        ) : (
                            <SpecificValueTypo>{'-'}</SpecificValueTypo>
                        )}
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

            <StyledTable columns={columns} rows={transactions} rowsPerPage={15} disablePagination />
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
