import PIXISlider from './PixiSlider.js'
import {
    TweenMax
} from 'gsap'
class RightDrawer extends PIXI.Container {
    constructor() {
        super();
        this.clothesDrawer = null;
        this.classDrawer = null;
        this.emitChangeCloth = null;
        this.emitClearCloth = null;
        this.emitChangeScene = null;

        this.classDrawerBtnArr = [1, 2, 3]; //主题按钮数
        this.clothesDrawerBtnArr = []; //存放刷新各个分类下的具体衣服；存资源名;
        this.clothesDrawerTextureArr = [];
        this.clothesDrawer_slider = null;

        this.classDrawerAnimating = false;
        this.clothesDrawerAnimating = false;

        this.classIconName = '';
        this.clothesLittleBtn = null;
        this.upperLine = null;
        this.downLine = null;
        this.tickers = null;
        this._clothesObj = {}
            //this.on('added',this.init,this);
    }

    setParticularClothes($obj = {}) {
            this._clothesObj = $obj;
        }
        //设置右分类滑块的数据[]
    setClassDrawerArr($arr) {
            this.classDrawerBtnArr = $arr;
        }
        //具体添加衣服 参数是具体衣服的名字
    setClothesDrawerArr($arr) {
        // console.log($arr);
        // console.log("$arr...")
        const self = this;
        this.clothesDrawerBtnArr = $arr;
        if (this.clothesDrawer_slider) {
            this.clothesDrawer_slider.updateAll();
            let slideCount = 0;
            for (let i = 0; i < this.clothesDrawerBtnArr.length; i++) {
                // if ((i + 1) % 2 == 1) {
                slideCount++;
                //  }
            }
            this.clothesDrawer_slider.slides = slideCount;


            this.clothesDrawer_slider.swiperWidth = 400;
            this.clothesDrawer_slider.swiperHeight = 1020;
            this.clothesDrawer_slider.slideWidth = 400;
            this.clothesDrawer_slider.slideHeight = 250;

            this.clothesDrawer_slider.slideOffset = 25;
            this.clothesDrawer_slider.swiperDirection = 'vertical';
            this.clothesDrawer_slider.slideColorAlpha = 0;
            this.clothesDrawer_slider.x = -230; //改具体衣服的横坐标的位置
            this.clothesDrawer_slider.y = 0;
            this.clothesDrawer_slider.init();
            // return;
            // this.clothesDrawer.getChildAt(1).slides = this.clothesDrawerBtnArr.length;
            var currentClothesArr = [];
            for (let i = 0; i < slideCount; i++) {
                var objectDrawPane = new PIXI.Container();
                for (let i = 0; i < 1; i++) { //控制横排放几个
                    var objectSlotBg = new PIXI.Graphics();
                    objectSlotBg.beginFill(0xffffff, 1);
                    objectSlotBg.drawRoundedRect(0, 0, 180, 180, 20);
                    objectSlotBg.endFill();
                    objectSlotBg.x = 15;
                    objectDrawPane.addChild(objectSlotBg);
                    objectSlotBg.alpha = 0; //背景白色控制
                }
                currentClothesArr.push(objectDrawPane);
                //console.log(this.clothesDrawer_slider.slidesArr[i])
                this.clothesDrawer_slider.slidesArr[i].addChild(objectDrawPane);

            };
            let chothIndex = 0;
            //具体刷新的衣服
            currentClothesArr.forEach((item, index) => {
                // console.log(item);
                // console.log("item...")

                if (self.clothesDrawerBtnArr.length > 0) {
                    //具体衣服;
                    item.children.forEach((item2, index2) => {
                        //这个是添加具体衣服的
                        // console.log(self.clothesDrawerBtnArr[chothIndex]);
                        // console.log("self.cloth...")
                        var clothes = new PIXI.Sprite(PIXI.Texture.from(self.clothesDrawerBtnArr[chothIndex]));
                        var clothesName = self.clothesDrawerBtnArr[chothIndex]; //目的是点击显示暗的图片
                        var clothes0 = new PIXI.Sprite(PIXI.Texture.from(self.clothesDrawerBtnArr[chothIndex] + "_click"));
                        var BarDrawer = new PIXI.Sprite(PIXI.Texture.from("BarDrawer_png"));
                        BarDrawer.y = 240;
                        //clothes.alpha = 1;
                        //item2.addChild(clothes); 改了这句话
                        clothes0.visible = false;
                        item.addChild(BarDrawer);
                        item.addChild(clothes0);
                        item.addChild(clothes);
                        //console.log(self.clothesDrawerBtnArr[chothIndex] + "......@")
                        if (self.clothesDrawerBtnArr[chothIndex] == undefined) {
                            item2.alpha = 0;
                        } else {
                            item2.interactive = true;
                            if (!(index == 0 && index2 == 0)) {
                                //这个是具体衣服事件...
                                item2.on("pointerdown", () => {
                                    clothes.visible = false;
                                    clothes0.visible = true;
                                });
                                item2.on("pointerup", () => {
                                    clothes.visible = true;
                                    clothes0.visible = false;
                                    self.clothesItem_TapHandler(clothesName);
                                });
                                //item2.on('pointerup', self.clothesItem_TapHandler.bind(self, self.clothesDrawerBtnArr[chothIndex]), self);
                            } else {
                                //这个是清除按钮..
                                console.log()
                                item2.on("pointerdown", () => {
                                    clothes.visible = false;
                                    clothes0.visible = true;
                                });
                                item2.on("pointerup", () => {
                                    clothes.visible = true;
                                    clothes0.visible = false;
                                    //self.clothesItem_TapHandler(clothesName);
                                    self.clearBtn_TapHandler(clothesName);

                                });
                                // item2.on('pointertap', self.clearBtn_TapHandler.bind(self, self.clothesDrawerBtnArr[chothIndex]), self);
                            }
                        }
                        chothIndex++;
                    })

                }
            })

        }


    }
    clearBtn_TapHandler(index, evt) {
        const self = this;
        if (this.clothesDrawer_slider._movedPosArr.length < 3) {

            if (this.emitClearCloth) {
                this.emitClearCloth.call(this, index);
            }

        }
    };
    //点击具体的衣服物件触发;
    clothesItem_TapHandler(index, evt) {
        if (this.clothesDrawer_slider._movedPosArr.length < 3) {
            this.emitChangeCloth.call(this, index);
            //this
            //具体名字
            //let clotheTexture = evt.currentTarget.getChildAt(0).texture.textureCacheIds[0];
            //let hasScene = clotheTexture.indexOf('scene') != -1; //有场景存在;
            // let hasScene = 
            // if (hasScene) {
            //     if (this.emitChangeScene) {
            //         this.emitChangeScene.call(this, index);
            //     }
            // } else {
            //     if (this.emitChangeCloth) {
            //         this.emitChangeCloth.call(this, index);
            //     }
            // }

        }

    }
    setEmitChangeScene($callback = function() {}) {
        this.emitChangeScene = $callback;
    }
    setEmitChangeCloth($callback = function() {}) {
        this.emitChangeCloth = $callback;
    }
    setEmitClearCloth($callback = function() {}) {
        this.emitClearCloth = $callback;
    }
    init() {
            const self = this;
            // this.setClassDrawerArr(["",])
            //初始化classDrawer;
            initialClassDrawer.call(this);
            initialclothesDrawer.call(this);
            //this.showclothesDrawer.call(this)
            this.showClassDrawer.call(this);
            //确立了具体的类别的抽屉
            function initialClassDrawer() {
                this.classDrawer = new PIXI.Container();
                var classDrawer_slider = new PIXISlider();
                //创建滑块数长度
                classDrawer_slider.slides = this.classDrawerBtnArr.length;
                //设置整个滑块条的长度和宽度
                classDrawer_slider.swiperWidth = 260;
                classDrawer_slider.swiperHeight = 1020;
                //设置单个滑块的长度和宽度
                classDrawer_slider.slideWidth = 230;
                classDrawer_slider.slideHeight = 210;
                //设置滑块的透明度
                classDrawer_slider.slideColorAlpha = 0;
                //设置单个滑块的偏离长度
                classDrawer_slider.slideOffset = 50;
                //设置滑块的垂直方向
                classDrawer_slider.swiperDirection = 'vertical';
                //对滑块进行初始化
                classDrawer_slider.init();
                //对滑块进行初始化加载到屏幕容器上
                this.classDrawer.addChild(classDrawer_slider);
                //不清楚这句话的作用...
                let masker = new PIXI.Graphics();
                masker.beginFill(0xff0000);
                masker.drawRoundedRect(0, 0, classDrawer_slider.swiperWidth, classDrawer_slider.swiperHeight, 25);
                masker.endFill();
                this.bg = new PIXI.Sprite(PIXI.Texture.from("FrontCloset_png"));
                this.bg.x = 5;
                this.bg.y = -13;
                this.addChild(this.bg);
                this.addChild(masker);

                this.classDrawer.mask = masker;
                this.addChild(this.classDrawer); //添加分类的盒子
                this.classDrawer.x = 218;
                //这句话结束
                //背景图及其具体实例的类别的;
                for (let i = 0; i < this.classDrawerBtnArr.length; i++) {
                    // var classDrawer_bg = new PIXI.Sprite(PIXI.Texture.from('classbtns_png'));
                    // classDrawer_slider.slidesArr[i].addChild(classDrawer_bg);
                    let icons = new PIXI.Sprite(PIXI.Texture.from(this.classDrawerBtnArr[i]));
                    let icons0 = new PIXI.Sprite(PIXI.Texture.from(this.classDrawerBtnArr[i] + "_click"));

                    classDrawer_slider.slidesArr[i].addChild(icons0);
                    classDrawer_slider.slidesArr[i].addChild(icons);

                    icons0.x = 40;
                    icons0.y = 15;

                    icons.x = 40;
                    icons.y = 15;

                    icons0.interactive = true;
                    icons.interactive = true;

                    icons0.visible = false;
                    icons.on("pointerdown", () => {
                        icons.visible = false;
                        icons0.visible = true;

                    });
                    //icons0.on("pointerup", self.classDrawBtn_tapHandler.bind(self, i));
                    icons0.on('pointerup', () => {
                        icons.visible = true;
                        icons0.visible = false;
                        self.classDrawBtn_tapHandler(i);
                    })

                }
            };

            //初始化实体抽屉(具体的抽屉的位置);
            function initialclothesDrawer() {
                this.clothesDrawer = new PIXI.Container();
                this.clothesDrawer_slider = new PIXISlider();
                this.clothesDrawer_slider.slides = 5;
                this.clothesDrawer_slider.swiperWidth = 400;
                this.clothesDrawer_slider.swiperHeight = 760;
                this.clothesDrawer_slider.slideWidth = 400;
                this.clothesDrawer_slider.slideHeight = 180;

                this.clothesDrawer_slider.slideOffset = 25;
                this.clothesDrawer_slider.swiperDirection = 'vertical';
                this.clothesDrawer_slider.slideColorAlpha = 0;
                this.clothesDrawer_slider.x = -180;
                this.clothesDrawer_slider.y = 60;
                this.clothesDrawer_slider.init();

                var objectDrawBg = new PIXI.Sprite(PIXI.Texture.from('decoratebtns_png'));
                //这个是具体的箱子衣柜
                objectDrawBg.pivot.x = 0;
                objectDrawBg.pivot.y = 0;
                objectDrawBg.x = -320; //默认位置
                //objectDrawBg.x = -80; //设置具体盒子的位置
                objectDrawBg.y = -38;
                this.clothesDrawer.addChild(objectDrawBg); //添加背景
                this.clothesDrawer.addChild(this.clothesDrawer_slider); //添加滑块
                this.addChild(this.clothesDrawer); //添加具体的盒子内的衣服

                // console.log(this.getChildIndex(this.clothesDrawer)); //3
                // console.log(this.getChildIndex(this.classDrawer)); //2
                this.setChildIndex(this.classDrawer, 3)
                this.setChildIndex(this.bg, 2)
                this.clothesDrawer.x = 250;

                // //背景;
                //小按钮初始化...
                this.clothesLittleBtn = new PIXI.Sprite();
                this.clothesLittleBtn0 = new PIXI.Sprite();

                this.clothesLittleBtn.x = -300;
                this.clothesLittleBtn0.x = -300;

                this.clothesLittleBtn.y = 475;
                this.clothesLittleBtn0.y = 475;

                this.clothesLittleBtn.buttonMode = true;
                this.clothesLittleBtn0.buttonMode = true;

                this.clothesLittleBtn.interactive = true;
                this.clothesLittleBtn0.interactive = true;

                this.clothesLittleBtn0.visible = false;


                //this.clothesLittleBtn.on('pointertap', this.clothesLittleBtn_TapHandler, this);
                this.clothesLittleBtn.on("pointerdown", () => {
                    this.clothesLittleBtn.visible = false;
                    this.clothesLittleBtn0.visible = true;
                });
                this.clothesLittleBtn0.on("pointerup", () => {
                    this.clothesLittleBtn.visible = true;
                    this.clothesLittleBtn0.visible = false;
                    this.clothesLittleBtn_TapHandler();
                });

                this.clothesDrawer.addChild(this.clothesLittleBtn0);
                this.clothesDrawer.addChild(this.clothesLittleBtn);

            }

            // this.upperLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));
            // this.downLine = new PIXI.Sprite(PIXI.Texture.from('shadowline_png'));

            // this.upperLine.x = 0;
            // this.upperLine.y = 0;
            // this.addChild(this.upperLine)
            // this.downLine.x = 0;
            // this.downLine.scale.y = -1;
            // this.downLine.y = this.classDrawer.getChildAt(0).swiperHeight;
            // this.addChild(this.downLine)
            // this.upperLine.alpha = this.downLine.alpha = 0;

            let heightC = self.classDrawer.getChildAt(0).wrapper.height - self.classDrawer.getChildAt(0).swiperHeight;
            self.tickers = new PIXI.ticker.Ticker();
            self.tickers.add(() => {
                if (self.classDrawer.getChildAt(0).wrapper.y <= 0 && self.classDrawer.getChildAt(0).wrapper.y >= -16) {
                    //self.upperLine.alpha = 0;
                } else {
                    //  self.upperLine.alpha = 1;
                }

                if (self.classDrawer.getChildAt(0).wrapper.y <= -1 * heightC + 20) {
                    // self.downLine.alpha = 0;
                } else {
                    // self.downLine.alpha = 1;
                }
            })
            self.tickers.start();



        }
        //类内部的小按钮事件...
    clothesLittleBtn_TapHandler(e) {
            // console.log("小按钮事件...")
            const self = this;
            if (this.clothesDrawerAnimating == false) {
                //PIXI.sound.play('pullout')
                this.hideclothesDrawer.call(this, () => {
                    self.tickers.start();

                });
                this.showClassDrawer.call(this, () => {
                    // self.clothesDrawerAnimating = false;
                    self.classDrawerAnimating = false;
                });
                this.clothesDrawerAnimating = true;
            }

        }
        //类按钮事件...
    classDrawBtn_tapHandler(index, event) {

        const self = this;
        // console.log("类事件发生...")
        // console.log(index);
        // console.log(event);
        if (this.classDrawer.getChildAt(0)._movedPosArr.length < 3) {
            if (this.classDrawerAnimating == false) {
                self.tickers.stop();
                //self.upperLine.alpha = 0;
                //self.downLine.alpha = 0;

                // PIXI.sound.play('pullout')
                //this.hideClassDrawer();
                this.showclothesDrawer(() => {

                    self.clothesDrawerAnimating = false;
                });
                this.classDrawerAnimating = true;
                //console.log(this.classDrawerBtnArr[index])
                //classicon@cloth@cloth@cloth_normal@normal_png
                //let regs = this.classDrawerBtnArr[index].replace(/^classicon_|_png$/g, '');
                let regs = this.classDrawerBtnArr[index].split("@")[1]
                    //console.log(regs)
                this.classIconName = this.classDrawerBtnArr[index];
                // console.warn(this.classIconName);
                // console.log("这个事件发生了...")
                // console.log(this.classIconName + "_s");
                //classicon@cloth@cloth@cloth_normal@normal_png_s
                //console.log("这个加了_s...") //目的加小按钮

                this.clothesLittleBtn.texture = PIXI.Texture.from(this.classIconName + "_s");
                this.clothesLittleBtn0.texture = PIXI.Texture.from(this.classIconName + "_s_click");

                self.setClothesDrawerArr.call(self, self._clothesObj[regs])
            }

        }
    }

    //展示ClassDrawer;
    showClassDrawer($callback = function() {}, $time = .3) {
        TweenMax.to(this.classDrawer, $time, {
            x: 0,
            onComplete: function() {
                $callback();
            }
        })
    }

    hideClassDrawer($callback = function() {}, $time = .3) {

        TweenMax.to(this.classDrawer, $time, {
            x: 218, //218
            onComplete: function() {
                $callback();
            }
        })
    }

    showclothesDrawer($callback = function() {}, $time = .3) {
        PIXI.sound.play("Slide_mp3");
        TweenMax.to(this.clothesDrawer, $time, {
            x: 0,
            onComplete: function() {
                $callback();
            }
        })
    }

    hideclothesDrawer($callback = function() {}, $time = .3) {
        PIXI.sound.play("Slide_mp3");
        TweenMax.to(this.clothesDrawer, $time, {
            x: 250, //600
            onComplete: function() {
                $callback();
            }
        })
    }
}

export default RightDrawer;