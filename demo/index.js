import carousel from '../dist/carousel';

var dom = document.getElementById('j_carouselWrap');
var boxDom = document.getElementsByClassName('img-box')[0];

var addImgDom = document.getElementById('j_addImg');
var inputImgDom = document.getElementById('j_imgInput');

carousel.init(dom);

function addImg (src) {
  var imgDom = document.createElement('img');
  imgDom.className = 'carousel-img';
  imgDom.src = src;
  boxDom.appendChild(imgDom);
  carousel.init(dom);
}

addImgDom.addEventListener('click', function () {
  addImg(inputImgDom.value);
});
