<template>
  <div id="app">
    <button @click="print">打印</button>
    <h2>百度底图</h2>
    <button @click="baiduMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="baiduMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="baiduMapComponent.changeBaseLayer(2)">切换底图3</button>
    <e-vue-esrimapjs :mapType="'baidu'"
                     :mapUrl="['df']"
                     :submapUrl="['st', 'rd']"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     @baseLayerChange="onBaiduBaseLayerChange($event)"
                     @mapReady="onBaiduMapReady($event)">
    </e-vue-esrimapjs>
    <h2>谷歌地图服务</h2>
    <button @click="googleMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="googleMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="googleMapComponent.changeBaseLayer(2)">切换底图3</button>
    <e-vue-esrimapjs :mapType="'google'"
                     :mapUrl="'m'"
                     :submapUrl="['y', 'p']"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     @baseLayerChange="onGoogleBaseLayerChange($event)"
                     @mapReady="onGoogleMapReady($event)">
    </e-vue-esrimapjs>
    <h2>天地图地图服务</h2>
    <button @click="tdtMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="tdtMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="tdtMapComponent.changeBaseLayer(2)">切换底图3</button>
    <e-vue-esrimapjs :mapType="'tdt'"
                     :mapUrl="['vec','cva']"
                     :submapUrl="[['img','cia'], ['ter','cta']]"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent"
                     :gisApiUrl="gisApiUrl"
                     tdtTK="8e1a3b0631a1057635c6cc28bece1e31"
                     @baseLayerChange="onTdtBaseLayerChange($event)"
                     @mapReady="onTdtMapReady($event)">
    </e-vue-esrimapjs>
    <h2>maxBox暗黑底图</h2>
    <e-vue-esrimapjs :mapType="'mapBox'"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     @mapReady="onBoxMapReady($event)">
    </e-vue-esrimapjs>
    <h2>ArcGIS地图服务</h2>
    <button @click="esriMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="esriMapComponent.changeBaseLayer(1)">切换底图2</button>

    <e-vue-esrimapjs :isProxy="false"
                     :mapUrl="mapUrl"
                     :submapUrl="['http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer']"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent"
                     :gisApiUrl="gisApiUrl"
                     :esriCSSUrl="esriCSSUrl"
                     @baseLayerChange="onEsriBaseLayerChange($event)"
                     @mapReady="onEsriMapReady($event)">
    </e-vue-esrimapjs>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      baiduMapComponent: '',
      baiduMap: '',
      googleMapComponent: '',
      googleMap: '',
      tdtMapComponent: '',
      tdtMap: '',
      esriMapComponent: '',
      esriMap: '',
      mapUrl:
        'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer',
      geoUrl:
        'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
      gisApiUrl: 'http://js.arcgis.com/3.23/',
      esriCSSUrl: 'http://js.arcgis.com/3.23/esri/css/esri.css',
      initExtent: {
        xmax: 116.39029888900006,
        xmin: 116.04209077900009,
        ymax: 40.161018230000025,
        ymin: 39.885287565000056
      },
      initExtent2: {
        xmax: 12980277.986602597,
        xmin: 12934415.769631553,
        ymax: 4864627.423165954,
        ymin: 4841696.314680432
      },

      // 百度底图测试
      areaLayer: null,
      areaSymbol: null
    };
  },
  mounted() {},
  methods: {
    print() {
      // window.print();
    },
    onBaiduMapReady($event) {
      this.baiduMapComponent = $event;
      this.baiduMap = this.baiduMapComponent.map;
      this.initBaiduLayers();
      // this.queryBoundaryLine();
    },
    initBaiduLayers() {
      this.areaLayer = new this.baiduMapComponent.GraphicsLayer();
      this.baiduMap.addLayers([this.areaLayer]);
      this.areaSymbol = new this.baiduMapComponent.SimpleFillSymbol({
        // 区域符号
        type: 'esriSFS',
        style: 'esriSFSSolid',
        color: [234, 144, 62, 30],
        outline: {
          type: 'esriSLS',
          style: 'esriSLSDash',
          color: [255, 75, 160, 255],
          width: 2
        }
      });

      const [x, y] = this.baiduMapComponent.WebMercatorUtils.lngLatToXY(
        116.312555,
        40.059036
      );
      const point = new this.baiduMapComponent.Point(
        116.3,
        40.051697222222224,
        this.baiduMap.SpatialReference
      );
      const symbol = new this.baiduMapComponent.SimpleMarkerSymbol({
        // 点符号
        color: [255, 153, 0],
        size: 10,
        type: 'esriSMS',
        style: 'esriSMSCircle',
        outline: {
          type: 'esriSLS',
          style: 'esriSLSSolid',
          color: [255, 255, 255],
          width: 1
        }
      });
      const dataGra = new this.baiduMapComponent.Graphic(point, symbol);
      this.areaLayer.add(dataGra);
    },

    // initGoogleLayers() {
    //   this.areaLayer = new this.googleMapComponent.GraphicsLayer();
    //   this.googleMap.addLayers([this.areaLayer]);
    //   this.areaSymbol = new this.googleMapComponent.SimpleFillSymbol({
    //     // 区域符号
    //     type: 'esriSFS',
    //     style: 'esriSFSSolid',
    //     color: [234, 144, 62, 30],
    //     outline: {
    //       type: 'esriSLS',
    //       style: 'esriSLSDash',
    //       color: [255, 75, 160, 255],
    //       width: 2
    //     }
    //   });

    //   const [x, y] = this.googleMapComponent.WebMercatorUtils.lngLatToXY(
    //     116.29972222222223,
    //     40.04611111111111
    //   );
    //   const point = new this.googleMapComponent.Point(
    //     x,
    //     y,
    //     this.googleMap.spatialReference
    //   );
    //   const symbol = new this.googleMapComponent.SimpleMarkerSymbol({
    //     // 点符号
    //     color: [255, 153, 0],
    //     size: 10,
    //     type: 'esriSMS',
    //     style: 'esriSMSCircle',
    //     outline: {
    //       type: 'esriSLS',
    //       style: 'esriSLSSolid',
    //       color: [255, 255, 255],
    //       width: 1
    //     }
    //   });
    //   const dataGra = new this.googleMapComponent.Graphic(point, symbol);
    //   this.areaLayer.add(dataGra);
    // },
    initTdtLayers() {
      this.areaLayer = new this.tdtMapComponent.GraphicsLayer();
      this.tdtMap.addLayers([this.areaLayer]);
      this.areaSymbol = new this.tdtMapComponent.SimpleFillSymbol({
        // 区域符号
        type: 'esriSFS',
        style: 'esriSFSSolid',
        color: [234, 144, 62, 30],
        outline: {
          type: 'esriSLS',
          style: 'esriSLSDash',
          color: [255, 75, 160, 255],
          width: 2
        }
      });

      // const [x, y] = this.tdtMapComponent.WebMercatorUtils.lngLatToXY(

      // );
      const point = new this.tdtMapComponent.Point(
        116.3,
        40.051697222222224,
        this.tdtMap.spatialReference
      );
      const symbol = new this.tdtMapComponent.SimpleMarkerSymbol({
        // 点符号
        color: [255, 153, 0],
        size: 10,
        type: 'esriSMS',
        style: 'esriSMSCircle',
        outline: {
          type: 'esriSLS',
          style: 'esriSLSSolid',
          color: [255, 255, 255],
          width: 1
        }
      });
      const dataGra = new this.tdtMapComponent.Graphic(point, symbol);
      this.areaLayer.add(dataGra);
      // this.queryBoundaryLine();
    },
    /**
     *
     * 边界查询（县界和乡镇区域）
     */
    queryBoundaryLine() {
      const query = new this.baiduMapComponent.Query();
      query.where = '2 > 1';
      query.outSpatialReference = this.baiduMap.spatialReference;
      query.returnGeometry = true;
      query.outFields = ['*'];
      const areaQueryTask = new this.baiduMapComponent.QueryTask(
        'http://123.56.211.120:9999/arcgis/rest/services/HD_RCS_MAP/MapServer/4'
      );
      areaQueryTask.execute(query, (areas) => {
        areas.features.forEach((area) => {
          area.symbol = this.areaSymbol;
          this.areaLayer.add(area);
        });
      });
    },
    onBaiduBaseLayerChange() {},
    /**
     * 谷歌地图加载完成
     * @param $event
     */
    onGoogleMapReady($event) {
      this.googleMapComponent = $event;
      this.googleMap = this.googleMapComponent.map;
      // this.initGoogleLayers();
    },

    /**
     * 谷歌底图切换
     * @param {number} $event
     */
    onGoogleBaseLayerChange($event) {},
    onBoxMapReady(event) {
      var cycleMapLabel = new event.WebTiledLayer(
        'http://${subDomain}.tianditu.gov.cn/DataServer?T=' +
          'cia_w' +
          '_c&X=${col}&Y=${row}&L=${level}&tk=8e1a3b0631a1057635c6cc28bece1e31',
        {
          subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7']
        }
      );
      event.map.addLayer(cycleMapLabel);
    },
    /**
     * 天地图地图加载完成
     * @param $event
     */
    onTdtMapReady(event) {
      this.tdtMapComponent = event;
      this.tdtMap = this.tdtMapComponent.map;
      // this.tdtMapComponent.setExtent(this.initExtent);
      this.initTdtLayers();
    },
    onTdtBaseLayerChange($event) {},

    /**
     * esri地图加载完成
     * @param $event
     */
    onEsriMapReady($event) {
      this.esriMapComponent = $event;
      this.esriMap = this.esriMapComponent.map;
    },

    /**
     * esri底图切换
     * @param {number} $event
     */
    onEsriBaseLayerChange($event) {}
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  background-color: #fff;
}

#ctx-menu-content {
  background-color: #434b55;
  border: 1px solid #fff;
  color: #fff;
  padding: 0;
  > div {
    padding: 5px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
