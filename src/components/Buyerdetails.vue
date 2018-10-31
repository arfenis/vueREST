<template :name ="company.id">
  <div style="text-align:center;">
    <div class="row">
      <div class="col-sm-12 col-md-12" style="text-align:left;">
        <h1> {{title}}</h1>
      </div>
    </div>
    <buyer-navbar v-bind:menu=menu.main_menu> </buyer-navbar>
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div class="navbar" id="navbarsExample09">
                  <ul class="nav nav-tabs">
                    <li class="nav-item" @click="menu.sub_menu = 1">
                      <a class="nav-link">Licitaciones</a>
                    </li>
                    <li class="nav nav-tabs" @click="menu.sub_menu = 2">
                      <a class="nav-link">General</a>
                    </li>
                    <li class="nav-item" @click="menu.sub_menu = 3">
                      <a class="nav-link">Usuarios</a>
                    </li>
                    <li class="nav-item" @click="menu.sub_menu = 4">
                      <a class="nav-link">Proveedores</a>
                    </li>
                    <li class="nav-item" @click="menu.sub_menu = 5">
                      <a class="nav-link">Items</a>
                    </li>
                  </ul>
                </div>
            </nav>
        </div>
    </div>
    <div id="biddings" v-if="menu.sub_menu==1">
      <biddingcomponent> </biddingcomponent>
    </div>
    <div id="generalinfo" v-if="menu.sub_menu==2">
      <buyerdata> </buyerdata>
    </div>
    <div id="usersinfo" v-if="menu.sub_menu==3">
      <userscomponent> </userscomponent>
    </div>
    <div id="providerinfo" v-if="menu.sub_menu==4">
      <providercomponent> </providercomponent>
    </div>
    <div id="itemsinfo" v-if="menu.sub_menu==5">
      <itemscomponent> </itemscomponent>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import BiddingComponent from './BuyerComponents/BiddingComponent.vue'
import BuyerData from './BuyerComponents/BuyerData.vue'
import UsersComponent from './BuyerComponents/UsersComponent.vue'
import ItemsComponent from './BuyerComponents/ItemsComponent.vue'
import ProviderComponent from './BuyerComponents/ProviderComponent.vue'

export default{
  name: 'buyerdetails',
  data () {
    return {
      menu: {
        main_menu: 1,
        sub_menu: 1
      },
      title: 'Compradores',
      company_id: this.$route.params.companyId,
      company_info: {}
    }
  },
  components: {
    biddingcomponent: BiddingComponent,
    buyerdata: BuyerData,
    userscomponent: UsersComponent,
    itemscomponent: ItemsComponent,
    providercomponent: ProviderComponent
  },
  mounted () {
    this.fetchBiddings()
  },
  computed: {
    Fetchfilter () {
      return this.categories.filter(cate => {
        return parseInt(cate.industry_id) === parseInt(this.filter.industry)
      })
    }
  },
  methods: {
    fetchBiddings () {
      fetch('http://127.0.0.1:8000/api/buyer/' + this.company_id)
        .then(res => res.json())
        .then(res => {
          this.company_info = res.company_info[0]
        })
    },
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/providers/filter', this.filter)
        .then(function (response) {
          me.biddings = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    blockprovider () {
      console.log('clicked')
    },
    len: _.debounce(
      function () {
        this.messageLength = this.filter.search.length
        console.log(this.filter.search)
        this.postRequest()
      },
      800
    )
  }
}
</script>

<style>
    .btn {
    background-color: DodgerBlue; /* Blue background */
    border: none; /* Remove borders */
    color: white; /* White text */
    padding: 12px 16px; /* Some padding */
    font-size: 16px; /* Set a font size */
    cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
    background-color: RoyalBlue;
}

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>
