<template>
  <v-content>
  
    <!-- Main -->
    <v-container fluid class="" :style="`margin:30px 0;`">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout row justify-center wrap mb-4>
          <v-flex xs5>
            <v-layout row justify-center wrap mb-4 class="" @click.stop="downloadQR" :style="`cursor: hand; cursor:pointer;`">
              <transition enter-active-class="animated bounceIn delay1" leave-active-class="animated bounceOut">  
                <vueqr v-if="url" 
                  :text="qrcdStr" 
                  :margin="5" 
                  :size="size" 
                  :dotScale="dotScale"
                  :logoSrc="logoSrc" 
                  :callback="setDataUrl" 
                  class="shdw" ></vueqr>
              </transition>
            </v-layout>
          </v-flex>
          <!--
          <v-flex xs5>
            <v-layout row justify-center wrap mb-4 class="">
              <transition enter-active-class="animated bounceIn delay1" leave-active-class="animated bounceOut">  
                <img v-if="url" :src="'https://s.wordpress.com/mshots/v1/' + url + '/?w=' + imgSize + '&h=' + imgSize" class="shdw">
              </transition>
            </v-layout>
          </v-flex>
          -->
        </v-layout>

        <v-layout row justify-center wrap mb-2>
          <v-flex xs10>
            <v-text-field type="text" v-model="url" label="URL(https:// ~ )" required />
          </v-flex>
        </v-layout>

        <v-layout row justify-center wrap mb-2>
          <v-flex xs10>
            <v-combobox
              v-model="size"
              :items="['100','200','300','400']"
              label="Size (optional)"
              prepend-icon="fas fa-crop"
              class="p8"
            ></v-combobox>
          </v-flex>
        </v-layout>

        <v-layout row justify-center wrap mb-2>
          <v-flex xs10>
            <v-select
              v-model="dotScale"
              :items="['0.2','0.4','0.6','0.8','1.0']"
              label="Dot Scale (optional)"
              prepend-icon="fas fa-qrcode"
              class="p8"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row justify-center wrap mb-2>
          <v-flex xs10>
            <v-file-input
              accept="image/*"
              show-size
              label="Logo (optional)"
              @change="setLogoSrc"
              prepend-icon="far fa-image"
              class="p8"
              :rules="[!logoSrc || 'If you add a logo, QR code recognition may not be possible.']"
            ></v-file-input>
          </v-flex>
        </v-layout>
      </v-form>
      
    </v-container>

  </v-content>
</template>

<script>
  import vueqr from 'vue-qr';

  export default {
    components: {
      vueqr,
    },
    data: function () {
      return {
        logoSrc   : null,
        dotScale  : 0.8,
        regbtn    : false,
        valid     : true,
        url       : 'https://jumard.top',
        qrbinary  : null,
        size      : 250,
      }
    },
    mounted: function (){
      let calced_size = (window.innerWidth - 200) / 2;
      if (calced_size > 400 ) return 400;
      if (calced_size < 100 ) return 100;
      this.size = calced_size

    },
    computed: {
      qrcdStr: function () {
        return this.url;
      },
      imgSize: function () {
        let calced_size = (window.innerWidth - 200) / 2;
        if (calced_size > 400 ) return 400;
        if (calced_size < 100 ) return 100;
        return calced_size;
      }
    },
    methods: {
      setLogoSrc(file) {
        if (file !== undefined && file !== null) {
          if (file.name.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            this.logoSrc = fr.result
          })
        } else {
          this.logoSrc = null
        }
      },
      setDataUrl: function (dataUrl) {
        this.qrbinary = dataUrl
      },
      downloadQR: function() {
        const link = document.createElement('a');
        link.href = this.qrbinary;
        link.download = 'QR.png';
        link.click();
        URL.revokeObjectURL(link.href);
      },
    },
    watch: {
    }
  }
</script>

<style scoped>
  @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css";
  .delay1 {
    animation-delay: 1s;
  }
  .infinite {
    /*animation-duration: 5s;*/
    animation-iteration-count: infinite;
  }
  .shdw {
    filter: drop-shadow(1px 1px 1px rgba(0,0,0,0.6));
  }
  .lf0 {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .p8 {
    padding: 8px 0;
  }
</style>