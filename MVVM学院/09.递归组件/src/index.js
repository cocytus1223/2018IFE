// 引入全局css
import style from "./main.css";
// san, san-router与san的组件
import san from "san";
import {router} from "san-router";
import App from "./Components/App.san";

router.add({rule: '/', Component: App, target: '#app'});
router.start();
console.log('Server starts.');