import { Cw721Expires } from '@firmachain/firma-js';
import { format } from 'date-fns';

import CopyIconButton from '@/components/atoms/buttons/copyIconButton';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import { isValidAddress } from '@/utils/address';

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

const OwnerInformation = () => {
    const contractInfo = useNFTContractDetailStore((state) => state.contractDetail);

    const admin = contractInfo?.admin || null;
    const pending_owner = contractInfo?.ownerInfo.pending_owner;
    const pending_expiry = contractInfo?.ownerInfo.pending_expiry;
    const minter = contractInfo?.minter;

    const PendingExpiery = ({ pendingOwner,expireInfo }: { pendingOwner: string, expireInfo: Cw721Expires | null }) => {
        if (!pendingOwner && !expireInfo) return <SpecificValueTypo>-</SpecificValueTypo>;

        if (!expireInfo) return <SpecificValueTypo>Forever</SpecificValueTypo>;

        if (expireInfo['at_height'])
            return (
                <SpecificValueTypo>
                    {expireInfo['at_height']} <SpecificSubValueType>Block</SpecificSubValueType>
                </SpecificValueTypo>
            );

        if (expireInfo['at_time']) {
            const timeInMs = Math.floor(Number(expireInfo['at_time']) / 1000000);
            return <SpecificValueTypo>{format(timeInMs, 'MMMM-dd-yyyy HH:mm:ss a')}</SpecificValueTypo>;
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
                        <PendingExpiery pendingOwner={pending_owner} expireInfo={pending_expiry} />
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
