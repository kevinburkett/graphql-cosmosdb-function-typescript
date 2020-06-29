import { ApolloServer, gql } from "apollo-server-azure-functions";
//import { RESTDataSource } from "apollo-datasource-rest";
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient(process.env.DBConnectionString);

const typeDefs = gql`  
    type user {
        id: ID
        partitionkey: String!
        password: String!
        first_name: String
        last_name: String
        photo_url: String
        emails: [email]
        addresses: [address]
        phones: [phone]
        spouse: spouse
        children: [child]
    }

    type email {
        email: String!
        is_primary: Boolean!
    }

    type address {
        address: String!
        is_primary: Boolean!
    }

    type phone {
        phone: String!
        is_primary: Boolean!
    }

    type spouse {
        first_name: String!
        last_name: String!
    }

    type child {
        first_name: String!
        last_name: String!
    }

    type Query {
        getUser(partitionkey: String): [user]!
    }
`;

const resolvers = {
    Query: {
        async getUser(_, { partitionkey }: { partitionkey: string }) {
            let results = await client
                .database(process.env.Database)
                .container(process.env.UsersContainer)
                .items.query({
                    query: "SELECT * FROM c WHERE c.partitionkey = @partitionkey",
                    parameters: [
                        {
                            name: "@partitionkey",
                            value: "username_" + partitionkey
                        }
                    ]
                })
                .fetchAll();

                return results.resources;
        }
    }//,
    // Mutation: {
    //     async addUser(_, { user }: {})
    // }
};

const server = new ApolloServer({ typeDefs, resolvers, playground: process.env.NODE_ENV === "development" });
export default server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  });
