/**
 * 图片轮播组件指示器部分相关方法
 */

import d from './data';

/**
 * @name getIndicatorIndex
 * @function
 * @param {number} i 当前在可视区的图片的索引
 * @return {number} 指示器的索引值
 */
function getIndicatorIndex (i) {
  var indicator = i === 0 ? d.imgLen :
    i > d.imgLen ? 1 : i;
  return indicator - 1;
}

/**
 * @name createIndicator 生成指示器dom节点
 * @function
 * @param {object} wrapDom 轮播图组件最外层容器dom节点
 */
function createIndicator (wrapDom) {
  var indicatorTpl = '';
  var indicatorDom = wrapDom.lastElementChild;
  for (var i = 0; i < d.imgLen; i++) {
    indicatorTpl += '<li class="indicator-item ' + (i === getIndicatorIndex(d.curImgIndex) ? 'active' : '') + '"></li>';
  }
  indicatorDom.innerHTML = indicatorTpl;
}

var indicatorItemDom = null;
/**
 * @name updateIndicator 更新指示器
 * @function
 * @param {number} step step = 1 表示轮播图向左滑动一张图片的距离， step = -1 表示轮播图向右滑动一张图片的距离
 */
function updateIndicator (step) {
  if (!indicatorItemDom) indicatorItemDom = document.getElementsByClassName('indicator-item');
  indicatorItemDom[getIndicatorIndex(d.curImgIndex)].classList.remove('active');
  indicatorItemDom[getIndicatorIndex(d.curImgIndex + step)].classList.add('active');
}

export { createIndicator, updateIndicator };