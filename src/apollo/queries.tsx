import { ApolloClient, gql } from "@apollo/client";
import { IMessageByAddress } from "../interfaces/graphql";

export const getTransactionsByAddress = async (
  client: ApolloClient<any>,
  contractAddress: string,
  limit: number = 15,
  offset: number = 0,
): Promise<IMessageByAddress | null> => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetMessagesByAddress($address: _text, $limit: bigint = 50, $offset: bigint = 0, $types: _text = "{}") {
          messagesByAddress: messages_by_address(
            args: {addresses: $address, types: $types, limit: $limit, offset: $offset}) {
            transaction {
              height
              hash
              success
              messages
              block {
                timestamp
              }
            }
          }
        }
      `,
      fetchPolicy: 'no-cache',
      variables: {
        address: `{${contractAddress}}`,
        types: `{}`,
        limit,
        offset
      }
    });

    return data;
  } catch(error: any) {
    console.log(error);
    return null;
  }
};

// firma1mp3dl27wwhdkhkyed5d4ypaq7h5dewazqkqhny98sxcy2cpu23ls369adt
// hash, type, block, from, result, time