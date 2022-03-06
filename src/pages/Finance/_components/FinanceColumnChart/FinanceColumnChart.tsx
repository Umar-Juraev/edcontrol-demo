import React, { FC } from "react";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

import { useIncomeStatisticsQuery } from "store/endpoints";

import "./FinanceColumnChart.scss";

export type Props = {
  incomeType?: "annual" | "monthly";
};

const FinanceColumnChart: FC<Props> = ({ incomeType }) => {
  const { data: incomeStatisticsData } = useIncomeStatisticsQuery();
  var optimalColumnWidthPercent = 20 + (60 / (1 + 30 * Math.exp(incomeStatisticsData?.income_by_years?.length ?? 2 / 2)));

  const chartData =
    incomeType === "annual"
      ? incomeStatisticsData?.income_by_years.map((item) => item.income)
      : incomeStatisticsData?.income_by_years[0].income_by_months.map(
        (item) => item.income
      );

  const categoriesData =
    incomeType === "annual"
      ? incomeStatisticsData?.income_by_years.map((item) => item.year)
      : incomeStatisticsData?.income_by_years[0].income_by_months.map(
        (item) => item.month
      );

  const series: ApexAxisChartSeries = [
    {
      name: "Inflation",
      data: chartData || [],
    },
  ];

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      fontFamily: "Inter",
    },
    fill: {
      colors: ["#377DFF"],
      opacity: 0.5,
    },

    plotOptions: {
      bar: {
        borderRadius: 10,
        colors: {
          backgroundBarColors: new Array(10).fill("#377DFF"),
          backgroundBarOpacity: 0.1,
          backgroundBarRadius: 10,
        },
        // columnWidth: "56px",
        columnWidth: optimalColumnWidthPercent + "%"
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "14px",
        colors: ["#304758"],
        // rotate: "90deg",
      },

    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: categoriesData,
      axisBorder: {
        show: false,
      },

      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          cssClass: "x-label",
          fontSize: "16px",
          colors: ["#323B4B"],
        },
      },
      title: {
        style: {
          cssClass: "apexcharts-xaxis-title",
        },
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      enabled: false,
      //   enabled: true,
      //   custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      //     return (
      //       '<div class="arrow_box">' +
      //       "<span>" +
      //       series[seriesIndex][dataPointIndex] +
      //       "</span>" +
      //       "</div>"
      //     );
      //   },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default FinanceColumnChart;
