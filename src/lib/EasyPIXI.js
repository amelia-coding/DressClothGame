import * as PIXI from 'pixi.js'

class AnimeSprite extends PIXI.Container {
    constructor($animeResName) {
        super();
        this.animeResName = $animeResName;
        this.spriteImages = [];
        this.anime = null;
        this.App = null;
        this.on('added', this.initial, this)
    }
    initial() {
        let textures = PIXI.loader.resources[this.animeResName].textures;
        for (let i in textures) {
            let texture = PIXI.Texture.from(i);
            this.spriteImages.push(texture);
        }
        this.anime = new PIXI.extras.AnimatedSprite(this.spriteImages);
        this.addChild(this.anime)
    }
    getAnime() {
        return this.anime;
    }


}

class PIXIEffect {
    static install() {
        PIXI.Sprite.prototype.setEffectGrey = function($scale = 0.3, $bool = true) {
            let colorMatrix = new PIXI.filters.ColorMatrixFilter();
            this.filters = [colorMatrix];
            colorMatrix.greyscale($scale, $bool);
        }

        PIXI.Sprite.prototype.setEffectBright = function($scale = 0.5, $bool = true) {
            let colorMatrix = new PIXI.filters.ColorMatrixFilter();
            this.filters = [colorMatrix];
            colorMatrix.brightness($scale, $bool);
        }


        PIXI.Sprite.prototype.setEffectNone = function() {
            this.filters = [];

        }
    }


}
// class SceneManager {
//     static stage = null;
//     static scenes = [];
//     static currentScene = null;
//     static pushScene($name, $scene) {
//         for (let i = 0; i < SceneManager.scenes.length; i++) {
//             if (SceneManager.scenes[i].name === $name) {
//                 SceneManager.scenes.splice(i, 1);
//             }
//         }

//         SceneManager.scenes.push({
//             name: $name,
//             scene: $scene
//         })
//     }
//     static run($name) {
//         if (SceneManager.currentScene && SceneManager.currentScene.parent) {

//             SceneManager.currentScene.parent.removeChild(SceneManager.currentScene);

//             SceneManager.currentScene = null;
//         }

//         let myscene = null;

//         for (let i = 0; i < SceneManager.scenes.length; i++) {
//             if (SceneManager.scenes[i].name == $name) {
//                 myscene = SceneManager.scenes[i].scene;
//                 myscene["sceneName"] = $name;
//                 break;
//             }
//         }
//         if (SceneManager.stage && myscene) {
//             SceneManager.stage.removeChildren();

//             SceneManager.stage.addChild(myscene);

//         }
//         SceneManager.currentScene = myscene;


//     }
//     static hasScene($sceneName) {
//         var unique = SceneManager.scenes.some((item) => {
//             return item.name === $sceneName;
//         });
//         return unique;

//     }
//     static getCurrentScene() {
//         if (SceneManager.currentScene) {
//             return SceneManager.currentScene;
//         }

//     }
//     static destroyScene($name) {
//         for (let i = 0; i < SceneManager.scenes.length; i++) {
//             if (SceneManager.scenes[i].name == $name) {
//                 //SceneManager.scenes[i].scene.destroyed();
//                 SceneManager.scenes[i].scene.destroy();
//                 SceneManager.scenes[i].scene = null;
//                 SceneManager.scenes.splice(i, 1);
//             }
//         };
//     }

// }
class SceneManager {
    static currentScene = null;
    static stage = null;
    static stageArr = [];
    static run(sceneObj) {
        SceneManager.currentScene = sceneObj;
        SceneManager.stageArr.push(sceneObj);
        if (SceneManager.stageArr.length >= 2) {
            if (SceneManager.stageArr[0].removedFromStage) {
                SceneManager.stageArr[0].removedFromStage();
            }
            //console.log(SceneManager.stageArr[0])

            //SceneManager.stageArr[0].removeChildren(); //?????????????????????...
            SceneManager.stageArr[0].destroy();
            SceneManager.stageArr[0] = null;
            SceneManager.stageArr.shift();
            //?????????
        }
        SceneManager.stage.addChild(sceneObj);
    }
}
/**
 * ?????????????????????Garbage
 */
class Garbage {
    static poor = [];
    static setGarBage($name, $value) {
        let avalid = Garbage.poor.some((item) => {
            return item.name === $name;
        });
        if (!avalid) {
            Garbage.poor.push({
                name: $name,
                value: $value
            })
        }

    }
    static getGarBage($name) {
        let value = null;
        for (let i = 0; i < Garbage.poor.length; i++) {
            if (Garbage.poor[i].name && Garbage.poor[i].name === $name) {
                value = Garbage.poor[i].value;
                break;
            }
        }
        return value;
    }
    static clearGarBage($name) {
        for (let i = 0; i < Garbage.poor.length; i++) {
            if (Garbage.poor[i].name === $name) {
                Garbage.poor[i].name = null;
                Garbage.poor[i].value = null;
                Garbage.poor[i] = null;
                Garbage.poor.splice(i, 1);
            }
        }
    }

    static clearAllGarBage() {
        for (let i = 0; i < Garbage.poor.length; i++) {
            Garbage.poor[i] = null;
        }
        Garbage.poor.length = 0;
    }
}

/**
 * ????????????Vue??????????????????????????????Canvas???????????????Vue
 */


class Debugs {
    static locked = false;

    static log() {
        if (Debugs.locked) return;
        console.log.call(null, ...arguments)

    }
}
var Browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE??????
            presto: u.indexOf('Presto') > -1, //opera??????
            webKit: u.indexOf('AppleWebKit') > -1, //?????????????????????
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //????????????
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //?????????????????????
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios??????
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android??????
            iPhone: u.indexOf('iPhone') > -1, //?????????iPhone??????QQHD?????????
            iPad: u.indexOf('iPad') > -1, //??????iPad
            webApp: u.indexOf('Safari') == -1, //??????web????????????????????????????????????
            weixin: u.indexOf('MicroMessenger') > -1, //???????????? ???2015-01-22?????????
            qq: u.match(/\sQQ/i) == " qq" //??????QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}



export {
    Browser,
    Debugs,
    SceneManager,
    PIXIEffect,
    Garbage,
    AnimeSprite
};