// 中国热门旅游城市数据（经纬度）
export const cities = [
  // 直辖市
  { id: 1, name: '北京', province: '北京', lat: 39.9042, lng: 116.4074, isCapital: true },
  { id: 2, name: '上海', province: '上海', lat: 31.2304, lng: 121.4737, isCapital: true },
  { id: 3, name: '天津', province: '天津', lat: 39.3434, lng: 117.3616, isCapital: true },
  { id: 4, name: '重庆', province: '重庆', lat: 29.5630, lng: 106.5516, isCapital: true },
  
  // 省会及重要城市
  { id: 5, name: '西安', province: '陕西', lat: 34.3416, lng: 108.9398, isCapital: true },
  { id: 6, name: '广州', province: '广东', lat: 23.1291, lng: 113.2644, isCapital: true },
  { id: 7, name: '深圳', province: '广东', lat: 22.5431, lng: 114.0579, isCapital: false },
  { id: 8, name: '成都', province: '四川', lat: 30.5728, lng: 104.0668, isCapital: true },
  { id: 9, name: '杭州', province: '浙江', lat: 30.2741, lng: 120.1551, isCapital: true },
  { id: 10, name: '南京', province: '江苏', lat: 32.0603, lng: 118.7969, isCapital: true },
  { id: 11, name: '苏州', province: '江苏', lat: 31.2989, lng: 120.5853, isCapital: false },
  { id: 12, name: '武汉', province: '湖北', lat: 30.5928, lng: 114.3055, isCapital: true },
  { id: 13, name: '长沙', province: '湖南', lat: 28.2282, lng: 112.9388, isCapital: true },
  { id: 14, name: '郑州', province: '河南', lat: 34.7466, lng: 113.6253, isCapital: true },
  { id: 15, name: '昆明', province: '云南', lat: 25.0406, lng: 102.7125, isCapital: true },
  { id: 16, name: '厦门', province: '福建', lat: 24.4798, lng: 118.0894, isCapital: false },
  { id: 17, name: '福州', province: '福建', lat: 26.0745, lng: 119.2965, isCapital: true },
  { id: 18, name: '三亚', province: '海南', lat: 18.2528, lng: 109.5117, isCapital: false },
  { id: 19, name: '丽江', province: '云南', lat: 26.8721, lng: 100.2299, isCapital: false },
  { id: 20, name: '大理', province: '云南', lat: 25.6065, lng: 100.2678, isCapital: false },
  { id: 21, name: '桂林', province: '广西', lat: 25.2736, lng: 110.2900, isCapital: false },
  { id: 22, name: '阳朔', province: '广西', lat: 24.7753, lng: 110.4944, isCapital: false },
  { id: 23, name: '张家界', province: '湖南', lat: 29.1275, lng: 110.4791, isCapital: false },
  { id: 24, name: '九寨沟', province: '四川', lat: 33.2600, lng: 103.9200, isCapital: false },
  { id: 25, name: '黄山', province: '安徽', lat: 30.1319, lng: 118.1272, isCapital: false },
  { id: 26, name: '青岛', province: '山东', lat: 36.0671, lng: 120.3826, isCapital: false },
  { id: 27, name: '大连', province: '辽宁', lat: 38.9140, lng: 121.6147, isCapital: false },
  { id: 28, name: '哈尔滨', province: '黑龙江', lat: 45.8038, lng: 126.5340, isCapital: true },
  { id: 29, name: '拉萨', province: '西藏', lat: 29.6500, lng: 91.1409, isCapital: true },
  { id: 30, name: '珠海', province: '广东', lat: 22.2719, lng: 113.5767, isCapital: false },
]

// 起点城市
export const START_POINTS = {
  user: { cityId: 1, name: '北京' },      // 你在北京
  partner: { cityId: 5, name: '西安' }     // 女朋友在西安
}
