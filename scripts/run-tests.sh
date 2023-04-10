#!/usr/bin/env bash

npx vscode-tmgrammar-test -g "syntaxes/dhall.tmLanguage.json" "tests/unit/**/*.test.dhall"
npx vscode-tmgrammar-snap -s source.dhall -g "syntaxes/dhall.tmLanguage.json" "tests/snapshot/**/*.test.dhall"
