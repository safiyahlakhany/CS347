const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Command to go to next bookmark
	let nextBookmarkCommand = vscode.commands.registerCommand('cs347.nextBookmark', function () {
		const editor = vscode.window.activeTextEditor;

		if(editor.selection.isEmpty) {

			// Get position (i.e. index) of cursor
			const cur_position = editor.document.offsetAt(editor.selection.active);

			// Find nearest next bookmark
			let text = editor.document.getText();
			const allMatches = [...text.matchAll(/# !@/g)];
			const match = allMatches.find((match) => match.index > cur_position);

			// If match == null, there is no next bookmark; loop around to first
			var index = (match != null) ? match.index : allMatches[0].index;
			// console.log(index);

			// Move cursor to that line
			var newPosition = editor.document.positionAt(index);
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;
		}

	});

	// Command to go to previous bookmark
	let prevBookmarkCommand = vscode.commands.registerCommand('cs347.prevBookmark', function () {
		const editor = vscode.window.activeTextEditor;

		if(editor.selection.isEmpty) {

			// Get position (i.e. index) of cursor
			const cur_position = editor.document.offsetAt(editor.selection.active);

			// Find nearest previous bookmark
			let text = editor.document.getText();
			const allMatches = [...text.matchAll(/# !@/g)].reverse();
			const match = allMatches.find((match) => match.index < cur_position);

			// If match == null, there is no next bookmark; loop around to last
			var index = (match != null) ? match.index : allMatches[0].index;
			// console.log(index);

			// Move cursor to that line
			var newPosition = editor.document.positionAt(index);
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;
		}
		
	});

	context.subscriptions.push(nextBookmarkCommand);
	context.subscriptions.push(prevBookmarkCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
