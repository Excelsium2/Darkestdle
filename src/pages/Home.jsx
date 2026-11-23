import { useNavigate } from 'react-router'

const Home = () => {
    const navigate = useNavigate()

    return (
        <main className="home">
            <h1>Darkestdle</h1>
            <h3> Knowledge is your only defense </h3>
            <button onClick={()=>navigate('/modes')}>
                Embark
            </button>
        </main>
    )
    
}

export default Home