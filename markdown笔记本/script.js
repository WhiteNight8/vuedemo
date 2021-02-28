
Vue.filter('date', time => moment(time).format('YYYY/MM/DD, HH:mm'))


new Vue({
  name: 'notebook',


  el: '#notebook',

  
  data () {
    return {
    
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
    }
  },

  computed: {
    selectedNote () {
    
      return this.notes.find(note => note.id === this.selectedId)
    },

    notePreview () {
      
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },

    sortedNotes () {
      return this.notes.slice().sort((a, b) => a.created - b.created)
      .sort((a, b) => (a.favorite === b.favorite)? 0 : a.favorite? -1 : 1)
    },

    linesCount () {
      if (this.selectedNote) {
        
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },


    charactersCount () {
      if (this.selectedNote) {
        return this.selectedNote.content.split('').length
      }
    },
  },

  
  watch: {
    
    notes: {
      
      handler: 'saveNotes',
      
      deep: true,
    },
  
    selectedId (val, oldVal) {
      localStorage.setItem('selected-id', val)
    },
  },

  methods:{
    
    addNote () {
      const time = Date.now()
  
      const note = {
        id: String(time),
        title: '笔记 ' + (this.notes.length + 1),
        content: '你好,欢迎使用绿色清新笔记',
        created: time,
        favorite: false,
      }
    
      this.notes.push(note)
      
      this.selectNote(note)
    },

  
    removeNote () {
      if (this.selectedNote && confirm('确定删除笔记?')) {
      
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },

    selectNote (note) {
    
      this.selectedId = note.id
    },

    saveNotes () {
    
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    },

    favoriteNote () {
    
      this.selectedNote.favorite ^= true
    },
  },
})
