"use strict";
exports.__esModule = true;
var TmLanguage_1 = require("./TmLanguage");
var vars = {
    hex_digit: '(?:\d|[a-fA-F])',
    simple_label: '(?:[:alpha:]|_)(?:[:alpha:]|\d|[-/_])*',
    quoted_label: '(?:[:alpha:]|\d|[-/_:\.])+',
    exponent: '(?:e[+-]?\d+)',
    path_character: '[^\s#/\\/,<>\?\(\)\[\]\{\}]',
    path_component: "(?:/" + this.path_character + "+)",
    directory: "(?:" + this.path_component + "*)",
    file: "" + this.path_component,
    local: "(?:(?:..?|~)?" + this.directory + this.file + ")",
    scheme: '(?:https?)',
    url: "(?:" + this.scheme + "://" + this.authority + this.directory + this.file + "(?:\\?" + this.query + ")?(?:#" + this.fragment + ")?)",
    authority: "(?:(?:" + this.userinfo + "@)?" + this.host + "(?::" + this.port + ")?)",
    userinfo: "(?:(?:" + this.unreserved + "|" + this.pct_encoded + "|" + this.sub_delims + "|:)*)",
    host: "(?:" + this.IP_literal + "|" + this.IPv4address + "|" + this.reg_name + ")",
    port: '(?:\d*)',
    IP_literal: "(?:[(?:" + this.IPv6address + "|" + this.IPvFuture + ")])",
    IPvFuture: "(?:v" + this.hex_digit + "+.(?:" + this.unreserved + "|" + this.sub_delims + "|:)+)",
    IPv6address: "(?:(?:" + this.h16 + ":){6}" + this.ls32 + "|::(?:" + this.h16 + ":){5}" + this.ls32 + "|(?:" + this.h16 + ")?::"
        + ("(?:" + this.h16 + ":){4}" + this.ls32 + "|(?:(?:" + this.h16 + ":){1,}" + this.h16 + ")?::(?:" + this.h16 + ":){3}")
        + (this.ls32 + "|(?:(?:" + this.h16 + ":){2,}" + this.h16 + ")?::(?:" + this.h16 + ":){2}" + this.ls32 + "|")
        + ("(?:(?:" + this.h16 + ":){3,}" + this.h16 + ")?::(?:" + this.h16 + ":){1}" + this.ls32 + "|(?:(?:" + this.h16 + ":){4,}")
        + (this.h16 + ")?::" + this.ls32 + "|(?:(?:" + this.h16 + ":){5,}" + this.h16 + ")?::" + this.h16 + "|(?:(?:" + this.h16 + ":)")
        + ("{6,}" + this.h16 + ")?::)"),
    h16: "(?:" + this.hex_digit + "{1,4})",
    ls32: "(?:" + this.h16 + ":" + this.h16 + "|" + this.IPv4address + ")",
    IPv4address: "(?:" + this.dec_octet + "." + this.dec_octet + "." + this.dec_octet + "." + this.dec_octet + ")",
    dec_octet: "(?:25[0-5]|2[0-4]d|1d{2}|[1-9]d|d)",
    reg_name: "(?:(?:" + this.unreserved + "|" + this.pct_encoded + "|" + this.sub_delims + ")*)",
    pchar: "(?:" + this.unreserved + "|" + this.pct_encoded + "|" + this.sub_delims + "|[:@])",
    query: "(?:(?:" + this.pchar + "|[/?])*)",
    fragment: "" + this.query,
    pct_encoded: "(?:%" + this.hex_digit + "{2})",
    unreserved: "(?:[:alpha:]|d|[-._~])",
    sub_delims: "[!$&''()*+,;=]",
    // env: '(?:env:(?:${this.bash_env_var}|"${this.posix_env_var}"))'
    bash_env_var: "(?:(?:[:alpha:]|_)(?:[:alpha:]|d|_)*)",
    posix_env_var: "(?:" + this.posix_env_var_char + "+)",
    posix_env_var_char: "(?:\\[\"\\abfnrtv]|[^\"\\=])"
};
var tmLanguage = {
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
                    match: "\\b(Natural/fold|Natural/build|Natural/isZero|Natural/even|Natural/odd|Natural/toInteger|Natural/show|Integer/toDouble|Integer/show|Double/show|List/build|List/fold|List/length|List/head|List/last|List/indexed|List/reverse|Optional/fold|Optional/build)\\b"
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
                    include: "#keywords"
                },
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
                    include: "#label"
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
                    include: "#lambda"
                },
                {
                    include: "#let"
                }
            ]
        },
        strings: {
            patterns: [
                {
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
                }
            ]
        },
        "numbers": {
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
            patterns: [
                {
                    match: "____IMPOSSIBLE_IN_JSON_____",
                    "captures": {
                        "1": {
                            name: "markup.underline.url.dhall string.unquoted.url.dhall meta.path.url.dhall"
                        }
                    },
                    patterns: []
                }
            ]
        },
        file: {
            patterns: [
                {
                    match: "____IMPOSSIBLE_IN_JSON_____",
                    name: "",
                    patterns: []
                }
            ]
        },
        env: {
            patterns: [
                {
                    match: "____IMPOSSIBLE_IN_JSON_____",
                    name: "",
                    patterns: []
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
            patterns: [
                {
                    match: "\\bforall\\b|∀",
                    name: "storage.modifier.universal-quantifier.dhall",
                    patterns: []
                }
            ]
        },
        lambda: {
            patterns: [
                {
                    match: "λ|\\\\",
                    name: "keyword.control.dhall",
                    patterns: []
                }
            ]
        },
        let: {
            patterns: [
                {
                    comment: "TODO: is it possible (and necessary?) to define big meta scope for let?",
                    patterns: [
                        {
                            match: "\\blet\\b",
                            name: "keyword.other.let.dhall"
                        },
                        {
                            match: "\\bin\\b",
                            name: "keyword.other.in.dhall"
                        }
                    ]
                }
            ]
        },
        assignment: {
            patterns: [
                {
                    name: "keyword.operator.assignment.dhall",
                    match: "="
                }
            ]
        },
        line_comment: {
            patterns: [
                {
                    name: "comment.line.double-dash.dhall",
                    begin: "--",
                    end: "$",
                    patterns: []
                }
            ]
        },
        block_comment: {
            patterns: [
                {
                    name: "comment.block.dhall",
                    begin: "\\{-",
                    end: "-\\}",
                    patterns: [{ include: "#block_comment" }]
                }
            ]
        },
        comments: {
            patterns: [{ include: "#line_comment" }, { include: "#block_comment" }]
        },
        single_strings: {
            patterns: [
                {
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
                }
            ]
        },
        label: {
            patterns: [
                {
                    name: "meta.label.dhall",
                    patterns: [{
                            name: "meta.label.dhall",
                            match: "(?:[a-zA-Z]|_)(?:\\w|[-/_])*"
                        }, {
                            name: "metal.label.quoted.dhall",
                            begin: "`",
                            end: "`",
                            patterns: [{
                                    name: "meta.label.dhall",
                                    match: "[\\w\\-/_:\\.]+"
                                }],
                            beginCaptures: { "0": { name: "punctuation.section.backtick.begin.dhall" } },
                            endCaptures: { "0": { name: "punctuation.section.backtick.end.dhall" } }
                        }]
                }
            ]
        },
        record: {
            patterns: [
                {
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
                            include: "#expression"
                        },
                        {
                            comment: " FIXME: punctuation? is not defined in textmate grammar reference",
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
                            comment: " FIXME: punctuation? is not defined in textmate grammar reference",
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
                            comment: "FIXME: entity.name.tag? label",
                            include: "#label"
                        }
                    ]
                }
            ]
        },
        union: {
            patterns: [
                {
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
                            comment: " FIXME: punctuation? is not defined in textmate grammar reference",
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
                            comment: " FIXME: punctuation? is not defined in textmate grammar reference",
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
                            comment: "FIXME: entity.name.tag? label",
                            include: "#label"
                        }
                    ]
                }
            ]
        },
        list: {
            patterns: [
                {
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
                }
            ]
        },
        parens: {
            patterns: [
                {
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
            ]
        }
    },
    scopeName: "source.dhall"
};
var json = TmLanguage_1.Convert.tmLanguageToJson(tmLanguage);
console.log(json);
