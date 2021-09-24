const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const console = require("console");
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext('2d');
const { layers, width, height } = require("./input/config.js");
const edition = 1000;

const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`./output/${_edition}.png`, _canvas.toBuffer("image/png"));

};


const drawLayer = async(_layer, _edition) => {
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    ctx.drawImage(image,
        _layer.position.x,
        _layer.position.y,
        _layer.size.width,
        _layer.size.height
    );
    console.log(`I created the ${_layer.name} layer, and choose element ${element.name}`);
    saveLayer(canvas, _edition);

};

for (let i = 1; i <= edition; i++) {
    layers.forEach((layer) => {
        drawLayer(layer, i);
    });
    console.log("Creating edition" + i);
};