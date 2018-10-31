import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js"
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
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        (() => {
            this.Gender = null
        })()
        this.Gender = Garbage.getGarBage("Gender");
        console.log(this.Gender);
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
        });
        //前衣柜
        this.FrontCloset = createdSprite({
            $this: self,
            $alias: "FrontCloset_png",
            $x: 1679,
            $y: 24,
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