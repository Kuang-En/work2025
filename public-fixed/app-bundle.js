window.addEventListener('load', function() {
  startRes();
}, false);
function startRes() {
  TagCanvas.Start('resCanvas', 'demoTags', {
    fadeIn:500,
    textColour: '#fff',
    textHeight: 25,
    maxSpeed: 0.01,
    minBrightness: 0.2,
    pulsateTo: 0.6,
    initial: [0.5,-0.3],
    decel: 0.98,
    imageScale: null,
    fadeIn: 1000,
    clickToFront: 600,
    pulsateTo: 0.2,
    pulsateTime: 0.5,
    outlineMethod: 'none',
    outlineColour: 'none',
    lock: 'x',
    noSelect: true,
    noMouse: true,
    wheelZoom: true,
    depth: 0.9,
    shape: 'sphere',
    weight: true,
    weightFrom: "data-weight",
    weightSizeMax: 40,
    weightSizeMin: 20,
    // radiusX: 0.2,
    // radiusX: 2.5,
    // bgColour: "#f5f5f5"
  });
}
function badDims() {
  var c = document.getElementById('resCanvas');
  c.width = 200;
  c.height = 200;
  startRes();
}

/**
 * page js
*/
const btnFormOpen = document.getElementById('btnFormOpen');
const btnSubmit = document.getElementById('btnSubmit');
const btnClose = Array.from(document.querySelectorAll('.modal__close'));
const decorCanvas = document.getElementById('decorCanvas');
const modalCustomInput = document.querySelector('.modal__custom-input');
const modalConfirm = document.querySelector('.modal__confirm');

// 將畫面scroll高度固定為btnFormOpen為畫面正中心的高度後才開啟modal
btnFormOpen.addEventListener('click', function() {
  const scrollTop  = window.pageYOffset || document.documentElement.scrollTop;;
  const btnRect = btnFormOpen.getBoundingClientRect();

  // 原本是在畫面正中心，應為btnHeight / 2，但為了能在大網看到香爐動畫，所以將畫面下移，改為btnHeight * 2
  const offset = scrollTop + btnRect.top - ( window.innerHeight / 2 ) + ( btnRect.height * 2 );
  window.scrollTo({
    top: offset,
  });

  openModal(modalCustomInput);
});

// X關閉modal
btnClose.forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('.modal');
    closeModal(modal);
  });
});

// 提交時先移除btnFormOpen、之後執行動畫 * 2，再移除modal
btnSubmit.addEventListener('click', function(e) {
  e.preventDefault();

  // 移除btnFormOpen
  btnFormOpen.parentNode.removeChild(btnFormOpen);
  // 關閉X按鈕
  btnClose[0].style.display = 'none';

  // 執行動畫
  modalCustomInput.classList.add('animate-hide'); // 0.75s
  decorCanvas.src='decor-canvas-active.gif'; // 2.5s

  setTimeout(() => {
    closeModal(modalCustomInput);
    // 移除許願卡
    modalCustomInput.parentNode.removeChild(modalCustomInput);
    decorCanvas.src='decor-canvas.png';

    // 趕人走
    openModal(modalConfirm);
  }, 2500);
});

function closeModal(modal) {
  modal.style.display = 'none';
  document.body.classList.remove('modal-on');
}

function openModal(modal) {
  modal.style.display = 'block';
  document.body.classList.add('modal-on');
}
