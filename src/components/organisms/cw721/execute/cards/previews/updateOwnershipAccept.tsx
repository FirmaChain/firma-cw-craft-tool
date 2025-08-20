import { styled } from 'styled-components';
import { Container } from '../functions/styles';
import { IC_CHECK_SQUARE, IC_CLOCK, IC_ROUND_ARROW_DOWN, IC_ROUND_ARROW_UP, IC_WALLET } from '@/components/atoms/icons/pngIcons';
import { useEffect, useMemo, useState } from 'react';
// import useCW721ExecuteStore from '../../hooks/useCW721ExecuteStore';
import GreenButton from '@/components/atoms/buttons/greenButton';

// import { IAllowanceInfo } from '@/components/organisms/execute/hooks/useExecuteStore';
import commaNumber from 'comma-number';
import { format } from 'date-fns';
import useModalStore from '@/store/modalStore';
import { CRAFT_CONFIGS } from '@/config';
import useCW721ExecuteAction from '../../hooks/useCW721ExecuteAction';
import { Cw721Expires } from '@firmachain/firma-js';
import { addNanoSeconds } from '@/utils/time';
import { compareStringNumbers } from '@/utils/balance';
import QRModal2, { ModalType } from '@/components/organisms/modal/qrModal2';
import TxModal from '@/components/organisms/modal/txModal';
import { useSnackbar } from 'notistack';
import { useCW721Execute } from '@/context/cw721ExecuteContext';
import { IAllowanceInfo } from '@/context/cw20ExecuteContext';
import useWalletStore from '@/store/walletStore';

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 32px 44px;
    border-radius: 24px;
    border: 1px solid var(--Gray-550, #444);
    gap: 20px;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ContentTitleWrap = styled.div`
    display: flex;
    gap: 17px;
    align-items: center;
`;

const TitleIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const TitleTypo = styled.div`
    color: #02e191;
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
`;

const FoldingButton = styled.div`
    cursor: pointer;
`;

const FoldingIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ContentBodyWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px 32px;
    gap: 20px;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
`;

const ContentItemWrap = styled.div`
    display: flex;
    gap: 16px;
`;

const ContentItemIcon = styled.img`
    width: 20px;
    height: 20px;
`;

const ContentItemValue = styled.div<{ $hasData: boolean }>`
    /* color: var(--Gray-500, #383838); */
    color: ${({ $hasData: hasData }) => (hasData ? '#707070' : '#383838')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const ButtonWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AccordionTypo = styled.div<{ $disabled?: boolean }>`
    color: ${({ $disabled }) => ($disabled ? 'var(--Gray-500, #383838)' : 'var(--Gray-650, #707070)')};
    font-family: 'General Sans Variable';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
`;

const AccordionBox = styled.div<{ $isOpen: boolean }>`
    height: fit-content;
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: var(--Gray-150, #141414);
    transition: all 0.15s ease;
    gap: 20px;

    ${({ $isOpen }) =>
        $isOpen
            ? `
        max-height: 100%;
        padding: 24px 32px;
        gap: 20px;
        opacity: 1;
    `
            : `
        max-height: 0px;
        padding: 0px 32px;
        gap: 0px;
        opacity: 0;
    `}
`;

const AccordionRow = styled.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '16px',

    img: { width: '20px', height: '20px' }
});

const ExpirationBox = ({ allowanceInfo }: { allowanceInfo?: IAllowanceInfo | null }) => {
    if (!allowanceInfo) return <AccordionTypo $disabled>Expiration</AccordionTypo>;

    if (allowanceInfo.type === 'never') return <AccordionTypo $disabled={false}>Forever</AccordionTypo>;
    if (!allowanceInfo.expire) return <AccordionTypo $disabled={true}>Expiration</AccordionTypo>;
    if (allowanceInfo.type === 'at_height')
        return <AccordionTypo $disabled={false}>{commaNumber(allowanceInfo?.expire)} Block</AccordionTypo>;
    if (allowanceInfo.type === 'at_time') {
        const timeInMs = Math.floor(Number(allowanceInfo.expire) / 1000000);
        return <AccordionTypo $disabled={false}>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</AccordionTypo>;
    }

    return <></>;
};

