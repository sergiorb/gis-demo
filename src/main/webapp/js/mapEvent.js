(function() {
	// 지도 확대/축소
	$('.zoom').on('click', function() {
		var direction = $(this).data('direction');
		GAIA3D.Tools.setZoom(direction);
	});

	// 지도 회전(좌/우)
	$('.rotate').on('click', function() {
		var direction = $(this).data('direction');
		GAIA3D.Tools.setRotate(direction);
	});

	// 그리기
	$(".draw").on('click', function() {
		// Point? LineString? Polygon? draw 타입을 확인
		var type = $(this).data('type');

		// 어떤 레이어에 그림을 그리지? 저장된 레이어 id 불러오기
		var layerId = $(this).data('target-layer');
		var layer = GAIA3D.Utils.getLayerById(layerId);

		// 그 레이어의 source를 찾아서
		var source = layer.getSource();

		// draw geometry 함수 호출!
		GAIA3D.Tools.drawGeometry(source, type);
	});

	// 블록 조회
	$('#addBlock').on('click', function() {
		var layerId = $(this).data('target-layer');
		GAIA3D.Utils.clearFeatureToLayer(layerId);

		$.ajax({
			url: GAIA3D.Policy.serverUrl + '/block',
			//data: {},
			dataType: 'json',
			type: 'post',
			success: function(res) {
				addBlock(layerId, res);
			},
			error: function(e) {
				debugger;
			}
		})
	});

	// 블록 지우기
	$('#removeBlock').on('click', function() {
		// select feature
		var select = GAIA3D.Map.getSelect();
		GAIA3D.Utils.clearFeatureToSelect(select);

		// block layer clears
		var layerId = $(this).data('target-layer');
		GAIA3D.Utils.clearFeatureToLayer(layerId);
	});

	// 블록 이동
	$(".translate").on('click', function() {
		var status = $(this).data('status');
		var toggleStatus = status === 'on'? 'off' : 'on';

		// toggle
		$(this).data('status', toggleStatus);
		var text = $(this).data(toggleStatus);
		$(this).text(text);
		GAIA3D.Map.setTranslate(toggleStatus);

		// select feature 비활성화
		var select = GAIA3D.Map.getSelect();
		GAIA3D.Utils.clearFeatureToSelect(select);
	});
})();

function addBlock(layerId, res) {
	var feature = null;
	var features = [];
	var style = GAIA3D.Utils.getBlockStyle();

	for(var i in res) {
		feature = null;

		switch(res[i].blockType) {
		case "geometry":
			feature = GAIA3D.Utils.getFeatureFromWkt(res[i].geom);
			break;
		case "text":
			feature = GAIA3D.Utils.getFeatureFromBox(res[i].geom);
			break;
		}

		if(feature) {
			feature.setStyle(style);
			features.push(feature);
		}
	}

	// Map에 Features 추가하기
	GAIA3D.Utils.addFeaturesToLayer(layerId, features);
}