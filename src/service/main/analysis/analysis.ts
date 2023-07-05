import klRequest from '@/service'

// 获取商品数据
export function getAmountListData() {
  return klRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return klRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return klRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return klRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return klRequest.get({
    url: '/goods/address/sale'
  })
}
