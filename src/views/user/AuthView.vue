<template>
  <Login v-if="componentLogin"></Login>
  <Registration v-if="componentRegistration"></Registration>
</template>

<script>
import Registration from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";

export default {
  name: "AuthView",
  components: {
    Registration,
    Login
  },
  data(){
    return {
      componentLogin: false,
      componentRegistration: false,
    }
  },

  created() {
    this.defineComponent()
    this.addCanvas()
  },

  updated() {
    this.defineComponent()
  },

  methods: {
    defineComponent() {
      if(document.location.pathname === '/login') {
        this.componentLogin = true
        this.componentRegistration = false
      } else if (document.location.pathname === '/registration') {
        this.componentLogin = false
        this.componentRegistration = true
      }
    },
    addCanvas() {
      let canvas = document.getElementById("particle");
      if(canvas === null){
        (function(){

          let canvas = document.createElement('canvas'),
              ctx = canvas.getContext('2d'),
              w = canvas.width = innerWidth,
              h = canvas.height = innerHeight,
              particles = [],
              properties = {
                bgColor: '#ff8e08',
                particleColor: '#fff',
                particleRadius: 4,//размер
                particleCount: 80,//кол-во
                particleMaxVelocity: 0.8,//скорость
                lineLength: 150,// длинна соединения
                particleLife: 6,
              };
          canvas.setAttribute("id", "particle");
          document.querySelector('#app').appendChild(canvas);

          window.onresize = function(){
            w = canvas.width = innerWidth,
                h = canvas.height = innerHeight;
          }

          class Particle{
            constructor(){
              this.x = Math.random()*w;
              this.y = Math.random()*h;
              this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
              this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
              this.life = Math.random()*properties.particleLife*60;
            }
            position(){
              this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0? this.velocityX*=-1 : this.velocityX;
              this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0? this.velocityY*=-1 : this.velocityY;
              this.x += this.velocityX;
              this.y += this.velocityY;
            }
            reDraw(){
              ctx.beginPath();
              ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
              ctx.closePath();
              ctx.fillStyle = properties.particleColor;
              ctx.fill();
            }
            reCalculateLife(){
              if(this.life < 1){
                this.x = Math.random()*w;
                this.y = Math.random()*h;
                this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                this.life = Math.random()*properties.particleLife*60;
              }
              this.life--;
            }
          }

          function reDrawBackground(){
            ctx.fillStyle = properties.bgColor;
            ctx.fillRect(0, 0, w, h);
          }

          function drawLines(){
            var x1, y1, x2, y2, length, opacity;
            for(var i in particles){
              for(var j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if(length < properties.lineLength){
                  opacity = 1-length/properties.lineLength;
                  ctx.lineWidth = '0.5';
                  ctx.strokeStyle = 'rgba(255, 255, 255, '+opacity+')';
                  ctx.beginPath();
                  ctx.moveTo(x1, y1);
                  ctx.lineTo(x2, y2);
                  ctx.closePath();
                  ctx.stroke();
                }
              }
            }
          }

          function reDrawParticles(){
            for(var i in particles){
              particles[i].reCalculateLife();
              particles[i].position();
              particles[i].reDraw();
            }
          }

          function loop(){
            reDrawBackground();
            reDrawParticles();
            drawLines();
            requestAnimationFrame(loop);
          }

          function init(){
            for(var i = 0 ; i < properties.particleCount ; i++){
              particles.push(new Particle);
            }
            loop();
          }

          init();

        }())
      }

    },
  }
}
</script>

<style scoped>

</style>