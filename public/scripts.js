const updateProgressBar = (e) => {
  const progressDone = e.progress;
  const barWidth = Math.floor(progressDone * 100);
  const barStyle = `${barWidth}%`;
  document.querySelector(".progress-bar").style.width = barStyle;
  document
    .querySelector(".progress-bar")
    .setAttribute("aria-valuenow", barWidth);
};

const addFile = async (e) => {
  e.preventDefault();
  const file = e.target[0].files[0];

  const data = {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
  };
  const postUrl = `http://localhost:3000/get-put-link`;
  const postResp = await axios.post(postUrl, data);
  const postData = postResp.data;

  if (!postData.signedLink) {
    swal({
      title: "Express rejected the link",
      icon: "error",
    });
    return;
  }
  document.getElementById("progress-wrapper").style.display = "block";
  const awsFinalResp = await new Promise(async (resolve, reject) => {
    try {
      const config = {};
      config.headers = {
        "content-type": postData.mimeType,
      };
      config.onUploadProgress = (e) => updateProgressBar(e);
      const awsResp = await axios.put(postData.signedLink, file, config);
      console.log(awsResp);
      resolve(awsResp);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  if (awsFinalResp.status !== 200) {
  }

  const finalUrlToExpress = `http://localhost:3000/finalize-upload`;
  const finalData = {
    key: postData.uniqueKeyName,
  };
  const expressResp = await axios.post(finalUrlToExpress, finalData);
  const imgLink = expressResp.data;
  document.getElementById(
    "current-image"
  ).innerHTML = `<img src="${imgLink}" width="100%" />`;
};

document.getElementById("file-form").addEventListener("submit", addFile);
