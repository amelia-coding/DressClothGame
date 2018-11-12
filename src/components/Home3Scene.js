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
export default class Home3Scene extends PIXI.Container {
    constructor() {
        super();
        this.Common = null;
        this.BackButtonNormal = null;
        this.BackButtonNormalEvent = null;
        this.BackButtonClick = null;
        this.BackButtonClickEvent = null;
        this.transformBg = null;
        this.PhotoButtonClick = null;
        this.PhotoButtonClickEvent = null;
        this.PhotoButtonNormal = null;
        this.PhotoButtonNormalEvent = null;
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
        this.AllSlotName = [];
        this.classicon = null;
        this.ClothDetail = {
            Gender: null,
            Cloth: null,
            SlotName: null,
            AttacetmentName: null,
            End: null
        };
        this.Gender = null;
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
        //测试使用
        //this.AllSlotName = [];
        //正式使用
        //获取动画具体要穿的衣服
        this.AllSlotName = Garbage.getGarBage("allSlotName");
        //获取背景图
        this.SceneNum = Garbage.getGarBage("ScenePosition");
        this.Scene.forEach((item) => {
            let itemObj = createdSprite({
                $this: self,
                $alias: item,
                $visible: false,
            });
            self.SceneArr.push(itemObj);
        });
        self.SceneArr[this.SceneNum].visible = true;
        //背景图结束
        this.Common = new commonBg({
            _this: self
        });
        //返回按钮事件
        this.BackButtonNormal = this.Common.BackButtonNormal;
        this.BackButtonNormal.x = 33;
        this.BackButtonNormal.on("pointerdown", self.BackButtonNormalEvent = () => {
            self.BackButtonClick.visible = true;
            self.BackButtonNormal.visible = false;
        })
        this.BackButtonClick = this.Common.BackButtonClick;
        this.BackButtonClick.x = 33;
        this.BackButtonClick.on("pointerup", self.BackButtonClickEvent = () => {
            self.BackButtonNormal.visible = true;
            self.BackButtonClick.visible = false;
            this.clearClass();
            SceneManager.run(new HomeGamePlay())
        });
        //照相机按钮
        this.PhotoButtonNormal = createdSprite({
            $this: self,
            $alias: "PhotoButtonNormal_png",
            $x: 230,
            $y: 33,
            $interactive: true,
            $buttonMode: true
        }).on("pointerdown", this.PhotoButtonNormalEvent = () => {
            this.PhotoButtonNormal.visible = false;
            this.PhotoButtonClick.visible = true;
        });
        this.PhotoButtonClick = createdSprite({
            $this: self,
            $alias: "PhotoButtonClick_png",
            $x: 230,
            $y: 33,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        }).on("pointerup", this.PhotoButtonClickEvent = () => {
            this.PhotoButtonNormal.visible = true;
            this.PhotoButtonClick.visible = false
        });
        //文字板块事件
        this.TextBorad = createdSprite({
            $this: self,
            $alias: "TextBorad_png",
            $x: 40,
            $y: 199
        });
        //样式...
        this.TextStyle = new PIXI.TextStyle({
            fontSize: 35,
            fill: "#788C50"
        });
        this.TextName = new PIXI.Text("欢\n迎\n黄\n晓\n明\n明\n华\n再\n同\n学\n穿\n越\n到\n国\n民\n。", this.TextStyle);
        this.TextName.x = 380;
        this.TextName.y = 300;
        this.addChild(this.TextName);
        let Text = [
            "继\n民\n国\n时\n期\n的\n“\n五\n四\n新\n文\n化\n运\n动\n”\n后\n，\n白",
            "话\n文\n代\n替\n文\n言\n文\n，\n揭\n露\n和\n鞭\n挞\n封\n建\n蒙\n昧",
            "成\n为\n中\n国\n文\n艺\n最\n为\n重\n要\n的\n主\n题\n之\n一\n。\n在\n此",
            "期\n鲁\n迅\n、\n巴\n金\n、\n茅\n盾\n、\n郭\n沫\n若\n、\n老\n舍\n、\n曹",
            "禺\n等"
        ]
        this.TextStyle1 = new PIXI.TextStyle({
            fontSize: 35,
            fill: "#704939"
        });
        this.TextSpriteArr = [];
        Text.forEach((item, index) => {
            let TextSprite = new PIXI.Text(item, this.TextStyle1);
            TextSprite.x = 320 - index * 60;
            TextSprite.y = 300;
            this.TextSpriteArr.push(TextSprite);
            this.addChild(TextSprite);
        })

        //样式2...
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
        //移除照相机事件
        this.PhotoButtonClick.off("pointerup", this.PhotoButtonClickEvent);
        this.PhotoButtonClickEvent = null;
        this.PhotoButtonClick = null;
        this.PhotoButtonNormal.off("pointerdown", this.PhotoButtonNormalEvent);
        this.PhotoButtonNormalEvent = null;
        this.PhotoButtonNormal = null;
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