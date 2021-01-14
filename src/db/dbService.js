import getGoogleSheetData from "./tabletop";

const DBService = {
    init: async () => {
        const googleSheetsData = await getGoogleSheetData();
        return googleSheetsData;
    }
}

export default DBService;