import './admin.css'

import { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebaseConection'
import { addDoc, collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'


const Admin = () => {

  const [task, setTask] = useState('')
  const [user, setUser] = useState({})//localStorage
  const [dbTasks, setDbTasks] = useState(null)


  useEffect(() => {

    async function loadTasks() {

      const userDetail = localStorage.getItem("@detailUser")

      setUser(JSON.parse(userDetail))

      if (userDetail) {

        const data = JSON.parse(userDetail)
        
        const tarefaRef = collection(db, 'tarefas')
        const q = query(tarefaRef, orderBy("created", "desc"), where("uid","==", data?.uid ))

        const unsub = onSnapshot(q, (snapshot)=>{

          let list = []
          
          snapshot.forEach(doc=>{            
            list.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              uid: doc.data().uid 
            })
            
          })

          setDbTasks(list)          
          
        })
        
      }

    }

    loadTasks()

  }, [])




  async function handleSubmit(e) {
    e.preventDefault()
    if (task.length === 0) {
      alert('Preencha o campo tarefa!')
      return
    }

    const docRef = collection(db, 'tarefas')
    await addDoc(docRef, {
      tarefa: task,
      created: new Date(),
      uid: user?.uid

    }).then(
      () => {
        console.log('Tarefa cadastrada')
        setTask('')
      }
    )
      .catch(
        error => console.log(error)
      )

  }

  async function logout() {
    alert('Até mais!')
    await signOut(auth)

  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form className='form' onSubmit={handleSubmit}>
        <textarea
          placeholder='Coloque aqui a descrição da sua tarefa'
          value={task}
          onChange={e => setTask(e.target.value)}
        />
        <button id='btn-register' type='submit'>Registrar tarefa</button>
      </form>

      {dbTasks && dbTasks.map(item=>(
        <article key={item.uid} className='list'>
        <p>{item.tarefa}</p>
        <div>
          <button>Editar</button>
          <button className='btn-delete'>Concluir</button>
        </div>
      </article>
      ))}

      <button onClick={logout} className="btn-logout">Sair</button>

    </div>
  )
}

export default Admin