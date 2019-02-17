
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
                      Capture
                  , beginCaptures :
                      Capture
                  , endCaptures :
                      Capture
                  , patterns :
                      List Pattern
                  , applyEndPatternLast :
                      Integer
                  , while :
                      Text
                  }
                → Pattern
              )
          → Pattern

in  Pattern
