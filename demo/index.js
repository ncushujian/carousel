import carousel from '../dist/carousel-img';

// 第一个轮播图实例
var dom1 = document.getElementById('j_carouselWrap1');
var imgBox1 = document.getElementById('j_imgBox1');
var inputImgDom1 = document.getElementById('j_imgInput1');
var carousel1 = new carousel({ autoPlay: false });

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

// 第二个轮播图实例
var dom2 = document.getElementById('j_carouselWrap2');
var imgBox2 = document.getElementById('j_imgBox2');
var inputImgDom2 = document.getElementById('j_imgInput2');
var carousel2 = new carousel({ delay: 1500, autoPlay: true });

carousel2.init(dom2);

var addImgDom2 = document.getElementById('j_addImg2');
addImgDom2.addEventListener('click', function () {
  var sliderDom = document.createElement('div');
  sliderDom.className = 'carousel-slider';
  var imgDom = document.createElement('img');
  imgDom.className = 'carousel-img';
  imgDom.src = inputImgDom2.value;
  sliderDom.appendChild(imgDom);
  imgBox2.appendChild(sliderDom);
  carousel2.init(dom2);
});
