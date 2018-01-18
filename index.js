const tasks = {
  topPosts: require('./tasks/top_posts'),
  topUps: require('./tasks/top_ups')
};
const render = require('./render');
const constants = require('./constants');

// tasks.topPosts().then((result) => console.log(JSON.stringify(result)));
tasks.topPosts(constants.XLSX_NAMES.TOP_POSTS).then((result) => Object.values(result).map((v) => render.post.overall(v)));
tasks.topPosts(constants.XLSX_NAMES.TOP_OTHERS).then((result) => Object.values(result).map((v) => render.post.overall(v)));

// tasks.topUps(constants.CSV_NAMES.TOP_BANANAS).then((result) => console.log(JSON.stringify(result)));
tasks.topUps(constants.CSV_NAMES.TOP_BANANAS).then((result) => render.user.overall(result));
