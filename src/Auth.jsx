import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
function Auth() {
  const navigate = useNavigate()
    return (
        <div>
            <h1>Auth</h1>
            <Button onClick={() => navigate("/dashboard")}>Login</Button>
        </div>
    )
}

export default Auth