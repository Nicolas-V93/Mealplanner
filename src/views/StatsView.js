import {
  CARBS_PERCENTAGE,
  PROTEINS_PERCENTAGE,
  FATS_PERCENTAGE,
} from '../config';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);

class StatsView {
  #parentElement = document.querySelector('#person-stats');
  #ctx;

  displayStats(data) {
    this.#clear();
    const markup = this.#generateMarkup(data);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
    this.#displayChart(data.macros);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #displayChart(macros) {
    this.#ctx = document.querySelector('#macroChart');
    new Chart(this.#ctx, {
      type: 'pie',
      data: {
        labels: [
          `Carbs ${CARBS_PERCENTAGE}%`,
          `Proteins ${PROTEINS_PERCENTAGE}%`,
          `Fats ${FATS_PERCENTAGE}%`,
        ],
        datasets: [
          {
            label: 'macros',
            data: [macros.carbs, macros.proteins, macros.fats],
            backgroundColor: ['#94B49F', '#FCF8E8', '#ECB390'],
            borderColor: ['#94B49F', '#FCF8E8', '#ECB390'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { text: 'Macros', display: true },
          datalabels: {
            formatter: function (value) {
              return `${value} grams`;
            },
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${
                  tooltipItem.label
                }: ${tooltipItem.raw.toString()} grams`;
              },
            },
          },
        },
      },
    });
  }

  #generateMarkup(data) {
    return `
  <h2 class="heading-secondary | text-center">Statistics</h2>
  <div class="statistics__data">
    <div class="statistics__img-box">
        <canvas id="macroChart" width="400" height="400">
        </canvas>
    </div>
    <div class="statistics__content flow">
      <div>
        <p class="heading-quaternary">Basal Metabolic Rate (BMR)</p>
        <p class="statistics__data">${data.bmr}</p>
      </div>
      <div>
        <p class="heading-quaternary">
                    Total Daily Energy Expenditure (TDEE)
                  </p>
        <p class="statistics__data">${data.tdee}</p>
      </div>
      <div>
        <p class="heading-quaternary">Daily calories based on goal</p>
        <p class="statistics__data">${data.goalTDEE}</p>
      </div>
    </div>
  </div>
`;
  }
}

export default new StatsView();
