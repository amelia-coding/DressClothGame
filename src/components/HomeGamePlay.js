import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import RightDrawer from "../lib/RightDrawer.js";
import {
    createdSprite,
    createdSpine
} from "./Common";
import {
    TimelineMax
} from "gsap";
import {
    Garbage,
    SceneManager
} from "../lib/EasyPIXI";
import HomePages from "./HomePages.js"
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
        this.classicon = null;
        this.RightDrawer = null;
        this.ClothDetail = {
            Gender: null,
            Cloth: null,
            SlotName: null,
            AttacetmentName: null,
            End: null
        }
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        (() => {
            this.Gender = null
        })()
        this.Gender = Garbage.getGarBage("Gender");
        console.log(this.Gender);
        //获取数据
        this.classicon = Garbage.getGarBage("classicon");

        let self = this;
        createdSprite({
            $this: self,
            $alias: "IndoorBg_jpg"
        });
        //返回按钮事件
        this.BackButtonNormal = createdSprite({
            $this: self,
            $alias: "IndoorBackButtonNormal_png",
            $interactive: true,
            $buttonMode: true,
            $x: 85,
            $y: 41,
        }).on("pointerdown", self.BackButtonNormalEvent = () => {
            self.BackButtonClick.visible = true;
            self.BackButtonNormal.visible = false;
        });
        this.BackButtonClick = createdSprite({
            $this: self,
            $alias: "IndoorBackButtonClick_png",
            $interactive: true,
            $buttonMode: true,
            $x: 85,
            $y: 41,
            $visible: false,
        }).on("pointerup", self.BackButtonClickEvent = () => {
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
        this.GirlSpine = createdSpine({
            $this: self,
            $alias: "Girl_spine",
            $x: 950,
            $y: 700,
            $buttonMode: true,
            $animation0Name: "normal",
            $addChild: true
        });

        //右衣柜
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1670;
        this.RightDrawer.y = 30;
        //主要分类
        this.RightDrawer.setClassDrawerArr(self.classicon.girl.classIconArr);
        this.RightDrawer.setParticularClothes(self.classicon.girl.particularClothes);
        this.RightDrawer.init();
        this.addChild(this.RightDrawer);
        //开始具体换装衣服
        //console.log(this.classicon);


        this.RightDrawer.setEmitChangeCloth((clothDetailName) => {
            let self = this;
            //console.log(clothDetailName)
            self.getSlotAndAttacetment(clothDetailName); //把具体化

            //第一步 获取插槽
            //第二步 获取插槽具体的位置
            //第三步 获取插槽需要的附件
            //第四步 把附件放到插槽上去...
            //第一步 获取插槽

            let SlotName = []; //插槽的名字
            for (let item in this.classicon.girl.SlotAndAttachment) {
                //console.log(item);
                if (item.indexOf(self.ClothDetail.SlotName) != -1) {
                    SlotName.push(item)
                }
            }
            //console.log(SlotName);

            let SlotObjAll = []; //获取插槽对象
            console.log(SlotName);
            console.log("SlotName...")
            SlotName.forEach((item) => {
                let obj = {}
                obj.SlotObj = self.GirlSpine.skeleton.findSlot(item) //插槽对象
                this.classicon.girl.SlotAndAttachment[item].forEach((item1) => {
                    console.log(item1);
                    console.log("item1...");
                    console.log(self.ClothDetail.AttacetmentName)
                    if (item1.indexOf(self.ClothDetail.AttacetmentName) != -1) {
                        obj.AttacetmentName = item1;
                        //console.log("内部条件执行...")
                    }
                }); //附件名字
                //console.log(obj.AttacetmentName);
                //console.log("obj.AttacetmentName...")
                if (obj.AttacetmentName != undefined) {
                    let SlotNum = obj.SlotObj.data.index; //插槽的位置
                    console.log(obj.AttacetmentName)
                    obj.AttachmentObj = self.GirlSpine.skeleton.getAttachment(SlotNum, obj.AttacetmentName); //附件的对象
                    SlotObjAll.push(obj); //对象
                }
            });
            console.log(SlotObjAll)
            console.log("SlotObjAll...")
            SlotObjAll.forEach((item) => {
                item.SlotObj.setAttachment(item.AttachmentObj);
            })


        });
        this.RightDrawer.setEmitClearCloth((clothDetailName) => {
            //self.getSlotAndAttacetment(clothDetailName); //把具体化
            // this.ClothDetail.AttacetmentName = this.ClothDetail.AttacetmentName.split("_")[0] + "_normal";
            // let SlotObj = self.GirlSpine.skeleton.findSlot(self.ClothDetail.SlotName); //插槽对象
            // let SlotNum = SlotObj.data.index; //插槽的位置
            // let AttachmentObj = self.GirlSpine.skeleton.getAttachment(SlotNum, self.ClothDetail.AttacetmentName);
            // SlotObj.setAttachment(AttachmentObj);
            // this.ClothDetail.AttacetmentName = 
        })


    }
    takeoffSingleCloth($slotName) {
        this.GirlSpine.skeleton.findSlot($slotName).setAttachment(null);
    }
    getSlotAndAttacetment(clothDetailName) {
        //这个参数是 名字
        //结果把各个具体化
        let $nameDetail = clothDetailName.split("@");
        //console.log($nameDetail);
        this.ClothDetail.Gender = $nameDetail[0];
        this.ClothDetail.Cloth = $nameDetail[1];
        this.ClothDetail.SlotName = $nameDetail[2];
        this.ClothDetail.AttacetmentName = $nameDetail[3].split("_")[1];
        this.ClothDetail.End = $nameDetail[4];
        //console.log(this.ClothDetail);
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