# carousel
图片轮播组件

**注意**  
1. 图片轮播组件在修改轮播图片列表之后，调用  `carousel.init(dom);` 方法即可更新轮播图片列表。

## 安装
```shell
npm install qt-carousel
```

## 使用方式
```html
<style>
  .carousel-wrap {
    /* 图片轮播组件容器，这两个CSS属性必须存在 */
    position: relative;
    overflow: hidden;
  }
</style>
<div class="carousel-wrap">
  <div class="img-box">
    <div class="carousel-slider">
      <img class="carousel-img" src="http://img0.imgtn.bdimg.com/it/u=2125288902,1890865968&fm=26&gp=0.jpg">
    </div>
    <div class="carousel-slider">
      <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    </div>  
    <div class="carousel-slider">  
      <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    </div>  
    <div class="carousel-slider">  
      <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    </div>  
    <div class="carousel-slider">  
      <img class="carousel-img" src="http://img2.imgtn.bdimg.com/it/u=415472049,3360294245&fm=26&gp=0.jpg">
    </div>  
  </div>
  <ul class="indicator-list"></ul>
</div>
```
```javascript
import Carousel from 'qt-carousel';

var dom = document.getElementsByClassName('carousel-wrap')[0];
var carousel = new Carousel();
carousel.init(dom);
```

### 在 Vue 中使用
```
<template>
  <div class="app-wrap">
    <div class="carousel-wrap" ref="carouselWrap">
      <div class="img-box">
        <div class="carousel-slider" v-for="(item, index) in imgList" :key="index">
          <img class="carousel-img" :src="item">
        </div>
      </div>
      <ul class="indicator-list"></ul>
    </div>
    <button v-tap="addImg">添加图片</button>
  </div>
</template>
<script>
import Carousel from 'qt-carousel';
export default {
  name: 'Demo',
  data () {
    return {
      carousel: null,
      imgList: [
        'http://img0.imgtn.bdimg.com/it/u=2125288902,1890865968&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg'
      ]
    }
  },
  methods: {
    addImg () {
      this.imgList.push('http://img0.imgtn.bdimg.com/it/u=2125288902,1890865968&fm=26&gp=0.jpg');
      this.$nextTick(() => {
        this.carousel.init(this.$refs.carouselWrap);
      });
    }
  },
  mounted () {
    this.carousel = new Carousel();
    this.carousel.init(this.$refs.carouselWrap);
  }
}
</script>
<style>
  .carousel-wrap {
    position: relative;
    overflow: hidden;
  }
</style>
```

## API
### new Carousel(Object object)
> 用于初始化一个Carousel实例，返回初始化后的Carousel实例。

**参数**
**Object object**

属性 | 类型 | 默认值 | 是否必填 | 说明  
-|-|-|-|-|
autoPlay | Boolean | true | 否 | 是否开启自动轮播
delay | Number | 3500 | 否 | 轮播图轮播间隔时间
width | Number | 无 | 否 | 图片轮播组件容器宽度
showIndicator | Boolean | true | 否 | 是否展示轮播图指示器
sliderChange | Function | 无 | 否 | 轮播图切换触发执行的回调函数，返回当前轮播图的索引值

### carousel.init(dom)
> 初始化Carousel

参数 | 类型 | 默认值 | 是否必填 | 说明  
-|-|-|-|-|
dom | Object | 无 | 是 | 图片轮播组件容器DOM节点

## [查看demo](https://ncushujian.github.io/carousel/demo/dist/test.html)
* 将浏览器调整为手机模式后，刷新浏览器后体验，因为此组件没有监听窗口 onresize 事件
* 有问题反馈，请发起issue，或者联系本人WeChat: StreamLights