// To parse this data:
//
//   import { Convert, TmLanguage } from "./file";
//
//   const tmLanguage = Convert.toTmLanguage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface TmLanguage {
    patterns: Pattern[];
    /**
     * a dictionary (i.e. key/value pairs) of rules which can be included from other places in
     * the grammar. The key is the name of the rule and the value is the actual rule. Further
     * explanation (and example) follow with the description of the include rule key.
     */
    repository?: { [key: string]: Grammar };
    /**
     * this is an array of file type extensions that the grammar should (by default) be used
     * with. This is referenced when TextMate does not know what grammar to use for a file the
     * user opens. If however the user selects a grammar from the language pop-up in the status
     * bar, TextMate will remember that choice.
     */
    fileTypes?:      string[];
    firstLineMatch?: string;
    /**
     * regular expressions that lines (in the document) are matched against. If a line matches
     * one of the patterns (but not both), it becomes a folding marker (see the foldings section
     * for more info).
     */
    foldingStartMarker?: string;
    /**
     * regular expressions that lines (in the document) are matched against. If a line matches
     * one of the patterns (but not both), it becomes a folding marker (see the foldings section
     * for more info).
     */
    foldingStopMarker?: string;
    name?:              string;
    /**
     * this should be a unique name for the grammar, following the convention of being a
     * dot-separated name where each new (left-most) part specializes the name. Normally it
     * would be a two-part name where the first is either text or source and the second is the
     * name of the language or document type. But if you are specializing an existing type, you
     * probably want to derive the name from the type you are specializing. For example Markdown
     * is text.html.markdown and Ruby on Rails (rhtml files) is text.html.rails. The advantage
     * of deriving it from (in this case) text.html is that everything which works in the
     * text.html scope will also work in the text.html.«something» scope (but with a lower
     * precedence than something specifically targeting text.html.«something»).
     */
    scopeName: string;
    uuid?:     string;
}

export interface Pattern {
    applyEndPatternLast?: number;
    /**
     * these keys allow matches which span several lines and must both be mutually exclusive
     * with the match key. Each is a regular expression pattern. begin is the pattern that
     * starts the block and end is the pattern which ends the block. Captures from the begin
     * pattern can be referenced in the end pattern by using normal regular expression
     * back-references. This is often used with here-docs. A begin/end rule can have nested
     * patterns using the patterns key.
     */
    begin?: string;
    /**
     * allows you to assign attributes to the captures of the begin pattern. Using the captures
     * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
     * same values.
     */
    beginCaptures?: Captures;
    /**
     * allows you to assign attributes to the captures of the match pattern. Using the captures
     * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
     * same values.
     */
    captures?: Captures;
    comment?:  string;
    /**
     * this key is similar to the name key but only assigns the name to the text between what is
     * matched by the begin/end patterns.
     */
    contentName?: string;
    disabled?:    number;
    /**
     * these keys allow matches which span several lines and must both be mutually exclusive
     * with the match key. Each is a regular expression pattern. begin is the pattern that
     * starts the block and end is the pattern which ends the block. Captures from the begin
     * pattern can be referenced in the end pattern by using normal regular expression
     * back-references. This is often used with here-docs. A begin/end rule can have nested
     * patterns using the patterns key.
     */
    end?: string;
    /**
     * allows you to assign attributes to the captures of the end pattern. Using the captures
     * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
     * same values.
     */
    endCaptures?: Captures;
    /**
     * this allows you to reference a different language, recursively reference the grammar
     * itself or a rule declared in this file’s repository.
     */
    include?: string;
    /**
     * a regular expression which is used to identify the portion of text to which the name
     * should be assigned. Example: '\b(true|false)\b'.
     */
    match?: string;
    /**
     * the name which gets assigned to the portion matched. This is used for styling and
     * scope-specific settings and actions, which means it should generally be derived from one
     * of the standard names.
     */
    name?: string;
    /**
     * applies to the region between the begin and end matches
     */
    patterns?: Pattern[];
    while?:    string;
}

/**
 * allows you to assign attributes to the captures of the begin pattern. Using the captures
 * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
 * same values.
 *
 * allows you to assign attributes to the captures of the match pattern. Using the captures
 * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
 * same values.
 *
 * allows you to assign attributes to the captures of the end pattern. Using the captures
 * key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with
 * same values.
 */
export interface Captures {
    [s: string]: { name?: string, patterns?: [Pattern]};
}

