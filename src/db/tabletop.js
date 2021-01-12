import tableTop from "tabletop";

const publicGoogleSheets = "https://docs.google.com/spreadsheets/d/11NqcF7C-FQtIf05DMV2fRNeiaWFCT3EaDi3t4ygR8Qo/edit?usp=sharing"

const getGoogleSheetData = async () => {
    try {
        const data = await tableTop.init({
            key: publicGoogleSheets,
        })
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

export default getGoogleSheetData;
