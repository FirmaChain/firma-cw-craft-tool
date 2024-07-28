import styled from "styled-components";
import CopyIconButton from "./copyIconButton";
import { useMemo } from "react";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
`

const TextTypo = styled.div`
    color: #999999;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
`

interface IProps {
    metaData: any;
}

const CopyMetadata = ({ metaData }: IProps) => {
    const isValidJSON = useMemo(() => {
        try {
            const jsonString = JSON.stringify(metaData);
            if (jsonString === '') {
                return false;
            }
            JSON.parse(jsonString);
            return true;
        } catch (e) {
            return false;
        }
    }, [metaData]);

    return (
        <Container style={{ display: isValidJSON ? 'flex' : 'none' }}>
            <TextTypo>
                {'Copy Metadata'}
            </TextTypo>
            <CopyIconButton width="22px" height="22px" text={JSON.stringify(metaData)} />
        </Container>
    )
}

export default CopyMetadata;