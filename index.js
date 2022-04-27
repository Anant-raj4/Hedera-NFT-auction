const { Client, AccountId, PrivateKey } = require("@hashgraph/sdk");
require("dotenv").config();
const CreateTopic = require("./js/CreateTopic");
//Grab your Hedera testnet account ID and private key from your .env file
const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
const operatorKey = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);
const adminKey = PrivateKey.generate();
const submitKey = PrivateKey.generate();

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function main() {
  CreateTopic.CreateTopic(operatorId, operatorKey, submitKey, client);
}
main();
