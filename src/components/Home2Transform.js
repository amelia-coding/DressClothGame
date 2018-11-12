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
import Home3Scene from "./Home3Scene.js"
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
        this.Gender = null;
        this.SceneArr = [];
        this.SceneEventArr = [];
        this.GirlSpine = null;
        this.GirlSpineEvent = null;
        this.BoySpine = null;
        this.BoySpineEvent = null;
        this.AllSlotName = [];
        this.classicon = null;
        this.ClothDetail = {
            Gender: null,
            Cloth: null,
            SlotName: null,
            AttacetmentName: null,
            End: null
        };
        this.on("added", this.addedTransform, this);
    }
    addedTransform() {
        let self = this;
        (() => {
            this.SceneArr = [];
            this.SceneEventArr = [];
            this.Gender = null;
        })()
        //接受参数
        this.Gender = Garbage.getGarBage("Gender");
        this.classicon = Garbage.getGarBage("classicon");
        this.AllSlotName = Garbage.getGarBage("allSlotName");
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
            $visible: false,
            $animation0Name: "normal",
            $addChild: true
        });
        this.BoySpine = createdSpine({
            $this: self,
            $alias: "Boy_spine",
            $x: 950,
            $y: 700,
            $buttonMode: true,
            $visible: false,
            $animation0Name: "normal",
            $addChild: true
        });
        if (this.Gender == "girl") {
            this.GirlSpine.visible = true;
            this.BoySpine.visible = false;
            this.SelectSpine = null;
            this.SelectSpine = this.GirlSpine;
        } else {
            this.GirlSpine.visible = false;
            this.BoySpine.visible = true;
            this.SelectSpine = null;
            this.SelectSpine = this.BoySpine;
        }
        //console.log(this.AllSlotName);
        //console.log("this.allslotNAME...")
        this.AllSlotName.forEach((item) => {
            if (item) {
                this.getSlotAndAttacetment(item);
                this.changeDress();
            }

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
        this.Scene.forEach((item, index) => {
            let itemEvent;
            let itemObj = createdSprite({
                $this: self,
                $alias: item,
                $scale: 0.3,
                $interactive: true,
                $buttonMode: true,
                $addChild: false
            });
            //console.log(itemObj.height)
            itemObj.pivot.y = itemObj.height / 2;
            itemObj.pivot.x = itemObj.width / 2;
            itemObj.on("pointertap", itemEvent = () => {
                itemObj.scale.set(0.4);
                //跳转
                Garbage.clearGarBage("ScenePosition");
                Garbage.setGarBage("ScenePosition", index);
                this.clearClass();
                SceneManager.run(new Home3Scene());
            })
            self.SceneEventArr.push(itemEvent);
            self.SceneArr.push(itemObj);
        })
        this._Gb.timeln = new TimelineMax({
            onComplete: () => {
                //console.log("发生了timeIn事件...")
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
    getSlotAndAttacetment(clothDetailName) {
        //这个参数是 名字
        //结果把各个具体化
        //console.log(clothDetailName)
        //console.log("clothDetailName...")
        let $nameDetail = clothDetailName.split("@");
        ////console.log($nameDetail);
        this.ClothDetail.Gender = $nameDetail[0];
        this.ClothDetail.Cloth = $nameDetail[1];
        this.ClothDetail.SlotName = $nameDetail[2];
        this.ClothDetail.AttacetmentName = $nameDetail[3].split("_")[1];
        this.ClothDetail.End = $nameDetail[4];
        //this.allSlotName[$nameDetail[2]] = clothDetailName;
    }
    changeDress() {
        // //console.log(this.ClothDetail)
        // //console.log("this.ClothDetail...")

        //第一步 获取插槽
        //第二步 获取插槽具体的位置
        //第三步 获取插槽需要的附件
        //第四步 把附件放到插槽上去...
        //第一步 获取插槽
        // this.allSlotName[this.ClothDetail.SlotName] = clothDetailName;
        // //console.log(this.allSlotName);
        ////console.log("this.allSlotName...")
        let self = this;
        let SlotName = []; //插槽的名字
        let SlotObjAll = []; //获取插槽对象
        //for (let item in this.classicon.girl.SlotAndAttachment) {//女孩
        //for (let item in this.classicon.boy.SlotAndAttachment) { //男孩子
        for (let item in this.classicon[self.Gender].SlotAndAttachment) {
            if (item.indexOf(self.ClothDetail.SlotName) != -1) {
                SlotName.push(item)
            }
        }
        ////console.log(SlotName);
        SlotName.forEach((item) => {
            let obj = {};
            self.takeoffSingleCloth(item);
            //obj.SlotObj = self.BoySpine.skeleton.findSlot(item) //男孩插槽对象
            //obj.SlotObj = self.GirlSpine.skeleton.findSlot(item) //女孩插槽对象
            obj.SlotObj = self.SelectSpine.skeleton.findSlot(item)

            //this.classicon.girl.SlotAndAttachment[item].forEach((item1) => {//女孩子
            //this.classicon.boy.SlotAndAttachment[item].forEach((item1) => { //男孩子
            this.classicon[self.Gender].SlotAndAttachment[item].forEach((item1) => {
                if (item1.indexOf(self.ClothDetail.AttacetmentName) != -1) {
                    obj.AttacetmentName = item1;
                    ////console.log("内部条件执行...")
                }
            }); //附件名字
            ////console.log(obj.AttacetmentName);
            ////console.log("obj.AttacetmentName...")
            if (obj.AttacetmentName != undefined) {
                let SlotNum = obj.SlotObj.data.index; //插槽的位置
                //obj.AttachmentObj = self.GirlSpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName); //女孩附件的对象
                // obj.AttachmentObj = self.BoySpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName); //男孩子附件的对象
                obj.AttachmentObj = self.SelectSpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName);
                SlotObjAll.push(obj); //对象
            }
        });
        // //console.log(SlotObjAll);
        ////console.log("SlotObjAll...")
        SlotObjAll.forEach((item) => {
            if (item.AttachmentObj) {
                item.SlotObj.setAttachment(item.AttachmentObj);
            } else {
                item.SlotObj.setAttachment(null);
            }

        })
    }
    takeoffSingleCloth($slotName) {
        //this.GirlSpine.skeleton.findSlot($slotName).setAttachment(null);//女孩
        //this.BoySpine.skeleton.findSlot($slotName).setAttachment(null); //男孩
        this.SelectSpine.skeleton.findSlot($slotName).setAttachment(null)
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