<template>
  <!-- Conteneur principal avec fond gris clair et pleine hauteur -->
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="max-w-4xl mx-auto">
      
      <!-- Titre principal -->
      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-tight">
        Post-it App
      </h1>

      <!-- Formulaire d'ajout (carte blanche) -->
      <div class="bg-white p-6 rounded-xl shadow-md mb-8 max-w-md mx-auto">
        <div class="mb-4">
          <input 
            v-model="title" 
            placeholder="Titre" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          />
        </div>
        
        <div class="mb-4">
          <textarea 
            v-model="content" 
            placeholder="Contenu" 
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
          ></textarea>
        </div>
        
        <button 
          @click="addNote" 
          class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Ajouter
        </button>
      </div>

      <!-- Séparateur visuel -->
      <hr class="my-8 border-gray-300" />

      <!-- Grille pour les post-it -->
      <!-- grid-cols-1 sur mobile, grid-cols-2 sur sm, grid-cols-3 sur md -->
      <div v-if="notes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NoteCard
          v-for="note in notes"
          :key="note._id"
          :note="note"
          @delete="deleteNote"
        />
      </div>
      
      <!-- Message si pas de notes -->
      <div v-else class="text-center text-gray-500 mt-10">
        <p>Aucun post-it pour le moment. Créez-en un !</p>
      </div>
    </div>
  </div>
</template>

<script>
import NoteCard from "./components/NoteCard.vue"

export default {
  components: { NoteCard },

  data() {
    return {
      title: "",
      content: "",
      notes: []
    }
  },

  mounted() {
    this.getNotes()
  },

  methods: {
    async getNotes() {
      const res = await fetch("https://backpost-i8gy.onrender.com/notes")
      this.notes = await res.json()
    },

    async addNote() {
      // Validation simple pour éviter d'envoyer du vide
      if (!this.title && !this.content) return;

      await fetch("https://backpost-i8gy.onrender.com/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.title,
          content: this.content
        })
      })

      this.title = ""
      this.content = ""
      this.getNotes()
    },

    async deleteNote(id) {
      await fetch("https://backpost-i8gy.onrender.com/notes/" + id, {
        method: "DELETE"
      })

      this.getNotes()
    }
  }
}
</script>