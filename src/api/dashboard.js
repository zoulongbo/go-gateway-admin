import request from '@/utils/request'

export function dashboardFlowStat() {
  return request({
    url: '/dashboard/flow_stat',
    method: 'get'
  })
}

export function dashboardPanelGroup() {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get'
  })
}

export function dashboardServiceStat() {
  return request({
    url: '/dashboard/service_stat',
    method: 'get'
  })
}

export function appEdit(data) {
  return request({
    url: '/app/app_update',
    method: 'post',
    data
  })
}

export function appDelete(query) {
  return request({
    url: '/app/app_delete',
    method: 'get',
    params: query
  })
}

export function appStat(query) {
  return request({
    url: '/app/app_stat',
    method: 'get',
    params: query
  })
}
