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
                console.log()
                if (TRICKS_COLUMN_NAMES.filmed in element) element[TRICKS_COLUMN_NAMES.filmed] = ToBoolean(element[TRICKS_COLUMN_NAMES.filmed])
                Object.values(TRICKS_COLUMN_NAMES.filters).forEach(filter => {
                    if (filter in element) element[filter] = ToBoolean(element[filter])
                })
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
        return Boolean(value.trim().length > 0)
    } else {
        return
    }
}

export default getGoogleSheetData;
