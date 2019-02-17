let example: ./types/Pattern.dhall
    =    λ(Capture : Type)  
      →  λ(Pattern : Type) 
      →  λ(MakePattern : { comment : Optional Text
                --   , disabled :
                --       Optional Integer
                --   , include :
                --       Optional Text
                --   , match :
                --       Optional Text
                --   , name :
                --       Optional Text
                --   , contentName :
                --       Optional Text
                --   , begin :
                --       Optional Text
                --   , end :
                --       Optional Text
                --   , captures :
                --       Optional Capture
                --   , beginCaptures :
                --       Optional Capture
                --   , endCaptures :
                --       Optional Capture
                --   , patterns : List Pattern 
                --   , applyEndPatternLast : (Optional Integer)
                --   , while : Optional Text
                  } → Pattern)
      → MakePattern
        { 
                    comment = Some "text"
                --   , disabled = None
                --   , include = None
                --   , match = None
                --   , name = None
                --   , contentName = None
                --   , begin = None
                --   , end = None
                --   , captures = None
                --   , beginCaptures = None
                --   , endCaptures = None
                --   , patterns = []: List Pattern
                --   , applyEndPatternLast = None
                --   , while = None
        }
in example (Natural) (Optional Text) (\(p: { comment : Optional Text }) -> p.comment )