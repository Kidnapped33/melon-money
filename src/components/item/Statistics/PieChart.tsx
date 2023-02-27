import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import s from "./PieChart.module.scss";

export const PieChart = defineComponent({

  setup: (props, context) => {
    const refPieChart = ref<HTMLDivElement>();
    onMounted(()=>{
      let pieChart = echarts.init(refPieChart.value!);
      pieChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });  
    });
    return () => <div ref={refPieChart} class={s.pieChart}></div>;
  },
});
