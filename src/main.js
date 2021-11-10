import Vue from 'vue'

// Plugins
import vuetify from '@/plugins/vuetify'
import router from "@/plugins/router";

// External
import $ from "jquery"

// Internal
import App from '@/App.vue'

// Leaflet
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Don't show tip
Vue.config.productionTip = false;

// Fix leaflet icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

// load and set the HTML template we are using
let audit_content = $(".audit-content");
audit_content.html(`<div id="app"></div>`);

function add_help_message() {

  if ($(".help-message").length > 0) return;

  let helpMessage = `<p class='help-message'>
  Comments or feedback? Please contact
  <a href="mailto:controller@phila.gov">controller@phila.gov</a>.
  </p>`;
  $(".back-link").after(helpMessage);
}

function add_data_button() {

  if ($("#dataDownloadButton").length > 0) return;

  // add a new button
  let filename = "sanitation-performance-metrics-monthly.csv"
  let url = `https://sanitation-data-release.s3.amazonaws.com/${filename}`
  let btn = `<a id="dataDownloadButton" href="${url}" class="btn btn-primary btn-block btn-block">
            <i class="fas fa-download"></i>
            Download Data
        </a>`;

  // add download data button and remove the report button
  $(".entry-header .btn").after(btn);
}

function adjust_header_layout() {
  $(".entry-header .row")
    .first()
    .addClass("d-flex ml-2 mr-2 flex-sm-row flex-column justify-content-between flex-nowrap");

  $(".entry-header .col-sm-9").removeClass("col-sm-9")
  $(".entry-header .col-sm-3")
    .removeClass("col-sm-3")
}

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

// When document is loaded 
$(document).ready(function () {

  // Add the button
  add_data_button()

  // add a help message
  add_help_message();

  // adjust the header layout
  adjust_header_layout();

  // Turn off FA
  window.FontAwesome.config.observeMutations = false;
  window.FontAwesome.config.searchPseudoElements = false;


})