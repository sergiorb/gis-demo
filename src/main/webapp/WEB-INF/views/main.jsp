<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="ko-KR">
<head>
<meta charset="utf-8">
<meta content="IE=edge" http-equiv="X-UA-Compatible">
<title>Gaia3d Sample Page</title>
<link rel="stylesheet" href="../css/style.css">
</head>
<body>
	<div id="map" class="map"></div>
	<div class="mapControl">
		<p>지도</p>
		<button id="zoom" class="zoom" data-direction="in">지도확대</button>
		<button class="zoom" data-direction="out">지도축소</button>
		<button class="rotate" data-direction="right">지도회전(&lt;)</button>
		<button class="rotate" data-direction="left">지도회전(&gt;)</button>
		<p>그리기</p>
		<button class="draw" data-target-layer="draw_layer" data-type="Point">점</button>
		<button class="draw" data-target-layer="draw_layer" data-type="LineString">선</button>
		<button class="draw" data-target-layer="draw_layer" data-type="Polygon">면</button>
		<button class="draw" data-target-layer="draw_layer" data-type="Circle">원</button>
		<button class="draw" data-target-layer="draw_layer" data-type="None">없음</button>
		<p>블록</p>
		<button id="addBlock" data-target-layer="block_layer">블록조회</button>
		<button id="removeBlock" data-target-layer="block_layer">블록지우기</button>
		<button class="translate" data-status="off" data-on="블록이동 ON" data-off="블록이동 OFF">블록이동 OFF</button>
	</div>

	<!-- 스케일 바 -->
	<div id="scale-position"></div>

	<!-- 마우스 포지션 -->
	<div id="mouse-position"></div>

	<!-- 툴팁 -->
	<div id="tooltip" class="tooltipText"></div>
</body>
<script type="text/javascript" src="../externlib/jquery-3.3.1/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="../externlib/ol45/ol-debug.js"></script>
<script type="text/javascript" src="../externlib/proj4js-2.4.3/proj4.min.js"></script>
<script type="text/javascript" src="../js/mapInit.js"></script>
<script type="text/javascript" src="../js/mapTools.js"></script>
<script type="text/javascript" src="../js/mapUtils.js"></script>
<script type="text/javascript" src="../js/mapEvent.js"></script>
<script type="text/javascript">
var GAIA3D = GAIA3D||{};

GAIA3D.Policy = {}
GAIA3D.Policy.serverUrl = '${serverUrl}';
GAIA3D.Policy.geoserverDataUrl = '${mapUrl}';
GAIA3D.Policy.geoserverDataWorkspace = 'gaia3d';
GAIA3D.Policy.coordinate = 'EPSG:5187';
GAIA3D.Policy.mapDefaultLayer = '2017_demo';
GAIA3D.Policy.mapExtent = [-415909.65, -426336.34, 649203.95, 865410.62];
GAIA3D.Policy.mapCenter = [239700, 324800];

// 맵 생성
GAIA3D.Map = new MapWrapper(GAIA3D.Policy);
GAIA3D.Map.create('map');
// 툴바
GAIA3D.Tools = new MapTools(GAIA3D.Map.getMap());
// 유틸
GAIA3D.Utils = new MapUtils(GAIA3D.Map.getMap());

</script>
</html>