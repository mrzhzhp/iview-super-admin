<template>
  <div>
    <div class="amap-wrapper">

      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :center="center" :zoom="12" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
      <div class="toolbar">
        <button type="button" name="button" v-on:click="toggleVisible">显示隐藏</button>
        <button type="button" name="button" v-on:click="changePosition">改变坐标</button>
        <button type="button" name="button" v-on:click="chnageDraggle">允许拖动</button>
        <button type="button" name="button" v-on:click="addMarker">增加</button>
        <button type="button" name="button" v-on:click="removeMarker">删除</button>
        {{address}}
      </div>
    </div>
  </div>
</template>

<script>
const exampleComponents = {
  props: ['text'],
  template: `<div>text from  parent: {{text}}</div>`
}
export default {
  name: 'amap_page',
  data () {
    return {
      count: 1,
      address: '请选择地址',
      slotStyle: {
        padding: '2px 8px',
        background: '#eee',
        color: '#333',
        border: '1px solid #aaa'
      },
      zoom: 12,
      center: [121.59996, 31.197646],
      searchOption: {
        city: '烟台',
        citylimit: false
      },
      markers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: () => {
              alert(this.markers[0].position)
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: true,
          template: '<span>1</span>'
        }
      ],
      renderMarker: {
        position: [121.5273285, 31.21715058],
        contentRender: (h, instance) => {
          // if use jsx you can write in this
          // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
          return h(
            'div',
            {
              style: { background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00' },
              on: {
                click: () => {
                  const position = this.renderMarker.position
                  this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002]
                }
              }
            },
            ['marker inner text']
          )
        }
      },
      componentMarker: {
        position: [121.5273285, 31.21315058],
        contentRender: (h, instance) => h(exampleComponents, { style: { backgroundColor: '#fff' }, props: { text: 'father is here' } }, ['xxxxxxx'])
      },
      slotMarker: {
        position: [121.5073285, 31.21715058]
      }
    }
  },
  mounted () {
    //
  },
  computed: {
  },
  methods: {
    onSearchResult (pois) {
      let latSum = 0
      let lngSum = 0
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi
          lngSum += lng
          latSum += lat
          this.markers.push([poi.lng, poi.lat])
        })
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        }
        this.center = [center.lng, center.lat]
        this.markers[0].position = [center.lng, center.lat]
        this.componentMarker.position = [center.lng, center.lat]
        this.address = pois[0].name + '(' + pois[0].address + ')'
      }
    },
    onClick () {
      this.count += 1
    },
    changePosition () {
      let position = this.markers[0].position
      this.markers[0].position = [position[0] + 0.002, position[1] - 0.002]
    },
    chnageDraggle () {
      let draggable = this.markers[0].draggable
      this.markers[0].draggable = !draggable
    },
    toggleVisible () {
      let visableVar = this.markers[0].visible
      this.markers[0].visible = !visableVar
    },
    addMarker () {
      let marker = {
        position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
      }
      this.markers.push(marker)
    },
    removeMarker () {
      if (!this.markers.length) return
      this.markers.splice(this.markers.length - 1, 1)
    }
  }
}
</script>

<style>
  .amap-wrapper {
    width: 500px;
    height: 500px;
  }
  .amap-demo {
    height: 300px;
  }

  .search-box {
    position: absolute;
    top: 55px;
    left: 20px;
  }

  .amap-page-container {
    position: relative;
  }
</style>
