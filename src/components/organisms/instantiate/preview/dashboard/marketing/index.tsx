import Icons from '@/components/atoms/icons';
import MarketingItem from './marketingItem';
import { MarketingWrapper } from './style';

interface IProps {
    label: string;
    decimals: string;
    marketingAddress: string;
    marketingProject: string;
}
const Marketing = ({ label, decimals, marketingAddress, marketingProject }: IProps) => {
    return (
        <MarketingWrapper>
            <MarketingItem isCover={true} imageChild={<Icons.Tag width={'24px'} height={'24px'} />} name={'Label'} value={label} />
            <MarketingItem imageChild={<Icons.Percent width={'24px'} height={'24px'} />} name={'Decimal'} value={decimals} />
            <MarketingItem
                imageChild={<Icons.Wallet width={'24px'} height={'24px'} />}
                name={'Marketing Address'}
                value={marketingAddress}
            />
            <MarketingItem imageChild={<Icons.Link width={'24px'} height={'24px'} />} name={'Marketing Project'} value={marketingProject} />
        </MarketingWrapper>
    );
};

export default Marketing;
