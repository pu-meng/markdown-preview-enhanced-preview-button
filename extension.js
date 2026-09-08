const vscode = require('vscode');

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'mpePreviewButton.openToSide',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== 'markdown') {
        vscode.window.showWarningMessage('请先打开一个 Markdown (.md) 文件。');
        return;
      }

      const mpeCommand = 'markdown-preview-enhanced.openPreviewToTheSide';

      try {
        const commands = await vscode.commands.getCommands(true);
        if (!commands.includes(mpeCommand)) {
          vscode.window.showErrorMessage(
            '没有检测到 Markdown Preview Enhanced 的侧边预览命令。请确认已安装并启用 shd101wyy.markdown-preview-enhanced。'
          );
          return;
        }
        await vscode.commands.executeCommand(mpeCommand);
      } catch (err) {
        vscode.window.showErrorMessage(`打开 MPE 侧边预览失败：${String(err)}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
