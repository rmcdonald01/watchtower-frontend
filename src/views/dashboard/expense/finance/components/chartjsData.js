import { $themeColors } from '@themeConfig'
// colors
const chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
}

export default {
  horizontalBarChart: {
    options: {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: 'top',
        },
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: chartColors.tooltipShadow,
        backgroundColor: $themeColors.light,
        titleFontColor: $themeColors.dark,
        bodyFontColor: $themeColors.dark,
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              zeroLineColor: chartColors.grid_line_color,
              borderColor: 'transparent',
              color: chartColors.grid_line_color,
              drawTicks: false,
            },
            scaleLabel: {
              display: true,
            },
            ticks: {
              min: 0,
              fontColor: chartColors.labelColor,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
            },
            ticks: {
              fontColor: chartColors.labelColor,
            },
          },
        ],
      },
    },
    data: {
      labels: ['MON', 'TUE', 'WED ', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          data: [710, 350, 470, 580, 230, 460, 120],
          backgroundColor: $themeColors.info,
          borderColor: 'transparent',
          barThickness: 15,
        },
      ],
    },
  },
}
