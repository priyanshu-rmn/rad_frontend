import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/exporting";
import "highcharts/modules/offline-exporting";
import { dataType } from "../../pages/Dashboard";

const transformToSeries = (
  inputData: dataType["application_per_job_posting"]
) => {
  return Object.entries(inputData).map(([title, jobData]) => {
    const formattedData = Object.entries(jobData).map(([date, value]) => {
      const timestamp = new Date(date).getTime(); // Convert date to timestamp
      return [timestamp, value];
    });

    return {
      type: "line",
      name: title,
      data: formattedData,
    };
  });
};

export default function TimeSeriesChart({
  chartData,
}: {
  chartData: dataType["application_per_job_posting"];
}) {
  const options = {
    chart: {
      zooming: {
        type: "x",
      },
      height: 700,
      spacing: [25, 25, 25, 25],
      borderRadius: 15,
    },
    title: {
      text: "Application per job posting",
      align: "left",
    },
    subtitle: {
      text:
        document.ontouchstart === undefined
          ? "Click and drag in the plot area to zoom in"
          : "Pinch the chart to zoom in",
      //   align: "left",
    },
    xAxis: {
      type: "datetime",
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      area: {
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        color: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgb(199, 113, 243)"],
            [0.7, "rgb(76, 175, 254)"],
          ],
        },
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },

    series: transformToSeries(chartData),
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
