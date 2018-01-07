const constants = require('../constants');
const utility = require('../utility');
const path = require('path');
const Excel = require('exceljs');

module.exports = function () {
  return new Promise((resolve, reject) => {
    let workbook = new Excel.Workbook();
    workbook.xlsx.readFile(path.join(__dirname, '../local/', constants.XLSX_NAMES.TOP_POSTS)).then(() => {
      /*
       * channel ->
       *   [
       *     {title ->
       *       {post properties}
       *     }
       *   ]
       */
      let result = {};
      workbook.eachSheet((worksheet, sheetId) => {
        let wsName = worksheet.name.trim();
        /*
         * Overall Ranking: Top 500
         * Ranking by Channel: Top 100
         */
        let topCount = wsName === constants.WS_NAMES.POSTS_OVERALL ? 500 : 100;
        let channel = {};
        let shouldBreak = false;
        let colMap, colFunc;
        worksheet.eachRow((row, rowNumber) => {
          if (shouldBreak || Object.keys(channel).length >= topCount) {
            shouldBreak = true;
            return;
          }
          if (rowNumber === 1) { // Header
            colMap = {};
            row.eachCell({includeEmpty: true}, (col, colNumber) => {
              let colName = col.value;
              if (utility.stringNotEmpty(colName)) {
                colMap[colName] = colNumber;
              }
            });
            colFunc = (row, colName) => {
              let val = row.getCell(colMap[colName]).value;
              if (typeof val === 'string') {
                return val.trim();
              } else if (typeof val === 'object' && val.hasOwnProperty('sharedFormula')) {
                return val.result;
              }
              return val;
            };
          } else { // Body
            let title = colFunc(row, constants.COL_NAMES.POST.TITLE);
            if (!(channel.hasOwnProperty(title))) {
              channel[title] = {
                post: {
                  title: utility.parsePostTitle(title),
                  thumbnail: colFunc(row, constants.COL_NAMES.POST.THUMBNAIL),
                  date: colFunc(row, constants.COL_NAMES.POST.DATE),
                  channel: colFunc(row, constants.COL_NAMES.POST.CHANNEL)
                },
                user: {
                  name: colFunc(row, constants.COL_NAMES.USER.NAME),
                  avatar: colFunc(row, constants.COL_NAMES.USER.AVATAR),
                  link: colFunc(row, constants.COL_NAMES.USER.LINK)
                },
                data: {
                  comments: colFunc(row, constants.COL_NAMES.DATA.COMMENTS),
                  views: colFunc(row, constants.COL_NAMES.DATA.VIEWS),
                  danmakus: colFunc(row, constants.COL_NAMES.DATA.DANMAKUS),
                  bananas: colFunc(row, constants.COL_NAMES.DATA.BANANAS),
                  saves: colFunc(row, constants.COL_NAMES.DATA.SAVES),
                  score: colFunc(row, constants.COL_NAMES.DATA.SCORE)
                }
              }
            } else {
              console.log('Duplicated entry found: ' + wsName + ' - ' + title);
            }
          }
        });
        result[wsName] = channel;
      });
      resolve(result);
    });
  });
};
