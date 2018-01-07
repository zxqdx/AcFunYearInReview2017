const constants = require('../constants');
const path = require('path');
const Excel = require('exceljs');

module.exports = function () {
    let workbook = new Excel.Workbook();
    workbook.xlsx.readFile(path.join(__dirname, '../local/top_posts.xlsx')).then(() => {
        workbook.eachSheet((worksheet, sheetId) => {
            let wsName = worksheet.name;
            if (worksheet.name === constants.WS_NAMES.POSTS_OVERALL) {
                // TODO: Overall Ranking


            } else {
                // TODO: Ranking by Channel

            }
        });
    });
};
