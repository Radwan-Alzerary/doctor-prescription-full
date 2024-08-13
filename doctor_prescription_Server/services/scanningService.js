// services/scanningService.js
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const SCAN_FOLDER = path.join(__dirname, '..', 'scans');
const DEST_FOLDER = path.join(__dirname, '..', 'public', 'img');
const NAPS2_CONSOLE_PATH = path.join('C:', 'Program Files', 'NAPS2', 'naps2.console.exe');

// Ensure destination folder exists
if (!fs.existsSync(DEST_FOLDER)) {
    fs.mkdirSync(DEST_FOLDER, { recursive: true });
}

// Function to start scanning using NAPS2
const startScanning = () => {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(SCAN_FOLDER, 'scan.jpg');
        const command = `"${NAPS2_CONSOLE_PATH}" -o "${outputPath}"`;

        console.log('Executing command:', command);

        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.error('Error executing scan command:', err);
                reject(err);
                return;
            }
            console.log('Command stdout:', stdout);
            console.log('Command stderr:', stderr);

            if (fs.existsSync(outputPath)) {
                console.log('Scanning completed. File saved at:', outputPath);

                // Get current date and time
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().replace(/:/g, '-').split('.')[0]; // Format: YYYY-MM-DDTHH-MM-SS

                const fileExtension = path.extname(outputPath);
                const newFileName = `${formattedDate}${fileExtension}`;
                const newFilePath = path.join(DEST_FOLDER, newFileName);

                // Move file to destination folder and resolve with relative path
                fs.rename(outputPath, newFilePath, (err) => {
                    if (err) {
                        console.error('Error moving file:', err);
                        reject(err);
                    } else {
                        console.log(`File moved to ${newFilePath}`);
                        const relativePath = path.join('public', 'img', newFileName);
                        resolve(relativePath);
                    }
                });
            } else {
                console.error('Scanning failed. Output file not found.');
                reject(new Error('Scanning failed. Output file not found.'));
            }
        });
    });
};

// Watch for new files in the scan folder
const watcher = chokidar.watch(SCAN_FOLDER, {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    interval: 1000,
    binaryInterval: 3000,
});

watcher.on('add', filePath => {
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(fileName);

    // Get current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().replace(/:/g, '-').split('.')[0]; // Format: YYYY-MM-DDTHH-MM-SS

    const newFileName = `${formattedDate}${fileExtension}`;
    const newFilePath = path.join(SCAN_FOLDER, newFileName);
    const destPath = path.join(DEST_FOLDER, newFileName);

    // Rename file
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.error('Error renaming file:', err);
        } else {
            console.log(`File renamed to ${newFileName}`);
            // Move file to destination folder
            fs.rename(newFilePath, destPath, (err) => {
                if (err) {
                    console.error('Error moving file:', err);
                } else {
                    console.log(`File moved to ${destPath}`);
                    // Delete the file from the scans folder
                    fs.unlink(newFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log(`File ${newFilePath} deleted from scans folder`);
                        }
                    });
                }
            });
        }
    });
});

module.exports = {
    startScanning,
};
