var input, button, greeting;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(215, 168, 219);
    
    input = createInput();
    input.position(20, 15);

    button = createButton('Ver resultado');
    button.position(input.x + input.width, 15);
    button.mousePressed(handleButton);
  
    buttonInstagram1 = createButton("Ver Mensagem do Instragram");
    buttonInstagram1.position(20, 45);
    buttonInstagram1.mousePressed(instagram1);

    result = createElement();
    result.position(20, 70);

}


function instagram1() {
    result.html("Resultado: " + binToStr("01000100 01100101 01110011 01100011 01110101 01101100 01110000 01100101 01101101 00100000 01100101 01110101 00100000 01100111 01101111 01110011 01110100 01101111 00100000 01100100 01100101 00100000 01100101 01101110 01101001 01100111 01101101 01100001 01110011"));
}

function handleButton() {
    if(input.value() != "")
        result.html("Resultado: " + binToStr(input.value()));
    else 
        result.html("Escreve algo ai ne");
}


/**
 * Convert string to binary. 
 * Remove unnecessary spaces and add a new one every 8 chars.
 * Origin code ourcodeworld.com
 * @param {*} str to be converted
 */
function binToStr(str) {
    // Removes the spaces from the binary string and add a space every 8 characters
    str = str.replace(/\s+/g, '');
    str = str.match(/.{1,8}/g).join(" ");

    let bin = str.split(" ");
    let result = "";

    for (i = 0; i < bin.length; i++) 
        result += String.fromCharCode(parseInt(bin[i], 2));

    return result;
}