import Highcharts from "highcharts/modules/funnel";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/exporting"
import "highcharts/modules/funnel"
import "highcharts/modules/offline-exporting"
// import { useRef } from 'react';

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

export default function FunnelChart(
  /*props: HighchartsReact.Props*/ { chartData }: { chartData: any }
) {
  // const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    chart: {
      height: 400,
      spacing: [25, 25, 25, 25],
      borderRadius: 15
    },
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
        neckWidth: "20%",
        neckHeight: "25%",
        width: "75%",
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        type: "funnel",

        name: "Appication count",
        data: chartData,
        dataLabels: {
          softConnector: true,
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            plotOptions: {
              series: {
                dataLabels: {
                  inside: true,
                },
              },
              funnel: {
                center: ["50%", "50%"],
                width: "100%",
              },
            },
          },
        },
      ],
    },
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
