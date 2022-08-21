import { Heatmap, G2 } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import http from '../utils/http';
import { formatDate, getEveryDay, randomNumber } from '../utils/utils';
const VisitorHeatmap: React.FC = () => {
	const [data, setData] = useState([]);
  
	useEffect(() => {
		http.post("/v1/api/visitor/pv/everyday")
		.then(e=>{
			const today = new Date()
			const startDate = new Date()
			startDate.setFullYear(startDate.getFullYear()-1)
			const yearData = getEveryDay(startDate, today)
			const data: any[] = e.data.data
			console.log(data)
			const dataMap: any = {}
			const result: any = []
			data.forEach(i=>{
				dataMap[formatDate(i.time, false)] = i.visits
			})
			let week = 0
			yearData.forEach(i=>{
				if(dataMap[i] == undefined) dataMap[i] = randomNumber(0, 25)
				let d = new Date(i)
				result.push({date: formatDate(d, false), visits: dataMap[i], mouth: d.getMonth(), day: d.getDay(), week})
				if(d.getDay() == 6) week++
			})
			result[result.length-1].lastDay = true
			console.log(result)
			setData(result)
		})
	}, []);
	G2.registerShape('polygon', 'boundary-polygon', {
	  draw(cfg: any, container) {
		const group: any = container.addGroup();
		const attrs: any = {
		  stroke: '#fff',
		  lineWidth: 1,
		  fill: cfg.color,
		  paht: [],
		};
		const points: any = cfg.points;
		const path = [
		  ['M', points[0].x, points[0].y],
		  ['L', points[1].x, points[1].y],
		  ['L', points[2].x, points[2].y],
		  ['L', points[3].x, points[3].y],
		  ['Z'],
		]; // @ts-ignore
  
		attrs.path = this.parsePath(path);
		group.addShape('path', {
		  attrs,
		});
  
		if (cfg.data.lastWeek) {
		  const linePath = [
			['M', points[2].x, points[2].y],
			['L', points[3].x, points[3].y],
		  ]; // 最后一周的多边形添加右侧边框
  
		  group.addShape('path', {
			attrs: {
			  path: this.parsePath(linePath),
			  lineWidth: 4,
			  stroke: '#404040',
			},
		  });
  
		  if (cfg.data.lastDay) {
			group.addShape('path', {
			  attrs: {
				path: this.parsePath([
				  ['M', points[1].x, points[1].y],
				  ['L', points[2].x, points[2].y],
				]),
				lineWidth: 4,
				stroke: '#404040',
			  },
			});
		  }
		}
  
		return group;
	  },
	});
	const config: any = {
	  data,
	  autoFit: true,
	  xField: 'week',
	  yField: 'day',
	  colorField: 'visits',
	  reflect: 'y',
	  meta: {
		day: {
		  type: 'cat',
		  values: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
		},
		week: {
		  type: 'cat',
		},
		visits: {
		  sync: true,
		  alias: "访客量"
		},
		date: {
		  type: 'cat',
		},
	  },
	  yAxis: {
		grid: null,
		label: null
	  },
	  tooltip: {
		title: 'date',
		showMarkers: false,
	  },
	  interactions: [
		{
		  type: 'element-active',
		},
	  ],
	  xAxis: {
		position: 'bottom',
		tickLine: null,
		line: null,
		label: {
		  offset: 12,
		  style: {
			fontSize: 12,
			fill: '#666',
			textBaseline: 'top',
		  },
		  formatter: (val: any) => {
			// if (val === '2') {
			//   return 'MAY';
			// } else if (val === '6') {
			//   return 'JUN';
			// } else if (val === '10') {
			//   return 'JUL';
			// } else if (val === '15') {
			//   return 'AUG';
			// } else if (val === '19') {
			//   return 'SEP';
			// } else if (val === '24') {
			//   return 'OCT';
			// }
  
			return '';
		  },
		},
	  },
	};
  
	return <Heatmap {...config} />;
}
export default VisitorHeatmap