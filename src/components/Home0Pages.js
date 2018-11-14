import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import {
    createdSprite,
    createdSpine,
    createdText,
    createdStyle,
    DialogCommon,
    takeoffSingleCloth,
    getSlotAndAttacetment,
    changeDress
} from "./Common"
import {
    TimelineMax
} from "gsap";
import {
    Garbage,
    SceneManager
} from "../lib/EasyPIXI"
import HomeGamePlay from "./Home1GamePlay.js"
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
        this.BoySpineDress = ["Boy@hair@hair@europe_normal@normal_png"];
        this.ClothDetail = {
            Gender: null,
            Cloth: null,
            SlotName: null,
            AttacetmentName: null,
            End: null
        };
        this.Gender = null;
        this._Gb = { //滑块事件
            timeln: null,
            tween1: null,
            tween2: null
        };
        this.DelayTime = null;
        this.DialogContainer = null;
        this.graphics = null;
        this.DialogSaveButtonNormal = null;
        this.DialogSaveButtonNormalEvent = null;
        this.DialogSaveButtonClick = null;
        this.DialogSaveButtonClickEvent = null;
        this.DialogNoSaveButtonNormal = null;
        this.DialogNoSaveButtonNormalEvent = null;
        this.DialogNoSaveButtonClick = null;
        this.DialogNoSaveButtonClickEvent = null;
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        let self = this;
        //console.log("这个是首页内容开始...");
        //小背景图
        createdSprite({
            $this: self,
            $alias: "HomeBgLitter_png",
            $x: 610,
            $y: 260,
        });

        //这个是女孩动画
        //添加滑块
        var mySwiper = new PixiSlider();
        mySwiper.slideColorAlpha = 0;
        mySwiper.slideWidth = 800;
        mySwiper.slideHeight = 800;
        mySwiper.swiperWidth = 1800;
        mySwiper.swiperHeight = 800;
        mySwiper.x = 1920 / 2 - 400;
        mySwiper.y = 1080 / 2 - 180;
        mySwiper.slides = 2;
        mySwiper.slideOffset = 0;
        mySwiper.smoothingMode = false;
        //mySwiper.alpha = 0;
        mySwiper.init();
        this.addChild(mySwiper);
        //在滑块中添加内容
        //女孩
        this.GirlSpine = createdSpine({
            $this: self,
            $alias: "Girl_spine",
            $x: 450,
            $y: 450,
            $interactive: true,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: false
        }).on("pointertap", self.GirlSpineEvent = () => {
            mySwiper.removeChildren();
            mySwiper.parent.removeChildren();
            Garbage.clearGarBage("Gender");
            Garbage.setGarBage("Gender", "girl"); //女孩发送数据
            self.clearClass();
            SceneManager.run(new HomeGamePlay());
        });
        //男孩
        this.BoySpine = createdSpine({
            $this: self,
            $alias: "Boy_spine",
            $x: 450,
            $y: 450,
            $interactive: true,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: false
        }).on("pointertap", self.BoySpineEvent = () => {
            mySwiper.removeChildren();
            mySwiper.parent.removeChildren();
            Garbage.clearGarBage("Gender");
            Garbage.setGarBage("Gender", "boy"); //男孩发送数据
            self.clearClass();
            SceneManager.run(new HomeGamePlay());
        });

        //接受参数
        this.Gender = "boy";
        this.classicon = Garbage.getGarBage("classicon");
        this.AllSlotName = Garbage.getGarBage("allSlotName");
        this.SelectSpine = this.BoySpine;
        this.BoySpineDress.forEach((item) => {
            // console.log(item)
            this.getSlotAndAttacetment(item);
            this.changeDress();
        });
        //设置延时解决可能出现的bug
        // this.DelayTime = setTimeout(() => {
        //     this.GirlSpine.interactive = true;
        //     this.BoySpine.interactive = true;
        // }, 3000);
        //开始滑块事件
        this._Gb.timeln = new TimelineMax({
            onComplete: () => {
                //console.log("发生了timeIn事件...")
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
            x: -180,
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
        //按钮图标
        this.ButtonNormal = createdSprite({
            $this: self,
            $alias: "BackButtonNormal_png",
            $x: 54,
            $y: 21,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", self.ButtonNormalEvent = () => {
            //console.log("这个事件执行了down...");
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
            //console.log("点击按钮事件发生了...");
            self.ButtonNormal.visible = true;
            self.ButtonClick.visible = false;
        });
        //弹窗事件
        //公共弹窗事件
        this.DialogCommon = new DialogCommon();
        //this.addChild(this.DialogCommon.DialogContainer); 有时间限制
        this.DialogCommon.DialogGoodButtonClick.on("pointerup", this.DialogCommonClickEvent = () => {
            this.DialogCommon.DialogGoodButtonNormal.visible = true;
            this.DialogCommon.DialogGoodButtonClick.visible = false;
            window.parent.postMessage({
                "type": "exitGame",
                "game": 8, //修改
            }, "*")
        });
        // this.DialogCommon.DialogGoodButtonClickEvent = () => {
        //         console.log("...........@")
        //     };
        //this.DialogCommon.DialogGoodButtonClickEvent(fn);

        this.DialogContainer = new PIXI.Container();
        this.addChild(this.DialogContainer);
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.7;
        this.DialogContainer.addChild(this.graphics);
        this.DialogBg = createdSprite({
            $this: this.DialogContainer,
            $alias: 'Dialog_jpg',
            $x: 391,
            $y: 210,

        });
        this.DialogTextStyle = createdStyle()
        this.DialogText = createdText({
            $this: this.DialogContainer,
            $x: 780,
            $y: 372,
            $text: "是否继续之前的装扮",
            $style: this.DialogTextStyle
        });
        //重新开始按钮按钮
        this.DialogSaveButtonNormal = createdSprite({
            $this: this.DialogContainer,
            $alias: "RebeginButtonNormal_png",
            $x: 1017,
            $y: 644,
            $interactive: true,
            $buttonMode: true
        }).on("pointerdown", this.DialogSaveButtonClickEvent = () => {
            this.DialogSaveButtonNormal.visible = false;
            this.DialogSaveButtonClick.visible = true;
        });
        this.DialogSaveButtonClick = createdSprite({
            $this: this.DialogContainer,
            $alias: "RebeginButtonClick_png",
            $x: 1017,
            $y: 644,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", this.DialogSaveButtonClickEvent = () => {
            this.DialogSaveButtonNormal.visible = true;
            this.DialogSaveButtonClick.visible = false;
            this.DialogEffect(true);
            this.removeChild(this.DialogContainer);
        });
        //继续装扮按钮
        this.DialogNoSaveButtonNormal = createdSprite({
            $this: this.DialogContainer,
            $alias: "ContinueDressButtonNormal_png",
            $x: 585,
            $y: 644,
            $interactive: true,
            $buttonMode: true
        }).on("pointerdown", this.DialogNoSaveButtonNormalEvent = () => {
            this.DialogNoSaveButtonNormal.visible = false;
            this.DialogNoSaveButtonClick.visible = true;
        });
        this.DialogNoSaveButtonClick = createdSprite({
            $this: this.DialogContainer,
            $alias: "ContinueDressButtonClick_png",
            $x: 585,
            $y: 644,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", this.DialogNoSaveButtonClickEvent = () => {
            this.DialogNoSaveButtonNormal.visible = true;
            this.DialogNoSaveButtonClick.visible = false;
            this.DialogEffect(true);
            this.removeChild(this.DialogContainer);
        });
        this.DialogEffect();


    }
    takeoffSingleCloth = takeoffSingleCloth
    getSlotAndAttacetment = getSlotAndAttacetment
    changeDress = changeDress
    DialogEffect(control = false) {
        this.ButtonNormal.interactive = control;
        this.ButtonClick.interactive = control;
        this.BoySpine.interactive = control;
        this.GirlSpine.interactive = control;
    }
    clearClass() {
        //console.log("clearClass事件发生了");
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
        //弹窗事件
        this.DialogSaveButtonNormal.off("pointerdown", this.DialogSaveButtonNormalEvent);
        this.DialogSaveButtonNormalEvent = null;
        this.DialogSaveButtonNormal = null;
        this.DialogSaveButtonClick.off("pointerup", this.DialogSaveButtonClickEvent);
        this.DialogSaveButtonClickEvent = null;
        this.DialogSaveButtonClick = null;
        this.DialogNoSaveButtonNormal.off("pointerdown", this.DialogNoSaveButtonClickEvent);
        this.DialogNoSaveButtonClickEvent = null;
        this.DialogNoSaveButtonNormal = null;
        this.DialogNoSaveButtonClick.off("pointerup", this.DialogNoSaveButtonClickEvent);
        this.DialogNoSaveButtonClickEvent = null;
        this.DialogNoSaveButtonClick = null;
        this.graphics = null;
        this.DialogContainer.removeChildren();
        this.parent.removeChildren();
        this.DialogContainer = null;
        //清空滑块事件

        //转动事件清空

        this._Gb = null;
        //清空动画
        this.ScreenTextSpine = null;

        //清空整体画布
        this.off("added", self.addedHomePageStage);
        //this.parent.removeChildren();
        // this = null;
    }
}