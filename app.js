let wrap = document.querySelector('#wrap'),
    $hsl = document.querySelector('#hslText'),
    $rgb = document.querySelector('#rgbText'),
    $hex = document.querySelector('#hexText'),
    h = 200, s = 50, l = 40,
    r = 255, g = 255, b = 255,
    hsl = function () {
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    },
    rgb = function () {
        return 'rgb(' + hexToRgb(hslToHex(h, s, l)) + ')';
    },
    hex = function () {
        return 'hex:' + hslToHex(h, s, l);
    }

const hexToRgb = hex =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));

window.addEventListener('mousemove', handleMouse);
window.addEventListener('keydown', handleKeys);
window.addEventListener('click', () => {
    window.removeEventListener('mousemove', handleMouse);
    copyToClipboard('hslText');
    setTimeout(function() {window.addEventListener('mousemove', handleMouse)}, 500);
    return false;
});

$hsl.innerHTML = hsl();
$rgb.innerHTML = rgb();
$hex.innerHTML = hex();


function handleMouse(event) {
    h = Math.round(event.clientX / (window.innerWidth / 360)),
        s = Math.round(event.clientY / (window.innerHeight / 100));
    wrap.style.backgroundColor = hsl();
    $hsl.innerHTML = hsl();
    $rgb.innerHTML = rgb();
    $hex.innerHTML = hex();
}

function handleKeys(event) {
    if (event.keyCode == 38 && l < 100) l++;
    if (event.keyCode == 40 && l >= 0) l--;
    if (event.keyCode == 40 && l < 0) l = 0;
    $hsl.innerHTML = hsl();
    $rgb.innerHTML = rgb();
    $hex.innerHTML = hex();
    wrap.style.backgroundColor = hsl();
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function copyToClipboard(id) {
    let r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    showMsg('Copied!');
}

function showMsg(msg) {
    $hsl.innerHTML = msg;
}