const {
  AccountId,
  PrivateKey,
  Client,
  TopicCreateTransaction,
  TopicMessageQuery,
  TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function CreateTopic(operatorId, operatorKey, submitKey, client) {
  //Create a new topic
  let txResponse = await new TopicCreateTransaction().execute(client);

  //Grab the newly generated topic ID
  let receipt = await txResponse.getReceipt(client);
  let topicId = receipt.topicId;
  console.log(`Your topic ID is: ${topicId}`);

  // Wait 5 seconds between consensus topic creation and subscription creation
  await new Promise((resolve) => setTimeout(resolve, 5000));

  //Create the query
  new TopicMessageQuery().setTopicId(topicId).subscribe(client, (message) => {
    let messageAsString = Buffer.from(message.contents, "utf8").toString();
    console.log(
      `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
    );
    (error) => {
      console.log(error.toString);
    };
  });

  // Send one message
  let sendResponse = await new TopicMessageSubmitTransaction({
    topicId: topicId,
    message: "Hello, HCS!",
  }).execute(client);
  const getReceipt = await sendResponse.getReceipt(client);

  //Get the status of the transaction
  const transactionStatus = getReceipt.status;
  console.log("The message transaction status" + transactionStatus);
}

exports.CreateTopic = CreateTopic;
