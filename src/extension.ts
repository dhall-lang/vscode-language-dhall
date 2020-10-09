'use strict';
import vscode = require('vscode');

var open = require("open");

export function activate(context: vscode.ExtensionContext)
{

    const extensionUpgradeMessage = `The "Dhall Language Support" has moved to the 'dhall' publisher. Please, upgrade`;
    vscode.window.showInformationMessage(extensionUpgradeMessage, 'Go to VS Code Marketplace' ).then(selected => {
        if (selected === 'Go to VS Code Marketplace') {
            open('https://marketplace.visualstudio.com/items?itemName=dhall.dhall-lang');
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate()
{
}