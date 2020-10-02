'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const CLOUD_COLOR = '#FFF';
const SHADOW_COLOR = 'rgba(0, 0, 0 ,0.3)';
const GAP = 10;
const FONT_STYLE = 'PT Mono';
const FONT_SIZE = 16;
const FONT_GAP = 5;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const GRAPH_HEIGHT = 150;
const USER_COLOR = `RED`;
let GREETING_FIRST_ROW = 'Ура вы победили!';
let GREETING_SECOND_ROW = 'Список результатов: ';
let barHeight = GRAPH_HEIGHT - FONT_SIZE - FONT_GAP - FONT_GAP - FONT_SIZE;
const FONT_COLOR = '#000';
let getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let printNames = function (ctx, names) {
  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(names[i], CLOUD_X + GAP + ((BAR_WIDTH * [i]) + (BAR_GAP * [i])), CLOUD_Y + CLOUD_HEIGHT - GAP);
  }
};

let renderColumn = function (ctx, names, times) {
  let maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240,100%,' + (Math.random() * 100) + '%)';
    }
    ctx.beginPath();
    ctx.moveTo(CLOUD_X + GAP + (BAR_WIDTH * [i]) + (BAR_GAP * [i]),
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP);
    ctx.lineTo(CLOUD_X + GAP + (BAR_WIDTH * [i]) + (BAR_GAP * [i]),
        (CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP) - (Math.floor((barHeight * Math.floor(times[i])) / maxTime)));
    ctx.lineTo(CLOUD_X + GAP + (BAR_WIDTH * [i]) + (BAR_GAP * [i]) + BAR_WIDTH,
        (CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP) - (Math.floor((barHeight * Math.floor(times[i])) / maxTime)));
    ctx.lineTo(CLOUD_X + GAP + BAR_WIDTH + (BAR_WIDTH * [i]) + (BAR_GAP * [i]),
        CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = FONT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText(Math.floor(times[i]),
        CLOUD_X + GAP + ((BAR_WIDTH * [i]) + (BAR_GAP * [i])),
        Math.round(CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_SIZE - GAP) - (Math.floor((barHeight * Math.floor(times[i])) / maxTime)) - GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  printNames(ctx, names);
  renderColumn(ctx, names, times);

  ctx.fillStyle = FONT_COLOR;
  ctx.font = FONT_SIZE + 'px' + FONT_STYLE;
  ctx.fillText(GREETING_FIRST_ROW, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_SIZE);
  ctx.fillText(GREETING_SECOND_ROW, CLOUD_X + GAP, CLOUD_Y + GAP + FONT_SIZE + GAP + FONT_SIZE);
};
