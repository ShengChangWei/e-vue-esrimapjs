<template>
  <div id="app">
    <!--  <h2>百度底图</h2>
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
                     token="8e1a3b0631a1057635c6cc28bece1e31"
                     @baseLayerChange="onTdtBaseLayerChange($event)"
                     @mapReady="onTdtMapReady($event)">
    </e-vue-esrimapjs>
    <h2>maxBox底图服务</h2>
    <button @click="boxMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="boxMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="boxMapComponent.changeBaseLayer(2)">切换底图3</button>
    <button @click="boxMapComponent.changeBaseLayer(3)">切换底图3</button>
    <e-vue-esrimapjs :mapType="'mapBox'"
                      mapBoxUser="wlonline"
                     :mapUrl="['ckgiv5olc0ej519pl3233mn7v']"
                     :submapUrl="['streets-v10', 'satellite-v9']"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     token="pk.eyJ1Ijoid2xvbmxpbmUiLCJhIjoiY2s1MjFhMjM0MDN4OTNqcDhjbGY1d3N6ZiJ9.DqC7SXU6B5W-04B7vC6bBQ"
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

    <e-vue-esrimapjs :isProxy="false"
                      :mapType="'sk'"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     :esriCSSUrl="esriCSSUrl"
                     @mapReady="onSKMapReady($event)"
                    >
    </e-vue-esrimapjs> -->
    <h2>天地图墨卡托地图服务</h2>
    <button @click="tdtMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="tdtMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="tdtMapComponent.changeBaseLayer(2)">切换底图3</button>
    <e-vue-esrimapjs :mapType="'tdtMct'"
                    :mapUrl="['vec','cva']"
                    :submapUrl="[['img','cia'], ['ter','cta']]"
                    :tileUrl="['http://39.97.105.38:6080/arcgis/rest/services/huairou/vectorIndexMap/MapServer']"
                     token="8e1a3b0631a1057635c6cc28bece1e31"
                     :initExtent="initExtent"
                     @baseLayerChange="onTdtBaseLayerChange($event)"
                     @mapReady="onTdtMapReady($event)">
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
      boxMapComponent: '',
      boxMap: '',
      skMapComponent: '',
      skMap: '',
      esriMapComponent: '',
      esriMap: '',
      mapUrl:
        'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer',
      geoUrl:
        'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',
      gisApiUrl: 'http://js.arcgis.com/3.23/',
      esriCSSUrl: 'http://js.arcgis.com/3.23/esri/css/esri.css',
      initExtent: {
        xmax: 1.3071860317445237E7,
        xmin: 1.287993118358697E7,
        ymax: 5078952.762946327,
        ymin: 4887023.62908806
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
    onSKMapReady($event) {
      this.skMapComponent = $event;
      this.skMap = this.skMapComponent.map;
      this.areaLayer = new this.skMapComponent.GraphicsLayer();
      this.skMap.addLayers([this.areaLayer]);
      this.areaSymbol = new this.skMapComponent.SimpleFillSymbol({
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

      // const [x, y] = this.skMapComponent.WebMercatorUtils.lngLatToXY(
      //   116.312555,
      //   40.059036
      // );
      const point = new this.skMapComponent.Point(
        116.26795,
        39.8957,
        this.skMap.SpatialReference
      );
      const symbol = new this.skMapComponent.SimpleMarkerSymbol({
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
      const dataGra = new this.skMapComponent.Graphic(point, symbol);
      this.areaLayer.add(dataGra);
      const query = new this.skMapComponent.Query();
      query.where = '2 > 1';
      query.outSpatialReference = this.skMap.spatialReference;
      query.returnGeometry = true;
      query.outFields = ['*'];
      const areaQueryTask = new this.skMapComponent.QueryTask(
        'http://39.97.105.38:6080//arcgis/rest/services/HDSW/BASE_MAP/MapServer/3'
      );
      areaQueryTask.execute(query, (areas) => {
        areas.features.forEach((area) => {
          area.symbol = this.areaSymbol;
          this.areaLayer.add(area);
        });
      });
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
    onBoxMapReady($event) {
      this.boxMapComponent = $event;
      this.boxMap = this.baiduMapComponent.map;
    },
    /**
     * 天地图地图加载完成
     * @param $event
     */
    onTdtMapReady(event) {
      this.tdtMapComponent = event;
      console.log(this.tdtMapComponent)
      this.tdtMap = this.tdtMapComponent.map;
      // this.tdtMapComponent.setExtent(this.initExtent);
      this.initTdtLayers();
      const layer = new this.tdtMapComponent.ArcGISTiledMapServiceLayer(
        'http://39.97.105.38:6080/arcgis/rest/services/huairou/vectorIndexMap/MapServer'
      );
      this.tdtMap.addLayer(layer);
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
