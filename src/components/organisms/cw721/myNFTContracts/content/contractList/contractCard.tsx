import { IC_LABEL_TAG } from '@/components/atoms/icons/pngIcons';
import { IContractInfo, useCW721NFTContractsContext } from '@/context/cw721MyNFTContractsContext';
import IconButton from '@/components/atoms/buttons/iconButton';
import Icons from '@/components/atoms/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useMyNFTContracts from '@/hooks/useMyNFTContracts';
import { useCallback } from 'react';
import FirmaLoading from '@/components/atoms/globalLoader/firmaLoad';

const Container = styled(IconButton)`
    width: 480px;
    height: fit-content;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 24px;
    background: var(--Gray-300, #222);
    overflow: hidden;

    filter: unset !important;

    &:hover {
        background: var(--Gray-450, #313131);
    }

    &:active {
        background: var(--Gray-400, #2c2c2c);
    }
`;

const TopBox = styled.div`
    width: 100%;
    display: flex;
    padding: 40px 44px 44px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 22px;

    @media only screen and (max-width: 1450px) {
        padding: 30px 34px 34px;
    }
`;

const BottomBox = styled.div`
    width: 100%;
    display: flex;
    padding: 22px 44px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-top: 1px solid var(--Gray-575, #474747);

    @media only screen and (max-width: 1450px) {
        padding: 22px 34px;
    }
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 12px;
`;

const SymbolBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SymbolTypo = styled.div`
    color: var(--Gray-900, var(--Primary-Base-White, #fff));
    font-family: 'General Sans Variable';
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    @media only screen and (max-width: 1450px) {
        font-size: 20px;
        line-height: 20px;
    }
`;

const ContractNameTypo = styled.div`
    color: var(--Gray-750, #999);
    font-family: 'General Sans Variable';
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;

    @media only screen and (max-width: 1450px) {
        font-size: 18px;
        line-height: 18px;
    }
`;

const LabelBox = styled.div`
    display: flex;
    padding: 4px 12px;
    align-items: center;
    gap: 8px;
    border-radius: 100px;
    background: var(--Gray-400, #2c2c2c);

    @media only screen and (max-width: 1450px) {
        margin-top: 10px;
    }
`;

const LabelTagImg = styled.img`
    width: 16px;
    height: 16px;
    object-fit: contain;
`;

const LabelTypo = styled.div`
    color: var(--Gray-650, #707070);
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    @media only screen and (max-width: 1450px) {
        font-size: 12px;
        line-height: 12px;
    }
`;

const TotalNftCountTypo = styled.div`
    color: var(--Gray-750, #606060);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;

    @media only screen and (max-width: 1450px) {
        font-size: 14px;
        line-height: 14px;
    }
`;

const PreviewNFTsBox = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    min-height: 36px;
`;

const ThumbnailBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 4px;
`;

const ThumbnailImg = styled.img`
    width: 36px;
    height: 36px;
    border: 1px solid #dcdcdc;
    border-radius: 100%;
    object-fit: cover;
    margin-left: -4px;
    background: #222;
`;

interface IProps {
    data: IContractInfo;
}

const ContractCard = ({ data }: IProps) => {
    const navigate = useNavigate();
    const { getCW721NFTsThumbnail } = useMyNFTContracts();
    const { contracts, updateContractInfo } = useCW721NFTContractsContext();

    const handleNFTsThumnnail = useCallback(async () => {
        try {
            const result = await getCW721NFTsThumbnail({ contractAddress: data.contractAddress });
            const newData: IContractInfo = { ...data, nftThumbnailURI: result };
            updateContractInfo(newData);
        } catch (error) {
            console.log(error);
        }
    }, [data]);

    const DisplayNFTCount = useCallback(() => {
        const totalNFTsCount = data.totalNFTs;
        const thumbnailURIs = data.nftThumbnailURI;

        if (totalNFTsCount === 0) {
            return (
                <PreviewNFTsBox>
                    <TotalNftCountTypo>{'No NFTs have been minted.'}</TotalNftCountTypo>
                </PreviewNFTsBox>
            );
        } else {
            if (thumbnailURIs === null) {
                handleNFTsThumnnail();
                return (
                    <PreviewNFTsBox style={{ gap: '5px' }}>
                        <FirmaLoading size={'20px'} />
                        <TotalNftCountTypo>{`NFTs Data Loading`}</TotalNftCountTypo>
                    </PreviewNFTsBox>
                );
            } else {
            }

            const count = totalNFTsCount > 999 ? '+999' : `+${totalNFTsCount}`;
            if (thumbnailURIs.filter((value) => value === '').length >= thumbnailURIs.length) {
                return (
                    <PreviewNFTsBox>
                        <TotalNftCountTypo>{`Total Minted NFTs : ${count}`}</TotalNftCountTypo>
                    </PreviewNFTsBox>
                );
            } else {
                return (
                    <PreviewNFTsBox>
                        <ThumbnailBox>
                            {thumbnailURIs
                                .filter((value) => value !== '')
                                .map((value, index) => {
                                    return <ThumbnailImg key={`${data.contractAddress}-nft-${index}`} src={value} alt={'NFT'} />;
                                })}
                        </ThumbnailBox>
                        <TotalNftCountTypo>{count}</TotalNftCountTypo>
                    </PreviewNFTsBox>
                );
            }
        }
    }, [data, contracts]);

    const handleMoveToDetail = () => {
        navigate(`/cw721/mynft/detail/${data.contractAddress}`);
    };

    return (
        <Container onClick={handleMoveToDetail}>
            <TopBox>
                <TitleBox>
                    <SymbolBox>
                        <SymbolTypo className="clamp-single-line">{data.symbol}</SymbolTypo>
                        <Icons.RightArrow width={'20px'} height={'20px'} stroke={'#FFFFFF'} />
                    </SymbolBox>
                    <ContractNameTypo className="clamp-single-line">{data.name}</ContractNameTypo>
                </TitleBox>
                <LabelBox>
                    <LabelTagImg src={IC_LABEL_TAG} alt={'cw721 label'} />
                    <LabelTypo className="clamp-single-line">{data.label}</LabelTypo>
                </LabelBox>
            </TopBox>
            <BottomBox>
                <DisplayNFTCount />
            </BottomBox>
        </Container>
    );
};

export default ContractCard;
