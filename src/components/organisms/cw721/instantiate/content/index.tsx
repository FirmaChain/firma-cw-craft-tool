import { IC_DOCUMENT } from '@/components/atoms/icons/pngIcons';
import LabelInput from '@/components/atoms/input/labelInput';
import styled from 'styled-components';
import useInstantiateStore from '../instantiateStore';
import { useSelector } from 'react-redux';
import { rootState } from '@/redux/reducers';
import { useEffect } from 'react';
import { ENG_NUM_SPACE, ONLY_ENGLISH, WALLET_ADDRESS_REGEX } from '@/constants/regex';

const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 48px 48px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 24px;
    background: var(--200, #1e1e1e);
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
`;

const TitleIconWrapper = styled.div`
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6.933px;
    background: var(--Gray-450, #313131);
`;

const TitleIcon = styled.img`
    width: 32px;
    height: 32px;
`;

const TextGroupWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const TitleText = styled.div`
    color: var(--Green-300, #63f6a5);
    font-family: 'General Sans Variable';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
`;

const TitleDescription = styled.div`
    color: var(--Gray-650, #807e7e);
    font-family: 'General Sans Variable';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

const InformationBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const AdvancedContractWrap = styled.div`
    width: 100%;
    display: flex;
    gap: 12px;
`;

const Content = ({ isBasic }: { isBasic: boolean }) => {
    const contractMode = useSelector((state: rootState) => state.global.contractMode);

    const nftName = useInstantiateStore((v) => v.nftName);
    const nftSymbol = useInstantiateStore((v) => v.nftSymbol);
    const minter = useInstantiateStore((v) => v.minter);
    const admin = useInstantiateStore((v) => v.admin);
    const label = useInstantiateStore((v) => v.label);
    const setNftName = useInstantiateStore((v) => v.setNftName);
    const setNftSymbol = useInstantiateStore((v) => v.setNftSymbol);
    const setMinter = useInstantiateStore((v) => v.setMinter);
    const setAdmin = useInstantiateStore((v) => v.setAdmin);
    const setLabel = useInstantiateStore((v) => v.setLabel);

    useEffect(() => {
        setMinter('');
        setAdmin('');
    }, [contractMode]);

    return (
        <ContentWrapper>
            <TitleWrapper>
                <TitleIconWrapper>
                    <TitleIcon src={IC_DOCUMENT} alt={'CW721 Instantiate Title Icon'} />
                </TitleIconWrapper>
                <TextGroupWrapper>
                    <TitleText>NFT CONRACT INFORMATION</TitleText>
                    <TitleDescription>Input the NFT contract details</TitleDescription>
                </TextGroupWrapper>
            </TitleWrapper>
            <InformationBody>
                {isBasic ? (
                    <>
                        <LabelInput
                            labelProps={{ label: 'NFT Contract Name' }}
                            inputProps={{
                                value: nftName,
                                formId: 'nftContractName',
                                placeHolder: 'ex) My CW Token',
                                maxLength: 30,
                                onChange: setNftName,
                                emptyErrorMessage: 'Please input token name.',
                                regex: ENG_NUM_SPACE
                            }}
                        />
                        <LabelInput
                            labelProps={{ label: 'NFT Contract Symbol', subText: 'Minimum 3 charactes' }}
                            inputProps={{
                                value: nftSymbol,
                                formId: 'nftContractSymbol',
                                placeHolder: 'ex) MCT, FCT',
                                maxLength: 12,
                                onChange: setNftSymbol,
                                emptyErrorMessage: 'Please input token symbol.',
                                regex: ONLY_ENGLISH
                            }}
                        />
                    </>
                ) : (
                    <AdvancedContractWrap>
                        <LabelInput
                            labelProps={{ label: 'NFT Contract Name' }}
                            inputProps={{
                                value: nftName,
                                formId: 'nftContractName',
                                placeHolder: 'ex) My CW Token',
                                maxLength: 30,
                                onChange: setNftName,
                                emptyErrorMessage: 'Please input token name.',
                                regex: ENG_NUM_SPACE
                            }}
                        />
                        <LabelInput
                            labelProps={{ label: 'NFT Contract Symbol', subText: 'Minimum 3 charactes' }}
                            inputProps={{
                                value: nftSymbol,
                                formId: 'nftContractSymbol',
                                placeHolder: 'ex) MCT, FCT',
                                maxLength: 12,
                                onChange: setNftSymbol,
                                emptyErrorMessage: 'Please input token symbol.',
                                regex: ONLY_ENGLISH
                            }}
                        />
                    </AdvancedContractWrap>
                )}
                {!isBasic && (
                    <LabelInput
                        labelProps={{ label: 'Admin Address' }}
                        inputProps={{
                            value: admin,
                            formId: 'adminAddress',
                            placeHolder: 'Input wallet Address',
                            onChange: setAdmin,
                            regex: WALLET_ADDRESS_REGEX
                        }}
                    />
                )}
                {!isBasic && (
                    <LabelInput
                        labelProps={{ label: 'Minter Address' }}
                        inputProps={{
                            value: minter,
                            formId: 'minterAddress',
                            placeHolder: 'Input wallet Address',
                            onChange: setMinter,
                            regex: WALLET_ADDRESS_REGEX
                        }}
                    />
                )}
                <LabelInput
                    labelProps={{ label: 'Label' }}
                    inputProps={{
                        value: label,
                        formId: 'label',
                        placeHolder: 'ex) Event reward contract',
                        onChange: setLabel,
                        regex: ENG_NUM_SPACE
                    }}
                />
            </InformationBody>
        </ContentWrapper>
    );
};

export default Content;
