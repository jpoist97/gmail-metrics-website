<template>
  <div class="about">
      <h1>About this webpage</h1>
      <p>
        This webpage displays real time metrics about the emails sent to and from my personal Gmail account. 
        The numbers are displayed in an hourly format, for example if a data point on the "From Non-Gmail" graph is:
      </p>
      <div class="example-label">
        Emails: 3 <br>
        Date: Sat Apr 11, 2020 <br>
        Time: 6PM
      </div>
      <p>That means that on April 11th, between the hours of 5PM and 6PM, I received 3 emails from email addresses
        which did not end in "@gmail".</p>
      <h1>Purpose</h1>
      <p>Now I know what you're probably thinking, "who would ever need this data?" And you're right, the data 
        displayed by this webpage is almost certainly useless. The purpose of this project was to learn some new
        technologies and display the skills I learned along the way.
      </p>

      <h1>AWS Lambda Function</h1>
      <p>In order to get the metrics I wanted to display on this website, I used an AWS Lambda function
        written in Javascript to access the Gmail API. After I got the metrics from the Gmail API, my lambda
        function stored those metrics into a DynamoDB table.
      </p>
      <h1>Node.js/Express Endpoint</h1>
      <p>Now that I have my data stored in a DynamoDB table, I wanted an easy way to get to that data in my
        web application. To do this I wrote a Node.js service that would query the DynamoDB table for metrics
        given proper query parameters. To access this service, I used Express to deploy a simple web server 
        to act as an endpoint for my Node.js service. I deployed the service to AWS using AWS Elastic Beanstalk.
        You can access the enpoint itself by going to <a href="http://metricsapi-env.eba-3e3yt2se.us-west-1.elasticbeanstalk.com/">metrics-api.</a>
      </p>
      <h1>Vue.js Webpage</h1>
      <p>To tie it all together and display the metrics I was gathering, I built a Vue.js webpage. I used Vuex
        for state management and Vue router to display multiple pages. I deployed my Vue.js webpage using an AWS
        S3 Bucket and created the charts with highcharts-vue.
      </p>


  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
}
</script>

<style scoped>

h5{
  color: #eeeeee;
  text-align: left;
  width: fit-content;
  border-bottom: 3px solid #d52941;
}

p{
  color: #eeeeee;
  text-align: left;
  font-size: 16px;
}

.example-label{
  color: #eeeeee;
  text-align: left;
  margin-bottom: 10px;
}

.icon-row{
  /* background-color: #e7e7e7; */
  border-radius: 25px;
  width: 90%;
  margin: 0 auto;
  height: 100px;
}

img{
  background-color: #e7e7e7;
  border-radius: 25px;
  height: 100px;
  width: 100px;
  float: left;
}

.about{
  margin: 0 auto;
  width: 75%;
}

#lambda-icon{
  padding: 16px;
}

</style>