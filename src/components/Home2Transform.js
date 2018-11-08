import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import RightDrawer from "../lib/RightDrawer.js";
import {
    createdSprite,
    createdSpine,
    commonBg
} from "./Common";
import {
    TimelineMax
} from "gsap";
import {
    Garbage,
    SceneManager
} from "../lib/EasyPIXI";
import HomeGamePlay from "./Home1GamePlay.js"
export default class HomeTransform extends PIXI.Container {
    constructor() {
        super();
        this.Common = null;
        this.BackButtonNormal = null;
        this.BackButtonNormalEvent = null;
        this.BackButtonClick = null;
        this.BackButtonClickEvent = null;
        this.transformBg = null;
        this._Gb = { //滑块事件
            timeln: null,
            tween1: null,
            tween2: null
        };
        this.Scene = [
            "EgpytBg_jpg",
            "EuropeBg_jpg",
            "RepublicBg.jpg"
        ];
        this.SceneArr = [];
        this.SceneEventArr = [];
        this.GirlSpine = null;
        this.GirlSpineEvent = null;
        this.BoySpine = null;
        this.BoySpineEvent = null;
        this.on("added", this.addedTransform, this);
    }
    addedTransform() {
        let self = this;
        (() => {
            this.SceneArr = [];
            this.SceneEventArr = [];
        })()
        this.transformBg = createdSprite({
            $this: self,
            $alias: "transformBg_jpg"
        });
        this.TimeSpine = createdSpine({
                $this: self,
                $x: 960,
                $y: 540,
                $alias: "Time_spine",
                $animation0Name: "animation"
            })
            //this.TimeSpine.scale.set(0.5)
        this.Common = new commonBg({
            _this: self
        });
        //返回按钮事件
        this.BackButtonNormal = this.Common.BackButtonNormal;
        this.BackButtonNormal.on("pointerdown", self.BackButtonNormalEvent = () => {
            self.BackButtonClick.visible = true;
            self.BackButtonNormal.visible = false;
        })
        this.BackButtonClick = this.Common.BackButtonClick;
        this.BackButtonClick.on("pointerup", self.BackButtonClickEvent = () => {
            self.BackButtonNormal.visible = true;
            self.BackButtonClick.visible = false;
            this.clearClass();
            SceneManager.run(new HomeGamePlay())
        });
        //动画事件
        this.GirlSpine = createdSpine({
            $this: self,
            $alias: "Girl_spine",
            $x: 950,
            $y: 500,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: true
        });
        //滑块事件
        var mySwiper = new PixiSlider();
        mySwiper.slideColorAlpha = 0.5;
        mySwiper.slideWidth = 1850; //总的长度
        mySwiper.slideHeight = 300;
        mySwiper.swiperWidth = 1850;
        mySwiper.swiperHeight = 300;
        mySwiper.x = 100;
        mySwiper.y = 623;
        mySwiper.slides = 2;
        mySwiper.slideOffset = 200;
        //mySwiper.alpha = 0.5;
        mySwiper.smoothingMode = false;
        mySwiper.init();
        this.addChild(mySwiper);
        // "EgpytBg_jpg" "EuropeBg_jpg" "RepublicBg.jpg"
        this.Scene.forEach((item) => {
            let itemEvent;
            let itemObj = createdSprite({
                $this: self,
                $alias: item,
                $scale: 0.3,
                $interactive: true,
                $buttonMode: true,
                $addChild: false
            });
            console.log(itemObj.height)
            itemObj.pivot.y = itemObj.height / 2;
            itemObj.pivot.x = itemObj.width / 2;
            itemObj.on("pointertap", itemEvent = () => {
                itemObj.scale.set(0.4);
            })
            self.SceneEventArr.push(itemEvent);
            self.SceneArr.push(itemObj);
        })
        this._Gb.timeln = new TimelineMax({
            onComplete: () => {
                console.log("发生了timeIn事件...")
                mySwiper.updateAll();
                mySwiper.slideColorAlpha = 0;
                mySwiper.slideWidth = 500;
                mySwiper.slideHeight = 800;
                mySwiper.swiperWidth = 1800; //总长
                mySwiper.swiperHeight = 800;
                mySwiper.x = 100;
                mySwiper.y = 623;
                mySwiper.slides = 3;
                mySwiper.slideOffset = 200;
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
                self.SceneArr.forEach((item, index) => {
                    mySwiper.slidesArr[index].addChild(item);
                })
            }
        });
        //滑块事件结束

    }
    clearClass() {
        let self = this;
        //返回按钮事件
        this.BackButtonNormal.off("pointerdown", self.BackButtonNormalEvent);
        this.BackButtonClick.off("pointerup", self.BackButtonClickEvent);
        this.BackButtonClickEvent = null;
        this.BackButtonNormalEvent = null;
        this.BackButtonNormal = null;
        this.BackButtonClick = null;
        //移除背景图
        this.commonBg = null;
        this.transformBg = null;
        //移除场景的图
        this.SceneArr.forEach((item, index) => {
            item.off("pontertap", self.SceneEventArr[index])
            self.SceneEventArr[index] = null;
            item = null;
        })
        this.SceneArr = null;
        //全局类移除
        this.off("added", self.addedTransform);
        this.addedHomePageStage = null;
        this.parent.removeChildren();
    }
}   