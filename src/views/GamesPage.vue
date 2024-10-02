<template>
  <v-container fluid>
    <particles />
    <div v-for="game in games">
      <canvas :ref="refMaker(game, 'canvas')" :width="gamesCircleRadius * 2" :height="gamesCircleRadius * 2"></canvas>
      <img :ref="refMaker(game, 'img')" :src="game.img" :width="gamesCircleRadius*2" @click="gameClick(game.name)">
    </div>
  </v-container>
</template>

<script>
import api from "@/api";
import sudoku from "@/assets/sudoku.png"
import tanktrouble from "@/assets/tanktrouble.png"

export default {
  name: 'GamesPage',
  components: {
    particles: () => import("@/components/particles"),
  },
  data() {
    return {
      bubbles: [],
      bubbleCount: 10,
      bubbleImage: null,
      canvasContext: [],
      animationFrameId: null,
      games: [{id: 0, img: sudoku, name: 'Sudoku'}, {id: 1, img: tanktrouble, name: 'Tanktrouble'}],
      gamesCircleRadius: 120,
      pageWidth: window.innerWidth,
      pageHeight: window.innerHeight,
    }
  },
  async mounted() {
    let token = localStorage.getItem("token");
    await api.auth.tokenVerify({ token: token }).catch((error) => {
      this.$router.push({ path: "/" });
    })

    window.addEventListener('resize', this.updatePageWidth);
    this.init()
  },
  methods: {
    init() {
      let x = parseInt((this.pageWidth - (this.games.length)*2*this.gamesCircleRadius) / (this.games.length + 1))
      let y = parseInt(this.pageHeight / 2) - this.gamesCircleRadius
      for (let i=0 ; i<this.games.length ; i++) {
        this.games[i].left = (i+1)*x + i*2*this.gamesCircleRadius
        this.games[i].top = y
        let imgXY = this.gamesCircleRadius - this.gamesCircleRadius + 2

        let canvasRef = 'canvas' + i
        let imgRef = 'img' + i
        this.canvasContext.push(this.$refs[canvasRef][0].getContext('2d'))
        this.bubbles.push([])

        this.$refs[canvasRef][0].style.left = this.games[i].left + "px"
        this.$refs[canvasRef][0].style.top = this.games[i].top + "px"
        this.$refs[imgRef][0].style.left = this.games[i].left + imgXY + "px"
        this.$refs[imgRef][0].style.top = this.games[i].top + imgXY + "px"
      }

      this.loadBubbleImage();
    },
    refMaker(game, prefix) {
      return prefix + game.id
    },
    loadBubbleImage() {
      this.bubbleImage = new Image()
      this.bubbleImage.src = require('@/assets/bubble.png');
      this.bubbleImage.onload = () => {
        this.createBubbles();
        this.animateBubbles();
      };
    },
    createBubbles() {
      for (let id = 0; id < this.games.length; id++) {
        let tmp = []
        for (let i = 0; i < this.bubbleCount; i++) {
          const x = Math.random() * 200 + 50;
          const y = Math.random() * 100 + 150;
          const size = Math.random() * 20 + 30;
          const speed = Math.random() * 2 + 1
          tmp.push({ x, y, size, speed, popping: false });
        }
        this.bubbles[id] = tmp
      }
    },
    drawCircle(id) {
      this.canvasContext[id].beginPath();
      this.canvasContext[id].arc(this.gamesCircleRadius, this.gamesCircleRadius, this.gamesCircleRadius, 0, Math.PI * 2, false);
      this.canvasContext[id].fillStyle = 'lightblue';
      this.canvasContext[id].fill();
      this.canvasContext[id].closePath();
    },
    drawBubbles(id) {
      this.bubbles[id].forEach((bubble) => {
        if (!bubble.popping) {
          this.canvasContext[id].drawImage(this.bubbleImage, bubble.x, bubble.y, bubble.size, bubble.size);
        }
      });
    },
    animateBubbles() {
      for (let id = 0; id < this.games.length; id++) {
        this.canvasContext[id].clearRect(this.games[id].left, this.games[id].top, this.gamesCircleRadius*2, this.gamesCircleRadius*2);
        this.drawCircle(id);
        this.drawBubbles(id);
  
        this.bubbles[id].forEach((bubble) => {
          if (!bubble.popping) {
            bubble.y -= bubble.speed
            if (bubble.y <= 0) {
              bubble.popping = true;
              setTimeout(() => {
                bubble.x = Math.random() * 200 + 50;
                bubble.y = Math.random() * 100 + 150;
                bubble.size = Math.random() * 20 + 30;
                bubble.speed = Math.random() * 2 + 1
                bubble.popping = false;
              }, 100);
            }
          }
        });
      }

      this.animationFrameId = requestAnimationFrame(this.animateBubbles);
    },
    updatePageWidth() {
      this.pageWidth = window.innerWidth;
    },
    gameClick(game) {
      this.$router.push(`/games/${game}`)
    }
  },
  watch: {
    pageWidth(val) {
      this.init()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.updatePageWidth);
  },
}
</script>

<style scoped>
canvas {
  position: absolute;
  border: 2px solid #1976d2;
  border-radius: 50%;
}
img {
  position: absolute;
  opacity: 0.15;
}
img:hover {
  opacity: 1;
  cursor: pointer;
}
</style>