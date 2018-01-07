const constants = require('../constants');
const utility = require('../utility');
const path = require('path');
const Excel = require('exceljs');

module.exports = function () {
  let workbook = new Excel.Workbook();
  /*
   * channel ->
   *   [
   *     {title ->
   *       {post properties}
   *     }
   *   ]
   */
  let result = {};
  workbook.xlsx.readFile(path.join(__dirname, '../local/top_posts.xlsx')).then(() => {
    workbook.eachSheet((worksheet, sheetId) => {
      let wsName = worksheet.name.trim();
      /*
       * Overall Ranking: Top 500
       * Ranking by Channel: Top 100
       */
      let topCount = wsName === constants.WS_NAMES.POSTS_OVERALL ? 500 : 100;
      let channel = {};
      let shouldBreak = false;
      worksheet.eachRow((row, rowNumber) => {
        if (shouldBreak || Object.keys(channel).length >= topCount) {
          shouldBreak = true;
          return;
        }
        if (rowNumber === 1) { // Header
          colMap = {};
          for (let i = 0; i <= row.length; i++) {
            let colName = row[i];
            if (utility.stringNotEmpty(colName)) {
              colMap[colName] = i;
            }
          }
        } else { // Body
          let title = row[colMap[constants.COL_NAMES.POST.TITLE]].trim();
          if (!(channel.hasOwnProperty(title))) {
            channel[title] = {
              post: {
                title: utility.parsePostTitle(title),
                thumbnail: row[colMap[constants.COL_NAMES.POST.THUMBNAIL]].trim(),
                date: row[colMap[constants.COL_NAMES.POST.DATE]].trim(),
                channel: row[colMap[constants.COL_NAMES.POST.CHANNEL]].trim()
              },
              user: {
                name: row[colMap[constants.COL_NAMES.USER.NAME]].trim(),
                avatar: row[colMap[constants.COL_NAMES.USER.AVATAR]].trim(),
                link: row[colMap[constants.COL_NAMES.USER.LINK]].trim()
              },
              data: {
                comments: row[colMap[constants.COL_NAMES.DATA.COMMENTS]].trim(),
                views: row[colMap[constants.COL_NAMES.DATA.VIEWS]].trim(),
                danmakus: row[colMap[constants.COL_NAMES.DATA.DANMAKUS]].trim(),
                bananas: row[colMap[constants.COL_NAMES.DATA.BANANAS]].trim(),
                saves: row[colMap[constants.COL_NAMES.DATA.SAVES]].trim(),
                score: row[colMap[constants.COL_NAMES.DATA.SCORE]].trim()
              }
            }
          } else {
            console.log('Duplicated entry found: ' + wsName +  ' - ' + title);
          }
        }
      });
    });
  });
};
