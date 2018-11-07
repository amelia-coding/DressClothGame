import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import {
    createdSprite,
    createdSpine
} from "./Common"
import {
    TimelineMax
} from "gsap";
import {
    Garbage,
    SceneManager
} from "../lib/EasyPIXI"
import HomeGamePlay from "./HomeGamePlay.js"
export default class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.ScreenTextSpine = null;
        this.ButtonPlay = null;
        this.HomeBg = null; //背景图
        this.ButtonNormal = null; //正常按钮
        this.ButtonNormalEvent = null;
        this.ButtonClick = null; //点击按钮
        this.ButtonClickEvent = null;
        this.GirlSpine = null;
        this.GirlSpineEvent = null;
        this.BoySpine = null;
        this.BoySpineEvent = null;
        this._Gb = { //滑块事件
            timeln: null,
            tween1: null,
            tween2: null
        };
        this.DelayTime = null;
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        let self = this;
        console.log("这个是首页内容开始...");
        //小背景图
        createdSprite({
            $this: self,
            $alias: "HomeBgLitter_png",
            $x: 610,
            $y: 260,
        });
        //这个是开始屏幕动画
        this.ScreenTextSpine = createdSpine({
            $this: self,
            $alias: "ScreenText_spine",
            $x: 1000,
            $y: 140,
            $animation0Name: "start",
            $animation0Loop: false,
            $secondAnimation: true,
            $animation1Name: "normal",
            $animation1Loop: true,
        });
        //这个是女孩动画
        //添加滑块
        var mySwiper = new PixiSlider();
        mySwiper.slideColorAlpha = 0.5;
        mySwiper.slideWidth = 800;
        mySwiper.slideHeight = 800;
        mySwiper.swiperWidth = 1800;
        mySwiper.swiperHeight = 800;
        mySwiper.x = 1920 / 2 - 400;
        mySwiper.y = 1080 / 2 - 180;
        mySwiper.slides = 2;
        mySwiper.slideOffset = 0;
        mySwiper.smoothingMode = false;
        mySwiper.init();
        this.addChild(mySwiper);
        //在滑块中添加内容
        //女孩
        this.GirlSpine = createdSpine({
            $this: self,
            $alias: "Girl_spine",
            $x: 450,
            $y: 450,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: false
        }).on("pointertap", self.GirlSpineEvent = () => {
            mySwiper.removeChildren();
            mySwiper.parent.removeChildren();
            Garbage.clearGarBage("Gender");
            Garbage.setGarBage("Gender", "girl");
            self.clearClass();
            SceneManager.run(new HomeGamePlay());
        });
        //男孩
        this.BoySpine = createdSpine({
            $this: self,
            $alias: "Boy_spine",
            $x: 450,
            $y: 450,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: false
        }).on("pointertap", self.BoySpineEvent = () => {
            mySwiper.removeChildren();
            mySwiper.parent.removeChildren();
            Garbage.clearGarBage("Gender");
            Garbage.setGarBage("Gender", "boy");
            self.clearClass();
            SceneManager.run(new HomeGamePlay());
        });
        //设置延时解决可能出现的bug
        this.DelayTime = setTimeout(() => {
                this.GirlSpine.interactive = true;
                this.BoySpine.interactive = true;
            }, 3000)
            //开始滑块事件
        this._Gb.timeln = new TimelineMax({
            onComplete: () => {
                console.log("发生了timeIn事件...")
                mySwiper.updateAll();
                mySwiper.slideColorAlpha = 0;
                mySwiper.slideWidth = 800;
                mySwiper.slideHeight = 800;
                mySwiper.swiperWidth = 800;
                mySwiper.swiperHeight = 800;
                mySwiper.x = 1920 / 2 - 400;
                mySwiper.y = 1080 / 2 - 180;
                mySwiper.slides = 2;
                mySwiper.slideOffset = 0;
                mySwiper.smoothingMode = false;
                mySwiper.init();
                mySwiper.setCallBackPointerUp((data) => {
                    if (data.movedOffset < 0) {
                        if (mySwiper.realIndex < mySwiper.slides - 1) {
                            mySwiper.slideTo(mySwiper.realIndex + 1)
                        }
                    } else if (data.movedOffset >= 0) {
                        if (mySwiper.realIndex > 0) {
                            mySwiper.slideTo(mySwiper.realIndex - 1)
                        }
                    } else {
                        mySwiper.slideTo(mySwiper.realIndex)
                    }
                });
                mySwiper.slidesArr[0].addChild(this.GirlSpine);
                mySwiper.slidesArr[1].addChild(this.BoySpine);
            }
        });
        //开启的时候左右移动
        this._Gb.tween1 = TweenMax.to(mySwiper, 2, {
            x: -100,
            ease: Back.easeOut
        });
        this._Gb.tween2 = TweenMax.to(mySwiper, 1, {
            x: 550,
            ease: Back.easeOut
        });

        this._Gb.timeln.add(self._Gb.tween1);
        this._Gb.timeln.add(self._Gb.tween2, "-=0.2");
        mySwiper.slideColorAlpha = 0;
        mySwiper.slidesArr[0].addChild(this.GirlSpine);
        mySwiper.slidesArr[1].addChild(this.BoySpine);

        //开启的时候左右移动结束
        //背景图
        this.HomeBg = createdSprite({
            $this: self,
            $alias: "HomeBg_jpg",

        });
        //按钮图标
        this.ButtonNormal = createdSprite({
            $this: self,
            $alias: "BackButtonNormal_png",
            $x: 54,
            $y: 21,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", self.ButtonNormalEvent = () => {
            console.log("这个事件执行了down...");
            self.ButtonNormal.visible = false;
            self.ButtonClick.visible = true;
        });
        this.ButtonClick = createdSprite({
            $this: self,
            $alias: "BackButtonClick_png",
            $visible: false,
            $x: 54,
            $y: 21,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", self.ButtonClickEvent = () => {
            console.log("点击按钮事件发生了...");
            self.ButtonNormal.visible = true;
            self.ButtonClick.visible = false;
        });



    }
    clearClass() {
        console.log("clearClass事件发生了");
        //清空定时器
        clearTimeout(this.DelayTime);
        let self = this;
        //按钮事件清空
        this.ButtonNormal.off("pointerdown", self.ButtonNormalEvent);
        this.ButtonClick.off("pointerup", self.ButtonClickEvent);
        //清空女孩
        this.GirlSpine.off("pointertap", self.GirlSpineEvent);
        this.BoySpine.off("pointertap", self.BoySpineEvent);

        this.GirlSpine = null;
        this.BoySpine = null;
        //清空滑块事件

        //转动事件清空

        this._Gb = null;
        //清空动画
        this.ScreenTextSpine = null;

        //清空整体画布
        this.off("added", self.addedHomePageStage);
        this.parent.removeChildren();
        // this = null;
    }
}