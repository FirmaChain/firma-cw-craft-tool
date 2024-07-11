import Icons from '../../../../../atoms/icons';
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
            <MarketingItem isCover={true} imageChild={<Icons.tag width={'24px'} height={'24px'} />} name={'Label'} value={label} />
            <MarketingItem imageChild={<Icons.percent width={'24px'} height={'24px'} />} name={'Decimal'} value={decimals} />
            <MarketingItem
                imageChild={<Icons.wallet width={'24px'} height={'24px'} />}
                name={'Marketing Address'}
                value={marketingAddress}
            />
            <MarketingItem imageChild={<Icons.link width={'24px'} height={'24px'} />} name={'Marketing Project'} value={marketingProject} />
        </MarketingWrapper>
    );
};

export default Marketing;
