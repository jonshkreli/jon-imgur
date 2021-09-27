import axios from "axios";
import {local_server_url} from "../constants/API_constants";
import {SECTION, SORT, WINDOW} from "../constants/queryParameters";

export const getGallery = async ({section = SECTION.hot, sort, page, window, showViral, mature, album_previews}) => {
    let url = `/gallery/${section}`
    if(sort) {
        url += `/${sort}`
    }
    if(window) {
        if(sort === undefined) { //if sort is not defined add the default to it because window must come next
            url += `/${SORT.viral}`
        }
        url += `/${window}`
    }
    if(page) {
        if(sort === undefined) { //sort and window must come before page
            url += `/${SORT.viral}`
        }
        if(window === undefined) {
            url += `/${WINDOW.day}`
        }
        url += `/${page}`
    }

    if(showViral || mature || album_previews) { //we have some query params
        url += "?"
    }

    if(showViral) {
        url += `showViral=${showViral}&`
    }

    try {
        return (await httpCallL(url)).data.data
    } catch (e) {
        console.error(e)
        return []
    }
}

const httpCallL = (url) => {
   return axios.get(local_server_url + url)
    // return blueTagResponse
}




