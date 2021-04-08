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



      <masonry :cols="{default: 5, 1000: 3, 700: 2, 400: 1}" :gutter="20">
        <div v-for="(obj, id) in datas" :key="id" class="card-container">
          <v-card>

            <v-img 
              v-if="obj && obj.links"
              lazy-src="https://picsum.photos/id/11/10/6"
              :src="obj.links[0].href"
              class="card-image" 
            ></v-img>

            <div v-for="(data, id) in obj.data" :key="id" class="text-left p-5">
              <v-card-title class="card-title-chg">
                {{ data.title }}
              </v-card-title>

              <v-card-text class="text--primary">
                <div class="card-description">
                  {{ data.description }}
                </div>
                <a href="#">Read More</a>
              </v-card-text>
            </div>

          </v-card>
        </div>
      </masonry>



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

    }

  }
}
</script>

<style scoped>
.input-search {
  border: 1px solid black;
}

.card-container {
  margin-top: 20px;
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
</style>