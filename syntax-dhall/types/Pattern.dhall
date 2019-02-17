
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

in  Pattern
