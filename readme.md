# carousel-img
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
    <img class="carousel-img" src="http://img0.imgtn.bdimg.com/it/u=2125288902,1890865968&fm=26&gp=0.jpg">
    <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    <img class="carousel-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2520433466,1070276963&fm=26&gp=0.jpg">
    <img class="carousel-img" src="http://img2.imgtn.bdimg.com/it/u=415472049,3360294245&fm=26&gp=0.jpg">
  </div>
  <ul class="indicator-list"></ul>
</div>
```
```javascript
import carousel from 'qt-carousel';

var dom = document.getElementsByClassName('carousel-wrap')[0];
carousel.init(dom);
```

### 在 Vue 中使用
```
<template>
  <div class="app-wrap">
    <div class="carousel-wrap" ref="carouselWrap">
      <div class="img-box">
        <img v-for="(item, index) in imgList" :key="index" class="carousel-img" :src="item">
      </div>
      <ul class="indicator-list"></ul>
    </div>
    <button v-tap="addImg">添加图片</button>
  </div>
</template>
<script>
import carousel from 'qt-carousel';
export default {
  name: 'Demo',
  data () {
    return {
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
      this.$nextTick(function () {
        carousel.init(this.$refs.carouselWrap);
      });
    }
  },
  mounted () {
    carousel.init(this.$refs.carouselWrap);
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
### carousel.init(Object object);
> 初始化图片轮播组件

**参数**
**Object object**

属性 | 类型 | 默认值 | 是否必填 | 说明  
-|-|-|-|-|
dom | Object | 无 | 是 | 图片轮播组件容器DOM节点