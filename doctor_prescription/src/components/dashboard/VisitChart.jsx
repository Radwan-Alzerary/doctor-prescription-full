import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function VisitChart(props) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ series: [], options: {} });

  useEffect(() => {
    if (props.dashboardVisitCount && Array.isArray(props.dashboardVisitCount)) {
      setLoading(false);
      const seriesData = props.dashboardVisitCount.map((entry) => entry.count);
      const dateLabels = props.dashboardVisitCount.map((entry) => entry.date);

      const newChartData = {
        series: [
          {
            name: 'Visits',
            data: seriesData,
          },
        ],
        options: {
          chart: {
            height: 350,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            type: 'datetime',
            categories: dateLabels,
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm',
            },
          },
          yaxis: {
            min: 0, // Set the minimum value of the y-axis to 0
          },

        },
      };
      setChartData(newChartData);
    } else {
      console.error("props.dashboardVisitCount is not a valid array");
    }
  }, [props.dashboardVisitCount]);

  return (
    <div id="chart">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      )}
    </div>
  );
}

export default VisitChart;
