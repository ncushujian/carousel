/**
 * carousel-img.js 图片轮播组件初始化触摸滚动、自动轮播和轮播指示器
 * 
 * @constructor
 * @param {object} options 配置项
 * @param {boolean} options.autoPlay 是否开启自动轮播
 * @param {number} options.delay 轮播图轮播间隔时间
 * @returns {object}
 * 
 * @example
 * var carousel = new Carousel({ autoPlay: true, delay: 3000 });
 * carousel.init(dom);
 */

import './carousel.css'

var listenerParam = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function () {
      listenerParam = { passive: true };
      return true;
    }
  });
  addEventListener('test', null, opts);
} catch (e) {}

function CarouselImg (opt) {
  this.opt = opt ? opt : {};
  // 自动轮播定时器
  this.timer = null;
  // 轮播图停止滚动时，图片列表父容器停留的位置
  this.stopPos = 0;
  // 轮播图开始滚动时，图片列表父容器初始的位置
  this.startPos = 0;
  // 当前在可视区的图片索引
  this.curImgIndex = 1;
  // 是否第一次调用 CarouseImg.init(); 方法
  this.firstInit = true;

  this.opt.autoPlay === undefined && (this.opt.autoPlay = true);
  this.opt.showIndicator === undefined && (this.opt.showIndicator = true);
}

/**
 * @name autoPlay 图片自动轮播
 * @function
 */
CarouselImg.prototype.autoPlay = function () {
  var _this = this;
  clearInterval(this.timer);
  this.timer = setInterval(function () {
    _this.change(1);
  }, this.opt.delay || 3500);
}

/**
 * @name createDuplicateSlider 生成轮播占位重复Slider，用来实现循环播放
 * @function
 * @param {object} dom 复制的目标Slider dom节点
 * @return {object} 返回重复Slider dom节点
 */
CarouselImg.prototype.createDuplicateSlider = function (dom) {
  var carouselImgDom = dom.getElementsByClassName('carousel-img')[0];

  var sliderDom = document.createElement('div');
  sliderDom.className = 'duplicate-slider';

  var imgDom = document.createElement('img');
  imgDom.className = 'duplicate-img';
  imgDom.src = carouselImgDom.src;

  sliderDom.appendChild(imgDom);
  return sliderDom;
}

/**
 * @name transform 图片列表容器水平滑动一段距离
 * @function
 * @param {number} translate 图片列表容器水平滑动的距离
 */
CarouselImg.prototype.transform = function (translate) {
  this.imgBoxDom.style.webkitTransform = 'translate3d(' + translate + 'px, 0, 0)';
  this.stopPos = translate;
}

/**
 * @name change 切换当前可视区显示的图片
 * @function
 * @param {number} step step = 1 表示轮播图向左滑动一张图片的距离， step = -1 表示轮播图向右滑动一张图片的距离
 */
CarouselImg.prototype.change = function (step) {
  var _this = this;
  this.updateIndicator(step);
  this.imgBoxDom.style.transitionDuration = '0.3s';
  this.curImgIndex += step;
  this.opt.sliderChange && this.opt.sliderChange(this.getIndicatorIndex(this.curImgIndex));
  this.transform(-this.curImgIndex * this.w);
  // 自动轮播定时器是否存在，如果存在说明当前处于自动轮播状态
  if (_this.timer) {
    setTimeout(function () {
      _this.loop();
    }, 300);
  }
}

/**
 * @name loop 执行此方法，当 curImgIndex 等于占位图的索引时，瞬间切换到与占位图对应的真正的图片
 * @function
 */
CarouselImg.prototype.loop = function () {
  this.imgBoxDom.style.transitionDuration = '0s';
  if (this.curImgIndex >= this.sliderLen + 1) {
    this.transform(-this.w);
    this.curImgIndex = 1;
  }
  if (this.curImgIndex <= 0) {
    this.transform(-this.w * this.sliderLen);
    this.curImgIndex = this.sliderLen;
  }
}

/**
 * @name initCarousel 初始化轮播图手指触摸滚动
 * @function
 */
