import { IWallet } from '../../../../interfaces/wallet';
import AddWallet from './addWallet';
import Information from './information';
import { ContentWrapper } from './style';

interface IProps {
    isBasic: boolean;
    tokenSymbol: string;
    walletCount: number;
    totalSupply: string;
    decimals: string;
    // TOKENS
    onChangeTokenName: (value: string) => void;
    onChangeTokenSymbol: (value: string) => void;
    onChangeTokenLogoUrl: (value: string) => void;
    onChangeTokenDescription: (value: string) => void;
    onChangeDecimals: (value: string) => void;
    onChangeLabel: (value: string) => void;
    onChangeMarketingAddress: (value: string) => void;
    onChangeMarketingProject: (value: string) => void;
    // WALLETS
    onChangeWalletList: (value: IWallet[]) => void;
    onChangeMinterble: (value: boolean) => void;
    onChangeMinterCap: (value: string) => void;
    onChangeMinterAddress: (value: string) => void;
}

const Content = ({
    isBasic,
    tokenSymbol,
    walletCount,
    totalSupply,
    decimals,
    // TOKENS
    onChangeTokenName,
    onChangeTokenSymbol,
    onChangeTokenLogoUrl,
    onChangeTokenDescription,
    onChangeDecimals,
    onChangeLabel,
    onChangeMarketingAddress,
    onChangeMarketingProject,
    // WALLETS
    onChangeWalletList,
    onChangeMinterble,
    onChangeMinterCap,
    onChangeMinterAddress
}: IProps) => {
    return (
        <ContentWrapper>
            <Information
                isBasic={isBasic}
                onChangeTokenName={onChangeTokenName}
                onChangeTokenSymbol={onChangeTokenSymbol}
                onChangeTokenLogoUrl={onChangeTokenLogoUrl}
                onChangeTokenDescription={onChangeTokenDescription}
                onChangeDecimals={onChangeDecimals}
                onChangeLabel={onChangeLabel}
                onChangeMarketingAddress={onChangeMarketingAddress}
                onChangeMarketingProject={onChangeMarketingProject}
            />
            <AddWallet
                tokenSymbol={tokenSymbol}
                walletCount={walletCount}
                totalSupply={totalSupply}
                decimals={decimals}
                onChangeWalletList={onChangeWalletList}
                onChangeMinterble={onChangeMinterble}
                onChangeMinterCap={onChangeMinterCap}
                onChangeMinterAddress={onChangeMinterAddress}
            />
        </ContentWrapper>
    );
};

export default Content;
