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
        }
        this.suitAll = [
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
        ];
        this.suitAllBoy = [
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
        ];
        this.allSlotName = {
            suit: null,
            cloth: null,
            hair: null,
            hat: null,
            props1: null,
            shoes: null
        }
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        (() => {
            this.Gender = null
        })()
        this.Gender = Garbage.getGarBage("Gender");
        console.log(this.Gender);
        console.log("this.Gender...")
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
            this.clearClass();
            SceneManager.run(new HomePages())
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
            self.suitAll[0].forEach((item) => {
                self.getSlotAndAttacetment(item); //把具体化
                self.changeDress(); //换装
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
        }
        //右衣柜
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1670;
        this.RightDrawer.y = 30;
        //主要分类
        //this.RightDrawer.setClassDrawerArr(self.classicon.girl.classIconArr); //女孩
        //this.RightDrawer.setClassDrawerArr(self.classicon.boy.classIconArr); //男孩子
        this.RightDrawer.setClassDrawerArr(self.classicon[this.Gender].classIconArr)

        //this.RightDrawer.setParticularClothes(self.classicon.girl.particularClothes);//女孩
        //this.RightDrawer.setParticularClothes(self.classicon.boy.particularClothes); //男孩子
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
            //console.log(self.ClothDetail);
            //console.log("self.ClothDeatal...")

            if (self.ClothDetail.Cloth == "suit") {
                let num = Number(self.ClothDetail.AttacetmentName);
                //self.suitAll[num].forEach((item) => { //女孩
                //self.suitAllBoy[num].forEach((item) => { //男孩
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
            ////console.log(self.ClothDetail.Cloth);
            ////console.log("self.ClothDetail.Cloth...")
            if (self.ClothDetail.Cloth == "suit") {
                self.suitAll[0].forEach((item) => {
                    self.getSlotAndAttacetment(item); //把具体化
                    self.changeDress(); //换装
                });
            } else {
                let cloth = this.ClothDetail.Gender + "@" +
                    this.ClothDetail.Cloth + "@" +
                    this.ClothDetail.SlotName + "@" +
                    this.ClothDetail.AttacetmentName + "_normal@" +
                    this.ClothDetail.End;
                console.log(cloth);
                console.log("cloth...")
                self.getSlotAndAttacetment(cloth)
                self.changeDress(); //换装
                //this.changeDress(clothDetailName);
            }

        })

    }
    takeoffSingleCloth($slotName) {
        //this.GirlSpine.skeleton.findSlot($slotName).setAttachment(null);//女孩
        //this.BoySpine.skeleton.findSlot($slotName).setAttachment(null); //男孩
        this.SelectSpine.skeleton.findSlot($slotName).setAttachment(null)
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
        this.allSlotName[$nameDetail[2]] = clothDetailName;
        //console.log(this.allSlotName);
        //console.log("this.allSlotName...")
    }
    changeDress() {
        //第一步 获取插槽
        //第二步 获取插槽具体的位置
        //第三步 获取插槽需要的附件
        //第四步 把附件放到插槽上去...
        //第一步 获取插槽
        //// this.allSlotName[this.ClothDetail.SlotName] = clothDetailName;
        //console.log(this.allSlotName);
        //console.log("this.allSlotName...")
        let self = this;
        let SlotName = []; //插槽的名字
        let SlotObjAll = []; //获取插槽对象

        //for (let item in this.classicon.girl.SlotAndAttachment) { //女孩
        //for (let item in this.classicon.boy.SlotAndAttachment) { //男孩
        for (let item in this.classicon[self.Gender].SlotAndAttachment) {
            if (item.indexOf(self.ClothDetail.SlotName) != -1) {
                SlotName.push(item)
            }
        }
        // console.log(SlotName);
        //console.log("SlotName...")
        SlotName.forEach((item) => {
            let obj = {}
                //替换之前把前面的清空
            self.takeoffSingleCloth(item);
            //obj.SlotObj = self.BoySpine.skeleton.findSlot(item) //男孩插槽对象
            //obj.SlotObj = self.GirlSpine.skeleton.findSlot(item) //女孩插槽对象
            obj.SlotObj = self.SelectSpine.skeleton.findSlot(item)


            // this.classicon.girl.SlotAndAttachment[item].forEach((item1) => { //女孩
            //this.classicon.boy.SlotAndAttachment[item].forEach((item1) => { //男孩
            this.classicon[self.Gender].SlotAndAttachment[item].forEach((item1) => {
                if (item1.indexOf(self.ClothDetail.AttacetmentName) != -1) {
                    obj.AttacetmentName = item1;
                    ////console.log("内部条件执行...")
                }
            });
            //附件名字
            //console.log(obj.AttacetmentName);
            //console.log("obj.AttacetmentName...");
            if (obj.AttacetmentName != undefined) {
                let SlotNum = obj.SlotObj.data.index; //插槽的位置

                //obj.AttachmentObj = self.GirlSpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName); //女孩附件的对象
                //obj.AttachmentObj = self.BoySpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName); //男孩附件的对象
                obj.AttachmentObj = self.SelectSpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName);

                SlotObjAll.push(obj); //对象
            }
        });


        //console.log(SlotObjAll);
        //console.log("SlotObjAll...")
        SlotObjAll.forEach((item) => {
            if (item.AttachmentObj) {
                item.SlotObj.setAttachment(item.AttachmentObj);
            } else {
                item.SlotObj.setAttachment(null);
            }

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
        //全局类移除
        this.off("added", self.addedHomePageStage);
        this.addedHomePageStage = null;
        this.parent.removeChildren();
    }
}