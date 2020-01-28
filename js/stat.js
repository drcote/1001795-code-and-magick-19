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
  /* Текущая высота столбца */
  var currentHeight = 0;
  /* Начало координат гисторграммы X */
  var startX = 0;
  /* Начало координат гисторграммы Y  */
  var startY = 0;

  for (var i = 0; i < players.length; i++) {

    if (i !== 0) {
      distBetween += CHART_DIST_BETWEEN + CHART_WIDTH;
    }

    if (players[i] === 'Вы') {
      ctx.fillStyle = USER_COLOR;
    } else {
      var saturation = Math.random() * 100 + '%';
      ctx.fillStyle = 'hsl(240,' + saturation + ',50%)';
    }

    currentHeight = (CHART_HEIGHT * Math.round(times[i])) / maxTime;
    startX = FORM_STATISTICS_X + distBetween;
    startY = FORM_STATISTICS_Y + FORM_STATISTICS_HEIGHT - currentHeight - GAP - TEXT_WIDTH - GAP - GAP;

    ctx.fillRect(startX, startY, CHART_WIDTH, currentHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(players[i], startX, startY + currentHeight + GAP + TEXT_WIDTH);
  }
};
