<template :name ="company.id">
  <div style="text-align:center;">
    <div class="row">
      <div class="col-sm-12 col-md-12" style="text-align:left;">
        <h1> {{title}}</h1>
      </div>
    </div>
    <buyer-navbar v-bind:menu=menu.main_menu> </buyer-navbar>
    <h1> {{company_info.company_name}} </h1>
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
    <div id="biddingcomponent" v-if="menu.sub_menu==1">
      <biddingcomponent :biddingsData="company_info.biddings"> </biddingcomponent>
    </div>
    <div id="generalinfo" v-if="menu.sub_menu==2">
      <buyerdata v-bind:companyData="company_info"> </buyerdata>
    </div>
    <div id="usersinfo" v-if="menu.sub_menu==3">
      <userscomponent :companyUsers=company_info.usuarios :roles=roles> </userscomponent>
    </div>
    <div id="providerinfo" v-if="menu.sub_menu==4">
      <providercomponent :companyProviders=company_info.providers :categories=categories> </providercomponent>
    </div>
    <div id="itemsinfo" v-if="menu.sub_menu==5">
      <itemscomponent :companyItems=company_info.items :categories=categories> </itemscomponent>
    </div>

  </div>
</template>

<script>
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
        sub_menu: 2
      },
      title: 'Compradores',
      company_id: this.$route.params.companyId,
      company_info: {},
      roles: {},
      categories: {}
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

  },
  methods: {
    fetchBiddings () {
      fetch('http://127.0.0.1:8000/api/buyer/' + this.company_id)
        .then(res => res.json())
        .then(res => {
          this.company_info = res.company_info
          this.roles = res.roles
          this.categories = res.categories
          this.cities = res.cities
        })
    },
    blockprovider () {
      console.log('clicked')
    }
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
