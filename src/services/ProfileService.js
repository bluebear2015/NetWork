import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ProfileService {
    async getProfileById(id) {
        const res = await api.get('api/profiles/' + id)
        logger.log(res.data)
        AppState.activeProfile = new Profile(res.data)
    }
    async changePage(url) {
        const res = await api.get(url);
        // logger.log(res.data);
        AppState.posts = res.data.posts;
        AppState.previousPageUrl = res.data.older;
        AppState.nextPageUrl = res.data.newer;
    }




}


export const profileService = new ProfileService()