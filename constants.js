module.exports = {
  XLSX_NAMES: {
    TOP_POSTS: 'top_posts_with_desc.xlsx',
    TOP_OTHERS: 'top_others_with_desc.xlsx'
  },
  WS_NAMES: {
    POSTS_OVERALL: '总表去重',
    POSTS_IGNORED: '投稿简介'
  },
  COL_NAMES: {
    POST: {
      TITLE: '标题',
      THUMBNAIL: '封面图片地址',
      DATE: '上传时间',
      CHANNEL: '投稿频道',
      LINK: '视频地址',
      DESC: '简介'
    },
    USER: {
      NAME: '投稿用户昵称',
      AVATAR: '用户头像',
      LINK: '用户空间'
    },
    DATA: {
      COMMENTS: '评论数',
      VIEWS: '播放数',
      DANMAKUS: '弹幕数',
      BANANAS: '香蕉数',
      SAVES: '收藏数',
      SCORE: '视频得分'
    }
  },
  STYLES: {
    FONT_FAMILY: 'AcFun Symbol, Helvetica Neue, Helvetica, Arial, Microsoft Yahei, STHeiti,sans-serif',
    STAGE: {
      WIDTH: 960
    },
    POST: {
      WIDTH: 960,
      HEIGHT: 145,
      TITLE: {
        COLOR: '#333333',
        HOVER: '#fd4c5d',
        RANK: '#fd782e'
      },
      DESC: {
        COLOR: '#777777'
      },
      DATA: {
        COLOR: '#777777',
        HIGHLIGHT: 'black'
      }
    },
    TREND: {
      COLOR: '#2ab69d'
    }
  }
};