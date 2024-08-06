import Icons from '@/components/atoms/icons';
import MarketingItem from './marketingItem';
import { MarketingWrapper } from './style';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';

interface IProps {
    label: string;
    decimals: string;
    marketingAddress: string;
    marketingProject: string;
}
const Marketing = ({ label, decimals, marketingAddress, marketingProject }: IProps) => {
    const contractMode = useSelector((state: rootState) => state.global.contractMode);

    const isBasic = Boolean(contractMode === 'BASIC');

    return (
        <MarketingWrapper>
            <MarketingItem
                isCover={true}
                imageChild={<Icons.Tag width={'24px'} height={'24px'} />}
                name={'Label'}
                value={label}
                defaultValue="Label"
            />

            {!isBasic && (
                <MarketingItem
                    imageChild={<Icons.Percent width={'24px'} height={'24px'} />}
                    name={'Decimal'}
                    value={decimals}
                    defaultValue="Decimal"
                />
            )}

            {marketingAddress && (
                <MarketingItem
                    imageChild={<Icons.Wallet width={'24px'} height={'24px'} />}
                    name={'Marketing Address'}
                    value={marketingAddress}
                />
            )}
            {marketingProject && (
                <MarketingItem
                    imageChild={<Icons.Link width={'24px'} height={'24px'} />}
                    name={'Marketing Project'}
                    value={marketingProject}
                />
            )}
        </MarketingWrapper>
    );
};

export default Marketing;
