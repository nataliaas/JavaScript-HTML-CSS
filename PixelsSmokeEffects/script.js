const canvas = document.getElementById('rame');
const ctx = canvas.getContext('2d');
canvas.width = 850;
canvas.height = 550;


const imageB = new Image();


imageB.addEventListener('load', function(){
    const gradientA = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradientA.addColorStop(0.2, 'pink');
    gradientA.addColorStop(0.3, 'red');
    gradientA.addColorStop(0.4, 'orange');
    gradientA.addColorStop(0.5, 'yellow');
    gradientA.addColorStop(0.6, 'green');
    gradientA.addColorStop(0.7, 'violet');
    gradientA.addColorStop(0.8, 'turquoise');

    let switcher = 1;
    let counter = 0;
    setInterval(function(){
        counter++;
        if (counter % 10 === 0){
            switcher *= -1;
        }
    }, 500);

    ctx.drawImage(imageB, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const letters = ['C', 'A', 'R', 'N', 'A', 'V', 'A', 'L'];
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    console.log(pixels);
    
    let particlesArray = [];
    const NumberOfParticles = 9000;

    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const red = pixels.data[(y * 4 * pixels.width) + (x * 4)];
            const green = pixels.data[(y * 4 * pixels.width) + (x * 4 + 1)];
            const blue = pixels.data[(y * 4 * pixels.width) + (x * 4 + 2)];
            const brightness = calculateRelativeBrightness(red, green, blue);
            const cell = [
                cellBrightness = brightness,
                cellColor = 'rgb(' + red + ',' + green + ',' + blue +')'
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }
    console.log(mappedImage);
    function calculateRelativeBrightness(red, green, blue){
        return Math.sqrt(
            (red * red) * 0.299 +
            (green * green) * 0.587 +
            (blue * blue) * 0.114
        )/100;
    }

    class Particle {
        constructor(){
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 0.2;
            this.size = Math.random() * 2.5 + 1;
            this.positionA = Math.floor(this.y);
            this.positionB = Math.floor(this.x);
            this.angle = 0;
            this.letter = letters[Math.floor(Math.random() * letters.length)];
            this.random = Math.random();
        }
        update(){
            this.positionA = Math.floor(this.y);
            this.positionB = Math.floor(this.x);
            if ((mappedImage[this.positionA])&&(mappedImage[this.positionA][this.positionB])){
                this.speed = mappedImage[this.positionA][this.positionB][0];
            }
            let movement = (3.5 - this.speed) + this.velocity;
           // this.angle+= this.speed/100;
            this.size = this.speed * 1.5; 

            if (switcher === 1){
                ctx.globalCompositeOperation = 'soft-light';
            } else{
                ctx.globalCompositeOperation = 'color';
            } 
                
            if (counter % 24 === 0){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            this.y += movement + Math.cos(this.angle) * 8;
            this.x += movement + Math.sin(this.angle) * 5;
            if (this.y <= 0){
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
            if (this.x >= canvas.width){
                this.x = 0;
                this.y = Math.random() * canvas.height;
            }
        }
        draw(){
            ctx.beginPath();
            if ((mappedImage[this.positionA])&&(mappedImage[this.positionA][this.positionB])){
                ctx.fillStyle = mappedImage[this.positionA][this.positionB][1];
                ctx.strokeStyle = mappedImage[this.positionA][this.positionB][1];
            }
            //ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            //ctx.strokeRect(this.x, this.y, this.size * 1, this.size * 1);
            ctx.font = '10px';
            if (this.random < 0.5) ctx.fillText(this.letter, this.x, this.y);
            else ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function init(){
        for (let i = 0; i < NumberOfParticles; i++){
            particlesArray.push(new Particle);
        }
    }
    init();
    function animate(){
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
           // ctx.globalAlpha = particlesArray[i].speed * 0.5;
            ctx.globalAlpha = 1;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
});

