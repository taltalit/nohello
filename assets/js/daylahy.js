const TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 900;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    const introBox = document.getElementById('introBox');
    const whyBox = document.getElementById('whyBox');
    const whyButton = document.getElementById('whyButton');
    whyButton.addEventListener('click', () => {
        console.log('click');
        introBox.classList.add('hide');
        introBox.classList.remove('show');
        whyBox.classList.add('show');
        whyBox.classList.remove('hide');

    })

    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        whyBox.classList.add('hide');
        whyBox.classList.remove('show');

        introBox.classList.add('show');
        introBox.classList.remove('hide');
    })
    // INJECT CSS
    // var css = document.createElement("style");
    // css.type = "text/css";
    // // css.innerHTML = ".typewrite > .wrap { border-left: 0.08em solid #000}";
    // document.body.appendChild(css);
};

