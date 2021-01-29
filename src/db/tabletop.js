import tableTop from "tabletop";

const publicGoogleSheets = process.env.REACT_APP_PUBLIC_GOOGLE_SHEETS;

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
