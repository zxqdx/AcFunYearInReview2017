const fs = require('fs');
const path = require('path');
const moment = require('moment');
const minify = require('html-minifier').minify;
const utility = require('./utility');
const STYLES = require('./constants').STYLES;

module.exports = (() => {
  let post = {
    overall: (items) => fs.writeFile(path.join(__dirname, "./output/", `${items.name}_${items.topCount}.html`), minify(`
      <div class="main-stage" style="width: ${STYLES.STAGE.WIDTH}; margin: 0 auto; padding: 0;">
        <div class="ranking-title" style="
            width: ${STYLES.STAGE.WIDTH}px; height: 36px; font-size: 36px; line-height: 36px; font-weight: bold;
            text-align: center; margin: 20px 0 20px 0; padding: 0 0 10px 0; font-family: ${STYLES.FONT_FAMILY};
            border-bottom: 1px dashed #ccc;
        ">
          AcFun${utility.notAChannel(items.name) ? items.name : (items.name + "区")} 2017年度热门投稿
          <span class="top-count" style="color: ${STYLES.POST.TITLE.HOVER};">
            Top${items.topCount}
          </span>
        </div>
        ${Object.entries(items.content).map((item, index) =>
          post.single(item[0], item[1], index, items.name, items.topCount)
        ).join("\n")}
      </div>
    `, {collapseWhitespace: true}), (err) => err ? console.error(err) : null),
    single: (title, item, index, topChannel, topCount) => `
      <div class="post" style="
        width: ${STYLES.POST.WIDTH}px; height: ${STYLES.POST.HEIGHT}px; margin: 10px 0 0 0; padding: 5px 0;
        font-family: ${STYLES.FONT_FAMILY};
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
    overall: (items) => {},
    single: (item, index) => `
      <div class="user">
        <div class="images">
          <a class="user-link" href="${utility.parseLink(item.user.link, 'http')}" target="_blank">
            <img class="user-avatar" src="">
          </a>
        </div>
        <div class="texts">
          <div class="title">
            #${index}/${topCount}&nbsp;
          </div>
          <div class="description"></div>
          <div class="data"></div>
        </div>
      </div>
  `
  };
  return {
    post: post,
    user: user
  }
})();