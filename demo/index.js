import carousel from '../dist/carousel';

// 第一个轮播图实例
var dom1 = document.getElementById('j_carouselWrap1');
var imgBox1 = document.getElementById('j_imgBox1');
var inputImgDom1 = document.getElementById('j_imgInput1');
var carousel1 = new carousel({ autoPlay: true });

carousel1.init(dom1);

var addImgDom1 = document.getElementById('j_addImg1');

addImgDom1.addEventListener('click', function () {
  var sliderDom = document.createElement('div');
  sliderDom.className = 'carousel-slider';
  var imgDom = document.createElement('img');
  imgDom.className = 'carousel-img';
  imgDom.src = inputImgDom1.value;
  sliderDom.appendChild(imgDom);
  imgBox1.appendChild(sliderDom);
  carousel1.init(dom1);
});
