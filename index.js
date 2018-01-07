const tasks = {
  topPosts: require('./tasks/top_posts'),
};
const render = require('./render');

// tasks.topPosts().then((result) => console.log(JSON.stringify(result)));
tasks.topPosts().then((result) => Object.values(result).map((v) => render.post.overall(v)));