import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { QRContainer, QRTimerText, RefreshIconButton } from './style';
import ConnectQR from '../../atoms/connectQR';
import { CRAFT_CONFIGS } from '../../../config';
import { rootState } from '../../../redux/reducers';
import useAPI from '../../../hooks/useAPI';
import Icons from '../../atoms/icons';

interface IProps {
  module: string;
  onSuccess: (requestData: Object) => void;
  onFailed: (requestData: Object) => void;
  params?: Object;
  signer?: string;
}

const RequestQR = ({ module, onSuccess, onFailed, params = {}, signer = '' }: IProps) => {
  const { network } = useSelector((state: rootState) => state.global);
  const { checkRequest, generateRequestQR } = useAPI();
  // const [craftServerURI, setCraftServerURI] = useState<string>(CRAFT_CONFIGS.MAINNET.CRAFT_SERVER_URI);

  const [requestKey, setRequestKey] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [expireDate, setExpireDate] = useState<Date | null>(null);
  const [timerText, setTimerText] = useState('02:59');
  const [activeQR, setActiveQR] = useState(false);

  const craftServerURI = useMemo(() => {
    const craftURI = network === 'MAINNET' ? CRAFT_CONFIGS.MAINNET.CRAFT_SERVER_URI : CRAFT_CONFIGS.TESTNET.CRAFT_SERVER_URI;
    return craftURI;
  }, [network]);

  useEffect(() => requestQR(), []);

  const requestQR = () => {
    generateRequestQR(craftServerURI, module, { ...params, signer })
      .then((result) => {
        if (result !== null) {
          setRequestKey(result.requestKey);
          setQrcode(result.qrcode);
          setExpireDate(result.expire);
          setActiveQR(true);
        } else {
          throw new Error('INVALID REQUEST');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshRequestQR = () => {
    setRequestKey('');
    setQrcode('');
    setExpireDate(null);
    setActiveQR(false);

    requestQR();
  };

  const onTickCheckRequest = async () => {
    checkRequest(craftServerURI, requestKey).then((requestData) => {
      if (requestData.status === "1") {
        setActiveQR(false);
        onSuccess(requestData);
      } else if (requestData.status === "-2") {
        setActiveQR(false);
        onFailed(requestData);
      }
    });
  };

  return (
    <QRContainer>
      <ConnectQR
        qrSize={140}
        qrcode={qrcode}
        expireDate={expireDate}
        isActive={activeQR}
        setTimerText={(value: string) => {
          setTimerText(value);
        }}
        onExpired={() => {
          setActiveQR(false);
          refreshRequestQR();
        }}
        onTick={() => {
          onTickCheckRequest();
        }}
      />
      {qrcode !== '' && (
        <QRTimerText onClick={() => refreshRequestQR()}>
          {timerText}
          <Icons.Edit />
          {/* <RefreshIconButton /> */}
        </QRTimerText>
      )}
    </QRContainer>
  );
};

export default React.memo(RequestQR);