const USE_WALLET_CONNECT = CRAFT_CONFIGS.USE_WALLET_CONNECT;

const UpdateOwnershipAccept = () => {
    const { address, fctBalance } = useWalletStore();
    // const address = useSelector((state: rootState) => state.wallet.address);

    const context = useCW721Execute();
    const contractAddress = context.contractAddress;
    const nftContractInfo = context.nftContractInfo;
    // const fctBalance = context.fctBalance
    // const fctBalance = useSelector((v: rootState) => v.wallet.fctBalance);
    const ownershipInfo = context.ownershipInfo;
    const blockHeight = context.blockHeight;
    const clearSelectMenu = context.clearSelectMenu;

    const { setOwnershipInfo, setMinter } = useCW721ExecuteAction();

    const [isOriginOwnerOpen, setIsOriginOwnerOpen] = useState<boolean>(false);
    const [isNewOwnerOpen, setIsNewOwnerOpen] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const modal = useModalStore();

    useEffect(() => {
        if (!contractAddress) return;

        setOwnershipInfo(contractAddress);
    }, []);

    const isExpiry = (expiry: Cw721Expires) => {
        if (expiry === null) return false;

        if ('at_height' in expiry) {
            if (expiry.at_height <= Number(blockHeight)) return true;
        } else if ('at_time' in expiry) {
            const nowTimestamp = addNanoSeconds(Date.now().toString());
            if (compareStringNumbers(expiry.at_time, nowTimestamp) !== 1) return true;
        }
        return false;
    };

    const isDisableButton = useMemo(() => {
        if (ownershipInfo) {
            if (ownershipInfo.pending_owner === '' || ownershipInfo.pending_owner !== address) return true;
            if (ownershipInfo.pending_owner === address && isExpiry(ownershipInfo.pending_expiry)) return true;
        }

        return false;
    }, [ownershipInfo, address, blockHeight]);

    const onClickOriginOwnerFolding = () => {
        setIsOriginOwnerOpen(!isOriginOwnerOpen);
    };

    const onClickNewOwnerFolding = () => {
        setIsNewOwnerOpen(!isNewOwnerOpen);
    };

    const onClickUpdateOwnershipAccept = () => {
        if (modal.modals.length >= 1) return;

        if (Number(fctBalance) === 0) {
            enqueueSnackbar({ message: 'Insufficient funds. Please check your account balance.', variant: 'error' });
            return;
        }

        const feeAmount = CRAFT_CONFIGS.DEFAULT_FEE;

        const msg = {
            key: 'accept_ownership'
        };

        const params = {
            modalType: 'EXECUTES' as ModalType,
            header: {
                title: 'Update Ownership Accept'
            },
            txParams: {
                contract: contractAddress,
                msg,
                totalLength: JSON.stringify(msg).length
            },
            contentParams: {
                symbol: nftContractInfo.symbol,
                fctAmount: fctBalance,
                feeAmount: feeAmount.toString(),
                list: [
                    {
                        label: 'Sender Address',
                        value: ownershipInfo.owner,
                        type: 'wallet',
                        initColor: '#FFF',
                        resultColor: '#FFF'
                    },
                    {
                        label: 'Expiration',
                        value: ownershipInfo.pending_expiry === null ? {} : Object.values(ownershipInfo.pending_expiry)[0],
                        type: ownershipInfo.pending_expiry === null ? 'never' : Object.keys(ownershipInfo.pending_expiry)[0],
                        initColor: '#FFF',
                        resultColor: '#FFF'
                    }
                ]
            }
        };

        modal.openModal({
            modalType: 'custom',
            _component: ({ id }) => {
                return !USE_WALLET_CONNECT ? (
                    <TxModal
                        module="/cw721/updateOwnershipAccept"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            setOwnershipInfo(contractAddress);
                            setMinter(contractAddress);
                            clearSelectMenu();
                        }}
                        hideGotoDetail={false}
                    />
                ) : (
                    <QRModal2
                        module="/cw721/updateOwnershipAccept"
                        id={id}
                        params={params}
                        onClickConfirm={() => {
                            setOwnershipInfo(contractAddress);
                            setMinter(contractAddress);
                            clearSelectMenu();
                        }}
                        hideGotoDetail={false}
                    />
                );
            }
        });
    };

    return (
        <Container>
            <ContentWrap>
                <ContentHeader>
                    <ContentTitleWrap>
                        <TitleIcon src={IC_CHECK_SQUARE} alt={'New Ownership Accept Header Icon'} />
                        <TitleTypo>Update Ownership Info</TitleTypo>
                    </ContentTitleWrap>
                    <FoldingButton onClick={onClickNewOwnerFolding}>
                        <FoldingIcon
                            src={isNewOwnerOpen ? IC_ROUND_ARROW_DOWN : IC_ROUND_ARROW_UP}
                            alt={'New Ownership Accept Folding Icon'}
                        />
                    </FoldingButton>
                </ContentHeader>
                <AccordionBox $isOpen={!isNewOwnerOpen}>
                    <AccordionRow>
                        <img src={IC_WALLET} alt="wallet" />
                        {ownershipInfo.pending_owner && ownershipInfo.pending_owner === null && (
                            <AccordionTypo $disabled>Wallet Address</AccordionTypo>
                        )}
                        {ownershipInfo.pending_owner && ownershipInfo.pending_owner !== null && (
                            <AccordionTypo $disabled={false}>{ownershipInfo.pending_owner}</AccordionTypo>
                        )}
                    </AccordionRow>
                    <AccordionRow>
                        <img src={IC_CLOCK} alt="clock" />
                        {ownershipInfo && ownershipInfo.pending_owner === null && ownershipInfo.pending_expiry === null && (
                            <AccordionTypo $disabled>Expiration</AccordionTypo>
                        )}
                        {ownershipInfo && ownershipInfo.pending_owner !== null && ownershipInfo.pending_expiry === null && (
                            <AccordionTypo $disabled={false}>{'Forever'}</AccordionTypo>
                        )}
                        {ownershipInfo && ownershipInfo.pending_expiry !== null && (
                            <ExpirationBox
                                allowanceInfo={{
                                    address: '',
                                    amount: '',
                                    type: Object.keys(ownershipInfo.pending_expiry)[0],
                                    expire: Object.values(ownershipInfo.pending_expiry)[0]
                                }}
                            />
                        )}
                    </AccordionRow>
                </AccordionBox>
                {/* {!isNewOwnerOpen && (
                    <ContentBodyWrap>
                        <ContentItemWrap>
                            <ContentItemIcon src={IC_WALLET} />
                            {ownershipInfo && ownershipInfo.pending_owner === null && (
                                <ContentItemValue $hasData={false}>Not pending owner</ContentItemValue>
                            )}
                            {ownershipInfo && ownershipInfo.pending_owner !== null && (
                                <ContentItemValue $hasData={true}>{ownershipInfo.pending_owner}</ContentItemValue>
                            )}
                        </ContentItemWrap>
                        <ContentItemWrap>
                            <ContentItemIcon src={IC_CLOCK} />
                            {ownershipInfo && ownershipInfo.pending_owner === null && ownershipInfo.pending_expiry === null && (
                                <ContentItemValue $hasData={false}>Expiration</ContentItemValue>
                            )}
                            {ownershipInfo && ownershipInfo.pending_owner !== null && ownershipInfo.pending_expiry === null && (
                                <ContentItemValue $hasData={true}>Forever</ContentItemValue>
                            )}
                            {ownershipInfo && ownershipInfo.pending_expiry !== null && (
                                <ExpirationBox
                                    allowanceInfo={{
                                        address: '',
                                        amount: '',
                                        type: Object.keys(ownershipInfo.pending_expiry)[0],
                                        expire: Object.values(ownershipInfo.pending_expiry)[0]
                                    }}
                                />
                            )}
                        </ContentItemWrap>
                    </ContentBodyWrap>
                )} */}
            </ContentWrap>
            <ButtonWrap>
                <GreenButton disabled={isDisableButton} onClick={onClickUpdateOwnershipAccept}>
                    <div className="button-text">Accept</div>
                </GreenButton>
            </ButtonWrap>
        </Container>
    );
};

export default UpdateOwnershipAccept;
