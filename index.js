const tasks = {
  topPosts: require('./tasks/top_posts'),
};
utility = require('./utility');

tasks.topPosts().then((result) => console.log(JSON.stringify(result)));