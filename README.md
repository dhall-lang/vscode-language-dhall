# Dhall Language support 

Syntax highlighting support for the [Dhall](https://dhall-lang.org) programming language.

**Note:** I've added different highlights for lowercase and uppercase constants. It's kind of makes sense, but in some instances it doesn't. We can discuss this on github if it's too distracting I'd turn it off.

# Highlighting
Adds highlighting support for Dhall (.dhall) files.
Big Kudos for the [Sublime Dhall](https://github.com/SQbQxeKd3JHD8/SublimeDhall) which served as a reference.


![Screenshot Highlighting](/images/highlight-example.png?raw=true)

# Development
Source code is located at `src/typescript/dhall-tmlanguage.ts` and is an executable typescript file.

Build steps:

```bash
npm install
npm build
npx ts-node src/typescript/dhall-tmlanguage.ts > ./syntaxes/dhall.tmLanguage.json
```


# Dev Resources

* [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
* [Description of the grammar rules](https://macromates.com/manual/en/language_grammars)
* [Dhall ABNF Reference](https://github.com/dhall-lang/dhall-lang/blob/master/standard/dhall.abnf)
* [Dhall website](https://dhall-lang.org/)



