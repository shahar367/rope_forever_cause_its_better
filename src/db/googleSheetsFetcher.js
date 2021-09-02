import tableTop from "tabletop";
// import SHEETS_NAMES from "./sheetsNames";
import TRICKS_COLUMN_NAMES from "./tricksColumnNames";
// import fetch from 'isomorphic-fetch';
import axios from "axios";

const publicGoogleSheetsTricksSheet = process.env.REACT_APP_PUBLIC_GOOGLE_SHEETS_TRICKS_SHEET;

const getGoogleSheetData = async () => {
    try {
        let fetcher = await axios.get(publicGoogleSheetsTricksSheet, { Headers: { 'Access-Control-Allow-Origin': '*' } })
        console.log(fetcher.data);
        let fetchData = await fetcher.data;
        let headers = fetchData.values[0];
        let data = [...fetchData.values.splice(1, fetchData.values.length)].map((element) => elementBuilder(headers, element));
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err);
    }
}

const elementBuilder = (headers, element) => {
    let fullElement = {};
    for (let index = 0; index < headers.length; index++) {
        let currentHeader = headers[index];
        fullElement = {
            ...fullElement,
            [currentHeader]: element[index]
        }
    }
    fullElement = ((element) => {
        if (TRICKS_COLUMN_NAMES.filmed in element) element[TRICKS_COLUMN_NAMES.filmed] = ToBoolean(element[TRICKS_COLUMN_NAMES.filmed])
        Object.values(TRICKS_COLUMN_NAMES.filters).forEach(filter => {
            if (filter in element) element[filter] = ToBoolean(element[filter])
        })
        if (TRICKS_COLUMN_NAMES.link in element) element[TRICKS_COLUMN_NAMES.link] = MakeEmbeded(element[TRICKS_COLUMN_NAMES.link])
        return element;
    })(fullElement);
    return fullElement;
}

const ToBoolean = (value) => {
    if (typeof value === "string") {
        return Boolean(value.trim().length > 0)
    }
}

const MakeEmbeded = (link) => {
    if (link.includes('youtu.be/')) return link.replace('youtu.be/', 'www.youtube.com/embed/');
    return link;
}

export default getGoogleSheetData;

        // const data = await tableTop.init({
        //     key: publicGoogleSheets,
        //     singleton: true,
        //     parseNumbers: true,
        //     postProcess: (element) => {
        //         if (TRICKS_COLUMN_NAMES.filmed in element) element[TRICKS_COLUMN_NAMES.filmed] = ToBoolean(element[TRICKS_COLUMN_NAMES.filmed])
        //         Object.values(TRICKS_COLUMN_NAMES.filters).forEach(filter => {
        //             if (filter in element) element[filter] = ToBoolean(element[filter])
        //         })
        //         if (TRICKS_COLUMN_NAMES.link in element) element[TRICKS_COLUMN_NAMES.link] = MakeEmbeded(element[TRICKS_COLUMN_NAMES.link])
        //     }
        // })
        // return data;