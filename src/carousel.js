/**
 * carousel.js 图片轮播组件
 * 
 * @param {object} dom 图片轮播组件容器DOM节点
 * 
 * @example
 * // 初始化图片轮播组件
 * carousel.init(dom);
 */

import d from './data';
import { createIndicator, updateIndicator } from './indicator';
import './carousel.css';

// 容器的宽度
var w = 0;
var boxDom = null;
var firstInit = true;
// 轮播图停止滚动时，图片列表父容器停留的位置
var stopPos = 0;
// 轮播图开始滚动时，图片列表父容器初始的位置
var startPos = 0;
// 记录手指触摸屏幕的位置
var startX = 0;
// 记录手指触摸屏幕的开始时间
var startT = 0;

/**
 * @name transform 图片列表容器水平滑动一段距离
 * @function
 * @param {number} translate 图片列表容器水平滑动的距离
 */
function transform (translate) {
  boxDom.style.webkitTransform = 'translate3d(' + translate + 'px, 0, 0)';
  stopPos = translate;
}

/**
 * @name change 切换当前可视区显示的图片
 * @function
 * @param {number} step step = 1 表示轮播图向左滑动一张图片的距离， step = -1 表示轮播图向右滑动一张图片的距离
 */
function change (step) {
  updateIndicator(step);
  boxDom.style.transition = '0.3s ease transform';
  d.curImgIndex += step;
  transform(-d.curImgIndex * w);
  setTimeout(function () {
    loop();
  }, 300);
}

/**
 * @name loop 执行此方法，当 d.curImgIndex 等于占位图的索引时，瞬间切换到与占位图对应的真正的图片
 * @function
 */
function loop () {
  boxDom.style.transition = '0s ease transform';
  if (d.curImgIndex === d.imgLen + 1) {
    transform(-w);
    d.curImgIndex = 1;
  }
  if (d.curImgIndex === 0) {
    transform(-w * d.imgLen);
    d.curImgIndex = d.imgLen;
  }
}

var timer = null;
/**
 * @name autoPlay 图片自动轮播
 * @function
 */
function autoPlay () {
  clearInterval(timer);
  timer = setInterval(function () {
    change(1);
  }, 3500);
}

/**
 * @name initCarousel 初始化轮播图手指触摸滚动
 * @function
 * @param {object} dom 轮播图组件最外层容器dom节点
 */
function initCarousel (dom) {
  dom.addEventListener('touchstart', function (e) {
    e.preventDefault();
    loop();
    startX = e.touches[0].pageX;
    startT = new Date().getTime();
    startPos = stopPos;
    // 清除自动轮播定时器
    clearInterval(timer);
  });

  dom.addEventListener('touchmove', function (e) {
    e.preventDefault();
    var distance = e.touches[0].pageX - startX;
    var translate = startPos + distance;
    transform(translate);
  });

  dom.addEventListener('touchend', function () {
    var distance = stopPos - startPos;
    var step = distance > 0 ? -1 : 1;
    var endT = new Date().getTime();
    if (endT - startT < 300 && Math.abs(distance) > 5) {
      // 滑动时间小于300ms且滑动距离小于5像素，则认为是快速滑动，切换至下一张图
      change(step);
    } else if (Math.abs(distance) >= (w / 2)) {
      // 滑动距离超过屏幕的一半，切换至下一张图
      change(step);
    } else {
      // 停留在当前页面，不做切换
      change(0);
    }
    autoPlay();
  });
}

/**
 * @name createDuplicateImg 生成轮播占位重复图，用来实现循环播放
 * @function
 * @param {object} dom 复制的目标dom节点
 * @return {object} 返回重复图dom节点
 */
function createDuplicateImg (dom) {
  var img = document.createElement('img');
  img.className = 'duplicate-img';
  img.src = dom.src;
  return img
}

export default {
  init: function (dom) {
    var imgsDom = dom.getElementsByClassName('carousel-img');
    var duplicateImgsDom = dom.getElementsByClassName('duplicate-img');

    boxDom = dom.getElementsByClassName('img-box')[0];
    w = dom.clientWidth;
    d.imgLen = imgsDom.length;
    
    if (firstInit) {
      // 首次调用 init 方法
      firstInit = false;
      stopPos = -w;
      startPos = -w;
      // 插入图片轮播列表首尾两张重复图，用以循环播放
      boxDom.insertBefore(createDuplicateImg(imgsDom[d.imgLen - 1]), imgsDom[0]);
      boxDom.appendChild(createDuplicateImg(imgsDom[0]));
      // 初始化手指触摸滚动
      initCarousel(dom);
    } else {
      // 第二次调用 init 方法
      // 更新轮播列表首张重复图
      boxDom.replaceChild(createDuplicateImg(imgsDom[d.imgLen - 1]), duplicateImgsDom[0]);
      // 轮播列表末尾的重复图需要和新添加的图片调换位置，保证该重复图是在最末尾
      if (boxDom.lastElementChild.className !== 'duplicate-img') boxDom.appendChild(duplicateImgsDom[1]);
    }

    // 防止删除多张轮播图片导致索引越界
    if (d.curImgIndex >= d.imgLen + 1) d.curImgIndex = 1;
    boxDom.style.webkitTransform = 'translate3d(-' + ( w * d.curImgIndex ) + 'px, 0, 0)';

    // 生成指示器
    createIndicator(dom);
    // 开启自动播放
    autoPlay();
  }
};