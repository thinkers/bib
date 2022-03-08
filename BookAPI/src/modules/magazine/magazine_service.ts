import fetch from 'node-fetch';
import env from '../../environment';

const WP = env.getWPSettings();
const POSTTYPE_MAPPER = Object.values(env.getCustomPostTypes());
const TAXONOMIE_MAPPER = Object.values(env.getCustomTaxonomies());
// const FULL_MAPPER = POSTTYPE_MAPPER.concat(TAXONOMIE_MAPPER);


Object.defineProperty(Array.prototype, 'flat', {
    value: function (depth = 1) {

        return this.reduce(function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
        }, []);

    }
});

export default class MagazineService {

    protected Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    public async filterMagazines(query: any, callback: any) {
        try {

            let mappedResult = {};

            const tmpTaxonomies = this.getAllTaxonomies(query);

            let requests = [];
            for (let item of POSTTYPE_MAPPER) {
                if (query) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?_fields=" + query[item]).then((response: any) => response.text()));
                } else {
                    requests.push(fetch(WP['baseurl'] + "/" + item).then((response: any) => response.text()));
                }
            }

            if (env.getDebug()) {
                console.debug("filterMagazines: Amount of requests " + requests.length)
            }

            const body = await Promise.all(requests).catch(reason => {
                throw "filterMagazines: Error on filter all magazines " + reason
            });

            POSTTYPE_MAPPER.forEach(function (key, i) {
                return mappedResult[key] = JSON.parse(body[i]);
            });

            const taxonomies = await tmpTaxonomies;

            mappedResult['code'] = await taxonomies['code'];
            mappedResult['issue'] = await taxonomies['issue'];
            mappedResult['categories'] = await taxonomies['category'];
            mappedResult['thematics'] = await taxonomies['thematic'];
            mappedResult['magazine_product'] = await taxonomies['product'];

            callback(mappedResult);
        } catch (error: any) {
            callback({ "error": error });
        }
    }

    public async getMagazine(query: any, callback: any) {

        try {
            let mappedResult = {};

            let requests = [];
            for (let item of POSTTYPE_MAPPER) {
                if (Object.keys(query['exclude']).length) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "/" + query['id'] + "?_fields=" + query['exclude'][item]).then((response: any) => response.text()));
                } else {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "/" + query['id']).then((response: any) => response.text()));
                }
            }

            if (env.getDebug()) {
                console.debug("getMagazine: Amount of requests " + requests.length)
            }
            const body = await Promise.all(requests).catch(reason => {
                throw "getMagazine: Error on filter all magazines " + reason;
            });

            let tmpIssues = new Array<string>();
            let tmpCategories = new Array<string>();
            let tmpThematics = new Array<string>();
            let tmpProducts = new Array<string>();

            POSTTYPE_MAPPER.forEach(function (key, i) {
                let tmpBody = JSON.parse(body[i]);

                if (tmpBody['issue']) {
                    tmpIssues.push.apply(tmpIssues, tmpBody['issue'])
                }
                if (tmpBody['categories']) {
                    tmpCategories.push.apply(tmpCategories, tmpBody['categories'])
                }
                if (tmpBody['thematic']) {
                    tmpThematics.push.apply(tmpThematics, tmpBody['thematic'])
                }
                if (tmpBody['magazine_product']) {
                    tmpProducts.push.apply(tmpProducts, tmpBody['magazine_product'])
                }

                return mappedResult[key] = tmpBody;
            });

            const tmpTaxonomies = this.getAllTaxonomiesFor(query['exclude'], tmpIssues, tmpCategories, tmpThematics, tmpProducts);

            const taxonomies = await tmpTaxonomies;

            mappedResult['issue'] = await taxonomies['issue'];
            mappedResult['categories'] = await taxonomies['category'];
            mappedResult['thematics'] = await taxonomies['thematic'];
            mappedResult['magazine_product'] = await taxonomies['product'];


            callback(mappedResult);

        } catch (error: any) {
            callback({ "error": error });
        }
    }

    public async getSingleMagazine(type: string, query: any, callback: any) {

        try {
            let mappedResult = {};

            let requests = [];

            if (Object.keys(query['exclude']).length) {
                requests.push(fetch(WP['baseurl'] + "/" + type + "/" + query['id'] + "?_fields=" + query['exclude'][type]).then((response: any) => response.text()));
            } else {
                requests.push(fetch(WP['baseurl'] + "/" + type + "/" + query['id']).then((response: any) => response.text()));
            }

            if (env.getDebug()) {
                console.debug("getMagazine: Amount of requests " + requests.length)
            }
            const body = await Promise.all(requests).catch(reason => {
                throw "getMagazine: Error on filter all magazines" + reason;
            });

            let tmpIssues = new Array<string>();
            let tmpCategories = new Array<string>();
            let tmpThematics = new Array<string>();
            let tmpProducts = new Array<string>();

            let tmpBody = JSON.parse(body[0]);


            if (tmpBody['issue']) {
                tmpIssues.push.apply(tmpIssues, tmpBody['issue'])
            }
            if (tmpBody['categories']) {
                tmpCategories.push.apply(tmpCategories, tmpBody['categories'])
            }
            if (tmpBody['thematic']) {
                tmpThematics.push.apply(tmpThematics, tmpBody['thematic'])
            }
            if (tmpBody['magazine_product']) {
                tmpProducts.push.apply(tmpProducts, tmpBody['magazine_product'])
            }

            mappedResult[type] = tmpBody;


            const tmpTaxonomies = this.getAllTaxonomiesFor(query['exclude'], tmpIssues, tmpCategories, tmpThematics, tmpProducts);

            const taxonomies = await tmpTaxonomies;

            mappedResult['issue'] = await taxonomies['issue'];
            mappedResult['categories'] = await taxonomies['category'];
            mappedResult['thematics'] = await taxonomies['thematic'];
            mappedResult['magazine_product'] = await taxonomies['product'];


            callback(mappedResult);

        } catch (error: any) {
            callback({ "error": error });
        }
    }


    public async getIssue(query: any, callback: any) {

        if (env.getDebug()) {
            console.debug("getIssue: Amount of requests 1")
        }

        const response = await fetch(WP['baseurl'] + "/issue/" + query);

        try {
            const body = await response.json();
            callback(body);
        } catch (err) {
            throw "getIssue: Error retrieving Issue " + err
        }
    }


    private async getAllTaxonomiesHeaders(query: any) {
        let headers = [];
        let requests = [];
        for (let item of TAXONOMIE_MAPPER) {

            if (query && query[item]) {
                requests.push(fetch(WP['baseurl'] + "/" + item).then((response: any) => {
                    response = {
                        headers: response.headers,
                    };
                    return response;
                }));

            } else {
                requests.push(fetch(WP['baseurl'] + "/" + item).then((response: any) => {
                    response = {
                        headers: response.headers,
                    };
                    return response;
                }));
            }
        }

        const fullResponse = await Promise.all(requests).catch(reason => {
            throw "getAllTaxonomiesHeaders: Error on filter all magazines" + reason
        });

        TAXONOMIE_MAPPER.forEach(function (key, i) {
            if (query && query[key]) {
                return headers[key] = Math.ceil(fullResponse[i].headers.get('x-wp-total') / 100);
            } else {
                return headers[key] = Math.ceil(fullResponse[i].headers.get('x-wp-total') / 100);
            }
        });

        return headers;
    }

    private async getAllTaxonomies(query: any) {

        let headers = await this.getAllTaxonomiesHeaders(query);

        let mappedResult = {};
        let tmpResult = [];
        let requests = [];

        for (let item in headers) {
            if (query && query[item]) {
                let queryamount = headers[item];
                for (let i = 1; i <= queryamount; i++) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?per_page=100&page=" + i).then((response: any) => response.text()));
                }
            } else {
                let queryamount = headers[item];
                for (let i = 1; i <= queryamount; i++) {
                    requests.push(fetch(WP['baseurl'] + "/" + item + "?per_page=100&page=" + i).then((response: any) => response.text()));
                }
            }
        }

        if (env.getDebug()) {
            console.debug("getAllTaxonomies: Amount of requests " + requests.length)
        }

        const body = await Promise.all(requests).catch(reason => {
            throw "getAllTaxonomies: Error retrieving Issues" + reason
        });


        body.forEach(function (val, i) {
            tmpResult.push(JSON.parse(val));
        });

        tmpResult = tmpResult.flat();

        for (let i = 0; i < tmpResult.length; i++) {
            if (!mappedResult[tmpResult[i].taxonomy]) {
                mappedResult[tmpResult[i].taxonomy] = new Array();
            }
            mappedResult[tmpResult[i].taxonomy].push(tmpResult[i]);
        }

        return mappedResult;
    }

    private async getAllTaxonomiesFor(query: any, tmpIssues: any, tmpCategories: any, tmpThematics: any, tmpProducts: any) {
        let mappedResult = {};
        let tmpResult = [];

        if (Object.keys(query).length == 0) {
            query.issue = true;
            query.categories = true;
            query.thematic = true;
            query.magazine_product = true;
        }

        if (query.issue || query.categories || query.thematic || query.magazine_product) {
            await this.Sleep(450);
        }

        let requests = [];
        if (query.issue) {
            for (let issue of tmpIssues) {
                requests.push(fetch(WP['baseurl'] + "/issue/" + issue).then((response: any) => response.text()));
            }
        }
        if (query.categories) {
            for (let category of tmpCategories) {
                requests.push(fetch(WP['baseurl'] + "/categories/" + category).then((response: any) => response.text()));
            }
        }
        if (query.thematic) {
            for (let thematic of tmpThematics) {
                requests.push(fetch(WP['baseurl'] + "/thematic/" + thematic).then((response: any) => response.text()));
            }
        }
        if (query.magazine_product) {
            for (let product of tmpProducts) {
                requests.push(fetch(WP['baseurl'] + "/magazine_product/" + product).then((response: any) => response.text()));
            }
        }
        if (env.getDebug()) {
            console.debug("getAllTaxonomiesFor: Amount of requests " + requests.length)
        }


        const body = await Promise.all(requests).catch(reason => {
            throw "getAllTaxonomiesFor: Error retrieving Issues" + reason
        });


        body.forEach(function (val, i) {
            tmpResult.push(JSON.parse(val))
        });

        tmpResult = tmpResult.flat();

        for (let i = 0; i < tmpResult.length; i++) {
            if (!mappedResult[tmpResult[i].taxonomy]) {
                mappedResult[tmpResult[i].taxonomy] = new Array();
            }
            mappedResult[tmpResult[i].taxonomy].push(tmpResult[i]);
        }

        return mappedResult;
    }
}