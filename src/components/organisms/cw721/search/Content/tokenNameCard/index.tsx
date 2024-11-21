import Divider from '@/components/atoms/divider';
import { Container, TokenName, TokenNameBox, TotalSupplyBox } from './style';
// import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import PinButton from '@/components/atoms/buttons/pinButton';
import usePinContractStore from '@/store/pinContractStore';
// import useCW721SearchStore from '../../cw721SearchStore';
import TextEllipsis from '@/components/atoms/ellipsis';
import { useCW721Detail } from '@/context/cw721DetailStore';
import useWalletStore from '@/store/walletStore';

const TokenNameCard = () => {
    const { address: userAddress } = useWalletStore();
    // const userAddress = useSelector((state: rootState) => state.wallet.address);

    const { contractDetail, nftsInfo } = useCW721Detail();
    const admin = contractDetail?.admin || '';
    const contractName = contractDetail?.name || '';
    const contractSymbol = contractDetail?.symbol || '';
    const totalSupply = nftsInfo?.totalSupply || '0';

    const isOwner = userAddress === admin;

    const { pinList, addPin, removePin } = usePinContractStore();
    const userPinList = pinList[userAddress.toLowerCase()]?.filter((v) => v.type === 'cw721') || [];

    const isPinned = Boolean(userPinList?.find((v) => v.contractAddress.toLowerCase() === contractDetail?.contractAddress.toLowerCase()));

    const handleOnClickPin = (evt) => {
        if (userAddress && contractDetail) {
            if (isPinned) removePin(userAddress, contractDetail.contractAddress);
            else
                addPin(userAddress, {
                    type: 'cw721',
                    address: userAddress,
                    contractAddress: contractDetail.contractAddress,
                    name: contractDetail.name,
                    symbol: contractDetail.symbol,
                    label: contractDetail.label,
                    tokenLogoUrl: ''
                });
        }
    };

    return (
        <Container>
            <div style={{ width: '100%' }}>
                <TokenNameBox>
                    <div className="token-name-box">
                        <div className="token-symbol">{contractSymbol}</div>
                    </div>

                    {isOwner && (
                        <div className="owner-tag">
                            <span className="owner-box-text">OWNER</span>
                        </div>
                    )}

                    <div className="divider" />

                    <TextEllipsis CustomDiv={TokenName} text={contractName} breakMode={'letters'} />
                    {/* <div className="token-name">{contractName}</div> */}

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <PinButton isPinned={isPinned} isBlocked={userPinList.length >= 10} onClick={handleOnClickPin} />
                    </div>
                </TokenNameBox>
                <div style={{ margin: '12px 0 8px' }}>
                    <Divider $color="var(--Gray-400, #2C2C2C)" $direction={'horizontal'} />
                </div>
                <TotalSupplyBox>
                    <div className="title">Total supply :</div>
                    <div className="amount">
                        <span className="bold">{totalSupply}</span> <span className="symbol">{'NFT'}</span>
                    </div>
                </TotalSupplyBox>
            </div>
        </Container>
    );
};

export default TokenNameCard;
