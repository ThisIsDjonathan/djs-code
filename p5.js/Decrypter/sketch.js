let enMsgInput, deMsgInput, nInput;

function setup() {
  createCanvas(500, 500);
  textAlign(CENTER);
  textSize(20);
  
  nInput = createInput();
  nInput.position(10, 10);
  nInput.value(1);
  
  enMsgInput = createInput();
  enMsgInput.position(10, 40);
  enMsgInput.value('SDRS');

  deMsgInput = createInput();
  deMsgInput.position(10, 70);
  deMsgInput.value('TEST');

}

function draw() {
  background(255);

  let enMsg = enMsgInput.value();
  let deMsg = deMsgInput.value();
  let n = nInput.value();

  let encryptedMsg = encrypt(enMsg, -n);
  let decryptedMsg = decrypt(enMsg, +n);
  
  text(encryptedMsg, width*0.5, height*0.08);
  text(decryptedMsg, width*0.5, height*0.15);
}

function encrypt(msg, n) {
  let encryptMsg = "";
  for(let i = 0; i < msg.length; i++) {
    let charCode = msg.charCodeAt(i) + n;
    let newChar = String.fromCharCode(charCode);
    encryptMsg += newChar;
  }

  return encryptMsg;
}

function decrypt(msg, n) {
  let decryptMsg = "";
  for(let i = 0; i < msg.length; i++) {
    let charCode = msg.charCodeAt(i) + n;
    let newChar = String.fromCharCode(charCode);
    decryptMsg += newChar;
  }

  return decryptMsg;
}

