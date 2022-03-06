import React, { FC } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useIncomeStatisticsQuery, usePaymentStatisticsQuery } from 'store/endpoints';
import { separateNumberThousands } from 'utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

type Props = {
    isAnnual: boolean
}

const BarChart: FC<Props> = ({ isAnnual }) => {
    const { data: statisticsData } = usePaymentStatisticsQuery()
    // console.log(statisticsData)

    const chartData =
        isAnnual
            ? statisticsData?.payment_by_years.map((item) => item.payment)
            : statisticsData?.payment_by_years[0].payment_by_months.map(
                (item) => item.payment
            );

    const labels =
        isAnnual
            ? statisticsData?.payment_by_years.map((item) => `${item.year.toString()} yil`)
            : statisticsData?.payment_by_years[0].payment_by_months.map(
                (item) => item.payment !== null ? `${item.month.toString()}` : ''
            );

    // console.log(Math.max(...(chartData || [])))

    return (
        <>
            <Bar
                data={{
                    labels: labels || [''],
                    datasets: [
                        {
                            data: chartData,
                            backgroundColor: 'rgba(55, 125, 255, 0.5)',
                            borderWidth: { top: 10 },
                            borderRadius: 8,
                            borderSkipped: false,
                            barThickness: 50,
                        }
                    ],
                }}

                options={{
                    layout: {
                        autoPadding: false
                    },
                    responsive: true,
                    plugins: {
                        tooltip: {
                            yAlign: 'bottom',
                            displayColors: false,
                            padding: 12,
                            callbacks: {
                                title: (item) => `${item[0].label} to'lovlari`,
                                label: (item) => `${separateNumberThousands(item.raw)} so'm`
                            }
                        },
                        legend: {
                            display: false,
                        },
                        title: {
                            display: false,
                        },
                        datalabels: {
                            formatter: function (value, context: any) {
                                return value ? `${separateNumberThousands(value)} so'm` : '';
                            },
                            rotation: -90,
                            font: {
                                weight: 500,
                                size: 14
                            },
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                                drawBorder: false,
                            },
                            bounds: 'ticks',
                            stacked: true
                        },
                        y: {
                            stacked: true,
                            grid: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false,
                            },
                        }
                    },
                }}
            />
        </>
    )
}

export default BarChart