import request from '@/utils/request'

export function serviceList(query) {
  return request({
    url: '/admin/service_list',
    method: 'get',
    params: query
  })
}

export function updateService(data) {
  return request({
    url: '/admin/admin/service_update_grpc',
    method: 'post',
    data
  })
}

export function serviceDelete(query) {
  return request({
    url: '/admin/service_delete',
    method: 'get',
    params: query
  })
}

export function serviceDetail(query) {
  return request({
    url: '/admin/service_detail',
    method: 'get',
    params: query
  })
}

export function serviceAddHttp(data) {
  return request({
    url: '/admin/service_add_http',
    method: 'post',
    data
  })
}

export function serviceUpdateHttp(data) {
  return request({
    url: '/admin/service_update_http',
    method: 'post',
    data
  })
}

export function serviceStat(query) {
  return request({
    url: '/admin/service_stat',
    method: 'get',
    params: query
  })
}
