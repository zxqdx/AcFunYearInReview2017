const fs = require('fs');
const path = require('path');
const moment = require('moment');
const minify = require('html-minifier').minify;

module.exports = (() => {
  let post = {
    overall: (items) => fs.writeFile(path.join(__dirname, "./output/", `${items.name}_${items.topCount}.html`), minify(`
      <div>
        AcFun${items.name}区 2017年度热门投稿<span>Top${items.topCount}</span>
      </div>
      ${Object.entries(items.content).map((item, index) =>
        post.single(item[0], item[1], index, items.name, items.topCount)
      ).join("\n")}
    `, {collapseWhitespace: true}), (err) => err ? console.error(err) : null),
    single: (title, item, index, topChannel, topCount) => `
      <div class="post">
        <div class="images">
          <a class="post-link" href="${item.post.link}" target="_blank">
            <img class="post-image" src="${item.post.thumbnail}">
          </a>
          <a class="user-link" href="${item.user.link}" target="_blank">
            <img class="user-avatar" src="${item.user.avatar}">
          </a>
        </div>
        <div class="texts">
          <div class="title" title="${title}">
            #${index}/${topCount}&nbsp;
            <a class="post-link" href="${item.post.link}" target="_blank">
              ${item.post.title.map((part) => `
                <span class="box-${part.box}"
                  style="${part.box ? `border: 1px #fd4c5d ${part.box}` : ''}"
                >${part.text}</span>
              `).join("\n")}
            </a>
          </div>
          <div class="description">暂无简介</div>
          <div class="data">
            <div class="data-upper">
              <span class="user-name">
                <a class="user-link" href="${item.user.link}" target="_blank">${item.user.name}</a>
              </span>
              <span class="post-date">${moment(item.post.date).format("YYYY-MM-DD HH:MM:SS")}</span>
              <span class="post-channel">AcFun<span class="channel-text">${topChannel}</span>区${
                topChannel === item.post.channel ? "" : `下属<span class="channel-text">${item.post.channel}</span>区`
              }</span>
            </div>
            <div class="data-lower">
              点击<span class="data-text">${item.data.views}</span>&nbsp;
              评论<span class="data-text">${item.data.comments}</span>&nbsp;
              收藏<span class="data-text">${item.data.saves}</span>&nbsp;
              弹幕<span class="data-text">${item.data.danmakus}</span>&nbsp;
              香蕉<span class="data-text">${item.data.bananas}</span>&nbsp;
              <span class="trend" style="color: #2ab69d;">
                趋势得分<span class="data-text trend-text">${item.data.score}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    `
  };
  let user = (item) => `
    <div class="user">
      <div class="images">
        <img class="user-avatar" src="">
      </div>
      <div class="texts">
        <div class="title"></div>
        <div class="description"></div>
        <div class="data"></div>
      </div>
    </div>
  `;
  return {
    post: post,
    user: user
  }
})();