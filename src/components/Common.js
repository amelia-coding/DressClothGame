import * as PIXI from 'pixi.js'

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
    $pivotX && ($name.pivot.x = ($name.width) / 2);
    $pivotY && ($name.pivot.y = $name.height);
    $addChild && $this.addChild($name);
    return $name;
}

// this.ScreenTextSpine = new PIXI.spine.Spine(PIXI.loader.resources["ScreenText_spine"].spineData)
// this.ScreenTextSpine.state.setAnimation(0, "start", false);
// this.ScreenTextSpine.state.tracks[0].listener = {
//     complete: () => {
//         this.ScreenTextSpine.state.setAnimation(0, "normal", true)
//     }
// }
// this.ScreenTextSpine.x = 1000;
// this.ScreenTextSpine.y = 140;
// this.addChild(this.ScreenTextSpine);
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
}

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
}

function createdStyle({
    $name = {},
    $fontFamily = "Arial",
    $fontSize = 35,
    $fill = "#84653A",
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
}
export {
    createdSprite,
    createdText,
    createdStyle,
    createdSpine,
}