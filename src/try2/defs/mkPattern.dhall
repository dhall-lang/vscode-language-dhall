let mkPattern  = λ(Captures : Type) -> λ(Pattern : Type) → λ(params: {
      comment: Optional Text
    , disabled: Optional Integer -- restriction: 0 || 1

    -- this allows you to reference a different language, recursively reference the grammar itself or a rule declared in this file’s repository.
    , include : Optional Text

    -- a regular expression which is used to identify the portion of text to which the name should be assigned. Example: '\\b(true|false)\\b'.
    , match: Optional Text 

    -- the name which gets assigned to the portion matched. This is used for styling and scope-specific settings and actions, which means it should generally be derived from one of the standard names.
    , name: Optional Text -- ! FIXME: it's not a Text, but NAME

    -- this key is similar to the name key but only assigns the name to the text between what is matched by the begin/end patterns.
    , contentName: Optional Text

    -- these keys allow matches which span several lines and must both be mutually exclusive with the match key. Each is a regular expression pattern. begin is the pattern that starts the block and end is the pattern which ends the block. Captures from the begin pattern can be referenced in the end pattern by using normal regular expression back-references. This is often used with here-docs. A begin/end rule can have nested patterns using the patterns key.
    , begin : Optional Text
    -- these keys allow matches which span several lines and must both be mutually exclusive with the match key. Each is a regular expression pattern. begin is the pattern that starts the block and end is the pattern which ends the block. Captures from the begin pattern can be referenced in the end pattern by using normal regular expression back-references. This is often used with here-docs. A begin/end rule can have nested patterns using the patterns key.
    , end: Optional Text

    -- allows you to assign attributes to the captures of the match pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , captures : Optional Captures -- FIXME: object with recursive values name - pattern

    -- allows you to assign attributes to the captures of the begin pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , beginCaptures: Optional Captures

    -- allows you to assign attributes to the captures of the end pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , endCaptures: Optional Captures

    -- applies to the region between the begin and end matches
    , patterns: Optional (List Pattern)  -- * should be optional to omit from the output !!!
    , applyEndPatternLast: Optional Integer -- 0/1
    , while: Optional Text 
 
  }) -> params 

in mkPattern

{-
"dependencies": {
        "begin": ["end"],
        "end": ["begin"],
        "contentName": ["begin","end"],
        "beginCaptures": ["begin","end"],
        "endCaptures": ["begin","end"],
        "patterns": ["begin","end"],
        "applyEndPatternLast": ["end"]
      }

-}

{-

 "captures": {
      "type": "object",
      "patternProperties": {
        "^[0-9]+$": {
          "type": "object",
          "properties": {
            "name": { "$ref": "#/definitions/name" },
            "patterns": {
              "type": "array",
              "items": { "$ref": "#/definitions/pattern" },
              "default": [ ]
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false
    },

-}

{-
"name": {
      "anyOf": [
        {
          "type": "Text",
          "pattern": "^[\\w0-9]+(\\.[\\w0-9-]+)*$"
        },
        {
          "type": "Text",
          "enum": [
            "comment",
            "comment.block",
            "comment.block.documentation",
            "comment.line",
            "comment.line.double-dash",
            "comment.line.double-slash",
            "comment.line.number-sign",
            "comment.line.percentage",
            "constant",
            "constant.character",
            "constant.character.escape",
            "constant.language",
            "constant.numeric",
            "constant.other",
            "constant.regexp",
            "constant.rgb-value",
            "constant.sha.git-rebase",
            "emphasis",
            "entity",
            "entity.name",
            "entity.name.class",
            "entity.name.function",
            "entity.name.method",
            "entity.name.section",
            "entity.name.selector",
            "entity.name.tag",
            "entity.name.type",
            "entity.other",
            "entity.other.attribute-name",
            "entity.other.inherited-class",
            "header",
            "invalid",
            "invalid.deprecated",
            "invalid.illegal",
            "keyword",
            "keyword.control",
            "keyword.control.less",
            "keyword.operator",
            "keyword.operator.new",
            "keyword.other",
            "keyword.other.unit",
            "markup",
            "markup.bold",
            "markup.changed",
            "markup.deleted",
            "markup.heading",
            "markup.inline.raw",
            "markup.inserted",
            "markup.italic",
            "markup.list",
            "markup.list.numbered",
            "markup.list.unnumbered",
            "markup.other",
            "markup.punctuation.list.beginning",
            "markup.punctuation.quote.beginning",
            "markup.quote",
            "markup.raw",
            "markup.underline",
            "markup.underline.link",
            "meta",
            "meta.cast",
            "meta.parameter.type.variable",
            "meta.preprocessor",
            "meta.preprocessor.numeric",
            "meta.preprocessor.Text",
            "meta.return-type",
            "meta.selector",
            "meta.structure.dictionary.key.python",
            "meta.tag",
            "meta.type.annotation",
            "meta.type.name",
            "metatag.php",
            "storage",
            "storage.modifier",
            "storage.modifier.import.java",
            "storage.modifier.package.java",
            "storage.type",
            "storage.type.cs",
            "storage.type.java",
            "Text",
            "Text.html",
            "Text.interpolated",
            "Text.jade",
            "Text.other",
            "Text.quoted",
            "Text.quoted.double",
            "Text.quoted.other",
            "Text.quoted.single",
            "Text.quoted.triple",
            "Text.regexp",
            "Text.unquoted",
            "Text.xml",
            "Text.yaml",
            "strong",
            "support",
            "support.class",
            "support.constant",
            "support.function",
            "support.function.git-rebase",
            "support.other",
            "support.property-value",
            "support.type",
            "support.type.property-name",
            "support.type.property-name.css",
            "support.type.property-name.less",
            "support.type.property-name.scss",
            "support.variable",
            "variable",
            "variable.language",
            "variable.name",
            "variable.other",
            "variable.parameter"
          ]
        }
      ]
    }

-}