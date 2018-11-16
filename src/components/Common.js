import * as PIXI from 'pixi.js'


function createdSound({
    $name = "sound",
    $alias = "PlayGameBg_mp3",
    $loop = false,
    $start = 0,
    $volume = 1,
}) {
    $name = PIXI.sound.play($alias, {
        start: $start,
        loop: $loop,
    });
    $name.volume = $volume;
    return $name;
}

function createdSprite({
    $this = self,
    $name = {},
    $alias,
    $x = 0,
    $y = 0,
    $anchor = 0,
    $scale = 1,
    $pivotY = false,
    $pivotX = false,
    $visible = true,
    $interactive = false,
    $buttonMode = false,
    $addChild = true

} = {}) {
    $name = new PIXI.Sprite(PIXI.loader.resources[$alias].texture); //创建精灵
    $name.position.set($x, $y);
    $name.visible = $visible;
    $name.interactive = $interactive;
    $name.buttonMode = $buttonMode;
    $name.scale.set($scale);
    $name.anchor.set($anchor);
    $pivotX && ($name.pivot.x = ($name.width) / 6);
    $pivotY && ($name.pivot.y = ($name.height) / 6);
    $addChild && $this.addChild($name);
    return $name;
}
class commonBg {
    constructor({
        _this = self,
    }) {
        this.BackButtonNormal = createdSprite({
            $this: _this,
            $alias: "IndoorBackButtonNormal_png",
            $interactive: true,
            $buttonMode: true,
            $x: 85,
            $y: 41,
        });
        this.BackButtonClick = createdSprite({
            $this: _this,
            $alias: "IndoorBackButtonClick_png",
            $interactive: true,
            $buttonMode: true,
            $x: 85,
            $y: 41,
            $visible: false,
        });
    }

}

function createdSpine({
    $this = self,
    $name = {},
    $alias = "",
    $x = 0,
    $y = 0,
    $animation0Name = "",
    $animation0Loop = true,
    $secondAnimation = false,
    $animation1Name = "",
    $animation1Loop = false,
    $interactive = false,
    $buttonMode = false,
    $visible = true,
    $addChild = true,
} = {}) {
    $name = new PIXI.spine.Spine(PIXI.loader.resources[$alias].spineData)
    $name.state.setAnimation(0, $animation0Name, $animation0Loop);
    $name.x = $x;
    $name.y = $y;
    $name.interactive = $interactive;
    $name.buttonMode = $buttonMode;
    $name.visible = $visible;
    if ($secondAnimation) {
        console.log($name)
        console.log("$name")
        $name.state.tracks[0].listener = {
            complete: () => {
                $name.state.setAnimation(0, $animation1Name, $animation1Loop)
            }
        }
    }
    $addChild && ($this.addChild($name));
    return $name;
};

function createdText({
    $this = self,
    $name = {},
    $text = "测试使用",
    $x = 0,
    $y = 0,
    $style = {},
    $addChild = true,
} = {}) {
    $name = new PIXI.Text($text, $style);
    $name.x = $x;
    $name.y = $y;
    $addChild && $this.addChild($name);
    return $name
};

function createdStyle({
    $name = {},
    $fontFamily = "Arial",
    $fontSize = 40,
    $fill = "#773B28",
    $lineHeight = 58,
    $fontWeight = "normal"
} = {}) {
    $name = new PIXI.TextStyle({
        fontFamily: $fontFamily,
        fontSize: $fontSize,
        fill: $fill,
        lineHeight: $lineHeight,
        fontWeight: $fontWeight,
    })
    return $name
};

function takeoffSingleCloth($slotName) {
    //this.GirlSpine.skeleton.findSlot($slotName).setAttachment(null);//女孩
    //this.BoySpine.skeleton.findSlot($slotName).setAttachment(null); //男孩
    this.SelectSpine.skeleton.findSlot($slotName).setAttachment(null)
};

function getSlotAndAttacetment(clothDetailName) {
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
    //console.log(this.allSlotName);
    //console.log("this.allSlotName...")
};

function changeDress() {
    //第一步 获取插槽
    //第二步 获取插槽具体的位置
    //第三步 获取插槽需要的附件
    //第四步 把附件放到插槽上去...
    //第一步 获取插槽
    //// this.allSlotName[this.ClothDetail.SlotName] = clothDetailName;
    //console.log(this.allSlotName);
    //console.log("this.allSlotName...")
    let self = this;
    if (self.ClothDetail.Gender == "Girl" && self.ClothDetail.Cloth == "dress") {
        // self.getSlotAndAttacetment("Girl@trousers@trousers@trousers_normal@noraml_png");
        (self.ClothDetail.AttacetmentName == "republic") && self.takeoffSingleCloth("trousers"); //console.log("先脱Bug的衣服...") //这个是解决的是衣服中有一个阴影

    }
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
};
class DialogCommon {
    constructor() {
        this.DialogContainer = new PIXI.Container();
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
            $x: 580,
            $y: 372,
            $text: "已经玩儿很长时间了，让眼睛休息一下吧",
            $style: this.DialogTextStyle
        });
        this.DialogGoodButtonNormal = createdSprite({
            $this: this.DialogContainer,
            $alias: "DialogGoodNormal_png",
            $x: 800,
            $y: 644,
            $interactive: true,
            $buttonMode: true
        }).on("pointerdown", this.DialogGoodButtonNormalEvent = () => {
            this.DialogGoodButtonNormal.visible = false;
            this.DialogGoodButtonClick.visible = true;

        });
        this.DialogGoodButtonClick = createdSprite({
            $this: this.DialogContainer,
            $alias: "DialogGoodClick_png",
            $x: 800,
            $y: 644,
            $interactive: true,
            $buttonMode: true,
            $visible: false
        });
    }

}
export {
    createdSound,
    createdBgSound,
    createdSprite,
    createdText,
    createdStyle,
    createdSpine,
    commonBg,
    DialogCommon,
    takeoffSingleCloth,
    getSlotAndAttacetment,
    changeDress

}