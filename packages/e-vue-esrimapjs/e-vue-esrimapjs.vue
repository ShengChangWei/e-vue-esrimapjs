<template>
  <div class="e-vue-map"
       style="height: 100%;">
    <div class="eMap"
         ref="eMap"
         style="height: 100%;"></div>
    <div class="eNavigation"
         v-if="enableNavigation">
      <div class="zoom-map full-map"
           title="全图"
           @click="fullMap()">
        <i class="fa fa-globe"
           aria-hidden="true"></i>
      </div>
      <div class="zoom-map zoom-in-map"
           :class="{'zoom-disable': isMax}"
           title="放大一级"
           @click="zoomIn()">
        <i class="fa fa-plus"
           aria-hidden="true"></i>
      </div>
      <div class="zoom-map zoom-out-map"
           :class="{'zoom-disable': isMin}"
           title="缩小一级"
           @click="zoomOut()">
        <i class="fa fa-minus"
           aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import EVueErimapLoader from './e-vue-esrimap-loader';
export default {
  name: 'e-vue-esrimapjs',
  props: {
    gisApiUrl: {
      type: String,
      default: 'http://js.arcgis.com/3.23/'
    },
    geoUrl: {
      type: String,
      default:
        'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'
    },
    isProxy: {
      type: Boolean,
      default: false
    },
    proxyUrl: {
      type: String,
      default: 'proxy.jsp'
    },
    mapType: {
      type: String,
      default: 'esri'
    },
    mapUrl: {
      type: [String, Array],
      default:
        'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer'
    },
    submapUrl: {
      type: Array,
      default: function () {
        return [
          'http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'
        ];
      }
    },
    initExtent: {
      type: Object,
      default: function () {
        return {
          xmax: 106.39029888900006,
          xmin: 116.04209077900009,
          ymax: 40.161018230000025,
          ymin: 39.885287565000056
        };
      }
    },
    esriCSSUrl: {
      type: String,
      default: 'http://js.arcgis.com/3.23/esri/css/esri.css'
    },
    enableNavigation: {
      type: Boolean,
      default: true
    },
    token: {
      type: String,
      default: '8e1a3b0631a1057635c6cc28bece1e31'
    },
    
  },
  data() {
    return {
      newInitExtent: this.initExtent,
      eVueErimapLoader: new EVueErimapLoader(),
      eMap: '',
      timeOutId: '',
      locationLayer: '',
      basemapIds: [],
      currBaseLayerIndex: 0,
      fit: false,
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
      EchartsLayer: null,

      // toolbar
      Draw: '',

      // ENgxEsriMapComponent
      map: '', // 当前地图实例
      geometryService: '', // 当前几何服务实例
      isMax: false, // 比例是否最大
      isMin: false // 比例是否最小
    };
  },
  mounted() {
    // console.log(echarts)
    // console.log(Echarts3Layer);
    this.addEsriMapCss();
    this.eVueErimapLoader
      .load({ url: this.gisApiUrl })
      .then(() => {
        this.init();
      })
      .catch((e) => {
        if (e.message === 'The ArcGIS API for JavaScript is already loaded.') {
          this.init();
        } else {
          console.error(e);
        }
      });
  },
  beforeDestory() {
    if (this.map) {
      this.map.destroy();
    }
    this.$emit('mapDestroy');
  },
  destroyed() {
    if (this.map) {
      this.map.destroy();
    }
    this.$emit('mapDestroy');
  },
  methods: {
    /**
     * 初始化esri模块
     */
    init() {
      this.loadEsriModules([
        'esri/map',
        'esri/urlUtils',
        'esri/config',
        'esri/graphic',
        'esri/Color',
        'esri/SpatialReference',
        'esri/tasks/Geoprocessor',
        'esri/tasks/ProjectParameters',
        'esri/tasks/GeometryService',
        'esri/tasks/FeatureSet',
        'esri/tasks/FindTask',
        'esri/tasks/FindParameters',
        'esri/tasks/IdentifyTask',
        'esri/tasks/IdentifyParameters',
        'esri/tasks/QueryTask',
        'esri/tasks/query',
        'esri/tasks/BufferParameters',
        'esri/layers/ArcGISTiledMapServiceLayer',
        'esri/layers/GraphicsLayer',
        'esri/layers/ImageParameters',
        'esri/layers/TileInfo',
        'esri/layers/WebTiledLayer',
        'esri/layers/ArcGISDynamicMapServiceLayer',
        'esri/geometry/Point',
        'esri/geometry/ScreenPoint',
        'esri/geometry/Extent',
        'esri/geometry/Polyline',
        'esri/geometry/Polygon',
        'esri/geometry/webMercatorUtils',
        'esri/symbols/PictureMarkerSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/CartographicLineSymbol',
        'esri/symbols/PictureFillSymbol',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/TextSymbol',
        'esri/symbols/Font',
        'esri/toolbars/draw',
        'esri/layers/MapImageLayer',
        'esri/layers/MapImage'
      ]).then(
        ([
          Map,
          urlUtils,
          esriConfig,
          Graphic,
          Color,
          SpatialReference,
          Geoprocessor,
          ProjectParameters,
          GeometryService,
          FeatureSet,
          FindTask,
          FindParameters,
          IdentifyTask,
          IdentifyParameters,
          QueryTask,
          Query,
          BufferParameters,
          ArcGISTiledMapServiceLayer,
          GraphicsLayer,
          ImageParameters,
          TileInfo,
          WebTiledLayer,
          ArcGISDynamicMapServiceLayer,
          Point,
          ScreenPoint,
          Extent,
          Polyline,
          Polygon,
          WebMercatorUtils,
          PictureMarkerSymbol,
          SimpleMarkerSymbol,
          SimpleLineSymbol,
          CartographicLineSymbol,
          PictureFillSymbol,
          SimpleFillSymbol,
          TextSymbol,
          Font,
          Draw,
          MapImageLayer,
          MapImage
        ]) => {
          // 初始化模块
          this.Map = Map;
          this.urlUtils = urlUtils;
          this.esriConfig = esriConfig;
          this.Graphic = Graphic;
          this.Color = Color;
          this.SpatialReference = SpatialReference;
          this.Geoprocessor = Geoprocessor;
          this.ProjectParameters = ProjectParameters;
          this.GeometryService = GeometryService;
          this.FeatureSet = FeatureSet;
          this.FindTask = FindTask;
          this.FindParameters = FindParameters;
          this.IdentifyTask = IdentifyTask;
          this.IdentifyParameters = IdentifyParameters;
          this.QueryTask = QueryTask;
          this.Query = Query;
          this.BufferParameters = BufferParameters;
          this.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
          this.GraphicsLayer = GraphicsLayer;
          this.ImageParameters = ImageParameters;
          this.TileInfo = TileInfo;
          this.WebTiledLayer = WebTiledLayer;
          this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
          this.Point = Point;
          this.ScreenPoint = ScreenPoint;
          this.Extent = Extent;
          this.Polyline = Polyline;
          this.Polygon = Polygon;
          this.WebMercatorUtils = WebMercatorUtils;
          this.PictureMarkerSymbol = PictureMarkerSymbol;
          this.SimpleMarkerSymbol = SimpleMarkerSymbol;
          this.SimpleLineSymbol = SimpleLineSymbol;
          this.CartographicLineSymbol = CartographicLineSymbol;
          this.PictureFillSymbol = PictureFillSymbol;
          this.SimpleFillSymbol = SimpleFillSymbol;
          this.TextSymbol = TextSymbol;
          this.Font = Font;
          this.Draw = Draw;
          this.MapImageLayer = MapImageLayer;
          this.MapImage = MapImage;

          this.initMap();
          this.addMapEvent();
        }
      );
    },
    /**
     * 初始化地图
     */
    initMap() {
      // 初始化几何服务
      if (this.geoUrl) {
        this.geometryService = new this.GeometryService(this.geoUrl);
      } else {
        throw new Error('geoUrl未配置，将导致坐标转换等功能无法使用！');
      }

      // 设置代理
      if (this.isProxy) {
        this.esriConfig.defaults.io.proxyUrl = this.proxyUrl;
        this.esriConfig.defaults.io.alwaysUseProxy = true;
        this.urlUtils.addProxyRule({
          urlPrefix: 'route.arcgis.com',
          proxyUrl: this.proxyUrl
        });
      }

      // 初始化地图
      this.map = new this.Map(this.$refs.eMap, {
        logo: false,
        slider: false
      });
      // this.$emit('mapReady', this);
      // 加载底图
      if (this.mapType === 'tdt') {
        // 初始底图
        this.getTdtLayer(
          Array.isArray(this.mapUrl) ? this.mapUrl : [this.mapUrl]
        ).then((layers = []) => {
          const baseamapLayerIds = [];
          layers.forEach((layer, index) => {
            baseamapLayerIds.push(layer.id);
            this.map.addLayer(layer);
          });
          this.basemapIds.push(baseamapLayerIds);
        });

        // 切换的其它底图
        this.submapUrl.forEach((submap = []) => {
          this.getTdtLayer(Array.isArray(submap) ? submap : [submap]).then(
            (layers = []) => {
              const baseamapLayerIds = [];
              layers.forEach((layer, index) => {
                layer.setVisibility(false);
                baseamapLayerIds.push(layer.id);
                this.map.addLayer(layer);
              });
              this.basemapIds.push(baseamapLayerIds);
            }
          );
        });
      } else if (this.mapType === 'google') {
        // 初始底图
        this.getGoogleLayer(this.mapUrl).then((layer) => {
          const googleMapLayerId = `${this.mapType}_base_0`;
          this.basemapIds.push(googleMapLayerId);
          layer.id = googleMapLayerId;
          this.map.addLayer(layer);
        });

        // 切换的其它底图
        this.submapUrl.forEach((submap, index) => {
          this.getGoogleLayer(submap).then((layer) => {
            const googleMapLayerId = `${this.mapType}_base_${index + 1}`;
            this.basemapIds.push(googleMapLayerId);
            layer.id = googleMapLayerId;
            layer.setVisibility(false);
            this.map.addLayer(layer);
          });
        });
      } else if (this.mapType === 'baidu') {
        this.getBaiduLayer(this.mapUrl).then((layers = []) => {
          const baseamapLayerIds = [];
          layers.forEach((layer, index) => {
            baseamapLayerIds.push(layer.id);
            this.map.addLayer(layer);
          });
          this.basemapIds.push(baseamapLayerIds);
        });
        // 切换的其它底图
        this.submapUrl.forEach((submap = []) => {
          this.getBaiduLayer(Array.isArray(submap) ? submap : [submap]).then(
            (layers = []) => {
              const baseamapLayerIds = [];
              layers.forEach((layer, index) => {
                layer.setVisibility(false);
                baseamapLayerIds.push(layer.id);
                this.map.addLayer(layer);
              });
              this.basemapIds.push(baseamapLayerIds);
            }
          );
        });
      } else if (this.mapType === 'mapBox') {
        this.getMapboxLayer(this.mapUrl).then((layers = []) => {
          const baseamapLayerIds = [];
          layers.forEach((layer, index) => {
            baseamapLayerIds.push(layer.id);
            this.map.addLayer(layer);
          });
          this.basemapIds.push(baseamapLayerIds);
        });
        // 切换的其它底图
        this.submapUrl.forEach((submap = []) => {
          this.getMapboxLayer(Array.isArray(submap) ? submap : [submap]).then(
            (layers = []) => {
              const baseamapLayerIds = [];
              layers.forEach((layer, index) => {
                layer.setVisibility(false);
                baseamapLayerIds.push(layer.id);
                this.map.addLayer(layer);
              });
              this.basemapIds.push(baseamapLayerIds);
            }
          );
        });
        // // 初始底图
        // this.getMapboxLayer().then((layers) => {
        //   this.map.addLayer(layers);
        // });
      } else if (this.mapType === 'other') {
        this.getOtherLayer();
      } else if (this.mapType === 'esri') {
        // 初始底图
        const esriBasemapLayerId = `${this.mapType}_base_0`,
          esriBasemapLayer = new this.ArcGISTiledMapServiceLayer(this.mapUrl, {
            id: esriBasemapLayerId
          });
        this.basemapIds.push(esriBasemapLayerId);
        this.map.addLayer(esriBasemapLayer);

        // 切换的其它底图
        this.submapUrl.forEach((submap, index) => {
          const esriSubmapLayerId = `${this.mapType}_base_${index + 1}`,
            esriSubmapLayer = new this.ArcGISTiledMapServiceLayer(submap, {
              id: esriSubmapLayerId
            });
          this.basemapIds.push(esriSubmapLayerId);
          esriSubmapLayer.setVisibility(false);
          this.map.addLayer(esriSubmapLayer);
        });
      } else {
        throw new Error('请指定输入属性 mapType 的值！');
      }
    },
    /**
     * 获取天地图图层
     * @param layers 图层的代码
     * @returns {Promise<T>}
     */
    getTdtLayer(layers = []) {
      return new Promise((resolve) => {
        const tileInfo = new this.TileInfo({
            rows: 256,
            cols: 256,
            compressionQuality: 0,
            origin: {
              x: -180,
              y: 90
            },
            spatialReference: {
              wkid: 4326
            },
            lods: [
              { level: 2, resolution: 0.3515625, scale: 147748796.52937502 },
              { level: 3, resolution: 0.17578125, scale: 73874398.264687508 },
              { level: 4, resolution: 0.087890625, scale: 36937199.132343754 },
              { level: 5, resolution: 0.0439453125, scale: 18468599.566171877 },
              {
                level: 6,
                resolution: 0.02197265625,
                scale: 9234299.7830859385
              },
              {
                level: 7,
                resolution: 0.010986328125,
                scale: 4617149.8915429693
              },
              {
                level: 8,
                resolution: 0.0054931640625,
                scale: 2308574.9457714846
              },
              {
                level: 9,
                resolution: 0.00274658203125,
                scale: 1154287.4728857423
              },
              {
                level: 10,
                resolution: 0.001373291015625,
                scale: 577143.73644287116
              },
              {
                level: 11,
                resolution: 0.0006866455078125,
                scale: 288571.86822143558
              },
              {
                level: 12,
                resolution: 0.00034332275390625,
                scale: 144285.93411071779
              },
              {
                level: 13,
                resolution: 0.000171661376953125,
                scale: 72142.967055358895
              },
              {
                level: 14,
                resolution: 8.58306884765625e-5,
                scale: 36071.483527679447
              },
              {
                level: 15,
                resolution: 4.291534423828125e-5,
                scale: 18035.741763839724
              },
              {
                level: 16,
                resolution: 2.1457672119140625e-5,
                scale: 9017.8708819198619
              },
              {
                level: 17,
                resolution: 1.0728836059570313e-5,
                scale: 4508.9354409599309
              },
              {
                level: 18,
                resolution: 5.3644180297851563e-6,
                scale: 2254.4677204799655
              }
            ]
          }),
          subDomains = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
          tdtLayers = [];
        layers.forEach((type) => {
          const templateUrl =
            'https://${subDomain}.tianditu.gov.cn/DataServer?T=' +
            type +
            '_c&X=${col}&Y=${row}&L=${level}&tk=' +
            this.token;
          //  const templateUrl =
          // 'https://iessence.com.cn/tianditu${subDomain}/?T=' +
          // type +
          // '_c&X=${col}&Y=${row}&L=${level}&tk=' +
          // this.tdtTK;
          const tdtLayer = new this.WebTiledLayer(templateUrl, {
            id: 'tdt_' + type,
            subDomains: subDomains,
            tileInfo: tileInfo
          });
          tdtLayers.push(tdtLayer);
        });
        resolve(tdtLayers);
      });
    },

    /**
     * 获取谷歌图层
     * @param layer 图层的代码
     * @returns {Promise<T>}
     */
    getGoogleLayer(layer) {
      return new Promise((resolve) => {
        const tileInfo = new this.TileInfo({
            rows: 256,
            cols: 256,
            compressionQuality: 0,
            origin: {
              x: -20037508.342787,
              y: 20037508.342787
            },
            spatialReference: {
              wkid: 102113
            },
            lods: [
              { level: 0, scale: 591657527.591555, resolution: 156543.033928 },
              {
                level: 1,
                scale: 295828763.795777,
                resolution: 78271.5169639999
              },
              {
                level: 2,
                scale: 147914381.897889,
                resolution: 39135.7584820001
              },
              {
                level: 3,
                scale: 73957190.948944,
                resolution: 19567.8792409999
              },
              {
                level: 4,
                scale: 36978595.474472,
                resolution: 9783.93962049996
              },
              {
                level: 5,
                scale: 18489297.737236,
                resolution: 4891.96981024998
              },
              { level: 6, scale: 9244648.868618, resolution: 2445.98490512499 },
              { level: 7, scale: 4622324.434309, resolution: 1222.99245256249 },
              { level: 8, scale: 2311162.217155, resolution: 611.49622628138 },
              { level: 9, scale: 1155581.108577, resolution: 305.748113140558 },
              { level: 10, scale: 577790.554289, resolution: 152.874056570411 },
              { level: 11, scale: 288895.277144, resolution: 76.4370282850732 },
              { level: 12, scale: 144447.638572, resolution: 38.2185141425366 },
              { level: 13, scale: 72223.819286, resolution: 19.1092570712683 },
              { level: 14, scale: 36111.909643, resolution: 9.55462853563415 },
              { level: 15, scale: 18055.954822, resolution: 4.77731426794937 },
              { level: 16, scale: 9027.977411, resolution: 2.38865713397468 },
              { level: 17, scale: 4513.988705, resolution: 1.19432856685505 },
              { level: 18, scale: 2256.994353, resolution: 0.597164283559817 },
              { level: 19, scale: 1128.497176, resolution: 0.298582141647617 }
            ]
          }),
          subDomains = ['mt0', 'mt1', 'mt2', 'mt3'],
          templateUrl =
            'https://${subDomain}.google.cn/vt/lyrs=' +
            layer +
            '&hl=zh-CN&gl=cn&x=${col}&y=${row}&z=${level}&s=Gali',
          googleLayer = new this.WebTiledLayer(templateUrl, {
            id: 'google_' + layer,
            subDomains: subDomains,
            tileInfo: tileInfo
          });
        resolve(googleLayer);
      });
    },
    /**
     * 获取百度图层
     * @param layer 图层的代码
     * @returns {Promise<T>}
     */
    getBaiduLayer(layers = []) {
      return new Promise((resolve) => {
        const tileInfo = new this.TileInfo({
            rows: 256,
            cols: 256,
            compressionQuality: 90,
            origin: {
              x: -16777360, // 济南适用
              y: 16802960
            },
            spatialReference: {
              wkid: 102100
            },
            lods: [
              {
                level: 0,
                resolution: 131072,
                scale: 131072 * 256
              },
              {
                level: 1,
                resolution: 65536,
                scale: 65536 * 256
              },
              {
                level: 2,
                resolution: 32768,
                scale: 32768 * 256
              },
              {
                level: 3,
                resolution: 16384,
                scale: 16384 * 256
              },
              {
                level: 4,
                resolution: 8192,
                scale: 8192 * 256
              },
              {
                level: 5,
                resolution: 4096,
                scale: 4096 * 256
              },
              {
                level: 6,
                resolution: 2048,
                scale: 2048 * 256
              },
              {
                level: 7,
                resolution: 1024,
                scale: 1024 * 256
              },
              {
                level: 8,
                resolution: 512,
                scale: 512 * 256
              },
              {
                level: 9,
                resolution: 256,
                scale: 256 * 256
              },
              {
                level: 10,
                resolution: 128,
                scale: 128 * 256
              },
              {
                level: 11,
                resolution: 64,
                scale: 64 * 256
              },
              {
                level: 12,
                resolution: 32,
                scale: 32 * 256
              },
              {
                level: 13,
                resolution: 16,
                scale: 16 * 256
              },
              {
                level: 14,
                resolution: 8,
                scale: 8 * 256
              },
              {
                level: 15,
                resolution: 4,
                scale: 4 * 256
              },
              {
                level: 16,
                resolution: 2,
                scale: 2 * 256
              },
              {
                level: 17,
                resolution: 1,
                scale: 1 * 256
              },
              {
                level: 18,
                resolution: 0.5,
                scale: 0.5 * 256
              },
              {
                level: 19,
                resolution: 0.25,
                scale: 0.25 * 256
              }
            ]
          }),
          //  templateUrl =
          //   'http://api0.map.bdimg.com/customimage/tile?=&x=${col}&y=${row}&z=${level}&scale=1&customid=midnight',
          templateUrl =
            'http://maponline0.bdimg.com/tile/?qt=vtile&x=${col}&y=${row}&z=${level}&styles=pl&scaler=1',
          baiduLayers = [];
        layers.forEach((layer) => {
          const baiduLayer = new this.WebTiledLayer(templateUrl, {
            id: 'baidu_' + layer,
            tileInfo: tileInfo
          });
          baiduLayer.getTileUrl = (level, row, col) => {
            var zoom = level - 1;
            var offsetX = Math.pow(2, zoom);
            var offsetY = offsetX - 1;
            var numX = col - offsetX;
            var numY = -row + offsetY;
            zoom = level + 1;
            var num = ((col + row) % 8) + 1;
            let templateUrl;
            switch (layer) {
              case 'st':
                templateUrl =
                  'http://shangetu' +
                  num +
                  '.map.bdimg.com/it/u=x=' +
                  numX +
                  ';y=' +
                  numY +
                  ';z=' +
                  zoom +
                  ';v=009;type=sate&fm=46';
                break;
              case 'rd':
                templateUrl =
                  'http://online1.map.bdimg.com/tile/?qt=tile&x=' +
                  numX +
                  '&y=' +
                  numY +
                  '&z=' +
                  zoom +
                  '&styles=pl';
                break;
              default:
                templateUrl =
                  'http://online' +
                  num +
                  '.map.bdimg.com/tile/?qt=tile&x=' +
                  numX +
                  '&y=' +
                  numY +
                  '&z=' +
                  zoom +
                  '&styles=pl&scaler=1&udt=20141103';
                break;
            }
            return templateUrl;
          };
          baiduLayers.push(baiduLayer);
        });
        resolve(baiduLayers);
      });
    },
    // /**
    //  * 获取其他图层
    //  * @param layers 图层的代码
    //  * @returns {Promise<T>}
    //  */
    // getMapboxLayer(layers = []) {
    //   return new Promise((resolve) => {
    //     const subDomains = ['a', 'b', 'c'],
    //       templateUrl =
    //         'https://${subDomain}.tiles.mapbox.com/v4/mapbox.dark/${level}/${col}/${row}.png?access_token=pk.eyJ1Ijoid2xvbmxpbmUiLCJhIjoiY2s1MjFhMjM0MDN4OTNqcDhjbGY1d3N6ZiJ9.DqC7SXU6B5W-04B7vC6bBQ',
    //       mapBoxLayer = new this.WebTiledLayer(templateUrl, {
    //         id: 'mapBox',
    //         subDomains: subDomains
    //       });
    //     resolve(mapBoxLayer);
    //   });
    // },
    /**
     * 获取其他图层
     * @param layers 图层的代码
     * @returns {Promise<T>}
     */
    getMapboxLayer(layers) {
      return new Promise((resolve) => {
        const mabBoxLayers = [];
        layers.forEach((layer) => {
          const templateUrl =
              'https://api.mapbox.com/styles/v1/mapbox/' +
              layer +
              '/tiles/${level}/${col}/${row}@2x?access_token=' + this.token,
            mapBoxLayer = new this.WebTiledLayer(templateUrl, {
              id: 'mapBox' + layer
              // subDomains: subDomains
            });
          mabBoxLayers.push(mapBoxLayer);
        });
        resolve(mabBoxLayers);
      });
    },
    // 加载其他组件
    getOtherLayer() {},

    /**
     * 底图切换
     * @param {number} layerIndex
     */
    changeBaseLayer(layerIndex) {
      if (this.currBaseLayerIndex !== layerIndex) {
        this.basemapIds.forEach((mapIds, index) => {
          if (layerIndex === index) {
            const prevBaseLayerIndex = this.currBaseLayerIndex;
            this.currBaseLayerIndex = layerIndex;
            if (Array.isArray(mapIds)) {
              mapIds.forEach((id) => {
                this.map.getLayer(id).setVisibility(true);
              });
            } else {
              this.map.getLayer(mapIds).setVisibility(true);
            }
            this.$emit('baseLayerChange', {
              prev: prevBaseLayerIndex,
              curr: this.currBaseLayerIndex
            });
          } else {
            if (Array.isArray(mapIds)) {
              mapIds.forEach((id) => {
                this.map.getLayer(id).setVisibility(false);
              });
            } else {
              this.map.getLayer(mapIds).setVisibility(false);
            }
          }
        });
      }
    },
    /**
     * 加载arcgis api for javascript的模块
     * @param modules
     * @returns {Promise<any>}
     */
    loadEsriModules(modules) {
      return this.eVueErimapLoader.loadModules(modules);
    },
    /**
     * 地图注册事件
     */
    addMapEvent() {
      this.map.on('load', () => {
        if (this.newInitExtent) {
          this.fit = true;
          this.setExtent(this.newInitExtent, this.fit).then(() => {
            this.$emit('mapReady', this);
          });
        } else {
          this.newInitExtent = this.map.extent;
          this.$emit('mapReady', this);
        }
      });

      this.map.on('extent-change', (event) => {
        this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
        this.isMin = this.map.getZoom() <= this.map.getMinZoom();
        this.$emit('exentChange', event);
      });
    },
    /**
     * 设置地图范围
     * @param extent
     * @param {Boolean} fit
     */
    setExtent(extent, fit = false) {
      this.fit = fit;
      extent.spatialReference = this.map.spatialReference;
      this.newInitExtent = new this.Extent(extent);
      return this.map.setExtent(this.newInitExtent, fit);
    },
    /**
     * 动态添加esri.css
     */
    addEsriMapCss() {
      const linkId = 'esriCss';
      if (!document.getElementById(linkId)) {
        const head = document.getElementsByTagName('head')[0],
          link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = this.esriCSSUrl;
        head.appendChild(link);
      }
    },
    /**
     * 放大
     */
    zoomIn() {
      this.isMax = this.map.getZoom() >= this.map.getMaxZoom();
      if (!this.isMax) {
        this.map.setZoom(this.map.getZoom() + 1);
      }
    },
    /**
     * 缩小
     */
    zoomOut() {
      this.isMin = this.map.getZoom() <= this.map.getMinZoom();
      if (!this.isMin) {
        this.map.setZoom(this.map.getZoom() - 1);
      }
    },

    /**
     * 全图
     */
    fullMap() {
      this.map.setExtent(this.newInitExtent, this.fit);
    },
    /**
     * GP服务获取数据（异步）
     * @param {AsyncGetResultParam} params
     */
    gpAsyncGetResultData(params) {
      const gp = new this.Geoprocessor(params.url);
      gp.submitJob(
        params.inParamVal,
        (jobInfo) => {
          gp.getResultData(
            jobInfo.jobId,
            params.outParamName,
            (result) => {
              params.success(result);
            },
            (error) => {
              params.error(error);
            }
          );
        },
        (jobInfo) => {
          if (params.status) {
            params.status(jobInfo);
          }
        },
        (error) => {
          params.error(error);
        }
      );
    },
    /**
     * GP服务获取结果图片图层（异步）
     * @param {AsyncGetResultParam} params
     */
    gpAsyncGetResultImageLayer(params) {
      const gp = new this.Geoprocessor(params.url);
      gp.submitJob(
        params.inParamVal,
        (jobInfo) => {
          const imageParameters = new this.ImageParameters();
          imageParameters.imageSpatialReference = this.map.spatialReference;
          gp.getResultImageLayer(
            jobInfo.jobId,
            params.outParamName,
            imageParameters,
            (result) => {
              params.success(result);
            },
            (error) => {
              params.error(error);
            }
          );
        },
        (jobInfo) => {
          if (params.status) {
            params.status(jobInfo);
          }
        },
        (error) => {
          params.error(error);
        }
      );
    },
    /**
     * 点定位
     * @param point
     */
    locationPoint(point, url = './assets/images/map/location.gif') {
      if (!this.locationLayer) {
        this.locationLayer = new this.GraphicsLayer();
      }
      const mp = new this.Point({
          x: point.x,
          y: point.y,
          spatialReference: this.map.spatialReference
        }),
        mpSymbol = new this.PictureMarkerSymbol({
          url: url,
          height: 40,
          width: 40
        }),
        gra = new this.Graphic(mp, mpSymbol);

      this.locationLayer.clear();
      this.locationLayer.add(gra);
      this.map.addLayer(this.locationLayer, 0);
      this.map.centerAt(mp);

      // 清除定时器
      if (this.timeOutId) {
        window.clearTimeout(this.timeOutId);
      }

      // 10s之后清除定位动画gif
      this.timeOutId = window.setTimeout(() => {
        window.clearTimeout(this.timeOutId);
        this.locationLayer.clear();
      }, 10000);
    },
    /**
     * 清除定位图层
     */
    clearLocationLayer() {
      if (this.locationLayer) {
        this.locationLayer.clear();
      }
    },

    /**
     * 显示地图信息窗口
     * @param params 信息窗口参数，属性如下：
     * title {String} 信息窗口标题
     * content {String} 信息窗口内容，支持html
     * location {Point} 信息窗口位置
     * placement {String} 信息窗口方位
     * width {Number} 信息窗口宽度
     * height {Number} 信息窗口高度
     */
    showMapInfoWindow(params) {
      this.map.infoWindow.setTitle(params.title);
      this.map.infoWindow.setContent(params.content);
      this.map.infoWindow.resize(params.width || 200, params.height || 300);
      this.map.infoWindow.show(
        params.location,
        this.map.getInfoWindowAnchor(this.map.toScreen(params.location))
      );
    },

    /**
     * 隐藏地图信息窗口
     */
    hideMapInfoWindow() {
      this.map.infoWindow.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
.e-vue-map {
  position: relative;
  width: 100%;
  height: 100%;
  .eMap {
    width: 100%;
    height: 100%;
  }
  .eNavigation {
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 33px;
    height: 120px;
    font-size: 16px;

    .zoom-map {
      width: 33px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
      color: #757575;
      background-color: #ffffff;
      box-shadow: 1px 1px 5px 0 #adaaaa;

      &.zoom-in-map {
        border-bottom: 1px solid #d9d9d9;
      }

      &.full-map {
        margin-bottom: 10px;
      }

      &:hover {
        color: #03a9f4;
      }

      &.zoom-disable {
        color: #bebebe;
        cursor: auto;

        &:hover {
          color: #bebebe;
        }
      }
    }
  }
}
</style>

