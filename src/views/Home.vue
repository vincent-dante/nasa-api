<template>
  <v-row>

    <v-col class="col-lg-10 col-sm-12 offset-lg-1">

      <v-row> 
        <v-col class="col-lg-6 col-sm-12 offset-lg-3">
          <div class="pt-10 pb-10">
            <v-text-field 
              label="Search here." 
              @keyup.enter="loadData()" 
              v-model="search"
              :rules="rules"
            >
              <v-icon slot="prepend" color="green">
                mdi-magnify
              </v-icon>
            </v-text-field>
          </div>
        </v-col>
      </v-row>


      <masonry :cols="{default: 4, 992: 3, 768: 2, 600: 1}" :gutter="20">
        <div v-for="(obj, id) in datas" :key="id" class="card-container">
          <v-hover v-slot="{ hover }">
            <v-card class="card-box" @click="loadModal(obj)">
              
              <v-img 
                v-if="obj && obj.links"
                lazy-src="https://picsum.photos/id/11/10/6"
                :src="obj.links[0].href"
                class="card-image" 
              >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <div v-for="(data, id) in obj.data" :key="id" class="p-5">
                    <v-card-title class="card-title-chg green--text">
                      {{ data.title }}
                    </v-card-title>
                  </div>
                </div>
              </v-expand-transition>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </masonry>


      <v-dialog v-model="dialog" width="600px">
        <div v-if="dialog">
          <v-card class="dialog-card">

            <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="dataSelected.links[0].href" class="card-image"></v-img> 

            <v-card-title>
              <span class="headline green--text">{{ dataSelected.data[0].title }}</span>
            </v-card-title>

            <v-card-text class="card-description">
              {{ dataSelected.data[0].description }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>


    </v-col>
  </v-row>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Home',
  data(){
    return {
      search: '',
      datas: [],
      pageNumber: 1,
      rules: [
        value => !!value || 'Required.'
      ],
      showModal: false,
      dataSelected: {},
      dialog: false
    }
  },
  methods: {

    loadData(){
      let search = this.search;
      let pageNum = this.pageNumber;

      if(search.length == 0) return;

      axios
      .get(`https://images-api.nasa.gov/search?q=${search}&page=${pageNum}`)
      .then( response => {
        
        let data = response.data.collection;

        this.datas = data.items;
      })
      .catch( err => console.error(err) )

    },
    loadModal(obj){

      this.dialog = true;
      this.dataSelected = obj;

    }

  }
}
</script>

<style lang="scss" scoped>
.input-search {
  border: 1px solid black;
}

.card-container {
  margin-top: 20px;
}

.card-box {
  background: #333a4f !important;
  cursor: pointer;
  overflow: hidden;
}

.card-box:hover .card-info {
  transition: all 0.3s;
  opacity: 1;
  height: 100%;
}

.card-image {
  width: 100%;
  max-height: 500px;
} 

.card-title-chg {
  font-size: 18px;
}

.card-description {
  text-align: left;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1;
  position: absolute;
  width: 100%;
  background: #0b0c12;
}

.dialog-card {
  background: #151618 !important;
}
</style>