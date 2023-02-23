const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('cs347.helloWorld', function () {
		const editor = vscode.window.activeTextEditor;

		if(editor.selection.isEmpty)
		{

			// display current line number
			const position = editor.selection.active;
			console.log(position);
			vscode.window.showInformationMessage("You are on line:" + String(position.line + 1));
			
			// Find comment
			let text = editor.document.getText();
			const match = text.match(/# !@/);

			console.log(match);
			var newPosition = editor.document.positionAt(match.index);


			// Move cursor to that line
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;
		}
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
