var AWS = require('aws-sdk');
AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

var ddb = new AWS.DynamoDB();

var params = {
    TableName : "URL-REDIRECTS"
};

if (process.argv[2] == "-f") {
  ddb.deleteTable(params, function(err, data) {
      if (err) {
          console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
      }
  })
};
