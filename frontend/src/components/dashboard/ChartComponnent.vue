<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

const props = defineProps<{
  coin: any
}>()

let labels: string[] = [];
let values: number[] = [];

const getMounthAndYear = (date: string) => {
  let newDate = date.split('T')[0]
  let newDateArray = newDate.split('-')
  newDate = newDateArray[2] + "/" + newDateArray[1] + "/" + newDateArray[0]
  let newTime = date.split('T')[1].split('.')[0]
  return newDate + '-' + newTime
}

const initChart = () => {
  props.coin.crypto_value.forEach((value: any) => {
    labels.push(getMounthAndYear(value.date))
    values.push(value.value)
  })
}
initChart()


let chartData= {
  labels: labels,
  datasets: [ { 
    label: props.coin.name,
    backgroundColor: '#f87979',
    data: values
  } ]
}
const chartOptions= {
  responsive: true
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
// setInterval(() => {
//   console.log("yo")
//   chartData = {
//   labels: ["1"],
//   datasets: [ { 
//     label: "tamere",
//     backgroundColor: '#f87979',
//     data: [1]
//   } ]
// }
//   chartData = {
//   labels: labels,
//   datasets: [ { 
//     label: props.coin.name,
//     backgroundColor: '#f87979',
//     data: values
//   } ]
// }
// },5000)
</script>



<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>