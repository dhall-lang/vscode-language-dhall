"use strict";

import { TmLanguage } from "./TmLanguageModel";

import * as fs from 'fs';
import * as Ajv from 'ajv';


const hex_digit = '(?:[0-9a-fA-F])';

const simple_label = '(?:\\p{Alpha}|_)(?:\\p{Alpha}|\\d|[-/_])*';
const quoted_label = '(?:\\p{Alpha}|\\d|[-/_:\\.])+';
const exponent = '(?:e[+-]?\\d+)';
const path_character = '[^\\s#\\/\\\\,<>\\?\\(\\)\\[\\]\\{\\}]';
const path_component = `(?:\\/${path_character}+)`;
const directory = `(?:${path_component}*)`;
const file = `${path_component}`;
const local = `(?:(?:\\.\\.?|~)?${directory}${file})`;
const h16 = `(?:${hex_digit}{1,4})`;
const dec_octet = `(?:25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)`;
const unreserved = `(?:\\p{Alpha}|\\d|[-\\._~])`;
const IPv4address = `(?:${dec_octet}\\.${dec_octet}\\.${dec_octet}\\.${dec_octet})`;
const ls32 = `(?:${h16}:${h16}|${IPv4address})`;
const scheme = '(?:https?)';
const pct_encoded = `(?:%${hex_digit}{2})`;
const sub_delims = `[!\\$&''\\(\\)\\*\\+,;=]`;
const userinfo = `(?:(?:${unreserved}|${pct_encoded}|${sub_delims}|:)*)`;
const reg_name = `(?:(?:${unreserved}|${pct_encoded}|${sub_delims})*)`;
const pchar = `(?:${unreserved}|${pct_encoded}|${sub_delims}|[:@])`;
const query = `(?:(?:${pchar}|[\\/?])*)`;
const fragment = `${query}`;
const IPvFuture = `(?:v${hex_digit}+\\.(?:${unreserved}|${sub_delims}|:)+)`;
const IPv6address =
    `(?:(?:${h16}:){6}${ls32}|::(?:${h16}:){5}${ls32}|(?:${h16})?::`
    + `(?:${h16}:){4}${ls32}|(?:(?:${h16}:){1,}${h16})?::(?:${h16}:){3}`
    + `${ls32}|(?:(?:${h16}:){2,}${h16})?::(?:${h16}:){2}${ls32}|`
    + `(?:(?:${h16}:){3,}${h16})?::(?:${h16}:){1}${ls32}|(?:(?:${h16}:){4,}`
    + `${h16})?::${ls32}|(?:(?:${h16}:){5,}${h16})?::${h16}|(?:(?:${h16}:)`
    + `{6,}${h16})?::)`;
const IP_literal = `(?:\\[(?:${IPv6address}|${IPvFuture})\\])`;
const host = `(?:${IP_literal}|${IPv4address}|${reg_name})`;
const port = '(?:\\d*)';
const authority = `(?:(?:${userinfo}@)?${host}(?::${port})?)`;
const url =
    `(?:${scheme}:\\/${authority}${directory}${file}(?:\\\\?${query})?(?:#${fragment})?)`;

const bash_env_var = `(?:(?:\\p{Alpha}|_)(?:\\p{Alpha}|\\d|_)*)`;
const posix_env_var_char = `(?:\\["\\abfnrtv]|[^"\\=])`;
const posix_env_var = `(?:${posix_env_var_char}+)`;



// TODO: align with V6 standard

