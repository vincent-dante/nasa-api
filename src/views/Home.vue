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
          <v-card class="card-box" @click="loadModal(obj)">
            
            <v-img 
              v-if="obj && obj.links"
              lazy-src="https://picsum.photos/id/11/10/6"
              :src="obj.links[0].href"
              class="card-image" 
            ></v-img>

            <div class="card-info">
              <div v-for="(data, id) in obj.data" :key="id" class="text-left p-5">
                <v-card-title class="card-title-chg">
                  {{ data.title }}
                </v-card-title>
              </div>
            </div>

          </v-card>
        </div>
      </masonry>

      <div v-if="showModal" @close="showModal = false">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    default header
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    {{ dataSelected.data[0].title }}

                    <v-img lazy-src="https://picsum.photos/id/11/10/6" :src="dataSelected.links[0].href" class="card-image"></v-img> 
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    default footer
                    <button class="modal-default-button" @click="showModal = false">
                      OK
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
          
        </transition>     
      </div> 

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
      dataSelected: {}
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
      this.showModal = true;
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
  opacity: 1;
  transition: all 0.5s;
}

.card-box:hover .card-image {
  transform: scale(1.2);
  transition: all 1.1s;
}

.card-info {
  opacity: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.77) 85%);
}

.card-image {
  width: 100%;
  max-height: 500px;
} 

.card-title-chg {
  font-size: 18px;
}

.card-description {
  max-height: 155px;
  overflow-y: hidden;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  text-align: left;
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #1a2837;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>