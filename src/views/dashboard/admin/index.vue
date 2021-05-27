<template>
  <div class="dashboard-editor-container">
    <panel-group :group-data="groupData" />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { dashboardFlowStat, dashboardServiceStat, dashboardPanelGroup } from '@/api/dashboard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChartData: {
        today: [10, 12, 16, 13, 10, 16, 15, 20, 2, 36, 53, 20],
        yesterday: [20, 82, 91, 14, 62, 40, 14, 10, 16, 15, 20, 2]
      },
      groupData: {
        app_num: 0,
        current_qps: 0,
        service_num: 0,
        today_request_num: 0
      },
      pieChartData: {
        data: [
          {
            'name': 'HTTP',
            'value': 3
          },
          {
            'name': 'TCP',
            'value': 1
          },
          {
            'name': 'GRPC',
            'value': 1
          }
        ],
        legend: ['HTTP', 'TCP', 'GRPC']
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      dashboardPanelGroup().then(response => {
        this.groupData = response.data
      })
      dashboardFlowStat().then(response => {
        this.lineChartData = response.data
      })
      dashboardServiceStat().then(response => {
        this.pieChartData = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
