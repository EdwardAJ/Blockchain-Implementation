<template>
  <div>
    <b-table id="table-component" responsive striped
             hover
             :per-page="perPage"
             :current-page="currentPage"
             :items="rows"
             :fields="columns"
             class="table table-width table-borderless"
    >
    <template v-slot:cell(companyID)="row">
      <div class="max-width height padding">
        {{ row.item.companyID }}
      </div>
    </template>
    </b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="numberOfRows"
      :per-page="perPage"
      aria-controls="table-component"
    ></b-pagination>
  </div>
</template>

<script>
export default {
  props: {
    propRows: {
      type: Array,
      required: true
    },
    propColumns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      rows: [],
      columns: [],
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    numberOfRows () {
      return this.rows.length
    }
  },
  mounted () {
    this.columns = this.propColumns
    this.rows = this.propRows
  }
}
</script>

<style>
  @import '../../../static/css/table.css';
</style>