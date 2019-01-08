export class ParseMethods {
    static primitive(content) {
        return content.match(new RegExp('[1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[:][1-9]?[0-9]{1,5}', 'gi'));
    }

    static table(content) {
        try {
            return content
                .match(new RegExp('<tr.*?>(.*?)</tr>', 'gi'))
                .map(item => {
                    return item.match(new RegExp('([1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3}[.][1-2]?[0-9]{1,3})(?:.*?)([1-9]?[0-9]{1,5})', 'i'));
                })
                .filter(item => {
                    return item != null;
                })
                .map(item => {
                    return item[1] + ':' + item[2];
                });
        } catch (error) {
            return [];
        }
    }
}
