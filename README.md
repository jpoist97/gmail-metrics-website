# Gmail-Metrics-Website
> Displays hourly metrics from my personal Gmail account.

Vue.js webpage that displays hourly metrics from my personal Gmail account using Google's APIs. The repository is brocken into the following two folders. You can find the live website [here](http://jpoist-gmail-metrics-bucket.s3-website-us-west-1.amazonaws.com/).

## aws-lambda

Inside this directory you can find all of the code I used in my AWS-Lambda function that is called every hour to update the metrics on my webpage. 

Technologies Used:
  * AWS-Lambda
  * DynamoDB
  * Node.js

## vue-webpage

Inside this directory you can find all of the code I used to make my Vue.js webpage.

Technologies Used:
  * Vue.js
  * Vuex
  * Vue-router
  
## metrics-api

Uses the endpoints given by this web server to get the metrics from DynamoDB into the website. Check out the repository here](https://github.com/jpoist97/metrics-api).

Technologies Used:
  * Express
  * Node.js
