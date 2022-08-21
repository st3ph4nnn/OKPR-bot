var request = require('async-request');
var fs = require('fs');

async function download(downloadFrom, downloadTo) {
  await request.get('https://www.okpr.fun/' + downloadFrom, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFileSync(downloadTo);
      return false;
    }
  });
}

async function upload(uploadFrom) {
  await request.post({ url:'https://www.okpr.fun/upload.php', formData: {
    file: fs.createReadStream(uploadFrom)
  } }, function callback( err, response, body ) {
      if (!error && response.statusCode == 200) {
          return true;
      }
  });
} 