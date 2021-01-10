import request from '@/utils/request'

export function fetchTableList(query) {
  return request({
    url: '/table/list',
    method: 'get',
    params: query
  })
}

export function fetchTableData(id) {
  return request({
    url: '/table/detail',
    method: 'get',
    params: { id }
  })
}

export function createTableData(data) {
  return request({
    url: '/table/create',
    method: 'post',
    data
  })
}

export function updateTableData(data) {
  return request({
    url: '/table/update',
    method: 'post',
    data
  })
}

export function deleteTableData(data) {
  return request({
    url: '/table/delete',
    method: 'post',
    params: {
      id: data
    }
  })
}
