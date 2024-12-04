import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/exporting"
import "highcharts/modules/offline-exporting"

export default function BarChart({ chartData }: { chartData: any }) {
  const options: Highcharts.Options = {
    chart: {
      spacing: [25, 25, 25, 25],
      borderRadius: 15
    },
    title: {
      text: "Time to hire",
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b> ({point.y:,.0f})",
        },
      },
      funnel: {
        center: ["40%", "50%"],
        neckWidth: "30%",
        neckHeight: "25%",
        width: "80%",
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "bar",
        name: "Average Time",
        data: chartData,
      },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      // ref={chartComponentRef}
      // {...props}
    />
  );
}
