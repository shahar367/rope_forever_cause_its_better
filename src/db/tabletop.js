import tableTop from "tabletop";
// import SHEETS_NAMES from "./sheetsNames";
import TRICKS_COLUMN_NAMES from "./tricksColumnNames";

const publicGoogleSheets = process.env.REACT_APP_PUBLIC_GOOGLE_SHEETS;

const getGoogleSheetData = async () => {
    try {
        const data = await tableTop.init({
            key: publicGoogleSheets,
            parseNumbers: true,
            postProcess: (element) => {
                if (TRICKS_COLUMN_NAMES.filmed in element)
                    element[TRICKS_COLUMN_NAMES.filmed] = ToBoolean(element[TRICKS_COLUMN_NAMES.filmed])
                if (TRICKS_COLUMN_NAMES.drops in element)
                    element[TRICKS_COLUMN_NAMES.drops] = ToBoolean(element[TRICKS_COLUMN_NAMES.drops])
                if (TRICKS_COLUMN_NAMES.climbing in element)
                    element[TRICKS_COLUMN_NAMES.climbing] = ToBoolean(element[TRICKS_COLUMN_NAMES.climbing])
                if (TRICKS_COLUMN_NAMES.positions in element)
                    element[TRICKS_COLUMN_NAMES.positions] = ToBoolean(element[TRICKS_COLUMN_NAMES.positions])
                if (TRICKS_COLUMN_NAMES.swings in element)
                    element[TRICKS_COLUMN_NAMES.swings] = ToBoolean(element[TRICKS_COLUMN_NAMES.swings])
                if (TRICKS_COLUMN_NAMES.dismount in element)
                    element[TRICKS_COLUMN_NAMES.dismount] = ToBoolean(element[TRICKS_COLUMN_NAMES.dismount])
                if (TRICKS_COLUMN_NAMES.transitions in element)
                    element[TRICKS_COLUMN_NAMES.transitions] = ToBoolean(element[TRICKS_COLUMN_NAMES.transitions])
                if (TRICKS_COLUMN_NAMES.lasso in element)
                    element[TRICKS_COLUMN_NAMES.lasso] = ToBoolean(element[TRICKS_COLUMN_NAMES.lasso])
                if (TRICKS_COLUMN_NAMES.other in element)
                    element[TRICKS_COLUMN_NAMES.other] = ToBoolean(element[TRICKS_COLUMN_NAMES.other])
                if (TRICKS_COLUMN_NAMES.tishu in element)
                    element[TRICKS_COLUMN_NAMES.tishu] = ToBoolean(element[TRICKS_COLUMN_NAMES.tishu])
                if (TRICKS_COLUMN_NAMES.force in element)
                    element[TRICKS_COLUMN_NAMES.force] = ToBoolean(element[TRICKS_COLUMN_NAMES.force])
            }
        })
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

const ToBoolean = (value) => {
    if (typeof value === "string") {
        return Boolean(value.toLocaleLowerCase().indexOf('x') !== -1)
    } else {
        return
    }
}

export default getGoogleSheetData;
