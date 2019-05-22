#!/usr/bin/env bash

npx vscode-tmgrammar-test -s source.dhall -g syntaxes/dhall.tmLanguage.json -t 'tests/unit/**/*.test.dhall'
npx vscode-tmgrammar-snap -s source.dhall -g syntaxes/dhall.tmLanguage.json -t 'tests/snapshot/**/*.test.dhall'