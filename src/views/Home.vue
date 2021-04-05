<template>
  <div class="row">
    <div class="col-lg-6 offset-lg-3">
      
      <div class="input-group mb-3">
        <input type="text" class="form-control" @keyup.enter="loadData()" v-model="search" placeholder="Search here...">
        <button class="btn btn-dark" @click="loadData()">Search</button>  
      </div>

    </div>
  </div>

  <br>
  <br>
  <br>
  <br>


  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <div v-for="(obj, id) in datas" :key="id">
        <div class="card mb-3" v-for="(link, id) in obj.links" :key="id">
          <div class="row g-0">
            <div class="col-md-4">
              <img :src="link.href" alt="" srcset="" class="card-image">
            </div>
            <div class="col-md-8">
              <div class="card-body text-start">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">ff</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
    </div>

    </div>






<!--     <div class="col-lg-12 mb-3" >
      <div class="card" v-for="(link, id) in obj.links" :key="id">
        <img :src="link.href" alt="" srcset="" class="card-image">
        <div class="card-body">
            ff
        </div>
      </div>
    </div> -->
  </div>




 


</template>

<script>
const axios = require('axios');


export default {
  name: 'Home',
  data(){
    return {
      search: '',
      datas: {
        links: [
          {
            href: ''
          }
        ]
      },
      pageNumber: 1
    }
  },
  methods: {

    loadData(){
      let search = this.search;
      let pageNum = this.pageNumber;

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

.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.box-container {
  padding: 10px;
}

.card-image {
  width: 100%;
}

.column-flex {
  padding: 0 5px;
}
</style>