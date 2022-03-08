import * as dotenv from 'dotenv';


enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod',
    qa_environment = 'qa'
}

// custom post types.  pods
enum CustomPostTypes {
    article_codes = 'article_codes',
    article_nomologia = 'article_nomologia',
    article_nomothesia = 'article_nomothesia',
    article_scientific = 'article_scientific',
    article_theory = 'article_theory',
    book = 'book'
}

enum CustomTaxonomies {
    tax_code = 'code',
    tax_issue = 'issue',
    tax_product = 'magazine_product',
    tax_thematic = 'thematic',
    tax_category = 'categories'
}

const DEBUG = true;


class Environment {

    private environment: String;

    constructor(environment: String) {
        dotenv.config();
        this.environment = environment;
    }

    getPort(): Number {
        var port = parseInt(process.env.PORT) || 3000;
        console.log(port)
        return port;
    }

    getDBName(): String {
        if (this.environment === Environments.prod_environment) {
            return 'dummy';
        } else if (this.environment === Environments.dev_environment) {
            return 'dummy';
        } else if (this.environment === Environments.qa_environment) {
            return 'dummy';
        } else {
            return 'dummy';
        }
    }

    getWPSettings(): Object {
        return {
            'baseurl': process.env.WP_BASEURL + "" + process.env.WP_PATH
        };
    }

    getBaseXSettings(): Object {

        const buff = Buffer.from(process.env.BASEX_USER + ":" + process.env.BASEX_PASSWORD, 'utf-8');
        const auth = buff.toString('base64');
        const headers = {
            "Authorization": "Basic " + auth
        }

        return {
            'baseurl': process.env.BASEX_BASEURL + "" + process.env.BASEX_PATH,
            'headers': headers
        }
    }

    getCustomPostTypes(): Object {
        return CustomPostTypes;
    }

    getCustomTaxonomies(): Object {
        return CustomTaxonomies;
    }

    getDebug(): Boolean {
        return DEBUG;
    }
}

export default new Environment(Environments.local_environment);