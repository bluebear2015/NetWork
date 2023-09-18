import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";





class AdService {


    async getAds() {
        const ads = await api.get('/api/ads');
        logger.log(ads.data);
        AppState.ads = ads.data
        return (ads.data);
    }
}

export const adService = new AdService();