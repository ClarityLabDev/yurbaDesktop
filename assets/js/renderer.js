if (window.electron) {
  window.electron.on('update-webview-data', (event, { mainColor, textColor, title }) => {
    document.documentElement.style.setProperty('--yurba-main-color', mainColor);
    document.documentElement.style.setProperty('--yurba-text-color', textColor);

    let go_back_btn = document.querySelector("#go-back")
    let go_forward_btn = document.querySelector("#go-forward")

    go_back_btn.classList.toggle("unactive", !webview.canGoBack());
    go_forward_btn.classList.toggle("unactive", !webview.canGoForward());

    if(Array.isArray(title)) {
      document.querySelector('#yurba-page-title').innerHTML = title[0]
      document.querySelector('#yurba-app-name').innerHTML = title[1]
    }
    else {
      title = title.split("|")[0].trim()
      document.querySelector('#yurba-page-title').innerHTML = title
    }
  });
} else {
  console.error('window.electron is not defined');
}

const getControlsHeight = () => {
  const controls = document.querySelector("#controls");
  if (controls) {
    return controls.offsetHeight;
  }
  return 0;
};

const calculateLayoutSize = () => {
  const webview = document.querySelector("webview");
  const windowWidth = document.documentElement.clientWidth;
  const windowHeight = document.documentElement.clientHeight;
  const controlsHeight = getControlsHeight();
  const webviewHeight = windowHeight - controlsHeight;

  webview.style.width = windowWidth + "px";
  webview.style.height = webviewHeight - 40 + "px";
};

window.addEventListener("DOMContentLoaded", () => {
  calculateLayoutSize();

  // Dynamic resize function (responsive)
  window.onresize = calculateLayoutSize;
});
