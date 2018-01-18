const fs = require('fs');
const path = require('path');
const moment = require('moment');
const minify = require('html-minifier').minify;
const utility = require('./utility');
const STYLES = require('./constants').STYLES;
const WS_NAMES = require('./constants').WS_NAMES;
const COL_NAMES = require('./constants').COL_NAMES;

module.exports = (() => {
  let post = {
    overall: (items) => fs.writeFile(path.join(__dirname, "./output/", `${items.name}_${items.topCount}.html`), minify(`
    <html lang="en">
    <head><meta charset="utf-8"></head>
    <body>
      <div class="main-stage" style="width: ${STYLES.STAGE.WIDTH}; margin: 0 auto; padding: 0;">
        <div class="ranking-title" style="
            width: ${STYLES.STAGE.WIDTH}px; height: 36px; font-size: 36px; line-height: 36px; font-weight: bold;
            text-align: center; margin: 20px 0 20px 0; padding: 0 0 10px 0; font-family: ${STYLES.FONT_FAMILY};
            border-bottom: 1px dashed #ccc;
        ">
          AcFun${
            utility.notAChannel(items.name) ? (items.name === WS_NAMES.POSTS_OVERALL ? "全站" : items.name) : (items.name + "区")
          } 2017年度热门投稿
          <span class="top-count" style="color: ${STYLES.POST.TITLE.HOVER};">
            Top${items.topCount}
          </span>
        </div>
        ${Object.entries(items.content).map((item, index) =>
          post.single(item[0], item[1], index, items.name, items.topCount)
        ).join("\n")}
      </div>
    </body></html>
    `, {collapseWhitespace: true}), (err) => err ? console.error(err) : null),
    single: (title, item, index, topChannel, topCount) => `
      <div class="post" style="
        width: ${STYLES.POST.WIDTH}px; height: ${STYLES.POST.HEIGHT}px; margin: 10px 0 0 0; padding: 5px 0;
        font-family: ${STYLES.FONT_FAMILY}; overflow: hidden;
      ">
        <div class="images" style="width: 240px; height: 135px; float: left;">
          <a class="post-link" href="${utility.parseLink(item.post.link, 'http')}" target="_blank">
            <img class="post-image" src="${item.post.thumbnail}" width="240px" height="135px">
          </a>
          <a class="user-link" href="${utility.parseLink(item.user.link, 'http')}" target="_blank" style="
            position: relative; top: -40px; left: 202px;
          ">
            <img class="user-avatar" src="${item.user.avatar}" width="36px" height="36px" style="
              border-radius: 50%;
              -webkit-box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
              -moz-box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
              box-shadow: 0 0 6px 0 rgba(0,0,0,0.5);
            ">
          </a>
        </div>
        <div class="texts" style="width: 710px; height: 135px; float: left; margin: 0 0 0 10px; padding: 0;">
          <div class="title" title="${title}" style="font-size: 20px; font-weight: bold; height: 28px; overflow: hidden;">
            <span class="post-rank" style="
              color: ${STYLES.POST.TITLE.HOVER}; font-size: 24px;
            ">#${index + 1}</span>/${topCount}&nbsp;
            <a class="post-link" href="${utility.parseLink(item.post.link, 'http')}" target="_blank" style="
              text-decoration: none; color: ${STYLES.POST.TITLE.COLOR};
            "
              onmouseover="this.style.color='${STYLES.POST.TITLE.HOVER}';"
              onmouseout="this.style.color='${STYLES.POST.TITLE.COLOR}';">
              ${item.post.title.map((part) => `
                <span class="box-${part.box}"
                  style="${part.box ? `border: 1px ${STYLES.POST.TITLE.HOVER} ${part.box}` : ''}"
                  ${part.box ? `
                    onmouseover="this.style.color='white'; this.style.backgroundColor='${
                      part.box === "solid" ? STYLES.POST.TITLE.HOVER : "rgba(253, 76, 93, 0.75)"
                    }';"
                    onmouseout="this.style.color='inherit'; this.style.backgroundColor='inherit';"
                  ` : ""}
                >${part.text}</span>
              `).join("\n")}
            </a>
          </div>
          <div class="description" style="
            color: ${STYLES.POST.DESC.COLOR}; font-size: 15px; line-height: 20px; margin-top: 6px; margin-bottom: 10px;
            height: 60px; overflow: hidden;
          ">
            ${item.post.desc}
          </div>
          <div class="data" style="
            font-size: 14px; line-height: 16px; color: ${STYLES.POST.DATA.COLOR}; letter-spacing: 0.2px;
          ">
            <div class="data-upper">
              <span class="user-name">
                <a class="user-link" href="${utility.parseLink(item.user.link, 'http')}" target="_blank" style="
                  text-decoration: none; color: ${STYLES.POST.DATA.HIGHLIGHT};
                ">${item.user.name}</a>
              </span>
              <span class="post-date">${moment(item.post.date).format("YYYY-MM-DD HH:MM:SS")}</span>
              <span class="post-channel">
                AcFun<span class="channel-text">${utility.notAChannel(topChannel) ? `${item.post.channel}</span>区` : `${topChannel}</span>区${
                  topChannel === item.post.channel ? "" :
                    `下属<span class="channel-text">${item.post.channel}</span>区`
                }</span>`}
            </div>
            <div class="data-lower">
              点击<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${item.data.views}</span>&nbsp;
              评论<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${item.data.comments}</span>&nbsp;
              收藏<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${item.data.saves}</span>&nbsp;
              弹幕<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${item.data.danmakus}</span>&nbsp;
              香蕉<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${item.data.bananas}</span>&nbsp;
              <span class="trend" style="color: ${STYLES.TREND.COLOR};">
                趋势得分<span class="data-text trend-text">${parseInt(item.data.score)}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `
  };
  let user = {
    overall: (items) => fs.writeFile(path.join(__dirname, "./output/", `蕉布斯榜.html`), minify(`
    <html lang="en">
    <head><meta charset="utf-8"></head>
    <body>
      <div class="main-stage" style="width: ${STYLES.STAGE.WIDTH}; margin: 0 auto; padding: 0;">
        <div class="ranking-title" style="
            width: ${STYLES.STAGE.WIDTH}px; height: 36px; font-size: 36px; line-height: 36px; font-weight: bold;
            text-align: center; margin: 20px 0 20px 0; padding: 0 0 10px 0; font-family: ${STYLES.FONT_FAMILY};
            border-bottom: 1px dashed #ccc;
        ">
          AcFun蕉布斯榜 2017年度UP主
          <span class="top-count" style="color: ${STYLES.POST.TITLE.HOVER};">
            Top${items.length}
          </span>
        </div>
        ${items.map((item, index) =>
          user.single(
            item[COL_NAMES.UP.USERNAME], item[COL_NAMES.UP.SIGNATURE], "http://" + item[COL_NAMES.UP.LINK],
            item[COL_NAMES.UP.AVATAR], item[COL_NAMES.UP.BANANA], index)
        ).join("\n")}
      </div>
    </body></html>
    `, {collapseWhitespace: true}), (err) => err ? console.error(err) : null),
    single: (username, signature, link, avatar, bananas, index) => {
      signature = signature.replace(/政策/g, "");
      if (index < 10) { // Template for Top 10
        return `
          <div class="up" style="
            width: ${STYLES.UP.TOP_10.WIDTH}px; height: ${STYLES.UP.TOP_10.HEIGHT}px; margin: 20px 0; padding: 10px 5px;
            font-family: ${STYLES.FONT_FAMILY}; float: left; overflow: hidden;
          ">
            <div class="images" style="float: left;">
              <a class="user-link" href="${link}" target="_blank" style="cursor: default;">
                <img class="user-avatar" src="${avatar}" width="120px" height="120px" style="
                  border-radius: 50%;
                  -webkit-box-shadow: 0 1px 8px 0 rgba(0,0,0,0.6);
                  -moz-box-shadow: 0 1px 8px 0 rgba(0,0,0,0.6);
                  box-shadow: 0 1px 8px 0 rgba(0,0,0,0.6);
                  cursor: pointer;
                ">
              </a>
            </div>
            <div class="texts" style="width: 600px; float: left; margin: 0 20px; padding: 0;">
              <div class="title" style="font-size: 28px; line-height: 28px; height: 28px">
                <a href="${link}" target="_blank" style="text-decoration: none; color: ${STYLES.POST.TITLE.COLOR};"
                  onmouseover="this.style.color='${STYLES.POST.TITLE.HOVER}';"
                  onmouseout="this.style.color='${STYLES.POST.TITLE.COLOR}';"
                >${username}</a>
              </div>
              <div class="description" style="
                font-size: 16px; line-height: 20px; padding: 6px 0 8px 0; height: 60px;
                color: ${STYLES.POST.DESC.COLOR}; overflow: hidden
              ">
                ${signature}
              </div>
              <div class="data" style="font-size: 14px; line-height: 16px; color: ${STYLES.POST.DATA.COLOR}; letter-spacing: 0.2px;">
                今年共获得了<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${bananas}</span>根香蕉
              </div>
            </div>
            <div class="rank" style="
              float: left; width: 180px; height: 120px; letter-spacing: -10px; font-size: 92px;
              text-align: right; color: ${STYLES.UP.RANK.COLOR}; padding-top: 35px;
            ">
              #<span class="post-rank" style="
                color: ${STYLES.POST.TITLE.HOVER};
              ">${index + 1}</span>
            </div>
          </div>
        `;
      } else if (index < 100) { // Template for Top 100
        let usernameFontSize = username.length > 11 ? "20px" : "24px";
        return `
          <div class="up" style="
            width: ${STYLES.UP.TOP_100.WIDTH}px; height: ${STYLES.UP.TOP_100.HEIGHT}px; margin: 20px 0; padding: 10px 5px;
            font-family: ${STYLES.FONT_FAMILY}; float: left; overflow: hidden;
          ">
            <div class="images" style="float: left;">
              <a class="user-link" href="${link}" target="_blank" style="cursor: default;">
                <img class="user-avatar" src="${avatar}" width="90px" height="90px" style="
                  border-radius: 50%;
                  -webkit-box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  -moz-box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  cursor: pointer;
                ">
              </a>
            </div>
            <div class="texts" style="width: 340px; float: left; margin: 0 20px; padding: 0;">
              <div class="title" style="overflow: hidden;">
                <div class="up-rank" style="
                  font-size: 28px; line-height: 28px; height: 28px; width: 66px; color: ${STYLES.POST.TITLE.HOVER}; float: left;
                ">#${index + 1}</div>
                <div class="up-username" style="
                  font-size: ${usernameFontSize}; line-height: 28px; height: 28px; float: left;
                ">
                  <a href="${link}" target="_blank" style="text-decoration: none; color: ${STYLES.POST.TITLE.COLOR};"
                    onmouseover="this.style.color='${STYLES.POST.TITLE.HOVER}';"
                    onmouseout="this.style.color='${STYLES.POST.TITLE.COLOR}';"
                  >${username}</a>
                </div>
              </div>
              <div class="description" style="
                font-size: 16px; line-height: 20px; margin: 4px 0 6px 0; height: 40px;
                color: ${STYLES.POST.DESC.COLOR}; overflow: hidden; clear: both;
              ">${signature}</div>
              <div class="data" style="font-size: 14px; line-height: 16px; color: ${STYLES.POST.DATA.COLOR}; letter-spacing: 0.2px;">
                今年共获得了<span class="data-text" style="color: ${STYLES.POST.DATA.HIGHLIGHT};">${bananas}</span>根香蕉
              </div>
            </div>
          </div>
        `;
      } else { // Template for Top 1000
        let usernameFontSize = username.length > 6 ? "14px" : "16px";
        let title = `#${index + 1} ${username} 今年共获得了${bananas}根香蕉`;
        return `
          <div class="up" style="
            width: ${STYLES.UP.TOP_1000.WIDTH}px; height: ${STYLES.UP.TOP_1000.HEIGHT}px; margin: 0; padding: 10px 3px;
            font-family: ${STYLES.FONT_FAMILY}; float: left; overflow: hidden;
          ">
            <div class="images">
              <a class="user-link" href="${link}" target="_blank" style="cursor: default;">
                <img class="user-avatar" src="${avatar}" width="90px" height="90px" style="
                  border-radius: 50%;
                  -webkit-box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  -moz-box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  box-shadow: 0 1px 6px 0 rgba(0,0,0,0.6);
                  cursor: pointer;
                " title="${title}">
              </a>
            </div>
            <div class="texts" style="width: 96px; margin: 6px 0 0 0; padding: 0;">
              <div class="title" style="overflow: hidden;">
                <div class="up-username" style="
                  font-size: ${usernameFontSize}; line-height: 20px; height: 20px; text-align: center; word-break: break-all;
                ">
                  <a href="${link}" target="_blank" title="${title}" style="text-decoration: none; color: ${STYLES.UP.TITLE.COLOR};"
                    onmouseover="this.style.color='${STYLES.UP.TITLE.HOVER}';"
                    onmouseout="this.style.color='${STYLES.UP.TITLE.COLOR}';"
                  >${username}</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
  };
  return {
    post: post,
    user: user
  }
})();