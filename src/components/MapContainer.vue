<template>
  <div id="container"></div>
</template>

<script type="text/javascript">
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  securityJsCode: 'f180e780f39c181dc2aa2e6e1c418748'
}
export default {
  name: 'container',
    data() {
    return {
      map: null
    }
  },
  methods: {
    initMap() {
      AMapLoader.load({
        key: 'fa684cf5dbb4d56ff0387085f9ee7ecc', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })

          .then(AMap => {
            this.map = new AMap.Map('container', {
              //设置地图容器id
              viewMode: '3D', //是否为3D地图模式
              zoom: 10, //初始化地图级别
              center: [121.0, 31.0] //初始化地图中心点位置
            })

          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    //DOM初始化完成进行地图初始化
    this.initMap()
  }
}
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>

