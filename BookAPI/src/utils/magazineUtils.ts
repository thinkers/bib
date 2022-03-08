import Magazine from 'modules/magazine/magazine';
import Author from '../modules/magazine/author';

export class MagazineUtils {



    public static filterByType(type: string, magazine: Array<Magazine>) {
        const filteredMagazines = magazine.filter(function (mag) {
            if (mag.type.indexOf(type) !== -1) {
                return true;
            }
        });
        return filteredMagazines;
    }

    public static filterByProduct(type: string, magazine: Array<Magazine>) {

        const filteredMagazines = magazine.filter(function (mag) {

            if (mag.product.filter(data => data['name'].indexOf(type) !== -1)) {
                return true;
            }
        });
        return filteredMagazines
    }

    public static searchMagazines(search: string, magazine: Array<Magazine>) {

        const filteredMagazines = magazine.filter(function (mag) {

            if (mag.title && mag.title.indexOf(search) !== -1) {
                return true;
            }
            if (mag.subtitle && mag.subtitle.indexOf(search) !== -1) {
                return true;
            }
            if (mag.summary && mag.summary.indexOf(search) !== -1) {
                return true;
            }
            if (mag.content && mag.content.indexOf(search) !== -1) {
                return true;
            }
            if (mag.authors) {
                for (let author of mag.authors) {
                    if (author.lastname && author.lastname.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.firstname && author.firstname.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.role && author.role.indexOf(search) !== -1) {
                        return true;
                    }
                    if (author.extraRole && author.extraRole.indexOf(search) !== -1) {
                        return true;
                    }
                }
            }
        });
        return filteredMagazines;
    }

    public static searchMagazine(search: string, mag: Magazine) {
        return false;
    }

    /**
     * Mapping
     * 
     * <Last Name>[single space]<First Name / Initials>[single space](Attribute in 
     * specific Article)[single space]/[single space] 
     * and next Author details follow until there is no more / character 
     * at the end of the last Author
     * 
     * @returns 
     */
    public static getAuthorTheory(data: string, attribute: string) {
        let fullname = data.split(" ");

        if (Array.isArray(data)) {
            fullname = data[0].trim().split(" ");
        }
        let author = new Author();

        author.lastname = fullname[0];
        author.firstname = fullname[1];

        if (fullname[2]) {
            author.role = fullname[2];
        }
        author.role = attribute;

        return author;
    }

    public static getAuthor(data: string) {
        let fullname = data[0].trim().split(" ");
        let author = new Author();

        author.firstname = fullname[0];
        author.lastname = fullname[1];

        if (data[1])
            author.role = data[1];
        if (data[2])
            author.extraRole = data[2];

        return author;
    }


    public static map_taxonomies(magTaxonomies: Array<string>, taxonomies: Object[]) {
        let ret = [];

        if (magTaxonomies && magTaxonomies.length > 0 && taxonomies) {

            magTaxonomies.forEach(function (val) {
                let tmp = taxonomies.find(elem => elem['id'] === val);
                if (tmp) {
                    ret.push(
                        {
                            'name': tmp['name'],
                            'description': tmp['description']
                        }
                    );
                }
            })
        }

        return ret;

    }

    // https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
    public static getQueryFields(remove: any) {

        let params = {
            'article_codes': '',
            'article_nomologia': '',
            'article_nomothesia': '',
            'article_scientific': '',
            'article_theory': '',
            'issue': true,
            'magazine_product': true,
            'thematic': true,
            'categories': true,
        };


        params.article_codes = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_nomologia = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_nomothesia = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_scientific = "id,type,categories,tags,issue,magazine_product,thematic";
        params.article_theory = "id,type,categories,tags,issue,magazine_product,thematic";

        if (!remove.includes('_title')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_number,article_nomologia_year";
            params.article_nomothesia += ",title";
            params.article_scientific += ",title";
            params.article_theory += ",title";
        }
        if (!remove.includes('_subtitle')) {
            params.article_codes += "";
            params.article_nomologia += "";
            params.article_nomothesia += "";
            params.article_scientific += ",article_scientific_subtitle";
            params.article_theory += ",article_theory_subtitle";
        }
        if (!remove.includes('_authors')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_composition_new";
            params.article_nomothesia += "";
            params.article_scientific += ",article_scientific_author_attribute";
            params.article_theory += ",article_theory_author,article_theory_author_attribute";
        }
        if (!remove.includes('_numberOfPages')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_page_number";
            params.article_nomothesia += ",article_nomothesia_page_number";
            params.article_scientific += ",article_scientific_page_number";
            params.article_theory += ",article_theory_page_number";
        }
        if (!remove.includes('_summary')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_summary_text";
            params.article_nomothesia += "";
            params.article_scientific += "";
            params.article_theory += ",article_theory_primary_text";
        }

        if (!remove.includes('_content')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_main_text";
            params.article_nomothesia += ",article_nomothesia_main_text";
            params.article_scientific += ",article_scientific_main_text";
            params.article_theory += ",article_theory_main_text";
        }
        if (!remove.includes('_annotationAuthor')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_annotation_author";
            params.article_nomothesia += ",article_nomothesia_annotation_author";
            params.article_scientific += ",article_scientific_annotation_author";
            params.article_theory += "";
        }
        if (!remove.includes('_annotation')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_annotation";
            params.article_nomothesia += ",article_nomothesia_annotation";
            params.article_scientific += ",article_scientific_annotation";
            params.article_theory += "";
        }
        if (!remove.includes('_decision')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_decision";
            params.article_nomothesia += "";
            params.article_scientific += "";
            params.article_theory += "";
        }
        if (!remove.includes('_relations')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations";
            params.article_nomothesia += ",article_nomothesia_relations";
            params.article_scientific += ",article_scientific_relations";
            params.article_theory += ",article_theory_relations";
        }
        if (!remove.includes('_relationsTheories')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_theories";
            params.article_nomothesia += ",article_nomothesia_relations_theories";
            params.article_scientific += ",article_scientific_relations_theories";
            params.article_theory += ",article_theory_relations_theories";
        }
        if (!remove.includes('_relationsNomologies')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_nomologies";
            params.article_nomothesia += ",article_nomothesia_relations_nomologies";
            params.article_scientific += ",article_scientific_relations_nomologies";
            params.article_theory += ",article_theory_relations_nomologies";
        }
        if (!remove.includes('_relationsScientific')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_scientific";
            params.article_nomothesia += ",article_nomothesia_relations_scientific";
            params.article_scientific += ",article_scientific_relations_scientific";
            params.article_theory += ",article_theory_relations_scientific";
        }
        if (!remove.includes('_relationsNomothesies')) {
            params.article_codes += "";
            params.article_nomologia += ",article_nomologia_relations_nomothesies";
            params.article_nomothesia += ",article_nomothesia_relations_nomothesies";
            params.article_scientific += ",article_scientific_relations_nomothesies";
            params.article_theory += ",article_theory_relations_nomothesies";
        }

        if (remove.includes('_issue')) {
            params.issue = false;
        }
        if (remove.includes('_product')) {
            params.magazine_product = false;
        }
        if (remove.includes('_categories')) {
            params.categories = false;
        }
        if (remove.includes('_thematics')) {
            params.thematic = false;
        }

        return params;
    }


}
