const LCD_OFF = "#aebd9a";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");

ctx.fillStyle = LCD_OFF;
ctx.fillRect(0, 0, canvas.width, canvas.height);
