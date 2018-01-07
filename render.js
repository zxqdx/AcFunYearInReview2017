module.exports = {
  post: {
    overall: (item) => {
      // TODO: Implement
      return `
        <div>AcFun${item.name}区 2017年度热门投稿<span>Top${item.topCount}</span></div>
      `
    },
    single: (item) => {
      // TODO: Implement
      return `
        <div class="post">
          <div class="images">
            <img class="post-image" src="">
            <img class="user-avatar" src="">
          </div>
          <div class="texts">
            <div class="title"></div>
            <div class="description"></div>
            <div class="data"></div>
          </div>
        </div>
      `
    }
  },
  user: (item) => {
    // TODO: Implement
    return `
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
    `
  }
};