const tmLanguage: TmLanguage = {
    name: "Dhall",
    patterns: [{
        include: "#expression"
    }],
    repository: {
        keywords: {
            patterns: [{
                name: "keyword.control.dhall",
                match: "\\b(let|in|as|using|merge|constructors)\\b"
            },
            {
                name: "keyword.other.dhall",
                match: "\\b(Type|Kind|Sort)\\b"
            },
            {
                name: "constant.language.dhall",
                match: "\\b(True|False|NaN|Infinity|Some)\\b"
            },
            {
                name: "constant.numeric.dhall",
                match: "\\b(NaN|Infinity)\\b"
            },
            {
                name: "entity.name.function",
                match: "\\b(Natural/fold|Natural/build|Natural/isZero|Natural/even|Natural/odd|Natural/toInteger|Natural/show|Integer/toDouble|Integer/show|Double|Double/show|List/build|List/fold|List/length|List/head|List/last|List/indexed|List/reverse|Optional/fold|Optional/build)\\b"
            },
            {
                name: "support.class.dhall",
                match: "\\b(Bool|Optional|None|Natural|Integer|Doule|Text|List)\\b"
            },
            {
                name: "keyword.control.conditional.dhall",
                match: "\\b(if|then|else)\\b"
            }]
        },
        expression: {
            patterns: [
                {
                    include: "#forall"
                },
                {
                    include: "#strings"
                },
                {
                    include: "#single_strings"
                },
                {
                    include: "#line_comment"
                },
                {
                    include: "#block_comment"
                },
                {
                    include: "#numbers"
                },
                {
                    include: "#url"
                },
                {
                    include: "#file"
                },
                {
                    include: "#env"
                },
                {
                    include: "#record"
                },
                {
                    include: "#union"
                },
                {
                    include: "#list"
                },
                {
                    include: "#parens"
                },
                {
                    include: "#operators"
                },
                {
                    include: "#url"
                },
                {
                    include: "#lambda"
                },
                {
                    include: "#let"
                },
                {
                    include: "#keywords"
                },
                {
                    include: "#label"
                }
            ]
        },
        strings: {


            name: "string.quoted.double.dhall",
            begin: "\"",
            end: "\"",
            patterns: [
                {
                    name: "constant.other.placeholder.dhall",
                    begin: "\\$\\{",
                    beginCaptures: { "0": { name: "punctuation.section.curly.begin.dhall" } },
                    end: "\\}",
                    endCaptures: { "0": { name: "punctuation.section.curly.end.dhall" } },
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                },
                {
                    name: "constant.character.escape.sequence.dhall",
                    match: "\\\\(?:[\"$\\\\/bfnrt]|[u][a-fA-F0-9]{4})"

                }
            ]

        },
        numbers: {
            patterns: [

                {
                    name: "constant.numeric.float.dhall",
                    match: "[+-]?\\d+(?:(\\.)\\d+(?:e[+-]?\\d+)?|(?:e[+-]?\\d+))"
                },
                {
                    name: "constant.numeric.integer.dhall",
                    match: "(\\+|\\-)[\\d]+"
                },
                {
                    name: "constant.numeric.natural.dhall",
                    match: "[\\d]+"
                }

            ]
        },
        url: {

            match: `(${url})(?:\\s*(sha256)(:)(${hex_digit}{64}))?(?:\\s*(as)\\s*(Text))?`,
            captures: {
                "1": {
                    name: `markup.underline.url.dhall`
                },
                "2": { name: `storage.modifier.hash.dhall` },
                "3": { name: `punctuation.separator.colon.dhall` },
                "4": { name: `constant.numeric.integer.hash.dhall` },
                "5": { name: `storage.modifier.as.dhall` },
                "6": { name: `storage.type.dhall` },
            }

        },
        file: {
            match: `(${local})(?:\\s*(sha256)(:)(${hex_digit}{64}))?(?:\\s*(as)\\s*(Text))?`,
            captures: {
                "1": { name: "string.unquoted.file.dhall meta.path.file.dhall" },
                "2": { name: "storage.modifier.hash.dhall" },
                "3": { name: "punctuation.separator.colon.dhall" },
                "4": { name: "constant.numeric.integer.hash.dhall" },
                "5": { name: "storage.modifier.as.dhall" },
                "6": { name: `storage.type.dhall` }
            }

        },
        env: {
            patterns: [
                {
                    match: `(env)(:)(${bash_env_var})(?:\\s*(sha256)(:)(${hex_digit}{64}))?(?:\\s*(as)\\s*(Text))?`,
                    captures: {
                        "1": { name: "storage.modifier.environment-variable.dhall" },
                        "2": { name: "punctuation.separator.colon.dhalll" },
                        "3": { name: "string.unquoted.environment-variable.dhall" },
                        "4": { name: `storage.modifier.hash.dhall` },
                        "5": { name: "punctuation.separator.colon.dhall" },
                        "6": { name: "constant.numeric.integer.hash.dhall" },
                        "7": { name: "storage.modifier.as.dhall" },
                        "8": { name: `storage.type.dhall` }
                    }
                },
                {
                    match: `(env)(:)(")(${posix_env_var})(")(?:\\s*(sha256)(:)(${hex_digit}{64}))?(?:\\s*(as)\\s*(Text))?`,
                    captures: {
                        "1": { name: "storage.modifier.environment-variable.dhall" },
                        "2": { name: "punctuation.separator.colon.dhall" },
                        "3": { name: "punctuation.definition.string.begin.dhall" },
                        "4": { name: "string.quoted.double.environment-variable.dhall" },
                        "5": { name: "punctuation.definition.string.end.dhall" },
                        "6": { name: "storage.modifier.hash.dhall" },
                        "7": { name: "punctuation.separator.colon.dhall" },
                        "8": { name: "constant.numeric.integer.hash.dhall" },
                        "9": { name: "storage.modifier.as.dhall" },
                        "10": { name: `storage.type.dhall` }
                    }
                }
            ]
        },
        operators: {
            patterns: [
                {
                    name: "keyword.operator.arrow.dhall",
                    match: "(?:->|→)"
                },
                {
                    match: ":",
                    name: "keyword.other.colon.dhall"
                },
                {
                    match: "(?:\\|{2}|&{2})",
                    name: "keyword.operator.logical.dhall"
                },
                {
                    match: "[!=]=",
                    name: "keyword.operator.equality.dhall"
                },
                {
                    match: "=",
                    name: "keyword.operator.assignment.dhall"
                },
                {
                    match: "(?:#|\\+{2})",
                    name: "keyword.operator.sequence.dhall"
                },
                {
                    match: "[\\+\\*]",
                    name: "keyword.operator.arithmetic.dhall"
                },
                {
                    match: "(?:∧|/\\\\|⩓|//\\\\\\\\|⫽|//)",
                    name: "keyword.operator.combine.dhall"
                }

            ]
        },
        forall: {
            match: "\\bforall\\b|∀",
            name: "storage.modifier.universal-quantifier.dhall"
        },
        lambda: {
            match: "λ|\\\\",
            name: "keyword.control.dhall"
        },
        let: {
            name: "meta.declaration.expression.let.dhall",
            begin: "\\blet\\b",
            beginCaptures: {
                "0": {
                    name: "keyword.other.let.dhall"
                }
            },
            end: "(?=\\bin\\b)|(?=\\let\\b)", // dangling in problem
            endCaptures: {
                "0": {
                    name: "keyword.other.in.dhall"
                }
            },
            patterns: [
                {
                    include: "#labelBind"
                },
                {
                    begin: ":",
                    end: "(?==)",
                    patterns: [{
                        include: "#expression"
                    }]
                },
                {
                    begin: "=",
                    beginCaptures: {
                        "0": {
                            name: "keyword.operator.assignment.dhall"
                        }
                    },
                    end: "(?=\\bin\\b)|(?=\\let\\b)",
                    name: "meta.declaration.foobar.dhall",
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                }
            ]
        },
        assignment: {
            name: "keyword.operator.assignment.dhall",
            match: "="
        },
        line_comment: {
            name: "comment.line.double-dash.dhall",
            begin: "--",
            end: "$"
        },
        block_comment: {
            name: "comment.block.dhall",
            begin: "\\{-",
            end: "-\\}",
            patterns: [{ include: "#block_comment" }]
        },
        comments: {
            patterns: [{ include: "#line_comment" }, { include: "#block_comment" }]
        },
        single_strings: {
            name: "string.quoted.single.dhall",
            begin: "''$",
            end: "''(?!')(?!\\$\\{)",
            patterns: [
                {
                    name: "constant.character.escape.quotes.dhall",
                    match: "'''"
                },
                {
                    name: "constant.character.escape.interpolation.dhall",
                    match: "''\\$\\{"
                },
                {
                    name: "constant.other.placeholder.dhall",
                    begin: "\\$\\{",
                    beginCaptures: { "0": { name: "punctuation.section.curly.begin.dhall" } },
                    end: "\\}",
                    endCaptures: { "0": { name: "punctuation.section.curly.end.dhall" } },
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                }
            ]

        },
        label: {
            name: "meta.label.dhall",
            patterns: [{
                name: "meta.label.dhall",
                match: `${simple_label}`
            }, {
                match: `(\`)(${quoted_label})(\`)`,
                captures: {
                    "1": { name: "punctuation.section.backtick.begin.dhall" },
                    "2": { name: "meta.label.quoted.dhall" },
                    "3": { name: "punctuation.section.backtick.end.dhall" }
                }
            }]

        },
        labelBind: { // * defines constant value in let expression
            name: "variable.other.constant.dhall",
            patterns: [{
                name: "variable.other.constant.dhall",
                match: `${simple_label}`
            }, {
                match: `(\`)(${quoted_label})(\`)`,
                captures: {
                    "1": { name: "punctuation.section.backtick.begin.dhall" },
                    "2": { name: "variable.other.constant.quoted.dhall" },
                    "3": { name: "punctuation.section.backtick.end.dhall" }
                }
            }]

        },
        labelPropertyType: { // * { foo : Text } 

            name: "constant.other.attribute-name.dhall",
            patterns: [{
                name: "constant.other.attribute-name.dhall",
                match: `${simple_label}(?=\\s*:)`
            }, {
                match: `(\`)(${quoted_label})(\`)`,
                captures: {
                    "1": { name: "punctuation.section.backtick.begin.dhall" },
                    "2": { name: "constant.other.attribute-name.quoted.dhall" },
                    "3": { name: "punctuation.section.backtick.end.dhall" }
                }
            }]

        },
        labelPropertyVar: { // * { foo = "123" } 
            name: "variable.object.property.dhall",
            patterns: [{
                name: "variable.object.property.dhall",
                match: `${simple_label}(?=\\s*=)`
            }, {
                match: `(\`)(${quoted_label})(\`)`,
                captures: {
                    "1": { name: "punctuation.section.backtick.begin.dhall" },
                    "2": { name: "variable.object.property.quoted.dhall" },
                    "3": { name: "punctuation.section.backtick.end.dhall" }
                }
            }]

        },
        record: {
            name: "meta.declaration.data.record.block.dhall",
            begin: "\\{",
            beginCaptures: {
                "0": {
                    name: "keyword.operator.record.begin.dhall"
                }
            },
            end: "\\}",
            endCaptures: {
                "0": {
                    name: "keyword.operator.record.end.dhall"
                }
            },
            patterns: [

                {
                    begin: ":",
                    beginCaptures: {
                        "0": {
                            name: "punctuation.separator.dictionary.key-value.dhall"
                        }
                    },
                    end: "(,)|(?=\\})",
                    endCaptures: {
                        "1": {
                            name: "punctuation.separator.dictionary.pair.dhall"
                        }
                    },
                    name: "meta.declaration.data.record.type.dhall",
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                },
                {
                    begin: "=",
                    beginCaptures: {
                        "0": {

                            name: "punctuation.separator.dictionary.key-value.dhall"
                        }
                    },
                    end: "(,)|(?=\\})",
                    endCaptures: {
                        "1": {
                            name: "punctuation.separator.dictionary.pair.dhall"
                        }
                    },
                    name: "meta.declaration.data.record.literal.dhall",
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                },
                {
                    include: "#assignment"
                },
                {
                    include: "#labelPropertyVar"
                },
                {
                    include: "#labelPropertyType"
                },
                {
                    include: "#label"
                }
            ]

        },
        union: {


            name: "meta.declaration.data.union.block.dhall",
            begin: "<",
            beginCaptures: {
                "0": {
                    name: "keyword.operator.union.begin.dhall"
                }
            },
            end: ">",
            endCaptures: {
                "0": {
                    name: "keyword.operator.union.end.dhall"
                }
            },
            patterns: [
                {
                    include: "#comments"
                },
                {
                    begin: ":",
                    beginCaptures: {
                        "0": {
                            name: "punctuation.separator.dictionary.key-value.dhall"
                        }
                    },
                    end: "(\\|)|(?=\\>)",
                    endCaptures: {
                        "1": {
                            name: "punctuation.separator.dictionary.pair.dhall"
                        }
                    },
                    name: "meta.declaration.data.union.type.dhall",
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                },
                {
                    begin: "=",
                    beginCaptures: {
                        "0": {
                            name: "punctuation.separator.dictionary.key-value.dhall"
                        }
                    },
                    end: "(\\|)|(?=\\>)",
                    endCaptures: {
                        "1": {
                            name: "punctuation.separator.dictionary.pair.dhall"
                        }
                    },
                    name: "meta.declaration.data.union.literal.dhall",
                    patterns: [
                        {
                            include: "#expression"
                        }
                    ]
                },
                {
                    include: "#assignment"
                },
                {
                    include: "#labelPropertyVar"
                },
                {
                    include: "#labelPropertyType"
                },
                {
                    include: "#label"
                }
            ]

        },
        list: {
            name: "meta.brackets.list.dhall",
            begin: "\\[",
            beginCaptures: {
                "0": {
                    name: "punctuation.section.brackets.begin.list.dhall"
                }
            },
            end: "\\]",
            endCaptures: {
                "0": {
                    name: "punctuation.section.brackets.end.list.dhall"
                }
            },
            patterns: [
                {
                    name: "punctuation.separator.sequence.list.dhall",
                    match: ","
                },
                {
                    include: "#expression"
                }
            ]

        },
        parens: {
            name: "meta.parens.dhall",
            begin: "\\(",
            beginCaptures: {
                "0": {
                    name: "punctuation.section.parens.begin.dhall"
                }
            },
            end: "\\)",
            endCaptures: {
                "0": {
                    name: "punctuation.section.parens.end.dhall"
                }
            },
            patterns: [
                {
                    include: "#expression"
                }
            ]

        }
    },
    "$schema": "https://raw.githubusercontent.com/Septh/tmlanguage/master/tmLanguage.schema.json",
    scopeName: "source.dhall"
}

// ? _.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"
// ? ~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~.
// ? .~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~._.~"~


let schema = fs.readFileSync('./src/typescript/tmlanguage.schema.json').toString();

let ajv = new Ajv({ verbose: true });

ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

const validate = ajv.compile(JSON.parse(schema));

const json = JSON.stringify(tmLanguage);

const valid = validate(tmLanguage);

if (!valid) {
    console.error("** Output json doesn't match tmLanguage schema**");
    console.error(validate.errors);
    process.exit(1);
} else {
    console.log(JSON.stringify(tmLanguage));
}


