<template>
  <div>
    <div class="mt-1 relativeoverflow-hidden rounded-md">
      <input
        id="lives_in"
        v-model="formData.client"
        class="bg-slate-100 focus:bg-white border border-slate-100 mt-1 text-gray-900 text-sm rounded focus:ring-yellow-400 focus:border-yellow-400 block w-full p-3 outline-none"
        autocomplete="off"
        placeholder="location"
        @keyup="showOptions = true"
      />
    </div>
    <div
      v-show="resultLocation().length && showOptions"
      class="absolute w-full z-50 bg-white border border-gray-300 mt-1 max-h-[200px] overflow-hidden overflow-y-scroll rounded-md shadow-md"
    >
      <ul class="py-1">
        <template v-for="(value, index) in resultLocation()">
          <li
            v-if="value.id"
            :key="index"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200 text-gray-900 text-sm"
            @click="setInput(value)"
          >
            {{ value.province }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
