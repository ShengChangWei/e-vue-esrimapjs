# e-vue-esrimapjs

基于 vue-cli3+javaScript 的二维地图组件，使用的地图 API 是 ArcGIS API for JavaScript v3.x（>=3.14）。

学习借鉴前组长：<https://github.com/laixiangran/e-ngx-esrimap>

## Usage

1. Install

	```shell
	npm install --save e-vue-esrimapjs@latest
	```
2. main.js

    ```shell
    import EVueEsrimapjs from 'e-vue-esrimapjs'
    import 'font-awesome/css/font-awesome.css';
    Vue.use(EVueEsrimapjs);
    ``
3. template

```html
<template>
  <div id="app">
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
                     token="8e1a3b0631a1057635c6cc28bece1e31"
                     @baseLayerChange="onTdtBaseLayerChange($event)"
                     @mapReady="onTdtMapReady($event)">
    </e-vue-esrimapjs>
    <h2>mapBox底图服务</h2>
    <button @click="boxMapComponent.changeBaseLayer(0)">切换底图1</button>
    <button @click="boxMapComponent.changeBaseLayer(1)">切换底图2</button>
    <button @click="boxMapComponent.changeBaseLayer(2)">切换底图3</button>
    <!-- mapBox mapUrl，submapUrl 有['satellite-streets-v10', 'navigation-preview-day-v2', 'navigation-preview-night-v2']等 参数详见 http://www.mapbox.cn/mapbox-gl-js/api/  -->
    <!-- mapBox 也可自定义底图样式，需要申请账号，格外添加参数 mapBoxUser="自己的用户名"，token值替换成自己的，将自定义好的风格id赋值给mapUrl即可 自定义底图地址：https://studio.mapbox.com/  -->
    <e-vue-esrimapjs :mapType="'mapBox'"
                     :mapUrl="['navigation-guidance-night-v2']"
                     :submapUrl="['streets-v10', 'satellite-v9']"
                     :geoUrl="geoUrl"
                     :initExtent="initExtent2"
                     :gisApiUrl="gisApiUrl"
                     token="pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A"
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
```

4. js

```javascript
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
    };
  },

