<template>
  <v-content>
  
    <!-- Main -->
    <v-container fluid class="" :style="`margin:30px 0;`">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout row justify-center wrap mb-4 v-if="url&&url!='https://jumard.top'">
          <p 
            :style="`color:#A9A9A9;font-size:xxx-large;animation-delay:1s;`"
            class="shdw animate__animated animate__shakeX">↓Click to download↓</p>
        </v-layout>
        <v-layout row justify-center wrap mb-4 :style="`margin-top:20px;`">
          <v-flex xs5>
            <v-layout row justify-center wrap mb-4 class="" @click.stop="downloadQR" :style="`cursor: hand; cursor:pointer;`">
                <vueqr v-if="url" 
                  :text="qrcdStr" 
                  :margin="5" 
                  :size="size" 
                  :dotScale="dotScale"
                  :logoSrc="logoSrc" 
                  :callback="setDataUrl"
                  :style="/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g.test(qrcdStr)?`animation-delay:1s;animation-iteration-count:infinite;animation-duration: 3s;`:``"
                  class="shdw animate__animated animate__pulse" ></vueqr>
              
            </v-layout>
          </v-flex>
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
  .shdw {
    filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.5));
    opacity: 0.9;
  }

  .p8 {
    padding: 8px 0;
  }
</style>