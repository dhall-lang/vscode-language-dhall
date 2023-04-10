/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Schema for language grammar description files in Textmate and compatible editors.
 */
export interface TmLanguage {
  /**
   * This should be a unique name for the grammar, following the convention of being a dot-separated name where each new (left-most) part specializes the name. Normally it would be a two-part name where the first is either `text` or `source` and the second is the name of the language or document type. But if you are specializing an existing type, you probably want to derive the name from the type you are specializing. For example Markdown is `text.html.markdown` and Ruby on Rails (rhtml files) is `text.html.rails`. The advantage of deriving it from (in this case) `text.html` is that everything which works in the `text.html` scope will also work in the `text.html.«something»` scope (but with a lower precedence than something specifically targeting `text.html.«something»`).
   */
  scopeName: string;
  /**
   * An array of file type extensions that the grammar should (by default) be used with.
   */
  fileTypes?: string[];
  /**
   * A regular expression which is matched against the first line of the document when it is first loaded. If it matches, the grammar is used for the document.
   */
  firstLineMatch?: string;
  /**
   * When the grammer is part of a larger bundle (ie., grammer + theme + whatever), the uuid helps classify which file is a part of which bundle.
   */
  uuid?: string;
  /**
   * Regular expression that lines (in the document) are matched against. If a line matches the pattern, it starts a foldable block.
   */
  foldingStartMarker?: string;
  /**
   * Regular expressions that lines (in the document) are matched against. If a line matches pattern, it ends a foldable block.
   */
  foldingStopMarker?: string;
  /**
   * An array with the actual rules used to parse the document.
   */
  patterns: Rule[];
  /**
   * A dictionary (i.e. key/value pairs) of rules which can be included from other places in the grammar. The key is the name of the rule and the value is the actual rule.
   */
  repository?: {
    [k: string]: Rule;
  };
  /**
   * The key is a scope selector that specifies which scope(s) the current grammar should be injected in.
   */
  injectionSelector?: string;
  /**
   * [VS Code only, it seems] A dictionary (i.e. key/value pairs) of rules which will be injected into an existing grammar. The key is the target scope of the parent grammar and the value is the actual rule to inject.
   */
  injections?: {
    [k: string]: Rule;
  };
  [k: string]: any;
}
export interface Rule {
  /**
   * A generic text used to describe or explain the rule.
   */
  comment?: string;
  /**
   * The scope name which gets assigned to the capture matched. This should generally be derived from one of the standard names.
   */
  name?: string;
  /**
   * Marks the rule as disabled. A disabled rule should be ignored by the tokenization engine.
   */
  disabled?: boolean | (0 | 1);
  /**
   * This key allows you to reference a different language (value == scope name), recursively reference the grammar itself (value == "$self") or a rule declared in this file’s repository (value starts with a pound (#) sign).
   */
  include?: string;
  /**
   * A regular expression which is used to identify the portion of text to which the name should be assigned.
   */
  match?: string;
  /**
   * The `begin` key is a regular expression pattern that allows matches which span several lines. Captures from the `begin` pattern can be referenced in the corresponding `end` or `while` pattern by using normal regular expression back-references, eg. `\1$`.
   */
  begin?: string;
  /**
   * A regular expression pattern that, when matched, ends the multi-line block started by the `begin` key.
   */
  end?: string;
  /**
   * A regular expression pattern that, while matched, continues the multi-line block started by the `begin` key.
   */
  while?: string;
  /**
   * Tests the `end` pattern after the other patterns in the `begin`/`end` block.
   */
  applyEndPatternLast?: boolean | (0 | 1);
  /**
   * This key is similar to the `name` key but it only assigns the name to the text between what is matched by the `begin`/`end` patterns.
   */
  contentName?: string;
  /**
   * This key allows you to assign attributes to the captures of the `match`, `begin`, `end` and `while`patterns. Using the `captures` key for a `begin`/`end` rule is short-hand for giving both `beginCaptures` and `endCaptures` with same values. The value of this key is a dictionary with the key being the capture number and the value being a dictionary of attributes to assign to the captured text.
   */
  captures?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     */
    [k: string]: {
      /**
       * The scope name which gets assigned to the capture matched. This should generally be derived from one of the standard names.
       */
      name?: string;
      /**
       * Yes, captures can be further matched against additional patterns, too.
       */
      patterns?: Rule[];
    };
  };
  /**
   * This key allows you to assign attributes to the captures of the `begin` pattern. The value of this key is a dictionary with the key being the capture number and the value being a dictionary of attributes to assign to the captured text.
   */
  beginCaptures?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     */
    [k: string]: {
      /**
       * The scope name which gets assigned to the capture matched. This should generally be derived from one of the standard names.
       */
      name?: string;
      /**
       * Yes, captures can be further matched against additional patterns, too.
       */
      patterns?: Rule[];
    };
  };
  /**
   * This key allows you to assign attributes to the captures of the `end` pattern. The value of this key is a dictionary with the key being the capture number and the value being a dictionary of attributes to assign to the captured text.
   */
  endCaptures?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     */
    [k: string]: {
      /**
       * The scope name which gets assigned to the capture matched. This should generally be derived from one of the standard names.
       */
      name?: string;
      /**
       * Yes, captures can be further matched against additional patterns, too.
       */
      patterns?: Rule[];
    };
  };
  /**
   * This key allows you to assign attributes to the captures of the `while` pattern. The value of this key is a dictionary with the key being the capture number and the value being a dictionary of attributes to assign to the captured text.
   */
  whileCaptures?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     *
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     */
    [k: string]: {
      /**
       * The scope name which gets assigned to the capture matched. This should generally be derived from one of the standard names.
       */
      name?: string;
      /**
       * Yes, captures can be further matched against additional patterns, too.
       */
      patterns?: Rule[];
    };
  };
  /**
   * An array with the actual rules used to parse the matched content.
   */
  patterns?: Rule[];
  /**
   * A dictionary (i.e. key/value pairs) of rules which can be included from other places in the grammar. The key is the name of the rule and the value is the actual rule.
   */
  repository?: {
    [k: string]: Rule;
  };
}
