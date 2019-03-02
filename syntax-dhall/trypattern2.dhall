  let Pattern
        : Type
        =   ∀(Capture : Type)
          → ∀(Pattern : Type)
          → ∀ ( MakePattern
              :   { comment :
                      Optional Text
                  , disabled :
                      Optional Integer
                  , include :
                      Optional Text
                  , match :
                      Optional Text
                  , name :
                      Optional Text
                  , contentName :
                      Optional Text
                  , begin :
                      Optional Text
                  , end :
                      Optional Text
                  , captures :
                      Optional Capture
                  , beginCaptures :
                      Optional Capture
                  , endCaptures :
                      Optional Capture
                  , patterns :
                       List Pattern
                  , applyEndPatternLast :
                      Optional Integer
                  , while :
                      Optional Text
                  }
                → Pattern
              )
          → Pattern

let example: Pattern
    =    λ(Capture : Type)  
      →  λ(Pattern : Type) 
      →  λ(MakePattern : { 
                    comment : Optional Text
                  , disabled : Optional Integer
                  , include : Optional Text
                  , match : Optional Text
                  , name : Optional Text
                  , contentName : Optional Text
                  , begin : Optional Text
                  , end : Optional Text
                  , captures : Optional Capture
                  , beginCaptures : Optional Capture
                  , endCaptures : Optional Capture
                  , patterns : List Pattern 
                  , applyEndPatternLast : (Optional Integer)
                  , while : Optional Text
                  } → Pattern)
      → MakePattern
        { 
                    comment = Some "text"
                  , disabled = None Integer
                  , include = None Text
                  , match = None Text
                  , name = None Text
                  , contentName = None Text
                  , begin = None Text
                  , end = None Text
                  , captures = None Capture
                  , beginCaptures = None Capture
                  , endCaptures = None Capture
                  , patterns = []: List Pattern
                  , applyEndPatternLast = None Integer
                  , while = None Text
        }
        
in example (Natural) (Optional Text) (\(p: {   
                    comment : Optional Text
                  , disabled : Optional Integer
                  , include : Optional Text
                  , match : Optional Text
                  , name : Optional Text
                  , contentName : Optional Text
                  , begin : Optional Text
                  , end : Optional Text
                  , captures : Optional Natural
                  , beginCaptures : Optional Natural
                  , endCaptures : Optional Natural
                  , patterns : List (Optional Text) 
                  , applyEndPatternLast : (Optional Integer)
                  , while : Optional Text
                   }) -> p.comment )

-- I don't mind repeating this definitions three times, but how to convert this to json?
