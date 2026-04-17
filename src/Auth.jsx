import { useNavigate } from "react-router-dom"

function Auth() {
  const navigate = useNavigate()
    return (
        <div>
            <h1>Auth</h1>
            <button onClick={() => navigate("/dashboard")}>Login</button>
        </div>
    )
}

export default Auth