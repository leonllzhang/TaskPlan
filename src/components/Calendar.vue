<template>
  <v-layout>
    <v-flex>
      <v-sheet height="500">
        <v-calendar :now="today" :value="today" color="primary">
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu :key="event.title" v-model="event.open" full-width offset-x>
                <template v-slot:activator="{ on }">
                  <div v-if="!event.time" v-ripple class="my-event" v-on="on" v-html="event.title"></div>
                </template>
                <v-card color="grey lighten-4" min-width="350px" flat>
                  <v-toolbar color="primary" dark>
                    <v-btn icon>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="event.title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-title primary-title>
                    <span v-html="event.details"></span>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat color="secondary">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
    <v-btn fab bottom right color="pink" dark fixed @click="dialog = !dialog">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey lighten-4 py-4 title">新加便签</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>                
                <v-text-field v-model="title" prepend-icon="notes" placeholder="Title"></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12 align-center justify-space-between lg6>
              <v-menu
                ref="menustart"
                v-model="menustart"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="datestart"
                    label="开始日期"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"                    
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker locale="zh-cn" v-model="datestart" no-title @input="menustart = false"></v-date-picker>
              </v-menu>              
            </v-flex>
            <v-flex xs12 align-center justify-space-between lg6>
              <v-menu
                ref="menuend"
                v-model="menuend"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateend"
                    label="结束日期"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="event"                    
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker :allowed-dates="allowedDates" locale="zh-cn" v-model="dateend" no-title @input="menuend = false"></v-date-picker>
              </v-menu>             
            </v-flex>
            <!-- <v-flex xs12>
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
                mask="phone"
              ></v-text-field>
            </v-flex> -->
            <v-flex xs12>
              <v-text-field v-model="detail" prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="saveevent()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>

<script>
export default {
  data: () => ({
    //today: '2019-01-08',
    title:'',
    dialog: false,
    datestart:'',
    dateend:"",
    detail:"",
    menuend:false,
    menustart:false,
    events: [
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2018-12-30",
        open: false
      },
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2018-12-31",
        open: false
      },
      {
        title: "Vacation",
        details: "Going to the beach!",
        date: "2019-01-01",
        open: false
      },
      {
        title: "Meeting",
        details: "Spending time on how we do not have enough time",
        date: "2019-06-07",
        open: false
      },
      {
        title: "30th Birthday",
        details: "Celebrate responsibly",
        date: "2019-06-03",
        open: false
      },
      {
        title: "New Year",
        details: "Eat chocolate until you pass out",
        date: "2019-06-01",
        open: false
      },
      {
        title: "Conference",
        details: "Mute myself the whole time and wonder why I am on this call",
        date: "2019-06-21",
        open: false
      },
      {
        title: "Hackathon",
        details: "Code like there is no tommorrow",
        date: "2019-06-01",
        open: false
      }
    ]
  }),
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    today() {
      var now = this.$moment().format("YYYY-MM-DD");
      console.log(now);
      //   return moment().format();
      return now; //new Date().toString("yyyy-mm-dd")
    }
  },
  methods: {
    open(event) {
      alert(event.title);
    },
    saveevent: function(param) {
      //calculate days.
      var a = this.$moment(this.datestart);
      var b = this.$moment(this.dateend);

      for(var m=this.$moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')){        
        //console.log(m.format('YYYY-MM-DD'));
        this.events.push({
        title: this.title,
        details: this.detail,
        date:m.format('YYYY-MM-DD'),
        open:false
      });

      }

      
      this.dialog = false;

      console.log(this.title);
    },
    allowedDates:function(val){
     return val>this.datestart;
    }
  }
};
</script>