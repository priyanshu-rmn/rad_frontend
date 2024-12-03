import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function BarChart({ chartData }: { chartData: any }) {
  const options: Highcharts.Options = {
    title: {
      text: "Application Stage",
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
