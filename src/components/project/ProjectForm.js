import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useEffect, useState } from 'react'


function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project,  setProject] = useState(projectData || {})

    useEffect(()=> {
        fetch("http://localhost:5000/categories",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            },
        }
    )
    .then((resp) => resp.json())
    .then((data) => {
        setCategories(data)
    })
    .catch((err) => console.log(err))
    }, [])

    const submit = (e) =>{
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value})
        console.log(project)
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
     })
        console.log(project)
    }


    return (
        <form onSubmit={submit} className= {styles.form}>
            <Input 
                type = "text" 
                text = "Nome do projeto" 
                name ="name" 
                placeholder = "Insira o nome do projeto"
                handleOnChange = {handleChange}
                value = {project.name ? project.name : ''}/>
            <Input 
                type = "number" 
                text = "Orçamento do projeto" 
                name = "budget" 
                placeholder = "Insira o orçamento total"
                handleOnChange = {handleChange}
                //if ternário: ele verifica se o orçamento foi completado por alguma coisa pelo usuário
                //se sim, ele recebe o valor digitado pelo usuário
                //se não, recebe '', ou seja, vazio
                value = {project.budget ? project.budget: ''}/>
            <Select
                options= {categories}
                name = "category_id"
                text = "Selecione a categoria"
                handleOnChange = {handleCategory}
                value = {project.category ? project.category.id : ''}
                />
            <SubmitButton text = {btnText}/>
        </form>
    )
}
export default ProjectForm