<template>
  <div id="app">
    <h3 class="header-text" v-html="gameTitle"></h3>
    <div class="header-input" v-if="!gameSelected">
      <vs-input icon="search" label="Search" placeholder="Search" v-model="search"/>
      <vs-select
      class="currency"
      label="Currency"
      v-model="currency"
      >
        <vs-select-item :key="index" :value="item.code" :text="[item.code, item.currency].join(' - ')" v-for="item,index in currencies" />
      </vs-select>
    </div>

    <div class="game-list" v-if="!gameSelected">
      <vs-row vs-justify="center">
        <vs-col class="game" v-for="g,i in searchedData" type="flex" vs-justify="center" vs-align="center" vs-lg="3" vs-sm="4" vs-xs="6" :key="i">
          <vs-card class="cardx" fixedHeight>
            <div slot="header">
              <h3 v-html="g.name"></h3>
            </div>
            <div slot="media">
              <img :src="g.img">
            </div>
            <div slot="footer">
              <vs-row vs-justify="flex-end">
                <vs-chip color="danger" style="min-width: 60px;">
                  <b>RTP {{g.rtp}}</b>
                </vs-chip>
                <vs-button v-if="g.ready" color="primary" icon="play_arrow" @click="gameSelected=i">
                  <b>Play</b>
                </vs-button>
                <vs-chip v-else color="warning" style="min-width: 60px;">
                  <b>Coming Soon</b>
                </vs-chip>
              </vs-row>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <!-- {{gameStructure}} -->
    </div>

    <div class="play-game" v-if="gameSelected" style="max-width: 720px; margin: 0px auto;">
      <div class="button-header" style="padding: 8px 0px;">
        <vs-row vs-justify="flex-end">
          <vs-button color="primary" style="margin-right: 10px;" type="filled" icon="fullscreen"></vs-button>
          <vs-button color="danger" type="filled" icon="close" @click="clearSelected"></vs-button>
        </vs-row>
      </div>
      <div class="container-iframe">
        <iframe :src="selectedGame" class="responsive-iframe" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<style>
  #app {
    width: 100%;
    height: 100vh;
    font-family: Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    color: #333;
    background-color: #f5f5f5;
  }

  .header-input {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-input > div {
    margin-left: 10px;
    margin-right: 10px;
  }
  .header-text {
    text-align: center;
    padding-top:10px;
    padding-bottom: 10px;
  }
  .game {
    padding: 8px;
  }
  .container-iframe {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-top: 56.25%; /* 4:3 Aspect Ratio */
  }

  /* Then style the iframe to fit in the container div with full height and width */
  .responsive-iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

<script>
  import currencyData from 'currency-codes/data'
  import gameStructure from './data/games.json'

  export default {
    data: () => ({
      search: '',
      currencies: currencyData,
      currency: 'IDR',
      gameSelected: ''
    }),
    computed: {
      searchedData: function() {
        let searchPattern = new RegExp(this.search.toLowerCase())

        return gameStructure.games.filter(game => {
          return searchPattern.test(game.name.toLowerCase())
        })
      },
      gameTitle: function() {
        return this.gameSelected ? this.searchedData[this.gameSelected].name : 'Pragmatic Play Slot Demo'
      },
      selectedGame: function() {
        let symbol = this.gameSelected ? this.searchedData[this.gameSelected].symbol : ''

        return !this.gameSelected ? '' : `${gameStructure.gameURL}?gameSymbol=${symbol}&lang=en&cur=${this.currency}&jurisdiction=99`
      }
    },
    methods: {
      clearSelected() {
        this.gameSelected = ''
        this.search = ''
      }
    }
  }
</script>
