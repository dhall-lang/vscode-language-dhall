{- Don't repeat yourself!

   Repetition is error-prone
-}

let user = "bill"
in  { home       = "/home/${user}"
    , privateKey = "/home/${user}/id_ed25519"
    , publicKey  = "/home/${user}/id_ed25519.pub"
}

{- Change the name "bill" to "jane" -}