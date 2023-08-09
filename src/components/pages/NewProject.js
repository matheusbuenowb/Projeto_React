import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import {useNavigate} from 'react-router-dom'

//useHistory foi substituido pelo useNavigate!!

function NewProject(){

    const history = useNavigate()

    function createPost(project){
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),

        })
        .then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            //redirect
            //history.push -> push não é mais necessário
            //history('/projects', {message: 'Projeto criado com sucesso!'})
            history('/projects', { state: { message: 'Projeto criado com sucesso!' } })

        })
        .catch( (err)=> console.log(err))

    } 

    return (
        <div className= {styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit = {createPost} btnText = "Criar Projeto"/>
        </div>
    )
}

export default NewProject