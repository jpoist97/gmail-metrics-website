<template>
    <div>
        <div v-if="$store.state.isLoading" class="loading graph-wrapper">
            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            <div class="loading-text">Loading Metrics...</div>
        </div>
        <div v-else>
            <highcharts :options="graphOptions[graphIndex]"/>
            <div>
                <button class="graph-button" :class="{ 'active-btn': graphIndex === 0 }" v-on:click="graphIndex=0">From Non-Gmail</button>
                <button class="graph-button" :class="{ 'active-btn': graphIndex === 1 }" v-on:click="graphIndex=1">From Gmail</button>
                <button class="graph-button" :class="{ 'active-btn': graphIndex === 2 }" v-on:click="graphIndex=2">To Non-Gmail</button>
                <button class="graph-button" :class="{ 'active-btn': graphIndex === 3 }" v-on:click="graphIndex=3">To Gmail</button>
            </div>
        </div>



    </div>
</template>

<script>
import {Chart} from 'highcharts-vue'

export default {
  name: 'GraphGrid',
  components: {
      highcharts: Chart
  },
  data() {
    return{
        graphIndex: 0,
        graphOptions:[{
            chart:{
                type: 'spline',
                backgroundColor: '#212121'
            },
            title:{
                text: 'Emails received from Non-Gmail users',
                style: {
                    color: '#eeeeee'
                }
            },
            series: [{
                    name: 'From Non-Gmail Accounts',
                    data: this.$store.state.fOtherData,
                },
            ],
            yAxis: {
                title: {
                    text: 'Number of Emails',
                    style: {
                        color: '#eeeeee'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                },
                allowDecimals: false
            },
            xAxis: {
                type: 'datetime',
                lineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                }
            },
            tooltip:{
                formatter: function() {
                    let d = new Date(0);
                    d.setUTCMilliseconds(this.point.x);
                    return `Emails: ${ this.point.y }<br>Date: ${ d.toDateString() }<br>Time: ${ d.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }`
                }
            },
            time: {
                timezoneOffset: new Date().getTimezoneOffset()
            },
            plotOptions: {
                series:{
                    color: '#d52941'
                }
            },
            legend: {
                itemStyle: {
                    color: '#eeeeee'
                }
            }
        },
        {
            chart:{
                type: 'spline',
                backgroundColor: '#212121'
            },
            title:{
                text: 'Emails received from Gmail users',
                style: {
                    color: '#eeeeee'
                }
            },
            series: [{
                    name: 'From Gmail Accounts',
                    data: this.$store.state.fGmailData,
                },
            ],
            yAxis: {
                title: {
                    text: 'Number of Emails',
                    style: {
                        color: '#eeeeee'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                },
                allowDecimals: false
            },
            xAxis: {
                type: 'datetime',
                lineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                }
            },
            tooltip:{
                formatter: function() {
                    let d = new Date(0);
                    d.setUTCMilliseconds(this.point.x);
                    return `Emails: ${ this.point.y }<br>Date: ${ d.toDateString() }<br>Time: ${ d.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }`
                }
            },
            time: {
                timezoneOffset: new Date().getTimezoneOffset()
            },
            plotOptions: {
                series:{
                    color: '#d52941'
                }
            },
            legend: {
                itemStyle: {
                    color: '#eeeeee'
                }
            }
        },
        {
            chart:{
                type: 'spline',
                backgroundColor: '#212121'
            },
            title:{
                text: 'Emails sent to Non-Gmail users',
                style: {
                    color: '#eeeeee'
                }
            },
            series: [{
                    name: 'To Non-Gmail Accounts',
                    data: this.$store.state.tOtherData,
                },
            ],
            yAxis: {
                title: {
                    text: 'Number of Emails',
                    style: {
                        color: '#eeeeee'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                },
                allowDecimals: false
            },
            xAxis: {
                type: 'datetime',
                lineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                }
            },
            tooltip:{
                formatter: function() {
                    let d = new Date(0);
                    d.setUTCMilliseconds(this.point.x);
                    return `Emails: ${ this.point.y }<br>Date: ${ d.toDateString() }<br>Time: ${ d.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }`
                }
            },
            time: {
                timezoneOffset: new Date().getTimezoneOffset()
            },
            plotOptions: {
                series:{
                    color: '#d52941'
                }
            },
            legend: {
                itemStyle: {
                    color: '#eeeeee'
                }
            }
        },
        {
            chart:{
                type: 'spline',
                backgroundColor: '#212121'
            },
            title:{
                text: 'Emails sent to Gmail users',
                style: {
                    color: '#eeeeee'
                }
            },
            series: [{
                    name: 'To Gmail Accounts',
                    data: this.$store.state.tGmailData,
                },
            ],
            yAxis: {
                title: {
                    text: 'Number of Emails',
                    style: {
                        color: '#eeeeee'
                    }
                },
                gridLineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                },
                allowDecimals: false
            },
            xAxis: {
                type: 'datetime',
                lineColor: 'rgba(255, 255, 255, 0.3)',
                labels: {
                    style: {
                        color: '#eeeeee'
                    }
                }
            },
            tooltip:{
                formatter: function() {
                    let d = new Date(0);
                    d.setUTCMilliseconds(this.point.x);
                    return `Emails: ${ this.point.y }<br>Date: ${ d.toDateString() }<br>Time: ${ d.toLocaleString('en-US', { hour: 'numeric', hour12: true }) }`
                }
            },
            time: {
                timezoneOffset: new Date().getTimezoneOffset()
            },
            plotOptions: {
                series:{
                    color: '#d52941'
                }
            },
            legend: {
                itemStyle: {
                    color: '#eeeeee'
                }
            }
        },
            ]
        
    }
  },
  created(){
    if(!this.$store.state.completed){
      let date = new Date();
      let curDate = date.getDate();

      for(let i = 0; i < 7; i++){
        date.setDate(curDate);
        this.$store.dispatch('fetchMetrics', `${ date.getUTCFullYear() }-${ date.getUTCMonth()}-${ date.getUTCDate() }`);
        curDate = date.getDate() - 1;
      }
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.graph-button{
    background-color: #eeeeee;
    border-radius: 25px;
    margin: 8px;
    width: 20%;
    outline: none;
}

.active-btn{
    background-color: #d52941;
    border: 1px solid #d52941;
    outline: none;
}


.loading-text{
    color: #eeeeee;
}


/** https://loading.io/css/ **/
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #d52941;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}

</style>
