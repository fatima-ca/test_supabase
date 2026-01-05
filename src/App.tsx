import { useState, useEffect } from 'react'
import { supabase } from './client';
import Bookcard from '../app/components/Bookcard'
import './App.css'

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

function App() {
  //array para guardar las tarjetas de libros
  const [books, setBooks]  = useState<Book[]>([])
  //guardar temporalmente los datos de cada libro
  const [titleB, setTitle] = useState("")
  const [descB, setDesc] = useState("")
  const [authB, setAuth] = useState("")

  //---para uso de supabase 
  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    const { data, error } = await supabase
      .from('book')
      .select('*')
      .order('id', { ascending: false }) 
    
    if (error) {
      console.error("Error fetching books:", error)
    } else {
      setBooks(data || [])
      console.log("Books loaded:", data)
    }
  }

  async function createBook() {
  console.log("Intentando insertar:", {
    title: titleB,
    author: authB,
    description: descB
  })

  if (titleB.trim() === '') {
    alert("El título no puede estar vacío")
    return
  }

  const { data, error } = await supabase
    .from('book')
    .insert([
      {
        title: titleB,
        author: authB,
        description: descB
      }
    ])
    .select()
  
  console.log("Respuesta de Supabase:", { data, error })
  
  if (error) {
    console.error("Error completo:", error)
    alert(`Error al guardar: ${error.message}`)
  } else {
    console.log("Book created:", data)
    setTitle("")
    setAuth("")
    setDesc("")
    fetchBooks()
  }
}
    
  return (
    <>
      <div className="card">

        <input 
          type="text"
          value={titleB}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title..."/>

        <input 
          type="text"
          value={authB}
          onChange={(e) => setAuth(e.target.value)}
          placeholder="Author..."/>
      
        <input 
          type="text"
          value={descB}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Write a description..."/>
      
        <button onClick={createBook}>Save book</button>

          {books.length === 0 && (
            <p>No books yet. ¡Add a book!</p>
          )}

          {books.map((book) =>(
            <Bookcard bookData={{titleBook: book.title, authBook: book.author,
            descBook: book.description
            }} key={book.id}/>
          ))}
      </div>
    </>
  )
}

export default App
