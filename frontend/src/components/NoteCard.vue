<template>
  <div class="bg-yellow-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative break-words">
    <div class="pr-8">
        <h3 class="text-lg font-bold text-gray-800 border-b border-yellow-300 pb-2 mb-2">
          {{ note.title }}
        </h3>
        <p class="text-gray-700 whitespace-pre-wrap">
          {{ note.content }}
        </p>
    </div>
    
    <button 
      @click="$emit('delete', note._id)" 
      class="absolute top-2 right-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full p-1 transition-colors duration-200 text-sm font-bold"
      title="Supprimer"
    >
      &times;
    </button>
  </div>
</template>





<script>
export default {
  props: ["note"]
}
</script>