export interface Grammar {
    patterns: Pattern[];
    /**
     * a dictionary (i.e. key/value pairs) of rules which can be included from other places in
     * the grammar. The key is the name of the rule and the value is the actual rule. Further
     * explanation (and example) follow with the description of the include rule key.
     */
    repository?: { [key: string]: Grammar };
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export namespace Convert {
    export function toTmLanguage(json: string): TmLanguage {
        return cast(JSON.parse(json), r("TmLanguage"));
    }

    export function tmLanguageToJson(value: TmLanguage): string {
        return JSON.stringify(uncast(value, r("TmLanguage")), null, 2);
    }

    function invalidValue(typ: any, val: any): never {
        throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
    }

    function jsonToJSProps(typ: any): any {
        if (typ.jsonToJS === undefined) {
            var map: any = {};
            typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
            typ.jsonToJS = map;
        }
        return typ.jsonToJS;
    }

    function jsToJSONProps(typ: any): any {
        if (typ.jsToJSON === undefined) {
            var map: any = {};
            typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
            typ.jsToJSON = map;
        }
        return typ.jsToJSON;
    }

    function transform(val: any, typ: any, getProps: any): any {
        function transformPrimitive(typ: string, val: any): any {
            if (typeof typ === typeof val) return val;
            return invalidValue(typ, val);
        }

        function transformUnion(typs: any[], val: any): any {
            // val must validate against one typ in typs
            // union eats inner exception, biatch
            var l = typs.length;
            for (var i = 0; i < l; i++) {
                var typ = typs[i];
                
                  try {
                    return transform(val, typ, getProps);
                  } catch (e) {
                      if ((typ !== undefined) && ( typ !== null)) { 
                        console.log(e); console.log("\n==\n")
                      }
                    }
         
            }
            return invalidValue(typs, val);
        }

        function transformEnum(cases: string[], val: any): any {
            if (cases.indexOf(val) !== -1) return val;
            return invalidValue(cases, val);
        }

        function transformArray(typ: any, val: any): any {
            // val must be an array with no invalid elements
            if (!Array.isArray(val)) return invalidValue("array", val);
            return val.map(el => transform(el, typ, getProps));
        }

        function transformDate(typ: any, val: any): any {
            if (val === null) {
                return null;
            }
            const d = new Date(val);
            if (isNaN(d.valueOf())) {
                return invalidValue("Date", val);
            }
            return d;
        }

        function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
            if (val === null || typeof val !== "object" || Array.isArray(val)) {
                return invalidValue("object", val);
            }
            var result: any = {};
            Object.getOwnPropertyNames(props).forEach(key => {
                const prop = props[key];
                const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                result[prop.key] = transform(v, prop.typ, getProps);
            });
            Object.getOwnPropertyNames(val).forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(props, key)) {
                    result[key] = transform(val[key], additional, getProps);
                }
            });
            return result;
        }

        if (typ === "any") return val;
        if (typ === null) {
            if (val === null) return val;
            return invalidValue(typ, val);
        }
        if (typ === false) return invalidValue(typ, val);
        while (typeof typ === "object" && typ.ref !== undefined) {
            typ = typeMap[typ.ref];
        }
        if (Array.isArray(typ)) return transformEnum(typ, val);
        if (typeof typ === "object") {
            return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                : invalidValue(typ, val);
        }
        // Numbers can be parsed by Date but shouldn't be.
        if (typ === Date && typeof val !== "number") return transformDate(typ, val);
        return transformPrimitive(typ, val);
    }

    function cast<T>(val: any, typ: any): T {
        return transform(val, typ, jsonToJSProps);
    }

    function uncast<T>(val: T, typ: any): any {
        return transform(val, typ, jsToJSONProps);
    }

    function a(typ: any) {
        return { arrayItems: typ };
    }

    function u(...typs: any[]) {
        return { unionMembers: typs };
    }

    function o(props: any[], additional: any) {
        return { props, additional };
    }

    function m(additional: any) {
        return { props: [], additional };
    }

    function r(name: string) {
        return { ref: name };
    }

    const typeMap: any = {
        "TmLanguage": o([
            { json: "patterns", js: "patterns", typ: a(r("Pattern")) },
            { json: "repository", js: "repository", typ: u(undefined, m(r("Grammar"))) },
            { json: "fileTypes", js: "fileTypes", typ: u(undefined, a("")) },
            { json: "firstLineMatch", js: "firstLineMatch", typ: u(undefined, "") },
            { json: "foldingStartMarker", js: "foldingStartMarker", typ: u(undefined, "") },
            { json: "foldingStopMarker", js: "foldingStopMarker", typ: u(undefined, "") },
            { json: "name", js: "name", typ: u(undefined, "") },
            { json: "scopeName", js: "scopeName", typ: "" },
            { json: "uuid", js: "uuid", typ: u(undefined, "") },
        ], "any"),
        "Pattern": o([
            { json: "applyEndPatternLast", js: "applyEndPatternLast", typ: u(undefined, 0) },
            { json: "begin", js: "begin", typ: u(undefined, "") },
            { json: "beginCaptures", js: "beginCaptures", typ: u(undefined, r("Captures")) },
            { json: "captures", js: "captures", typ: u(undefined, r("Captures")) },
            { json: "comment", js: "comment", typ: u(undefined, "") },
            { json: "contentName", js: "contentName", typ: u(undefined, "") },
            { json: "disabled", js: "disabled", typ: u(undefined, 0) },
            { json: "end", js: "end", typ: u(undefined, "") },
            { json: "endCaptures", js: "endCaptures", typ: u(undefined, r("Captures")) },
            { json: "include", js: "include", typ: u(undefined, "") },
            { json: "match", js: "match", typ: u(undefined, "") },
            { json: "name", js: "name", typ: u(undefined, "") },
            { json: "patterns", js: "patterns", typ: u(undefined, a(r("Pattern"))) },
            { json: "while", js: "while", typ: u(undefined, "") },
        ], "any"),
        "Captures": o([
        ], "any"),
        "Grammar": o([
            { json: "patterns", js: "patterns", typ: a(r("Pattern")) },
            { json: "repository", js: "repository", typ: u(undefined, m(r("Grammar"))) },
        ], "any"),
    };
}
