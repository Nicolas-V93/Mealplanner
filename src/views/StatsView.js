import {
  CARBS_PERCENTAGE,
  PROTEINS_PERCENTAGE,
  FATS_PERCENTAGE,
} from '../config';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);

class StatsView {
  #parentElement = document.querySelector('#person-data');
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
            backgroundColor: ['#f1f5f9', '#e2e8f0', '#cbd5e1'],
            borderColor: ['#f1f5f9', '#e2e8f0', '#cbd5e1'],
            borderWidth: 1,
          },
        ],
      },
      options: {
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
    <div>
        <h3>Basal Metabolic Rate (BMR)</h3>
        <p>${data.bmr}</p>
    </div>
    <div>
        <h3>Total Daily Energy Expenditure (TDEE)</h3>
        <p>${data.tdee}</p>
    </div>
    <div>
        <h3>Daily calories based on goal</h3>
        <p>${data.goalTDEE}</p>
    </div>
    <div>
        <canvas id="macroChart" width="400" height="400"></canvas>
    </div>
`;
  }
}

export default new StatsView();
