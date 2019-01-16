<template>
  <div class="container">
    <div class="col-xs-12">
      <br>

      <b-card
        border-variant="primary"
        header="Operating System"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <div ref="ospie" style="width: 100%; height:220px;"></div>
      </b-card>

      <br>

      <b-card
        border-variant="primary"
        header="Device"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <div ref="devicepie" style="width: 100%; height:220px;"></div>
      </b-card>

      <br>

      <b-card
        border-variant="primary"
        header="Browser Engine"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <div ref="enginepie" style="width: 100%; height:220px;"></div>
      </b-card>

      <div>
        <b-button variant="danger" style="margin-top: 10px; margin-bottom: 10px" @click="exit">Back to Top</b-button>
      </div>

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import router from '../router'
import { fetchStatus } from '../api/status'
export default {
  data () {
    return {
      chartOS: null,
      chartDevice: null,
      chartEngine: null,
      osData: null,
      venderData: null,
      engineData: null
    }
  },

  async mounted () {
    await this.fetchData()
    this.chartOS = await this.initChart(this.$refs.ospie, this.chartColorSetter(1), this.osData, 'OS Distribution')
    this.chartDevice = await this.initChart(this.$refs.devicepie, this.chartColorSetter(2), this.venderData, 'Device Distribution')
    this.chartEngine = await this.initChart(this.$refs.enginepie, this.chartColorSetter(3), this.engineData, 'Engine Distribution')
    await window.addEventListener('resize', this.resizeHandler)
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    async fetchData () {
      await fetchStatus().then(res => {
        let status = Object.assign({}, res.data)
        this.osData = this.dataAssembler(status.os)
        this.venderData = this.dataAssembler(status.vender)
        this.engineData = this.dataAssembler(status.engine)
      })
    },

    dataAssembler (dataArray) {
      let result = []
      for (let index = 0; index < dataArray.length; index++) {
        const element = dataArray[index]
        result.push({
          name: element._id,
          value: element.value
        })
      }
      return result
    },

    resizeHandler () {
      this.chartOS.resize()
      this.chartDevice.resize()
      this.chartEngine.resize()
    },

    chartColorSetter (index) {
      let chartColor
      switch (index) {
        case 1:
          chartColor = ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8', '#edafda', '#cbb0e3']
          break
        case 2:
          chartColor = ['#626c91', '#a0a7e6', '#c4ebad', '#96dee8', '#edafda', '#cbb0e3', '#3fb1e3', '#6be6c1']
          break
        case 3:
          chartColor = ['#c4ebad', '#96dee8', '#edafda', '#cbb0e3', '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6']
          break
        default:
          chartColor = ['#edafda', '#cbb0e3', '#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8']
          break
      }
      return chartColor
    },

    initChart (chartRef, chartColor, chartData, chartName) {
      let chartObject = echarts.init(chartRef, 'macarons')
      chartObject.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: chartColor,
        calculable: true,
        series: [
          {
            name: chartName,
            type: 'pie',
            radius: [30, 75],
            avoidLabelOverlap: true,
            center: ['50%', '50%'],
            data: chartData,
            animationEasing: 'cubicInOut',
            animationDuration: 1000
          }
        ]
      })
      return chartObject
    },

    exit () {
      router.push('/')
    }
  }
}
</script>
