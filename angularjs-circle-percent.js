angular.module('circle.percent', [])
/**
 * 圆形百分比
 * 传如参数说明:
 */
.directive('circleDirective', function() {
	return {
		scope: {
			dataPercent:'@'
		},
		link : function(scope, el, attr) {
			
			var options = {
				    percent: attr.percent,
				    size:  80,
				    lineWidth:  3,
				    rotate:  0
				}

				var canvas = document.createElement('canvas');
				canvas.className="circle-canvas";
				var span = document.createElement('span');
				span.className="circle-span";
				span.textContent = options.percent + '%';
				    
				if (typeof(G_vmlCanvasManager) !== 'undefined') {
				    G_vmlCanvasManager.initElement(canvas);
				}

				var ctx = canvas.getContext('2d');
				canvas.width = canvas.height = options.size;

				el.append(span);
				el.append(canvas);

				ctx.translate(options.size / 2, options.size / 2); // change center
				ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

				//imd = ctx.getImageData(0, 0, 240, 240);
				var radius = (options.size - options.lineWidth) / 2;

				var drawCircle = function(color, lineWidth, percent) {
						percent = Math.min(Math.max(0, percent || 1), 1);
						ctx.beginPath();
						ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
						ctx.strokeStyle = color;
				        ctx.lineCap = 'round'; // butt, round or square
						ctx.lineWidth = lineWidth
						ctx.stroke();
				};

				drawCircle('#dddddd', options.lineWidth, 100 / 100);
				drawCircle('#fc6972', options.lineWidth, options.percent / 100);
			
		}
	};
});