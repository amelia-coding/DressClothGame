<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <div id = "pixigame" ref = "gameMain">

    </div>
  </div>
</template>

<script>
import { SceneManager, Garbage } from "./lib/EasyPIXI.js";
import HomePages from "./components/Home0Pages.js";
import HomeGamePlay from "./components/Home1GamePlay.js";
import HomeTransform from "./components/Home2Transform.js";
import Home3Scene from "./components/Home3Scene.js";
var CanvasApp;
export default {
  name: "App",
  data() {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  beforeCreate() {
    PIXI.utils.skipHello();
  },
  computed: {},
  mounted() {
    this.createCanvasApp();
  },
  methods: {
    createCanvasApp() {
      //console.log("游戏开始执行...");
      let self = this;
      //设置基本样式开始
      CanvasApp = new PIXI.Application({
        width: 1920,
        height: 1080
      });
      CanvasApp.view.style.position = "relative";
      CanvasApp.view.style.width = "100%";
      CanvasApp.view.style.height = "100%";
      this.$refs.gameMain.appendChild(CanvasApp.view);
      //基本样式结束
      //开始加载游戏需要的资源
      SceneManager.App = CanvasApp;
      SceneManager.stage = CanvasApp.stage;
      this.gameStart().then(() => {
        //console.log("开始加载首页...");
        //测试使用
        SceneManager.run(new HomePages());
        //SceneManager.run(new HomeGamePlay());
        //SceneManager.run(new HomeTransform());
        //SceneManager.run(new Home3Scene());
      });
    },
    async gameStart() {
      await this.getPromise_resource();
      //这是网路缓慢弹窗事件
      document
        .getElementsByClassName("gameLoadingContainer")[0]
        .parentNode.removeChild(
          document.getElementsByClassName("gameLoadingContainer")[0]
        );

      if (document.getElementById("netbadbackground")) {
        document
          .getElementById("netbadbackground")
          .parentNode.removeChild(document.getElementById("netbadbackground"));
      }
      console.log("游戏资源加载完毕");
      //console.log("游戏资源加载完毕...");
    },
    getPromise_resource() {
      return new Promise(resolve => {
        //获取加载的
        //console.log("开始加载游戏资源");
        //加载换装系统
        self.axios.get("./ClothSystem.json").then(response => {
          //console.log(response);
          Garbage.clearGarBage("classicon");
          Garbage.setGarBage("classicon", response.data);
        });
        //开始加载游戏的全部资源
        self.axios.get("./GameResource.json").then(response => {
          PIXI.loader
            .add(response.data)
            .on("progress", loader => {
              if (document.getElementById("loadingPosition")) {
                document.getElementById("ProMid").style.width =
                  loader.progress * 0.0495 + 0.3 + "rem";
                document.getElementById("ProLef").style.left =
                  loader.progress * 2.472 + 48.8 + "%";
              }
            })
            .load(() => {
              resolve();
            });
        });
      });
    }
  }
};
</script>

<style >
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
#app {
  position: absolute;
  width: 19.2rem;
  height: 10.8rem;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
html,
div {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* overflow: hidden; */
}
</style>
