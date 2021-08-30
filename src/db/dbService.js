import getGoogleSheetData from "./googleSheetsFetcher";

const DBService = {
    init: async () => {
        const googleSheetsData = await getGoogleSheetData();
        return googleSheetsData;
    }
}

export default DBService;