import SearchInputWithButton from '../../../../../atoms/input/searchInputWithButton';
import PaginatedTable from './pagination';
import { AllowanceContentWrapper, AllowanceWrapper, ItemLabel, SearchAllowancesTitleTypo, SearchAllowancesWrapper } from './style';

interface IProps {
    decimals: string;
    searchAllowances: any[];
    searchReceivers: any[];
}

const Headers = ['Receiver', 'Amount', 'Expires'];

const Allowances = ({ decimals, searchAllowances, searchReceivers }: IProps) => {
    return (
        <SearchAllowancesWrapper>
            <SearchAllowancesTitleTypo>Allowances</SearchAllowancesTitleTypo>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Allowances to others</ItemLabel>
                    <PaginatedTable decimals={decimals} headers={Headers} data={searchAllowances} itemsPerPage={5} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Received Allowances</ItemLabel>
                    <PaginatedTable decimals={decimals} headers={Headers} data={searchReceivers} itemsPerPage={5} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
        </SearchAllowancesWrapper>
    );
};

export default Allowances;
