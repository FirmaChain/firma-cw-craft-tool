import CopyIconButton from '@/components/atoms/buttons/copyIconButton';

import {
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueCover,
    SpecificValueTypo,
    SpecificValueWrapper,
    ContractCard,
    CardHeaderTypo,
    CardSpecific,
    SpecificValueBox,
    NFTTableContainer,
    TableExpandButton
} from './style';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { CRAFT_CONFIGS } from '@/config';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import IconButton from '@/components/atoms/buttons/iconButton';
import { IC_EXPAND } from '@/components/atoms/icons/pngIcons';
import NFTsTable from '@/components/organisms/cw721/common/nftsTable';
import { useCW721NFTListContext } from '@/context/cw721NFTListContext';
import useNFTContractDetail from '@/hooks/useNFTContractDetail';
import { useCW721OwnedNFTListContext } from '@/context/cw721OwnedNFTListContext';

const ContractInformation = () => {
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

    const [expandOwned, setExpandOwned] = useState(true);

    const contractAddress = contractDetail?.contractAddress || '';
    const codeId = contractDetail?.codeId || '';
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const codeID = contractDetail?.codeId || '';
    const label = contractDetail?.label;
    const totalSupply = nftsInfo?.totalSupply || '0';

    const handleOwnedNFTIdList = async (contractAddress: string) => {
        try {
            handleCW721OwnedNFTIdList(contractAddress, address);
        } catch (error) {
            console.log(error);
        }
    };

    const [expandTotal, setExpandTotal] = useState(true);
    const isBasic = useMemo(() => {
        return codeId === CRAFT_CONFIGS.CW20.BASIC_CODE_ID;
    }, [codeId]);

    const myNFTsCountTypo = useMemo(() => {
        if (!ownedNftsInfo) return null;

        if (ownedNftsInfo.totalNftIds.length > 99) return '99+';
        else return ownedNftsInfo.totalNftIds.length;
    }, [ownedNftsInfo]);

    return (
        <ContractCard>
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
                            <SpecificValueCover className="clamp-single-line">{label}</SpecificValueCover>
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
                                />
                            </NFTTableContainer>
                        </div>
                    </SpecificValueBox>
                </SpecificItem>
            </CardSpecific>
        </ContractCard>
    );
};

export default ContractInformation;
