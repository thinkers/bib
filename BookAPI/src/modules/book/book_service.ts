import fetch from 'node-fetch';
import { XMLParser, XMLValidator } from "fast-xml-parser";
import env from '../../environment';


const BASEX = env.getBaseXSettings();

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "_",
    allowBooleanAttributes: true,
    attributesGroupName: "g"
}
const parser = new XMLParser(options);

export default class BookService {

    public async filterBooks(query: any, callback: any) {

        let header = { headers: BASEX['headers'] };

        const response = fetch(
            BASEX['baseurl'] + "/", header
        ).then((response: any) => response.text());

        const body = await response;
        if (XMLValidator.validate(body) !== true) {
            throw "filterBook: Not a valid XML file";
        }

        let json = parser.parse(body);

        callback(json);
    }

    public async filterBook(query: any, callback: any) {

        let header = { headers: BASEX['headers'] };

        const response = fetch(
            BASEX['baseurl'] + "/" + query.id, header
        ).then((response: any) => response.text());

        const body = await response;

        if (XMLValidator.validate(body) !== true) {
            throw "filterBook: Not a valid XML file";
        }

        let json = parser.parse(body);

        if (json.TEI) {
            callback(json);
        } else {
            callback(json.html);
        }
    }

}