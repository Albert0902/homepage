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

    // 图片弹窗
    var honorPopup = document.getElementById('honorPopup');
    var honorPopupImg = document.getElementById('honorPopupImg');
    var honorPopupLink = document.getElementById('honorPopupLink');
    var honorItems = document.querySelectorAll('.honorItem');

    honorItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // 如果点的是按钮，不触发动画关闭
            if (e.target === honorPopupLink) return;
            var imgSrc = this.getAttribute('data-img');
            var linkHref = this.getAttribute('data-link');
            if (imgSrc) {
                honorPopupImg.src = imgSrc;
                honorPopup.classList.add('active');
                if (linkHref) {
                    honorPopupLink.href = linkHref;
                    honorPopupLink.style.display = 'inline-block';
                } else {
                    honorPopupLink.style.display = 'none';
                }
            }
        });
    });

    honorPopup.addEventListener('click', function() {
        honorPopup.classList.remove('active');
        honorPopupImg.src = '';
    });



















});






