-- This is a line comment
next line should be not comment

-- First comment line
-- Second comment line

in {--} between

{-
multiline
-}
comment should be closed

-- Comments can be nested!
{- foo {- bar -} baz -} yes baby!

--! Better comments should work with my comments

{- TODO:  but no luck, alas -}


'''''''''''''''' -- should interpret as 
                 --  four escape sequences

-- rezerved words:

; A simple label cannot be one of the following reserved names:
;
; * Bool
; * Optional
; * None
; * Natural
; * Integer
; * Double
; * Text
; * List
; * True
; * False
; * NaN
; * Infinity
; * Type
; * Kind
; * Sort
; * Natural/fold
; * Natural/build
; * Natural/isZero
; * Natural/even
; * Natural/odd
; * Natural/toInteger
; * Natural/show
; * Integer/toDouble
; * Integer/show
; * Double/show
; * List/build
; * List/fold
; * List/length
; * List/head
; * List/last
; * List/indexed
; * List/reverse
; * Optional/fold
; * Optional/build
; * if
; * then
; * else
; * let
; * in
; * as
; * using
; * merge
; * constructors
; * Some





