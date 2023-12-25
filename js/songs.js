export let songsLibrary = [];

import { fetchSongsData } from "./upload.js";
import { loadWebContent } from "./reload-page.js";

export async function loadSongsLibrary() {
    songsLibrary = await fetchSongsData();
    console.log('songsLibrary:', songsLibrary);
    loadWebContent();
}

// export const songsLibrary = [
//   {
//     id: "000",
//     image: "images/First person shooter.webp",
//     title: "First Person Shooter",
//     singer: "Drake ft. J. Cole",
//     audio: "audio/First Person Shooter.mp3",
//     type: "englishpop",
//     views: 21
//   },{
//     id: "001",
//     image: "images/披星戴月的想你.jpg",
//     title: "披星戴月的想你",
//     singer: "告五人",
//     audio: "audio/披星戴月的想你-告五人.mp3",
//     type: "mandopop",
//     views: 15
//   },{
//     id: "002",
//     image: "images/突然好想你.jpg",
//     title: "突然好想你",
//     singer: "五月天",
//     audio: "audio/突然好想你-五月天.mp3",
//     type: "mandopop",
//     views: 3
//   },{
//     id: "003",
//     image: "images/LMF.jpg",
//     title: "LMF",
//     singer: "POPO J",
//     audio: "audio/LMF-POPO J.mp3",
//     type: "mandopop",
//     views: 9
//   },{
//     id: "004",
//     image: "images/唯一.jpg",
//     title: "唯一",
//     singer: "G.E.M. 鄧紫棋",
//     audio: "audio/唯一-G.E.M. 鄧紫棋.mp3",
//     type: "mandopop",
//     views: 47
//   },{
//     id: "005",
//     image: "images/閣愛你一擺.jpg",
//     title: "閣愛你一擺",
//     singer: "茄子蛋",
//     audio: "audio/閣愛妳一擺-茄子蛋.mp3",
//     type: "mandopop",
//     views: 11
//   },{
//     id: "006",
//     image: "images/好不容易.jpg",
//     title: "好不容易",
//     singer: "告五人",
//     audio: "audio/好不容易-告五人.mp3",
//     type: "mandopop",
//     views: 8
//   },{
//     id: "007",
//     image: "images/without you.jpg",
//     title: "Without You",
//     singer: "高爾宣OSN",
//     audio: "audio/Without You.mp3",
//     type: "mandopop",
//     views: 27
//   },{
//     id: "008",
//     image: "images/cruel summer.jpg",
//     title: "Cruel Summer",
//     singer: "Taylor Swfit",
//     audio: "audio/Cruel Summer.mp3",
//     type: "englishpop",
//     views: 51
//   },{
//     id: "009",
//     image: "images/one of your girls.jpg",
//     title: "One of Your Girls",
//     singer: "Troye Sivan",
//     audio: "audio/One of Your Girls.mp3",
//     type: "englishpop",
//     views: 22
//   },{
//     id: "010",
//     image: "images/想和你看五月的晚霞.jpg",
//     title: "想和你看五月的晚霞",
//     singer: "陳華",
//     audio: "audio/想和你看五月的晚霞.mp3",
//     type: "mandopop",
//     views: 46
//   },{
//     id: "011",
//     image: "images/嘉宾_张远.jpg",
//     title: "嘉宾",
//     singer: "张远",
//     audio: "audio/張遠-嘉賓.mp3",
//     type: "mandopop",
//     views: 82
//   },{
//     id: "012",
//     image: "images/終究還是因為愛.jpg",
//     title: "終究還是因為愛",
//     singer: "TRASH",
//     audio: "audio/終究還是因為愛-TRASH.mp3",
//     type: "mandopop",
//     views: 27
//   },{
//     id: "013",
//     image: "images/I Like me better.jpg",
//     title: "I Like Me Better",
//     singer: "Lauv",
//     audio: "audio/I Like Me Better-Lauv.mp3",
//     type: "englishpop",
//     views: 72
//   },{
//     id: "014",
//     image: "images/too much.webp",
//     title: "TOO MUCH",
//     singer: "The Kid LAROI, Jung Kook, Central Cee",
//     audio: "audio/TOO MUCH.mp3",
//     type: "englishpop",
//     views: 46
//   }
// ]