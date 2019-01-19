<template>
  <div class="hello">
    <svg id="svg"></svg>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Root',
  data () {
    return {}
  },
  mounted () {
    const width = 960
    const height = 500
    const config = {
      speed: 0.005,
      verticleTilt: -30,
      horizontalTilt: 0
    }

    let locations = []

    const svg = this.$d3.select('svg')
      .attr('width', width).attr('height', height)

    const markerGroup = svg.append('g')
    const projection = this.$d3.geoOrthographic()
    const initialScale = projection.scale()
    const path = this.$d3.geoPath().projection(projection)
    const center = [width / 2, height / 2]

    drawGlobe()

    function drawGlobe () {
      this.$d3.queue()
        .defer(this.$d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
        .defer(this.$d3.json, 'locations.json')
        .await((error, worldData, locationData) => {
          svg.selectAll('.segment')
            .data(this.$topojson.feature(worldData, worldData.objects.countries).features)
            .enter().append('path')
            .attr('class', 'segment')
            .attr('d', path)
            .style('stroke', '#888')
            .style('stroke-width', '1px')
            .style('fill', (d, i) => '#e5e5e5')
            .style('opacity', '.6')
          locations = locationData
          drawMarkers()
        })
    }

    function drawMarkers () {
      const markers = markerGroup.selectAll('circle')
        .data(locations)
      markers
        .enter()
        .append('circle')
        .merge(markers)
        .attr('cx', d => projection([d.longitude, d.latitude])[0])
        .attr('cy', d => projection([d.longitude, d.latitude])[1])
        .attr('fill', d => {
          const coordinate = [d.longitude, d.latitude]
          var gdistance = this.$d3.geoDistance(coordinate, projection.invert(center))
          return gdistance > 1.57 ? 'none' : 'steelblue'
        })
        .attr('r', 7)

      markerGroup.each(function () {
        this.parentNode.appendChild(this)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
