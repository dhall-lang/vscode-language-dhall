{ `$schema` : Optional Text
, name : Optional Text 

{- this should be a unique name for the grammar, following the convention of being a dot-separated name where each new (left-most) part specializes the name. Normally it would be a two-part name where the first is either text or source and the second is the name of the language or document type. But if you are specializing an existing type, you probably want to derive the name from the type you are specializing. For example Markdown is text.html.markdown and Ruby on Rails (rhtml files) is text.html.rails. The advantage of deriving it from (in this case) text.html is that everything which works in the text.html scope will also work in the text.html.«something» scope (but with a lower precedence than something specifically targeting text.html.«something»).
   "pattern": "^(text|source)(\\.[\\w0-9-]+)+$" -}
, scopeName : Text

{- regular expressions that lines (in the document) are matched against. If a line matches one of the patterns (but not both), it becomes a folding marker (see the foldings section for more info). -}
, foldingStartMarker: Optional Text

{- regular expressions that lines (in the document) are matched against. If a line matches one of the patterns (but not both), it becomes a folding marker (see the foldings section for more info). -}
, foldingStopMarker: Optional Text 

{- this is an array of file type extensions that the grammar should (by default) be used with. This is referenced when TextMate does not know what grammar to use for a file the user opens. If however the user selects a grammar from the language pop-up in the status bar, TextMate will remember that choice. -}
, fileTypes : List Text -- default []

, uuid: Optional Text
, firstLineMatch: Optional Text

--- from Grammar:
, patterns :  List Text  -- FIXME: List Patterns, default []
, repository: Optional { mapKey : Text, mapValue: Text } -- FIXME: reference on grammar
}