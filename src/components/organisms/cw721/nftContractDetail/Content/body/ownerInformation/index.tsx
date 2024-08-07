import { Cw721Expires } from '@firmachain/firma-js';
import { format } from 'date-fns';

import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';

import {
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueTypo,
    SpecificValueWrapper,
    SpecificSubValueType,
    ContractCard,
    CardHeaderTypo,
    CardSpecific
} from './style';
import { compareStringNumbers } from '@/utils/balance';
import IconTooltip from '@/components/atoms/tooltip';
import { IC_WARNING_SIGN } from '@/components/atoms/icons/pngIcons';
import useCW721ExecuteStore from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteStore';
import useCW721ExecuteAction from '@/components/organisms/cw721/execute/hooks/useCW721ExecuteAction';

const OwnerInformation = () => {
    const contractInfo = useNFTContractDetailStore((state) => state.contractDetail);
    const blockHeight = useCW721ExecuteStore((state) => state.blockHeight);

    const { setBlockHeight } = useCW721ExecuteAction();

    const admin = contractInfo?.admin || null;
    const pending_owner = contractInfo?.ownerInfo.pending_owner;
    const pending_expiry = contractInfo?.ownerInfo.pending_expiry;
    const minter = contractInfo?.minter;

    const PendingExpiery = ({ pendingOwner, expireInfo, expireBlockHeight }: { pendingOwner: string, expireInfo: Cw721Expires | null, expireBlockHeight: string }) => {
        if (!pendingOwner && !expireInfo) return <SpecificValueTypo>-</SpecificValueTypo>;

        if (!expireInfo) return <SpecificValueTypo>Forever</SpecificValueTypo>;

        if (expireInfo['at_height']) {
            if (expireInfo['at_height'] !== "0" && expireBlockHeight !== "0") {
                if (compareStringNumbers((expireInfo['at_height'] - 16000000).toString(), expireBlockHeight) === 1) {
                    return (
                        <SpecificValueTypo>
                            {expireInfo['at_height']}
                            <SpecificSubValueType>Block</SpecificSubValueType>
                        </SpecificValueTypo>
                    )
                } else {
                    return (
                        <SpecificValueWrapper>
                            <IconTooltip size={'24px'} tooltip={'The height has expired.'} TooltipIcon={IC_WARNING_SIGN}/>
                            <SpecificValueTypo style={{ color: '#5A5A5A' }}>{expireInfo['at_height']}</SpecificValueTypo>
                        </SpecificValueWrapper>
                    )
                }
            }
        }

        if (expireInfo['at_time']) {
            const nowTimestamp = new Date().getTime();
            const timeInMs = Math.floor(Number(expireInfo['at_time']) / 1000000);
            
            if (compareStringNumbers("1", nowTimestamp.toString()) === 1) {
                return (
                    <SpecificValueTypo>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</SpecificValueTypo>
                )
            } else {
                return (
                    <SpecificValueWrapper>
                        <IconTooltip size={'24px'} tooltip={'The time has expired.'} TooltipIcon={IC_WARNING_SIGN}/>
                        <SpecificValueTypo style={{ color: '#5A5A5A' }}>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</SpecificValueTypo>
                    </SpecificValueWrapper>
                )
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
                        <PendingExpiery pendingOwner={pending_owner} expireInfo={pending_expiry} expireBlockHeight={blockHeight} />
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

export default OwnerInformation;
