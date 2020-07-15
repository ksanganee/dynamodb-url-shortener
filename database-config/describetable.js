var AWS = require('aws-sdk');
AWS.config.update({
  region: "eu-west-2",
  endpoint: "http://localhost:8000"
});

var ddb = new AWS.DynamoDB();

var params = {
  TableName: "URL-REDIRECTS"
};

ddb.describeTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Table.KeySchema);
  }
});
