import CopyIconButton from '@/components/atoms/buttons/copyIconButton';

import {
    SpecificItem,
    SpecificLabelTypo,
    SpecificValueTypo,
    SpecificValueWrapper,
    ContractCard,
    CardHeaderTypo,
    CardSpecific
} from './style';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import Skeleton from '@/components/atoms/skeleton';
import useNFTContractDetailStore from '@/store/useNFTContractDetailStore';
import { Cw721Expires } from '@firmachain/firma-js';
import { format } from 'date-fns';
import { removeNanoSeconds } from '@/utils/time';

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
                <SpecificValueTypo>
                    {expireInfo['at_height']} <SpecificValueTypo>Block</SpecificValueTypo>
                </SpecificValueTypo>
            );

        const expireDate = new Date(Number(removeNanoSeconds(expireInfo['at_time'])) / 1000);

        if (expireInfo['at_time']) return <SpecificValueTypo>{format(expireDate, 'yyyy-MM-dd HH:mm:ss')}</SpecificValueTypo>;

        if (expireInfo['never']) return <SpecificValueTypo>Forever</SpecificValueTypo>;

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
                        {pending_expiry ? (
                            <PendingExpiery expireInfo={pending_expiry} />
                        ) : (
                            <SpecificValueTypo>{'-'}</SpecificValueTypo>
                        )}
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
