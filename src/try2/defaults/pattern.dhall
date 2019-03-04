λ(Captures : Type) -> λ(Pattern : Type) → ../defs/mkPattern.dhall (Captures) (Pattern) ({
      comment = None Text
    , disabled = None Integer -- restriction: 0 || 1

    -- this allows you to reference a different language, recursively reference the grammar itself or a rule declared in this file’s repository.
    , include = None Text

    -- a regular expression which is used to identify the portion of text to which the name should be assigned. Example: '\\b(true|false)\\b'.
    , match = None Text 

    -- the name which gets assigned to the portion matched. This is used for styling and scope-specific settings and actions, which means it should generally be derived from one of the standard names.
    , name = None Text -- ! FIXME: it's not a Text, but NAME

    -- this key is similar to the name key but only assigns the name to the text between what is matched by the begin/end patterns.
    , contentName = None Text

    -- these keys allow matches which span several lines and must both be mutually exclusive with the match key. Each is a regular expression pattern. begin is the pattern that starts the block and end is the pattern which ends the block. Captures from the begin pattern can be referenced in the end pattern by using normal regular expression back-references. This is often used with here-docs. A begin/end rule can have nested patterns using the patterns key.
    , begin = None Text
    -- these keys allow matches which span several lines and must both be mutually exclusive with the match key. Each is a regular expression pattern. begin is the pattern that starts the block and end is the pattern which ends the block. Captures from the begin pattern can be referenced in the end pattern by using normal regular expression back-references. This is often used with here-docs. A begin/end rule can have nested patterns using the patterns key.
    , end = None Text

    -- allows you to assign attributes to the captures of the match pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , captures = None Captures -- FIXME: object with recursive values name - pattern
 
    -- allows you to assign attributes to the captures of the begin pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , beginCaptures = None Captures

    -- allows you to assign attributes to the captures of the end pattern. Using the captures key for a begin/end rule is short-hand for giving both beginCaptures and endCaptures with same values.
    , endCaptures = None Captures

    -- applies to the region between the begin and end matches
    , patterns =  None (List Pattern)
    , applyEndPatternLast = None Integer -- 0/1
    , while = None Text   
 
  })