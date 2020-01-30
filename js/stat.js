'use strict';
/* Ширина формы статистики */
var FORM_STATISTICS_WIDTH = 420;
/* Высота формы статистики */
var FORM_STATISTICS_HEIGHT = 270;
/* Начальная координата х формы статистики */
var FORM_STATISTICS_X = 100;
/* Начальная координата y формы статистики  */
var FORM_STATISTICS_Y = 10;

/* максимальная высота гистограммы */
var CHART_HEIGHT = 150;
/* Ширина колонки гистограммы */
var CHART_WIDTH = 40;
/* Расстояние между колонками гистограммы */
var CHART_DIST_BETWEEN = 50;
/* Цвет колонки пользователя */
var USER_COLOR = 'rgba(255, 0, 0, 1)';
/* Высота текста */
var TEXT_WIDTH = 16;
/* Расстояние между текстом и гистограммой */
var GAP = 10;

var renderFormStatistics = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, FORM_STATISTICS_WIDTH, FORM_STATISTICS_HEIGHT);
};

/* Функция определения наибольшего значения */
var getMaxElement = function (arr) {
  var maxElement = Math.round(arr[0]);

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = Math.round(arr[i]);
    }
  }

  return maxElement;
};

/* Функция вычисляет случайный процент */
var calcSaturation = function () {
  return Math.random() * 100 + '%';
};

/* Функция выводящая колонку */
var renderChart = function (ctx, time, maxTime, distBetween, player, color) {
  /* Текущая высота столбца */
  var currentHeight = (CHART_HEIGHT * Math.round(time)) / maxTime;
  /* Начало координат гисторграммы X */
  var startX = FORM_STATISTICS_X + distBetween;
  /* Начало координат гисторграммы Y  */
  var startY = FORM_STATISTICS_Y + FORM_STATISTICS_HEIGHT - currentHeight - GAP - TEXT_WIDTH - GAP - GAP;

  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, CHART_WIDTH, currentHeight);

  ctx.fillStyle = '#000';
  ctx.fillText(player, startX, startY + currentHeight + GAP + TEXT_WIDTH);
};


window.renderStatistics = function (ctx, players, times) {
  renderFormStatistics(ctx, FORM_STATISTICS_X + 10, FORM_STATISTICS_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderFormStatistics(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', FORM_STATISTICS_X + 15, FORM_STATISTICS_Y + 30);
  ctx.fillText('Список результатов:', FORM_STATISTICS_X + 15, FORM_STATISTICS_Y + 50);

  /* Наибольшее время */
  var maxTime = getMaxElement(times);
  /* Дистанция между столбцами */
  var distBetween = CHART_DIST_BETWEEN;

  for (var i = 0; i < players.length; i++) {

    if (i !== 0) {
      distBetween += CHART_DIST_BETWEEN + CHART_WIDTH;
    }

    var color = players[i] === 'Вы' ? USER_COLOR : 'hsl(240,' + calcSaturation() + ',50%)';

    renderChart(ctx, times[i], maxTime, distBetween, players[i], color);
  }
};
