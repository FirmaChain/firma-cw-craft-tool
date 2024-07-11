import { Cw20SpenderAllowance } from "@firmachain/firma-js";
import { AllowanceCard, AllowanceWrapper, AllowanceCardHeaderTypo, AllowanceCardHeaderWrapper, AllowanceContentWrapper, AllowanceItem, ItemLabel } from "./style";
import PaginatedTable from "./pagination";
import SearchInput from "../../../../../atoms/input/searchInput";
import { useEffect, useState } from "react";
import Icons from "../../../../../atoms/icons";
import { IAllowances, ISpenders } from "../../../../../../hooks/useTokenDetail";

interface IProps {
    decimals: string;
    allAllowances: IAllowances[];
    allSpenders: ISpenders[];
}

const Headers = ["Receiver", "Amount", "Expires"];

const MyAllowances = ({ decimals, allAllowances, allSpenders }: IProps) => {
    const [searchAddress, setSearchAddress] = useState<string>("");

    const [allowancesToShow, setAllowancesToShow] = useState<IAllowances[]>([]);
    const [receiverToShow, setReceiverToShow] = useState<ISpenders[]>([]);

    const handleSearchAddress = (value: string) => {
        setSearchAddress(value);
    };

    useEffect(() => {
        const filteredAllowances = searchAddress ? allAllowances.filter((allowance) => allowance["Receiver"] === searchAddress) : allAllowances;
        const findAllowance = filteredAllowances.length > 0 ? filteredAllowances : allAllowances;
        setAllowancesToShow(findAllowance);

        const filteredReceivers = searchAddress ? allSpenders.filter((receiver) => receiver["Receiver"] === searchAddress) : allSpenders;
        const findReceiver = filteredReceivers.length > 0 ? filteredReceivers : allSpenders;
        setReceiverToShow(findReceiver);
    }, [searchAddress, allAllowances, allSpenders]);

    return (
        <AllowanceCard>
            <AllowanceCardHeaderWrapper>
                <AllowanceCardHeaderTypo>My Allowances</AllowanceCardHeaderTypo>
                <SearchInput
                    placeholder={"Search Wallet Address"}
                    value={searchAddress}
                    onChange={handleSearchAddress}
                    icon={<Icons.search width={"15px"} height={"15px"} />}
                    sx={{
                        width: "564px",
                        height: "44px",
                    }}
                />
            </AllowanceCardHeaderWrapper>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Allowances to others</ItemLabel>
                    <PaginatedTable decimals={decimals} headers={Headers} data={allowancesToShow} itemsPerPage={5} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
            <AllowanceWrapper>
                <AllowanceContentWrapper>
                    <ItemLabel>Received Allowances</ItemLabel>
                    <PaginatedTable decimals={decimals} headers={Headers} data={receiverToShow} itemsPerPage={5} />
                </AllowanceContentWrapper>
            </AllowanceWrapper>
        </AllowanceCard>
    );
};

export default MyAllowances;
