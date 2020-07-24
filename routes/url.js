const express = require('express');
const router = express.Router();
const idgenerator = require("nanoid")
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "eu-west-2",
  // endpoint: "http://localhost:8000"
});

var db = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

router.get('/', (req, res) => {
  res.render("./partials/url", { layout: "main"});
});

router.post('/', (req, res) => {
  var { id, url } = req.body;
  if (!id) { id = idgenerator.nanoid(10) }
  if (!url)  {
   res.render("./partials/url", {
      layout: "main",
      data: {
        id: id,
        url: url,
        error: "Please enter a url and try again"
      }
    })
  } else {
    var params = {
      TableName : "URL-REDIRECTS",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
          ":id": id
      }
    }
      docClient.query(params, (err, data) => {
      if (err) {
      } else {
          if (data.Items.length == 0) {
            var params = {
              TableName:"URL-REDIRECTS",
              Item: {
                "id": id,
                "url": url,
                "count": 0
              }
            }
            docClient.put(params, function(err, data) {
              if (err) {
              } else {
              }
            });
            var newurl = process.env.URLBASE + "/url/" + id;
            res.render("./partials/success", {
              layout: "main",
              data: {
                url: newurl
              }
            })
          } else {
            res.render("./partials/url", {
              layout: "main",
              data: {
                id: id,
                url: url,
                error: "That ID is taken, please try again"
              }
            })
          }
        }
      })
    }
  }
);

router.get("/:id", (req, res) => {
  var id = req.params.id;
  var params = {
    TableName : "URL-REDIRECTS",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
        ":id": id
    }
  }
  docClient.query(params, function(err, data) {
    if (err) {
      res.render("./partials/error", {
        layout: "main",
        data: {
          error: "An error has occured, please try again"
        }
      })
    } else {
      if (data.Items.length == 0) {
        res.render("./partials/error", {
          layout: "main",
          data: {
            error: "This ID does not exist"
          }
        })
      } else {
        var url = data.Items[0].url;
        var params = {
          TableName: "URL-REDIRECTS",
          Key: {
            "id": data.Items[0].id
          },
          UpdateExpression: "set #c = :nc",
          ExpressionAttributeValues: {
            ":nc": data.Items[0].count + 1
          },
          ExpressionAttributeNames: {
            "#c": "count"
          },
          ReturnValues:"UPDATED_NEW"
        };
        docClient.update(params, function(err, data) {});
        res.redirect(url)
      }
    }
  });
});

module.exports = router;
