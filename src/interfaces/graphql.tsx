import { IMessage } from "./cw20";

export interface IMessageByAddress {
  messagesByAddress: {
    transaction: {
      block: { timestamp: string };
      hash: string;
      height: number;
      messages: IMessage[];
      success: boolean;
    };
  }[];
}