import styled from "styled-components";

import { Container, HeaderDescTypo, HeaderTitleTypo, HeaderWrap, TitleWrap } from "./styles";
import LabelInput2 from "@/components/atoms/input/labelInput2";
import { Fragment, useState } from "react";
import { BASIC_LABEL } from "@/constants/cw20Types";
import { useContractContext } from "../../context/contractContext";

const ContentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

interface IProps {
    label: string;
};

const UpdateMarketing = ({ label }: IProps) => {
    const { _setMarketingDescription, _setMarketingAddress, _setMarketingProject } = useContractContext();

    const [inputDescription, setInputDescription] = useState<string>("");
    const [inputAddress, setInputAddress] = useState<string>("");
    const [inputProject, setInputProject] = useState<string>("");

    const handleDescription = (value: string) => {
        setInputDescription(value);
        _setMarketingDescription(value);
    };

    const handleAddress = (value: string) => {
        setInputAddress(value);
        _setMarketingAddress(value);
    };

    const handleProject = (value: string) => {
        setInputProject(value);
        _setMarketingProject(value);
    };

    return (
        <Container>
            <HeaderWrap>
                <TitleWrap>
                    <HeaderTitleTypo>Update Marketing</HeaderTitleTypo>
                    <HeaderDescTypo>Change the marketing information associated with the token</HeaderDescTypo>
                </TitleWrap>
            </HeaderWrap>
            <ContentWrap>
                <LabelInput2
                    labelProps={{
                        label: "Marketing Description (Token Description)"
                    }}
                    inputProps={{
                        value: inputDescription,
                        formId: "input description",
                        placeHolder: "This is token Description",
                        onChange: handleDescription
                    }}
                />
                {label !== BASIC_LABEL && (
                    <Fragment>
                        <LabelInput2
                            labelProps={{
                                label: "Marketing Address (Optional)"
                            }}
                            inputProps={{
                                value: inputAddress,
                                formId: "input address",
                                placeHolder: "Input Wallet Address",
                                onChange: handleAddress
                            }}
                        />
                        <LabelInput2
                            labelProps={{
                                label: "Marketing Project (Optional)"
                            }}
                            inputProps={{
                                value: inputProject,
                                formId: "input project",
                                placeHolder: "ex) http://firmachain.org",
                                onChange: handleProject
                            }}
                        />
                    </Fragment>
                )}
            </ContentWrap>
        </Container>
    );
};

export default UpdateMarketing;