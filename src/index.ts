const gas: any = global;

type Result = { header: string[], values: any[][] }

gas.doGet = (e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput => {
  if (!e.parameter.sheet) {
    return responseJson({ errorMessage: 'Parameter [sheet] is empty.' });
  }

  const propPref = e.parameter.sheet.toUpperCase();
  const spreadSheet = SpreadsheetApp.openById(getProperty(`${propPref}_SPREAD_SHEET_ID`));
  const sheetName = getProperty(`${propPref}_SHEET_NAME`);
  const sheet = spreadSheet.getSheetByName(sheetName);
  if (!sheet) {
    return responseJson({ errorMessage: `Sheet [${sheetName}] is not found.` });
  }
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  const searchValue = e.parameter.search;
  const header = sheet.getRange(1, 1, 1, lastColumn).getValues()[0].map(h => String(h));
  const result: Result = {
    header: header,
    values: []
  };

  if (!searchValue) {
    // 全て取得
    const allRows = sheet.getRange(2, 1, lastRow - 1, lastColumn);
    for (const value of allRows.getValues()) {
      result.values.push(value);
    }

    return responseJson(result);
  }

  // 条件を指定して取得
  const searchColumn = Number(getProperty(`${propPref}_SEARCH_COLUMN`, '1'));
  let currentRow = 2;
  const searchRows = sheet.getRange(currentRow, searchColumn, lastRow - 1, 1);
  for (const values of searchRows.getValues()) {
    if (values[0] === searchValue) {
      const value = sheet.getRange(currentRow, 1, 1, lastColumn).getValues()[0];
      result.values.push(value);

      return responseJson(result);
    }
    currentRow++;
  }

  return responseJson(result);
};

function responseJson(data: any): GoogleAppsScript.Content.TextOutput {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getProperty(key: string, defaultValue?: string): string {
  const value = PropertiesService.getScriptProperties().getProperty(key);
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Undefined property: ${key}`);
}
