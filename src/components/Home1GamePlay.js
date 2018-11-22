//这个是游戏页
import * as PIXI from "pixi.js";
import "pixi-spine"
import PixiSlider from "../lib/PixiSlider.js";
import RightDrawer from "../lib/RightDrawer.js";
import {
    createdSound,
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
                    "Girl@trousers@trousers@trousers_normal@noraml_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用
                ],
                [
                    "Girl@dress@cloth@cloth_egypt@normal_png",
                    "Girl@hair@hair@hair_egypt@norml_png",
                    "Girl@hat@hat@hat_egypt@normal_png",
                    "Girl@props1@props1@props1_egypt@normal_png",
                    "Girl@shoes@shoes@shoes_egypt@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用 第一个OK
                ],
                [
                    "Girl@dress@cloth@cloth_republic@normal_png",
                    "Girl@hair@hair@hair_republic@normal_png",
                    "Girl@hat@hat@hat_normal@normal_png",
                    "Girl@props@props1@props1_republic@normal_png",
                    "Girl@shoes@shoes@shoes_republic@normal_png",
                    "Girl@suit@suit@suit@normal_png" //辅助使用 第二个OK
                ],
                [
                    "Girl@dress@cloth@cloth_europe@normal_png",
                    "Girl@hair@hair@hair_europe@normal_png",
                    "Girl@hat@hat@hat_europe@normal_png",
                    "Girl@props@props1@props1_normal@normal_png",
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
        this.AllSlotName = []; //这个数据是获取在本次游戏装扮的数据 虽说数据有点耦合但为了保持和各个页面数据命名一样
        this.UserName = null;
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
        //声音数据
        this.PlayGameBgMp3 = null;
        this.on("added", this.addedHomePageStage, this);
    }
    addedHomePageStage() {
        (() => {
            this.Gender = null
            this.AllSlotName = [];
        })()
        //测试使用
        //this.Gender = "girl";
        //this.Gender = "boy";
        //正式使用
        this.Gender = Garbage.getGarBage("Gender");
        //获取数据
        this.classicon = Garbage.getGarBage("classicon"); //各个数据的类
        (Garbage.getGarBage("allSlotName")) && (this.AllSlotName = Garbage.getGarBage("allSlotName")); //获取本次游戏装扮数据
        //声音
        this.PlayGameBgMp3 = createdSound({
            $alias: "PlayGameBg_mp3",
            $start: Garbage.getGarBage("SoundProgress"),
            $loop: true,
            $volume: 0.2
        });
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
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
            self.BackButtonClick.visible = true;
            self.BackButtonNormal.visible = false;
        })
        this.BackButtonClick = this.Common.BackButtonClick;
        this.BackButtonClick.on("pointerup", self.BackButtonClickEvent = () => {
            self.BackButtonNormal.visible = true;
            self.BackButtonClick.visible = false;
            //弹窗音效
            createdSound({
                $alias: "Dialog_mp3"
            });
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
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
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
                self.changeDress(); //换装     
            });
            self.SpineHappy();
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
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
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
            //this.takeoffSingleCloth("trousers")
        } else {
            this.GirlSpine.visible = false;
            this.BoySpine.visible = true;
            this.SelectSpine = null;
            this.SelectSpine = this.BoySpine;
            this.getSlotAndAttacetment("Boy@hair@hair@europe_normal@normal_png"); //修改男孩的发型  
            this.changeDress();

        }
        //右衣柜
        this.RightDrawer = new RightDrawer();
        this.RightDrawer.x = 1670;
        this.RightDrawer.y = 30;
        //主要分类
        this.RightDrawer.setClassDrawerArr(self.classicon[this.Gender].classIconArr)
        this.RightDrawer.setParticularClothes(self.classicon[this.Gender].particularClothes);

        this.RightDrawer.init();
        this.addChild(this.RightDrawer);
        //开始具体换装衣服

        this.RightDrawer.setEmitChangeCloth((clothDetailName) => {
            //一共三步 第一步 是具体化  第二步是换装   第三步 是声音及其高兴一下
            //console.log(clothDetailName);
            //console.log("...")
            let self = this;

            self.getSlotAndAttacetment(clothDetailName); //第一步把具体化
            //getSlotAndAttacetment(clothDetailName)
            //console.log(self.ClothDetail);
            //console.log("self.ClothDeatal...")

            if (self.ClothDetail.Cloth == "suit") {
                let num = Number(self.ClothDetail.AttacetmentName);
                self.Suit[self.Gender][num].forEach((item) => {
                    self.getSlotAndAttacetment(item); //第一步把具体化
                    self.changeDress(); //第二步换装 
                    //换装声音
                    createdSound({
                        $alias: "ChangDressCloth_mp3",
                    });
                });
                self.SpineHappy(); //第三步高兴一下
            } else {
                self.changeDress(); //第二步换装
                //换装声音
                createdSound({
                    $alias: "ChangDressCloth_mp3",
                });
                self.SpineHappy(); //第三步高兴一下
            }

        });
        this.RightDrawer.setEmitClearCloth(() => {
            let self = this;
            //console.log(self.ClothDetail);
            //console.log("self.ClothDetail.Cloth...")
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
            if (self.ClothDetail.Cloth == "suit") {
                self.Suit[this.Gender][0].forEach((item) => {

                    self.getSlotAndAttacetment(item); //把具体化
                    self.changeDress(); //换装
                });
                self.SpineHappy(); //高兴一下
            } else {
                let cloth = this.ClothDetail.Gender + "@" +
                    this.ClothDetail.Cloth + "@" +
                    this.ClothDetail.SlotName + "@" +
                    this.ClothDetail.AttacetmentName + "_normal@" +
                    this.ClothDetail.End;

                if (self.ClothDetail.Gender == "Girl" && self.ClothDetail.Cloth == "dress" && self.ClothDetail.AttacetmentName == "republic") {
                    self.getSlotAndAttacetment("Girl@trousers@trousers@trousers_normal@noraml_png");
                    self.changeDress(); //这个解决的是在解决换装的republic 中有一个印象效果产生的下面没有衣服状态
                }
                //console.log(cloth);
                //console.log("cloth...")
                self.getSlotAndAttacetment(cloth)
                self.changeDress(); //换装
                self.SpineHappy(); //高兴一下
            }

        });
        //这个是从本次装扮游戏中从时空页面返回到本次页面中保持原有的装扮状态
        if (this.AllSlotName.length > 0) {
            console.log("发生了这个状态...")
            this.AllSlotName.forEach((item) => {
                //第一步 是具体化  第二步 装扮
                this.getSlotAndAttacetment(item); //第一步具体化
                this.changeDress(); //换装

            })
        }
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
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
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
            let self = this;
            this.DialogSaveButtonNormal.visible = true;
            this.DialogSaveButtonClick.visible = false;
            //保存数据开始......
            //第一步先得到名字  第二步 得到性别  第三步 具体的插件的名字 第四步发送数据
            let sendDetailData = {};
            let JsonSendDetailData;
            this.UserName = Garbage.getGarBage("UserName"); //第一步
            // this.Gender 第二步性别已经获取好了
            let allSlotName = []; //第三步 具体的插件的名字
            for (let item in this.allSlotName) {
                allSlotName.push(this.allSlotName[item]);
            }
            sendDetailData[self.Gender] = allSlotName;
            JsonSendDetailData = JSON.stringify(sendDetailData);
            //第四步发送数据
            window.postMessage({
                    type: 'getGameRecord',
                    game: 7,
                    data: {
                        'extData': {
                            extData: JsonSendDetailData
                        },
                        'stuName': stuInfo[self.UserName] //这个有疑问
                    }
                }, "*")
                //保存数据结束......
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
            createdSound({
                $alias: "Button_mp3"
            }); //按钮声音音效
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

    }
    takeoffSingleCloth = takeoffSingleCloth
    changeDress = changeDress
    SpineHappy() {
        let self = this;
        self.SelectSpine.state.setAnimation(0, "happy", false);
        self.SelectSpine.state.tracks[0].listener = {
            complete: () => {
                self.SelectSpine.state.setAnimation(0, "normal", true)
            }
        }
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
        for (let item in this.allSlotName) {
            allSlotName.push(this.allSlotName[item]);
        }
        Garbage.clearGarBage("allSlotName");
        Garbage.setGarBage("allSlotName", allSlotName);
    }
    clearClass() {
        this.transformSlot();
        let self = this;
        //声音数据
        PIXI.sound.pause("PlayGameBg_mp3"); //声音暂停...
        Garbage.clearGarBage("SoundProgress"); //清除声音数据
        Garbage.setGarBage("SoundProgress", this.PlayGameBgMp3._duration * this.PlayGameBgMp3.progress); //发送声音数据
        this.PlayGameBgMp3 = null;
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