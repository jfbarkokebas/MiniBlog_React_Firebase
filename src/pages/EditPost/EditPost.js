import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'
//css
import styles from './EditPost.module.css'




const EditPost = () => {

    const { id } = useParams()
    const { document: post } = useFetchDocument('posts', id)

    const [title, setTitle] = useState(null)
    const [image, setImage] = useState(null)
    const [body, setBody] = useState(null)
    const [tags, setTags] = useState(null)
    const [formError, setFormError] = useState(null)

    const { updateDocument, response } = useUpdateDocument('posts')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setFormError('')

        //validate image url
        try {
            new URL(image)

        } catch (error) {
            setFormError('A imagem precisa ser uma URL!')
        }

        //create tag arrays
        const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase())

        //check all values
        if (!title || !image || !tags || !body) {
            setFormError("Por favor preencha os dados")
        }
        if (formError) return

        const data = { title, image, body, tagsArray, uid: user.uid, createdBy: user.displayName }

        updateDocument(id, data)

        navigate('/dashboard')

    }

    useEffect(() => {

        if (post) {
            setTitle(post.title)
            setImage(post.image)
            setBody(post.body)
            const textTags = post.tagsArray.join(', ')
            setTags(textTags)
        }

    }, [post])


    return (
        <div className={styles.edit_post}>
           {post && (
            <>
             <h2>Editando o post</h2>
            <p>Modifique o post como desejar</p>
            <form onSubmit={handleSubmit}>

                <label>
                    <span>
                        Título:
                    </span>
                    <input
                        type="text"
                        nome='title'
                        required
                        placeholder='Titulo da sua postagem'
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                </label>

                <label>
                    <span>
                        URL da imagem:
                    </span>
                    <input
                        type="text"
                        nome='image'
                        required
                        placeholder='Insira aqui a url da imagem do seu post'
                        value={image}
                        onChange={e => setImage(e.target.value)} />
                </label>
                <p className={styles.preview_title}>Preview da imagem atual</p>
                <img className={styles.image_preview} src={post.image} alt={post.title}/>

                <label>
                    <span>
                        Conteúdo:
                    </span>
                    <textarea
                        type="text"
                        nome='body'
                        required
                        placeholder='Insira o conteúdo do post'
                        value={body}
                        onChange={e => setBody(e.target.value)} />
                </label>

                <label>
                    <span>
                        Tags:
                    </span>
                    <input
                        type="text"
                        nome='tags'
                        required
                        placeholder='Insira as tags separadas por vírgula'
                        value={tags}
                        onChange={e => setTags(e.target.value)} />
                </label>


                {!response.loading && <button className='btn'>Atualizar</button>}
                {response.loading && <button className='btn' disabled>Aguarde...</button>}

                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}

            </form>
            </>
           )}
        </div>
    )
}

export default EditPost