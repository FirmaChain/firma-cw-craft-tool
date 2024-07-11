import { useState } from 'react';

import {
    IconBackground,
    InformationBody,
    InformationWrapper,
    TextGroupWrapper,
    TitleDescription,
    TitleText,
    TitleWrapper,
    TokenNameSymbol
} from './style';
import InputTextWithLabel from '../../../../atoms/input/inputTextWithLabel';
import InputUrlWithImage from '../../../../atoms/input/inputUrlWithImage';

import Icons from '../../../../atoms/icons';

interface IProps {
    isBasic: boolean;
    // Basic Options
    onChangeTokenName: (value: string) => void;
    onChangeTokenSymbol: (value: string) => void;
    onChangeTokenLogoUrl: (value: string) => void;
    onChangeTokenDescription: (value: string) => void;
    // Advanced Options
    onChangeDecimals: (value: string) => void;
    onChangeLabel: (value: string) => void;
    onChangeMarketingAddress: (value: string) => void;
    onChangeMarketingProject: (value: string) => void;
}

const Information = ({
    isBasic,
    onChangeTokenName,
    onChangeTokenSymbol,
    onChangeTokenLogoUrl,
    onChangeTokenDescription,
    // Advanced Options
    onChangeDecimals,
    onChangeLabel,
    onChangeMarketingAddress,
    onChangeMarketingProject
}: IProps) => {
    const [tokenName, setTokenName] = useState<string>('');
    const [tokenSymbol, setTokenSymbol] = useState<string>('');
    const [tokenLogoUrl, setTokenLogoUrl] = useState<string>('');
    const [tokenDescription, setTokenDescription] = useState<string>('');
    const [decimals, setDecimals] = useState<string>('');
    const [label, setLabel] = useState<string>('');
    const [marketingAddress, setMarketingAddress] = useState<string>('');
    const [marketingProject, setMarketingProject] = useState<string>('');

    const handleTokenName = (value: string) => {
        setTokenName(value);
        onChangeTokenName(value);
    };

    const handleTokenSymbol = (value: string) => {
        setTokenSymbol(value);
        onChangeTokenSymbol(value);
    };

    const handleTokenLogoUrl = (value: string) => {
        setTokenLogoUrl(value);
        onChangeTokenLogoUrl(value);
    };

    const handleDescription = (value: string) => {
        setTokenDescription(value);
        onChangeTokenDescription(value);
    };
    const handleDecimals = (value: string) => {
        if (Number(value) < 0) {
            setDecimals('0');
            onChangeDecimals('0');
        } else {
            setDecimals(value);
            onChangeDecimals(value);
        }
    };

    const handleLabel = (value: string) => {
        setLabel(value);
        onChangeLabel(value);
    };

    const handleMarketingAddress = (value: string) => {
        setMarketingAddress(value);
        onChangeMarketingAddress(value);
    };

    const handleMarketingProject = (value: string) => {
        setMarketingProject(value);
        onChangeMarketingProject(value);
    };

    return (
        <InformationWrapper>
            <TitleWrapper>
                <IconBackground>
                    <Icons.Coins width={'32px'} height={'32px'} />
                </IconBackground>
                <TextGroupWrapper>
                    <TitleText>TOKEN INFORMATION</TitleText>
                    <TitleDescription>Input the token details.</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>
            <InformationBody>
                <TokenNameSymbol>
                    <InputTextWithLabel
                        label={'Token Name'}
                        placeHolderLeft={'ex) My CW Token'}
                        enableLength={true}
                        maxLength={30}
                        value={tokenName}
                        onChange={handleTokenName}
                    />
                    <InputTextWithLabel
                        label={'Token Symbol'}
                        placeHolderLeft={'ex) MCT, FCT'}
                        enableLength={true}
                        maxLength={6}
                        value={tokenSymbol}
                        onChange={handleTokenSymbol}
                    />
                </TokenNameSymbol>
                {!isBasic ? (
                    <>
                        <InputTextWithLabel
                            label={'Decimals'}
                            placeHolderLeft={'0 ~ 16'}
                            maxLength={16}
                            type={'number'}
                            value={decimals}
                            onChange={handleDecimals}
                        />
                        <InputTextWithLabel
                            label={'Label'}
                            placeHolderLeft={'ex) Event reward contract'}
                            value={label}
                            onChange={handleLabel}
                        />
                    </>
                ) : null}
                <InputUrlWithImage
                    label={isBasic ? 'Token Image Link (Optional)' : 'Marketing Logo (Optional)'}
                    placeHolder={'ex) https://example.thisismy.token.jpg'}
                    value={tokenLogoUrl}
                    onChange={handleTokenLogoUrl}
                />
                <InputTextWithLabel
                    label={isBasic ? 'Token Description (Optional)' : 'Marketing Description (Optional)'}
                    placeHolderLeft={'ex) This is my token'}
                    enableLength={false}
                    value={tokenDescription}
                    onChange={handleDescription}
                />
                {!isBasic ? (
                    <>
                        <InputTextWithLabel
                            label={'Marketing Address (Optional)'}
                            placeHolderLeft={'Input wallet Address'}
                            value={marketingAddress}
                            onChange={handleMarketingAddress}
                        />
                        <InputTextWithLabel
                            label={'Marketing Project (Optional)'}
                            placeHolderLeft={'ex) http://firmachain.org'}
                            value={marketingProject}
                            onChange={handleMarketingProject}
                        />
                    </>
                ) : null}
            </InformationBody>
        </InformationWrapper>
    );
};

export default Information;
