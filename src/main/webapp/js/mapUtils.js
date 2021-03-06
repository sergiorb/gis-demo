function MapUtils(map) {

	if (!(this instanceof MapUtils)) {
		throw new Error("New 를 통해 생성 하십시오.");
	}

	this.map = map;
	this.view = map.getView();
};

MapUtils.prototype = {
	contructor: MapUtils,

	/**
	 * 현재 좌표계 조회
	 * 호출: GAIA3D.Utils.getCurProj()
	 */
	getCurProj: function() {
		return this.view.getProjection();
	},

	/**
	 * ID를 통해 레이어 찾기
	 * 호출: GAIA3D.Utils.getLayerById('base_layer')
	 */
	getLayerById: function(layerId) {
		var layer = null;
		if(layerId){
			var layers = this.map.getLayers().getArray();
			for(var i in layers){	 // 브라우저 호환성 - ie6~, chrome
				if(layers[i].get('id') === layerId){
					layer = layers[i];
					break;
				}
			}
		}
		return layer;
	},

	/**
	 * WKT로 Feature 그리기
	 */
	getFeatureFromWkt: function(wkt) {
		var format = new ol.format.WKT();
		var feature = format.readFeature(wkt, {
			dataProjection: 'EPSG:4326',
			featureProjection: this.getCurProj()
		});
		return feature;
	},

	/**
	 * Box(네 점의 좌표)로 Feature 그리기
	 */
	getFeatureFromBox: function(box) {
		var coord = this.getPolygonFromBox(box);
		var transCoord = this.transCoord4326ToCurProj(coord);
		var feature = this.getFeatureFromCoord('Polygon', transCoord);
		return feature;
	},

	/**
	 * Box를 Polygon으로 변경
	 */
	getPolygonFromBox: function(box) {
		var polygon = box.split(";");
		polygon.push(polygon[0]);
		return polygon;
	},

	/**
	 * 좌표로 Feature 그리기
	 */
	getFeatureFromCoord: function(geomType, coord) {
		var shape = {
			'Point': new ol.geom.Point(coord),
			'Polygon': new ol.geom.Polygon([coord])
		}

		var feature = new ol.Feature({
			geometry: shape[geomType]
		});

		return feature;
	},

	/**
	 * 4326 데이터를 현재 좌표계로 변경
	 */
	transCoord4326ToCurProj: function(coordArray) {
		var returnCoord = [];
		for(var i=0, l=coordArray.length; i<l; i++) {
			var coord = coordArray[i].split(",");
			var transCoord = ol.proj.transform(coord, "EPSG:4326", this.getCurProj());
			returnCoord.push(transCoord);
		}
		return returnCoord;
	},

	/**
	 * 레이어에 피쳐 추가 (단일)
	 */
	addFeatureToLayer: function(layerId, feature) {
		var layer = this.getLayerById(layerId);
		layer.getSource().addFeature(feature);
	},

	/**
	 * 레이어에 피쳐 추가 (다중)
	 */
	addFeaturesToLayer: function(layerId, features) {
		var layer = this.getLayerById(layerId);
		layer.getSource().addFeatures(features);
	},

	/**
	 * 선택한 객체 모두 지우기
	 */
	clearFeatureToSelect: function(select) {
		select.getFeatures().clear();
	},

	/**
	 * 특정 레이어의 모든 객체 지우기
	 */
	clearFeatureToLayer: function(layerId) {
		var layer = this.getLayerById(layerId);
		layer.getSource().clear();
	},

	/**
	 * 블록의 스타일 지정
	 */
	getBlockStyle: function() {
		var style = new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 0, 0, 1)'
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(0, 0, 0, 0.5)',
				//lineDash: [10, 10],
				width: 2
			})
        });
		return style;
	}

}