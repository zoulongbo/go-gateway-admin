<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ today, yesterday } = {}) {
      this.chart.setOption({
        title: {
          text: '日流量统计'
        },
        xAxis: {
          data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['昨日', '今日']
        },
        series: [{
          name: '昨日', itemStyle: {
            normal: {
              color: '#34bfa3',
              lineStyle: {
                color: '#34bfa3',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: yesterday,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '今日',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#c7aadf',
              lineStyle: {
                color: '#c7aadf',
                width: 2
              },
              areaStyle: {
                color: '#c7aadf'
              }
            }
          },
          data: today,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
