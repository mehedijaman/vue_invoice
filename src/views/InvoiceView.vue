<script setup>
import {reactive} from 'vue'

const data = reactive({
  sender:'',
  billTo: '',
  shipTo: '',
  invoiceNo: '',
  inviceDate: '',
  dueDate: '',
  headerNotes: '',
  footerNotes: '',
  terms: '',
  subTotal: '',
  taxPercent: '',
  taxTotal: '',
  discount: '',
  total: '',
  netTotal:'',
  items:[
    {
      description: '',
      quantity: '',
      rate: '',
      discount: '',
      total: '',
    }
  ]
})

function addMoreItem(){
  data.items.push({
    description: '',
    quantity: '',
    rate: '',
    discount: '',
    total: '',
  })
}

function removeItem(index){
  data.items.splice(index,1)
}

function subTotal(){
  let subTotal = 0
  data.items.forEach(item =>{
    subTotal += item.total
  })
  data.subTotal = subTotal
  return subTotal
}

function tax(){
  const tax = data.subTotal * (data.taxPercent / 100)
  data.taxTotal = tax
  return tax
}

function total(){
  const total = data.subTotal + data.taxTotal
  data.total = total
  return total
}

function netTotal(){
  const netTotal = data.total - data.discount
  data.netTotal = netTotal
  return netTotal
}

function generateInvoice(){
  console.log(data)
}

</script>

<template>
  <section class="mx-auto container bg-white border border-gray-400 min-h-screen p-12">
    <div class="flex justify-between">
        <div class="flex flex-col space-y-5 w-1/2s">
            <div class=" ">
                <img class="w-40" src="https://www.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-600w-1027820257.jpg" alt="">
            </div>
            <p class="mt-5">
                Sender
            </p>
            <textarea name="" id="" cols="30" rows="2" v-model="data.sender"></textarea>
            <div class="flex space-x-2">
                <div class="flex flex-col">
                    <span>Bill to</span>
                    <textarea name="" id="" cols="30" rows="2" v-model="data.sender"></textarea>
                </div>
                <div class="flex flex-col">
                    <span>Ship to</span>
                    <textarea name="" id="" cols="30" rows="2" v-model="data.shipTo"></textarea>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-1/2 items-end">
            <h1 class="mt-12 text-4xl uppercase text-right mb-5">Invoice</h1>
            <input class="w-[400px] text-right" type="text" placeholder="Invoice Number">
            <div class="mt-10 flex-y-5 text-right space-y-3 w-full">
                <p>
                    <span>Date</span>
                    <input v-model="data.invoiceDate" type="text" class="ml-2 w-[200px] ">
                </p>
                <p>
                    <span>Due Date</span>
                    <input v-model="data.dueDate" type="text" class="ml-2 w-[200px]">
                </p>
                <p>
                    <span>Additional Note</span>
                    <input v-model="data.headerNotes" class="ml-2 w-[200px]" type="text">
                </p>
            </div>
        </div>
    </div>
    <div class="mt-20">
        <table class="table-auto w-full">
            <tr class="bg-gray-800 text-left text-white">
                <th class="p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg></th>
                <th class="p-2 pl-5 w-1/2">Item</th>
                <th class="p-2">Quantity</th>
                <th class="p-2">Rate</th>
                <th class="p-2">Discount</th>
                <th class="p-2 w-[200px] text-right pr-5">Amount</th>
            </tr>
            <tr v-for="(item, index) in data.items" :key="index">
              <td class="text-red-950">
                <button @click="removeItem(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </td>
              <td class="py-1">
                  <input v-model="item.description" class="w-full pl-5" type="text" placeholder="Description" />
              </td>
              <td class="">
                  <input v-model="item.quantity" class="w-full" type="number" placeholder="Quantity" />
              </td>
              <td class="">
                  <input v-model="item.rate" class="w-full" type="number" placeholder="Rate">
              </td>
              <td class="">
                  <input v-model="item.discount" class="w-full" type="number" placeholder="Discount">
              </td>
              <td class="py-1 pr-5 text-right text-gray-800">
                  $ {{ item.total = (item.quantity * item.rate) - item.discount }}
              </td>
            </tr>
        </table>
        <button @click="addMoreItem()" class="mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add More
        </button>
    </div>
    <div class="mt-[200px]">
        <div class="flex justify-between">
            <div class="flex flex-col space-y-5 w-1/2">
                <span>Notes</span>
                <textarea name="" id="" cols="30" rows="2"></textarea>
                <span>Terms</span>
                <textarea name="" id="" cols="30" rows="2"></textarea>
            </div>
            <div class="flex flex-col w-1/2 items-end">
                <div class="mt-10 flex-y-5 text-right space-y-3 w-full">
                    <p>
                        <span>Tax %</span>
                        <input v-model="data.taxPercent" type="number" class="tax text-right w-[200px] ml-2">
                    </p>
                    <p>
                        <span>Subtotal</span>
                        <input :value="subTotal()" readonly class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0" placeholder="Subtotal">
                    </p>
                    <p>
                        <span>Tax Total</span>
                        <input :value="tax()" readonly type="number" class="tax text-right w-[200px] ml-2">
                    </p>
                    <p>
                        <span>Total</span>
                        <input :value="total()" readonly class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0" placeholder="Total">
                    </p>
                    <p>
                        <span>Discount</span>
                        <input v-model="data.discount" type="number" class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0" placeholder="Discount">
                    </p>
                    <p>
                        <span>Balace Due</span>
                        <input :value="netTotal()" readonly class="focus:ring-0 focus:ring-offset-0 text-right ml-2 pr-4 w-[200px] border-0" placeholder="Balance">
                    </p>
                </div>
            </div>
        </div>
      
    </div>
    <div class="flex ">
      <button @click="generateInvoice()" class="bg-teal-900 ml-2 text-white rounded-sm pt-2 pb-2 pl-4 pr-4 font-bold hover:bg-teal-950">Save</button>
      <button class="bg-teal-900 ml-2 text-white rounded-sm pt-2 pb-2 pl-4 pr-4 font-bold hover:bg-teal-950">Load Invoice</button>
    </div>
  </section>
</template>
<style scoped>
  input,
    textarea {
        border: 1px solid #ddd !important;
        padding: 5px;
        border-radius: 5px;
  }

    input.tax::-webkit-outer-spin-button,
    input.tax::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
  }
</style>
