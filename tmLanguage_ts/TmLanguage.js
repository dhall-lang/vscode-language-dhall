"use strict";
// To parse this data:
//
//   import { Convert, TmLanguage } from "./file";
//
//   const tmLanguage = Convert.toTmLanguage(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
exports.__esModule = true;
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
var Convert;
(function (Convert) {
    function toTmLanguage(json) {
        return cast(JSON.parse(json), r("TmLanguage"));
    }
    Convert.toTmLanguage = toTmLanguage;
    function tmLanguageToJson(value) {
        return JSON.stringify(uncast(value, r("TmLanguage")), null, 2);
    }
    Convert.tmLanguageToJson = tmLanguageToJson;
    function invalidValue(typ, val) {
        throw Error("Invalid value " + JSON.stringify(val) + " for type " + JSON.stringify(typ));
    }
    function jsonToJSProps(typ) {
        if (typ.jsonToJS === undefined) {
            var map = {};
            typ.props.forEach(function (p) { return map[p.json] = { key: p.js, typ: p.typ }; });
            typ.jsonToJS = map;
        }
        return typ.jsonToJS;
    }
    function jsToJSONProps(typ) {
        if (typ.jsToJSON === undefined) {
            var map = {};
            typ.props.forEach(function (p) { return map[p.js] = { key: p.json, typ: p.typ }; });
            typ.jsToJSON = map;
        }
        return typ.jsToJSON;
    }
    function transform(val, typ, getProps) {
        function transformPrimitive(typ, val) {
            if (typeof typ === typeof val)
                return val;
            return invalidValue(typ, val);
        }
        function transformUnion(typs, val) {
            // val must validate against one typ in typs
            // union eats inner exception, biatch
            var l = typs.length;
            for (var i = 0; i < l; i++) {
                var typ = typs[i];
                try {
                    return transform(val, typ, getProps);
                }
                catch (e) {
                    if ((typ !== undefined) && (typ !== null)) {
                        console.log(e);
                        console.log("\n==\n");
                    }
                }
            }
            return invalidValue(typs, val);
        }
        function transformEnum(cases, val) {
            if (cases.indexOf(val) !== -1)
                return val;
            return invalidValue(cases, val);
        }
        function transformArray(typ, val) {
            // val must be an array with no invalid elements
            if (!Array.isArray(val))
                return invalidValue("array", val);
            return val.map(function (el) { return transform(el, typ, getProps); });
        }
        function transformDate(typ, val) {
            if (val === null) {
                return null;
            }
            var d = new Date(val);
            if (isNaN(d.valueOf())) {
                return invalidValue("Date", val);
            }
            return d;
        }
        function transformObject(props, additional, val) {
            if (val === null || typeof val !== "object" || Array.isArray(val)) {
                return invalidValue("object", val);
            }
            var result = {};
            Object.getOwnPropertyNames(props).forEach(function (key) {
                var prop = props[key];
                var v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                result[prop.key] = transform(v, prop.typ, getProps);
            });
            Object.getOwnPropertyNames(val).forEach(function (key) {
                if (!Object.prototype.hasOwnProperty.call(props, key)) {
                    result[key] = transform(val[key], additional, getProps);
                }
            });
            return result;
        }
        if (typ === "any")
            return val;
        if (typ === null) {
            if (val === null)
                return val;
            return invalidValue(typ, val);
        }
        if (typ === false)
            return invalidValue(typ, val);
        while (typeof typ === "object" && typ.ref !== undefined) {
            typ = typeMap[typ.ref];
        }
        if (Array.isArray(typ))
            return transformEnum(typ, val);
        if (typeof typ === "object") {
            return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                    : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                        : invalidValue(typ, val);
        }
        // Numbers can be parsed by Date but shouldn't be.
        if (typ === Date && typeof val !== "number")
            return transformDate(typ, val);
        return transformPrimitive(typ, val);
    }
    function cast(val, typ) {
        return transform(val, typ, jsonToJSProps);
    }
    function uncast(val, typ) {
        return transform(val, typ, jsToJSONProps);
    }
    function a(typ) {
        return { arrayItems: typ };
    }
    function u() {
        var typs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            typs[_i] = arguments[_i];
        }
        return { unionMembers: typs };
    }
    function o(props, additional) {
        return { props: props, additional: additional };
    }
    function m(additional) {
        return { props: [], additional: additional };
    }
    function r(name) {
        return { ref: name };
    }
    var typeMap = {
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
        "Captures": o([], "any"),
        "Grammar": o([
            { json: "patterns", js: "patterns", typ: a(r("Pattern")) },
            { json: "repository", js: "repository", typ: u(undefined, m(r("Grammar"))) },
        ], "any")
    };
})(Convert = exports.Convert || (exports.Convert = {}));