```

```javascript
  methods: {
     /**
     * 百度底图加载完成
     * @param $event
     */
    onBaiduMapReady($event) {
      this.baiduMapComponent = $event;
      this.baiduMap = this.baiduMapComponent.map;
    },
    /**
     * 百度底图切换
     * @param {number} $event
     */
    onBaiduBaseLayerChange() {},
    /**
     * 谷歌地图加载完成
     * @param $event
     */
    onGoogleMapReady($event) {
      this.googleMapComponent = $event;
      this.googleMap = this.googleMapComponent.map;
    },

    /**
     * 谷歌底图切换
     * @param {number} $event
     */
    onGoogleBaseLayerChange($event) {},
    /**
     * 天地图地图加载完成
     * @param $event
     */
    onTdtMapReady(event) {
      this.tdtMapComponent = event;
      this.tdtMap = this.tdtMapComponent.map;
      this.tdtMapComponent.setExtent(this.initExtent);
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
    onEsriBaseLayerChange($event) {},
     /**
     * mapBox地图加载完成
     * @param {number} $event
     */
    onBoxMapReady($event) {
        this.boxMapComponent = $event;
        this.boxMap = this.baiduMapComponent.map;
      },

  }
```

## API

### Prop

- `isProxy`（`boolean?=false`） - 是否开启代理，可使用 esri 提供的[几个平台的代理文件](https://github.com/Esri/resource-proxy)

- `proxyUrl`（`string?='proxy.jsp'`） - 代理页面的路径。如果出现跨域的问题，请检查是否正确设置代理路径

- `mapUrl`（`string[] | string='http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer'`） - 基础底图路径，如 `mapType='tdt'`，则 mapUrl 可从这四种地图类型 `vec（矢量图层）, cva（矢量标注）, img（影像图层）, cia（影像标注）` 通过数组形式组合使用。如 `mapType='google'`，则 mapUrl 可从这三种地图类型 `m（矢量图层）, p（地形图层）, y（影像图层）` 中选择。mapType='esri'，则 mapUrl 是完整的 ArcGIS 切片地图服务路径，新增mapType='baidu',mapUrl可以是这三种地图类型`df(默认矢量地图)，st(卫星底图)， rd(道路底图)`

- `submapUrl`（`any[]`）- 其它切换的底图路径，如 `mapType='tdt'`，则 submapUrl 可从这四种地图类型 `vec（矢量图层）, cva（矢量标注）, img（影像图层）, cia（影像标注）` 通过数组形式组合使用。如 `mapType='google'`，则 mapUrl 可从这三种地图类型 `m（矢量图层）, p（地形图层）, y（影像图层）` 中选择。mapType='esri'，则 submapUrl 是完整的 ArcGIS 切片地图服务路径的数组

- `mapType`（`string?='esri'`） - 基础底图类型，`tdt`：天地图（wkid: 4326），`google`：谷歌地图（wkid: 102113），`esri`：esri 地图服务（wkid: 看具体服务wkid）

- `geoUrl`（`string?='http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'`） - 几何服务路径，默认是在线路径，最好配置自己的路径

- `gisApiUrl`（`string?='http://js.arcgis.com/3.23/'`） - arcgis javascript API 路径，默认是在线路径，最好配置自己的路径

- `esriCSSUrl`（`string?='http://js.arcgis.com/3.23/esri/css/esri.css'`） - esri.css 路径，默认是在线路径，最好配置自己的路径

- `initExtent`（`Object`） - 初始地图范围，`{xmax, xmin, ymax, ymin}`。默认范围自适应屏幕显示，如果不想自适应则可调用 setExtent 方法设置范围并指定是否自适应

- `mapBoxUser`（`string`）只有`mapType = 'mapBox'`这个参数才起作用，自定义底图自己的用户名，默认`mapbox`

- `token` 当`mapType = 'mapBox'`或 `mapType = 'tdt'`底图需要的token值


```javascript
// esri
Map: '',
Color: '',
Graphic: '',
SpatialReference: '',
urlUtils: '',
esriConfig: '',
// esri/tasks
Geoprocessor: '',
GeometryService: '',
FeatureSet: '',
FindTask: '',
FindParameters: '',
IdentifyTask: '',
IdentifyParameters: '',
QueryTask: '',
Query: '',
ProjectParameters: '',
BufferParameters: '',

// esri/layers
ArcGISTiledMapServiceLayer: '',
ArcGISDynamicMapServiceLayer: '',
WebTiledLayer: '',
GraphicsLayer: '',
MapImageLayer: '',
MapImage: '',
ImageParameters: '',
TileInfo: '',

// esri/geometry
Extent: '',
Point: '',
ScreenPoint: '',
Polyline: '',
Polygon: '',
WebMercatorUtils: '',

// esri/symbols
PictureMarkerSymbol: '',
SimpleMarkerSymbol: '',
SimpleLineSymbol: '',
CartographicLineSymbol: '',
PictureFillSymbol: '',
SimpleFillSymbol: '',
TextSymbol: '',
Font: '',

// toolbar
Draw: '',

// ENgxEsriMapComponent
map: '', // 当前地图实例
geometryService: '', // 当前几何服务实例
isMax: false, // 比例是否最大
isMin: false // 比例是否最小
```
### 没有默认加载的模块，可通过调用 loadEsriModules 方法进行加载

### Instance Methods

* changeBaseLayer (layerIndex: number): void - 底图切换，index 是所有待切换底图的序号。mapUrl 对应序号为 0，其它图层序号根据 submapUrl 的数组序号加 1 得到

* loadEsriModules(modules: string[]): Promise<any> - 加载 ArcGIS API for JavaScript 的模块，如：['esri/map']

* gpAsyncGetResultData(params: AsyncGetResultParam): void - GP 服务获取数据（异步）

* gpAsyncGetResultImageLayer(params: AsyncGetResultParam): void - GP 服务获取结果图片图层（异步）

* locationPoint(point: {x: number, y: number}): void - 点定位

* clearLocationLayer(): void - 清除定位图层

* showMapInfoWindow(params: any): void - 显示地图信息窗口

```shell

   * params 属性如下：
   * title {String} 信息窗口标题
   * content {String} 信息窗口内容，支持html
   * location {Point} 信息窗口位置
   * placement {String} 信息窗口方位
   * width {Number} 信息窗口宽度
   * height {Number} 信息窗口高度
```

* hideMapInfoWindow(): void - 隐藏地图信息窗口

* setExtent(extent: any, fit: boolean = false): Deferred - 设置地图范围

## Develop

	```shell
	npm install // 安装依赖包
	
	npm start // 启动项目
	```

# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)