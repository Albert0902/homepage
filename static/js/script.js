document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

var buttons = document.querySelectorAll('.projectItem');
buttons.forEach(function (button) {
    button.addEventListener('mousedown', handlePress);
    button.addEventListener('mouseup', handleRelease);
    button.addEventListener('mouseleave', handleCancel);
    button.addEventListener('touchstart', handlePress);
    button.addEventListener('touchend', handleRelease);
    button.addEventListener('touchcancel', handleCancel);
});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}






document.addEventListener('DOMContentLoaded', function () {

    var html = document.querySelector('html');
    var themeState = getCookie("themeState") || "Light";
    var tanChiShe = document.getElementById("tanChiShe");

    function changeTheme(theme) {
        tanChiShe.src = "./static/svg/snake-" + theme + ".svg";
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        themeState = theme;
    }

    var Checkbox = document.getElementById('myonoffswitch')
    Checkbox.addEventListener('change', function () {
        if (themeState == "Dark") {
            changeTheme("Light");
        } else if (themeState == "Light") {
            changeTheme("Dark");
        } else {
            changeTheme("Dark");
        }
    });

    if (themeState == "Dark") {
        Checkbox.checked = false;
    }

    changeTheme(themeState);

    // 背景切换
    var bgState = getCookie("bgState") || "1";

    function changeBg(state) {
        document.documentElement.dataset.bg = state;
        setCookie("bgState", state, 365);
        bgState = state;
    }

    changeBg(bgState);

    var bgToggleBtn = document.getElementById('bgToggleBtn');
    if (bgToggleBtn) {
        bgToggleBtn.addEventListener('click', function () {
            changeBg(bgState === "1" ? "2" : "1");
        });
    }

    // 模糊度滑杆
    var blurSlider = document.getElementById('blurSlider');
    var blurValueEl = document.getElementById('blurValue');
    var blurControl = document.querySelector('.blurControl');
    if (blurSlider) {
        // 读取保存的值
        var savedBlur = getCookie("blurLevel");
        if (savedBlur !== null) {
            blurSlider.value = savedBlur;
            document.documentElement.style.setProperty('--card_filter', savedBlur + 'px');
        } else {
            document.documentElement.style.setProperty('--card_filter', blurSlider.value + 'px');
        }
        // 更新数值显示
        if (blurValueEl) blurValueEl.textContent = blurSlider.value;

        blurSlider.addEventListener('input', function () {
            var val = this.value;
            document.documentElement.style.setProperty('--card_filter', val + 'px');
            if (blurValueEl) blurValueEl.textContent = val;
            // 更新 blurControl 的模糊
            if (blurControl) {
                blurControl.style.setProperty('--card_filter', val + 'px');
            }
        });

        blurSlider.addEventListener('change', function () {
            setCookie("blurLevel", this.value, 365);
        });
    }

    // 底部固定提示
    var bottomTip = document.getElementById('bottomTip');

    document.querySelectorAll('[data-tip]').forEach(function (el) {
        el.addEventListener('mouseenter', function () {
            bottomTip.textContent = this.getAttribute('data-tip');
            var rect = this.getBoundingClientRect();
            var tipText = this.getAttribute('data-tip');
            // 毛玻璃标签的 tooltip 往下偏移 50px
            var offset = (tipText === '毛玻璃模糊度') ? 13 : 0;
            bottomTip.style.left = rect.left + rect.width / 2 + 'px';
            bottomTip.style.top = (rect.bottom + offset) + 'px';
            bottomTip.classList.add('show');
        });
        el.addEventListener('mouseleave', function () {
            bottomTip.classList.remove('show');
        });
    });

    // 图片弹窗（事件委托）
    document.addEventListener('click', function(e) {
        var honorItem = e.target.closest('.honorItem');
        if (!honorItem) return;
        // 如果点的是按钮，不触发动画关闭
        if (e.target === document.getElementById('honorPopupLink') || e.target === document.getElementById('honorPopupLinkGh')) return;

        var imgSrc = honorItem.getAttribute('data-img');
        var linkHref = honorItem.getAttribute('data-link');
        var linkGhHref = honorItem.getAttribute('data-link-gh');

        if (!imgSrc) return;

        var honorPopup = document.getElementById('honorPopup');
        var honorPopupImg = document.getElementById('honorPopupImg');
        var honorPopupLink = document.getElementById('honorPopupLink');
        var honorPopupLinkGh = document.getElementById('honorPopupLinkGh');

        honorPopupImg.src = imgSrc;
        honorPopup.classList.add('active');

        if (linkHref) {
            honorPopupLink.href = linkHref;
            honorPopupLink.classList.add('show');
        } else {
            honorPopupLink.classList.remove('show');
        }
        if (linkGhHref) {
            honorPopupLinkGh.href = linkGhHref;
            honorPopupLinkGh.classList.add('show');
        } else {
            honorPopupLinkGh.classList.remove('show');
        }
    });

    document.getElementById('honorPopup').addEventListener('click', function(e) {
        if (e.target.id === 'honorPopupLink' || e.target.id === 'honorPopupLinkGh') return;
        document.getElementById('honorPopup').classList.remove('active');
    });

});






