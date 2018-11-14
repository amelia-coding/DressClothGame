import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import RightDrawer from "../lib/RightDrawer.js";
import {
    createdSprite,
    createdSpine,
    commonBg,
    takeoffSingleCloth,
    DialogCommon,
    changeDress,
    createdText,
    createdStyle,
} from "./Common";
import {
    TimelineMax
} from "gsap";
import {
    Garbage,
    SceneManager
} from "../lib/EasyPIXI";
import HomePages from "./Home0Pages.js"
import HomeTransform from "./Home2Transform.js"
export default class HomeGamePlay extends PIXI.Container {
    constructor() {
        super();
        this.Gender = null;
        this.BackButtonNormal = null;
        this.BackButtonNormalEvent = null;
        this.BackButtonClick = null;
        this.BackButtonClickEvent = null;
        this.ResetProfileButtonNormal = null;
        this.ResetProfileButtonNormalEvent = null;
        this.ResetProfileButtonClick = null;
        this.ResetProfileButtonClickEvent = null;
        this.CrossTimeButtonNoraml = null;
        this.CrossTimeButtonNoramlEvent = null;
        this.CrossTimeButtonClick = null;
        this.CrossTimeButtonClickEvent = null;
        this.FrontCloset = null;
        this.ContentCloset = null;
        this.GirlSpine = null;
        this.GirlSpineEvent = null;
        this.BoySpine = null;
        this.BoySpineEvent = null;
        this.SelectSpine = null;
        this.classicon = null;
        this.RightDrawer = null;
        this.Common = null;
        this.ClothDetail = {
            Gender: null,
            Cloth: null,
            SlotName: null,
            AttacetmentName: null,
            End: null
        };
        this.Suit = {
            "boy": [
                [
                    "Boy@hair@hair@europe_normal@normal_png",
                    "Boy@hat@hat@egypt_normal@normal_png",
                    "Boy@props@props@egypt_normal@noraml_png",
                    "Boy@shoes@shoes@republic_normal@normal_png",
                    "Boy@cloth@cloth@cloth_normal@normal_png",
                    "Boy@trousers@trousers@trousers_normal@normal_png",
                    "Boy@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Boy@hair@hair@europe_normal@normal_png",
                    "Boy@hat@hat@egypt_normal@normal_png",
                    "Boy@props@props@propsl_egypt@noraml_png",
                    "Boy@shoes@shoes@republic_normal@normal_png",
                    "Boy@cloth@cloth@cloth_egypt@normal_png",
                    "Boy@trousers@trousers@normal_normal@normal_png",
                    "Boy@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Boy@hair@hair@europe_normal@normal_png",
                    "Boy@hat@hat@egypt_normal@normal_png",
                    "Boy@props@props@egypt_normal@noraml_png",
                    "Boy@shoes@shoes@republic_normal@normal_png",
                    "Boy@cloth@cloth@cloth_republic@noraml_png",
                    "Boy@trousers@trousers@trousers_republic@noraml_png",
                    "Boy@suit@suit@suit@normal_png" //辅助使用
                ],
                [],
                [
                    "Boy@hair@hair@europe_normal@normal_png",
                    "Boy@hat@hat@egypt_normal@normal_png",
                    "Boy@props@props@propsl_europe@normal_png",
                    "Boy@shoes@shoes@republic_normal@normal_png",
                    "Boy@cloth@cloth@cloth_europe@normal_png",
                    "Boy@trousers@trousers@trousers_europe@normal_png",
                    "Boy@suit@suit@suit@normal_png" //辅助使用
                ]
            ],
            "girl": [
                [
                    "Girl@hat@hat@hat_normal@normal_png",
                    "Girl@hair@hair@hair_normal@normal_png",
                    "Girl@props@props1@props1_normal@normal_png",
                    "Girl@dress@cloth@cloth_normal@normal_png",
                    "Girl@shoes@shoes@shoes_normal@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Girl@hat@hat@hat_egypt@normal_png",
                    "Girl@hair@hair@hair_egypt@norml_png",
                    "Girl@dress@cloth@cloth_egypt@normal_png",
                    "Girl@shoes@shoes@shoes_egypt@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Girl@hair@hair@hair_republic@normal_png",
                    "Girl@props@props1@props1_republic@normal_png",
                    "Girl@dress@cloth@cloth_republic@normal_png",
                    "Girl@shoes@shoes@shoes_republic@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Girl@hat@hat@hat_europe@normal_png",
                    "Girl@hair@hair@hair_europe@normal_png",
                    "Girl@dress@cloth@cloth_europe@normal_png",
                    "Girl@shoes@shoes@shoes_republic@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用
                ],
            ]
        };
        this.allSlotName = {
            suit: null,
            cloth: null,
            hair: null,
            hat: null,
            props1: null,
            shoes: null
        };
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
        (() => {
            this.Gender = null
        })()
        //测试使用
        this.Gender = "girl";
        //正式使用
        //this.Gender = Garbage.getGarBage("Gender");
        //获取数据
        this.classicon = Garbage.getGarBage("classicon");

        let self = this;
        createdSprite({
            $this: self,
            $alias: "IndoorBg_jpg"
        });
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
            this.addChild(this.DialogContainer);
            self.DialogEventEffect();

            //this.clearClass();
            // SceneManager.run(new HomePages())
        });
        //还原形象按钮
        this.ResetProfileButtonNormal = createdSprite({
            $this: self,
            $alias: "ResetProfileNormal_png",
            $x: 85,
            $y: 731,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", self.ResetProfileButtonNormalEvent = () => {
            self.ResetProfileButtonNormal.visible = false;
            self.ResetProfileButtonClick.visible = true;
        });
        this.ResetProfileButtonClick = createdSprite({
            $this: self,
            $alias: "ResetProfileClick_png",
            $x: 85,
            $y: 731,
            $interactive: true,
            $buttonMode: true,
            $visible: false,
        }).on("pointerup", self.ResetProfileButtonClickEvent = () => {
            self.ResetProfileButtonNormal.visible = true;
            self.ResetProfileButtonClick.visible = false;
            self.Suit[this.Gender][0].forEach((item) => {
                self.getSlotAndAttacetment(item); //把具体
                //getSlotAndAttacetment(item)

                self.changeDress(); //换装
                //changeDress();
            });
        });
        //穿越时空按钮
        this.CrossTimeButtonNoraml = createdSprite({
            $this: self,
            $alias: "CrossTimeNormal_png",
            $x: 85,
            $y: 891,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", self.CrossTimeButtonNoramlEvent = () => {
            this.CrossTimeButtonNoraml.visible = false;
            this.CrossTimeButtonClick.visible = true;
        });
        this.CrossTimeButtonClick = createdSprite({
            $this: self,
            $alias: "CrossTimeClick_png",
            $x: 85,
            $y: 891,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", self.CrossTimeButtonClickEvent = () => {
            this.CrossTimeButtonNoraml.visible = true;
            this.CrossTimeButtonClick.visible = false;
            this.transformSlot();
            this.clearClass();
            SceneManager.run(new HomeTransform())
        });

        //内容衣柜
        this.ContentCloset = createdSprite({
            $this: self,
            $alias: "ContentCloset_png",
            $x: 1350,
            $y: 0,
            $addChild: false
        });
        //前衣柜
        this.FrontCloset = createdSprite({
            $this: self,
            $alias: "FrontCloset_png",
            $x: 1679,
            $y: 24,
            $addChild: false
        });
        //人物
        //女孩形象
        this.GirlSpine = createdSpine({
            $this: self,
            $alias: "Girl_spine",
            $x: 950,
            $y: 700,
            $visible: false,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: true
        });
        //男孩形象
        this.BoySpine = createdSpine({
            $this: self,
            $alias: "Boy_spine",
            $x: 950,
            $y: 700,
            $buttonMode: true,
            $animation0Name: "normal",
            $visible: false,
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
            this.getSlotAndAttacetment("Boy@hair@hair@europe_normal@normal_png");
            this.changeDress();
        }
        //右衣柜
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1670;
        this.RightDrawer.y = 30;
        //主要分类
        this.RightDrawer.setClassDrawerArr(self.classicon[this.Gender].classIconArr)
        console.log(this.RightDrawer)
        console.log("this.RightDrawer...")
        this.RightDrawer.setParticularClothes(self.classicon[this.Gender].particularClothes);

        this.RightDrawer.init();
        this.addChild(this.RightDrawer);
        //开始具体换装衣服

        this.RightDrawer.setEmitChangeCloth((clothDetailName) => {
            //一共两步 第一步 是具体化  第二步是换装
            //console.log("...")
            //console.log(clothDetailName)
            let self = this;

            self.getSlotAndAttacetment(clothDetailName); //把具体化
            //getSlotAndAttacetment(clothDetailName)
            //console.log(self.ClothDetail);
            //console.log("self.ClothDeatal...")

            if (self.ClothDetail.Cloth == "suit") {
                let num = Number(self.ClothDetail.AttacetmentName);
                self.Suit[self.Gender][num].forEach((item) => {
                    self.getSlotAndAttacetment(item); //把具体化
                    self.changeDress(); //换装
                });
            } else {
                self.changeDress(); //换装
            }

        });
        this.RightDrawer.setEmitClearCloth(() => {
            let self = this;
            // console.log(self.ClothDetail.Cloth);
            // console.log("self.ClothDetail.Cloth...")
            if (self.ClothDetail.Cloth == "suit") {
                self.Suit[this.Gender][0].forEach((item) => {
                    self.getSlotAndAttacetment(item); //把具体化
                    self.changeDress(); //换装
                });
            } else {
                let cloth = this.ClothDetail.Gender + "@" +
                    this.ClothDetail.Cloth + "@" +
                    this.ClothDetail.SlotName + "@" +
                    this.ClothDetail.AttacetmentName + "_normal@" +
                    this.ClothDetail.End;
                //console.log(cloth);
                //console.log("cloth...")
                self.getSlotAndAttacetment(cloth)
                self.changeDress(); //换装

            }

        });
        //弹窗事件
        //公共弹窗
        this.DialogCommon = new DialogCommon();
        //this.addChild(this.DialogCommon.DialogContainer); 有时间限制
        this.DialogCommon.DialogGoodButtonClick.on("pointerup", this.DialogCommonClickEvent = () => {
            this.DialogCommon.DialogGoodButtonNormal.visible = true;
            this.DialogCommon.DialogGoodButtonClick.visible = false;

        });
        this.DialogContainer = new PIXI.Container();
        //this.addChild(this.DialogContainer);
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
            $text: "是否保存当前装扮",
            $style: this.DialogTextStyle
        });
        //保存按钮
        this.DialogSaveButtonNormal = createdSprite({
            $this: this.DialogContainer,
            $alias: "DialogSaveButtonNoraml_png",
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
            $alias: "DialogSaveButtonClick_png",
            $x: 1017,
            $y: 644,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", this.DialogSaveButtonClickEvent = () => {
            this.DialogSaveButtonNormal.visible = true;
            this.DialogSaveButtonClick.visible = false;
            self.clearClass();
            SceneManager.run(new HomePages());
        });
        //不保存按钮
        this.DialogNoSaveButtonNormal = createdSprite({
            $this: this.DialogContainer,
            $alias: "DialogNoSaveButtonNoraml_png",
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
            $alias: "DialogNoSaveButtonClick_png",
            $x: 585,
            $y: 644,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", this.DialogNoSaveButtonClickEvent = () => {
            this.DialogNoSaveButtonNormal.visible = true;
            this.DialogNoSaveButtonClick.visible = false;
            self.clearClass();
            SceneManager.run(new HomePages());
        });

        // console.log(this.RightDrawer.getChildByName(classDrawer));
        // console.log(this.RightDrawer.children);
        // console.log(this.RightDrawer.children[3]);
        // console.log(this.RightDrawer.children[3].children);
        // console.log(this.RightDrawer.children[3].children[0]);
        // console.log(this.RightDrawer.children[3].children[0].children[1]);
        // console.log(this.RightDrawer.children[3].children[0].children[1].children)
        // console.log("....")

    }
    getSlotAndAttacetment(clothDetailName) {
        // console.log(clothDetailName)
        // console.log("...")
        let $nameDetail = clothDetailName.split("@");
        this.ClothDetail.Gender = $nameDetail[0];
        this.ClothDetail.Cloth = $nameDetail[1];
        this.ClothDetail.SlotName = $nameDetail[2];
        this.ClothDetail.AttacetmentName = $nameDetail[3].split("_")[1];
        this.ClothDetail.End = $nameDetail[4];
        this.allSlotName[$nameDetail[2]] = clothDetailName;
    }
    takeoffSingleCloth = takeoffSingleCloth
    changeDress = changeDress
    DialogEventEffect(control = false) {
        this.BackButtonNormal.interactive = control;
        this.BackButtonClick.interactive = control;
        this.ResetProfileButtonNormal.interactive = control;
        this.ResetProfileButtonClick.interactive = control;
        this.CrossTimeButtonNoraml.interactive = control;
        this.CrossTimeButtonClick.interactive = control;
        this.RightDrawer.children[3].children[0].children[1].children.forEach((item) => {
            item.children[1].interactive = control; //右盒子类事件
        })
    }
    transformSlot() {
        let allSlotName = [];
        //console.log(this.allSlotName + "...")
        for (let item in this.allSlotName) {
            allSlotName.push(this.allSlotName[item]);
        }
        Garbage.clearGarBage("allSlotName");
        Garbage.setGarBage("allSlotName", allSlotName);
    }
    clearClass() {
        this.transformSlot();
        let self = this;
        //返回按钮事件
        this.BackButtonNormal.off("pointerdown", self.BackButtonNormalEvent);
        this.BackButtonClick.off("pointerup", self.BackButtonClickEvent);
        this.BackButtonClickEvent = null;
        this.BackButtonNormalEvent = null;
        this.BackButtonNormal = null;
        this.BackButtonClick = null;
        //返回形象事件按钮
        this.ResetProfileButtonNormal.off("pointerdown", self.ResetProfileButtonNormalEvent);
        this.ResetProfileButtonNormalEvent = null;
        this.ResetProfileButtonNormal = null;
        this.ResetProfileButtonClick.off("pointerup", self.ResetProfileButtonClickEvent);
        this.ResetProfileButtonClickEvent = null;
        this.ResetProfileButtonClick = null;
        //移除穿越时空按钮
        this.CrossTimeButtonNoraml.off("pointerdown", self.CrossTimeButtonNoramlEvent);
        this.CrossTimeButtonNoramlEvent = null;
        this.CrossTimeButtonNoraml = null;
        this.CrossTimeButtonClick.off("pointerup", self.CrossTimeButtonClickEvent);
        this.CrossTimeButtonClickEvent = null;
        this.CrossTimeButtonClick = null;
        //衣柜
        this.FrontCloset = null;
        this.ContentCloset = null;
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
        //全局类移除
        this.off("added", self.addedHomePageStage);
        this.addedHomePageStage = null;
        this.commonBg = null;
        this.removeChildren();
        this.destroy();
        //this.parent.removeChildren();
    }
}