CarouselImg.prototype.initCarousel = function () {
  var dom = this.wrapDom;
  // 记录手指触摸屏幕的开始位置
  var startX = 0;
  // 记录手指触摸屏幕的开始时间
  var startT = 0;
  var _this = this;
  dom.addEventListener('touchstart', function (e) {
    _this.loop();
    _this.startPos = _this.stopPos;
    startX = e.touches[0].pageX;
    startT = new Date().getTime();
    // 清除自动轮播定时器
    clearInterval(_this.timer);
    _this.timer = null;
  }, listenerParam);

  dom.addEventListener('touchmove', function (e) {
    // 阻止浏览器默认事件，目的是为了 提升在 chrome33 内核 touchmove 事件的触发频次
    // e.preventDefault();
    var distance = e.touches[0].pageX - startX;
    var translate = _this.startPos + distance;
    _this.transform(translate);
  }, listenerParam);

  dom.addEventListener('touchend', function () {
    var distance = _this.stopPos - _this.startPos;
    var step = distance > 0 ? -1 : 1;
    var endT = new Date().getTime();
    if (endT - startT < 300 && Math.abs(distance) > 5) {
      // 滑动时间小于300ms且滑动距离小于5像素，则认为是快速滑动，切换至下一张图
      _this.change(step);
    } else if (Math.abs(distance) >= (_this.w / 2)) {
      // 滑动距离超过屏幕的一半，切换至下一张图
      _this.change(step);
    } else {
      // 停留在当前页面，不做切换
      _this.change(0);
    }
    _this.opt.autoPlay && _this.autoPlay();
  }, listenerParam);
}

/**
 * @name createIndicator 生成指示器dom节点
 * @function
 */
CarouselImg.prototype.createIndicator = function () {
  var indicatorTpl = '';
  var indicatorDom = this.wrapDom.lastElementChild;
  for (var i = 0; i < this.sliderLen; i++) {
    indicatorTpl += '<li class="indicator-item ' + (i === this.getIndicatorIndex(this.curImgIndex) ? 'active' : '') + '"></li>';
  }
  indicatorDom.innerHTML = indicatorTpl;
}

/**
 * @name getIndicatorIndex
 * @function
 * @param {number} i 当前在可视区的图片的索引
 * @return {number} 指示器的索引值
 */
CarouselImg.prototype.getIndicatorIndex = function (i) {
  var indicator = 0;
  // 当前在可视区的图片索引为首张占位图
  if (i === 0) {
    indicator = this.sliderLen - 1;
  }
  // 当前在可视区的图片索引为轮播图
  if (i > 0 && i <= this.sliderLen) {
    indicator = i - 1;
  }
  return indicator;
}

/**
 * @name updateIndicator 更新指示器
 * @function
 * @param {number} step step = 1 表示轮播图向左滑动一张图片的距离， step = -1 表示轮播图向右滑动一张图片的距离
 */
CarouselImg.prototype.updateIndicator = function (step) {
  if (!this.opt.showIndicator) return;
  if (!this.indicatorItemDom) this.indicatorItemDom = this.wrapDom.getElementsByClassName('indicator-item');
  this.indicatorItemDom[this.getIndicatorIndex(this.curImgIndex)].classList.remove('active');
  this.indicatorItemDom[this.getIndicatorIndex(this.curImgIndex + step)].classList.add('active');
}

/**
 * @name init 初始化轮播图组件
 * @function
 */
CarouselImg.prototype.init = function (dom) {
  // 图片轮播组件最外层容器
  this.wrapDom = dom;
  // 轮播的图片列表容器
  this.imgBoxDom = this.wrapDom.getElementsByClassName('img-box')[0];
  // 图片轮播组件宽度
  this.w = this.opt.width || this.wrapDom.clientWidth;

  this.wrapDom.style.width = this.w + 'px';

  var sliderDom = this.wrapDom.getElementsByClassName('carousel-slider');
  this.sliderLen = sliderDom.length;

  var duplicateSlidersDom = this.wrapDom.getElementsByClassName('duplicate-slider');

  if (this.firstInit) {
    // 首次调用 init 方法
    this.firstInit = false;
    this.stopPos = -this.w;
    this.startPos = -this.w;
    // 插入图片轮播列表首尾两张重复图，用以循环播放
    this.imgBoxDom.insertBefore(this.createDuplicateSlider(sliderDom[this.sliderLen - 1]), sliderDom[0]);
    this.imgBoxDom.appendChild(this.createDuplicateSlider(sliderDom[0]));
    // 初始化手指触摸滚动
    this.initCarousel();
  } else {
    // 第二次调用 init 方法
    // 更新轮播列表首张重复图
    this.imgBoxDom.replaceChild(this.createDuplicateSlider(sliderDom[this.sliderLen - 1]), duplicateSlidersDom[0]);
    // 轮播列表末尾的重复图需要和新添加的图片调换位置，保证该重复图是在最末尾
    if (this.imgBoxDom.lastElementChild.className !== 'duplicate-slider') this.imgBoxDom.appendChild(duplicateSlidersDom[1]);
  }

  // 防止删除多张轮播图片导致索引越界
  if (this.curImgIndex >= this.sliderLen + 1) this.curImgIndex = 1;
  this.imgBoxDom.style.webkitTransform = 'translate3d(-' + ( this.w * this.curImgIndex ) + 'px, 0, 0)';

  // 生成指示器
  this.opt.showIndicator && this.createIndicator();

  this.opt.autoPlay && this.autoPlay();
}

export default CarouselImg;
