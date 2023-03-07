const vscode = require('vscode');
const sound = require("sound-play");


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
			if (allMatches.length == 0) {
				vscode.window.showInformationMessage("You have no bookmarks.");
				return;
			}
			const match = allMatches.find((match) => match.index > cur_position - 4); // 4 == length of bookmark indicator (# !@)

			// If match == null, there is no next bookmark; loop around to first
			if(match == null)
			{
				playLoopSound();
			}
			var index = (match != null) ? match.index : allMatches[0].index;
			// console.log(index);

			// Move cursor to that line
			var newPosition = editor.document.positionAt(index + 4); // 4 == length of bookmark indicator (# !@)
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;

			playNextSound();

		}

	});

	async function playNextSound() {
		const path = require("path");
		const filePath = path.join(__dirname, "next_new.m4a");
		try {
			await sound.play(filePath);
			console.log("done");
		  } catch (error) {
			console.error(error);
		  }

	}
	async function playPrevSound() {
		const path = require("path");
		const filePath = path.join(__dirname, "prev_new.m4a");
		try {
			await sound.play(filePath);
			console.log("done");
		  } catch (error) {
			console.error(error);
		  }

	}

	async function playLoopSound() {
		const path = require("path");
		const filePath = path.join(__dirname, "loopAround.mp3");
		try {
			await sound.play(filePath);
			console.log("done");
		  } catch (error) {
			console.error(error);
		  }

	}



	// Command to go to previous bookmark
	let prevBookmarkCommand = vscode.commands.registerCommand('cs347.prevBookmark', function () {
		const editor = vscode.window.activeTextEditor;

		if(editor.selection.isEmpty) {

			// Get position (i.e. index) of cursor
			const cur_position = editor.document.offsetAt(editor.selection.active);

			// Find nearest previous bookmark
			let text = editor.document.getText();
			const allMatches = [...text.matchAll(/# !@/g)].reverse();
			if (allMatches.length == 0) {
				vscode.window.showInformationMessage("You have no bookmarks.");
				return;
			}
			const match = allMatches.find((match) => match.index < cur_position - 4); // 4 == length of bookmark indicator (# !@)

			// If match == null, there is no next bookmark; loop around to last
			if(match == null)
			{
				playLoopSound();
			}
			var index = (match != null) ? match.index : allMatches[0].index;
			// console.log(index);

			// Move cursor to that line
			var newPosition = editor.document.positionAt(index + 4); // 4 == length of bookmark indicator (# !@)
			var newSelection = new vscode.Selection(newPosition, newPosition);
			editor.selection = newSelection;

			playPrevSound();
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
