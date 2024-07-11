import axios from 'axios';

const useAPI = () => {
    const checkRequest = async (requestUrl: string, requestKey: string) => {
        try {
            const requestData = await getRequestStatus(requestUrl, requestKey);
            return requestData;
        } catch (error) {
            return 0;
        }
    };

    const generateRequestQR = async (
        url: string,
        module: string,
        body = {}
    ): Promise<{ requestKey: string; qrcode: string; expire: Date } | null> => {
        try {
            const requestData = await generateRequest(url, module, body);
            return requestData;
        } catch (error) {
            return null;
        }
    };

    const generateRequest = async (
        requestUrl: string,
        requestType: string,
        requestBody = {}
    ): Promise<{ requestKey: string; qrcode: string; expire: Date }> => {
        const response = await axios.post(`${requestUrl}/connect/sign${requestType}`, requestBody);
        if (response.data.code !== 0) throw new Error('INVALID REQUEST');

        const { requestKey, qrcode } = response.data.result;

        const expire = new Date();
        expire.setMinutes(expire.getMinutes() + 3);

        return {
            requestKey,
            qrcode,
            expire
        };
    };

    const getRequestStatus = async (requestUrl: string, requestKey: string) => {
        console.log(requestKey);
        const response = await axios.get(`${requestUrl}/connect/requests/${requestKey}`);

        if (response.data.code < 0 || response.data.status === -1) {
            throw new Error('INVALID REQUEST');
        }

        return response.data.result;
    };

    return {
        checkRequest,
        generateRequestQR
    };
};

export default useAPI;
