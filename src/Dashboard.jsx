import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"
function Dashboard() {
    const navigate = useNavigate()
    return (
        <div className="bg-gray-200 h-screen w-screen ">
            <div className="grid grid-cols-12 grid-rows-9 gap-6 h-[calc(100vh-80px)] w-[calc(100vw-80px)] mx-auto">
                <nav className="col-span-12 row-span-1 bg-gray-50 rounded-2xl shadow-sm">nav</nav>
                <div className="habits col-span-8 row-span-4 bg-gray-50 rounded-3xl shadow-sm">habits</div>
                <div className="stats col-span-4 row-span-4 bg-gray-50 rounded-3xl shadow-sm">stats</div>
                <div className="heatmap col-span-12 row-span-4 bg-gray-50 rounded-3xl shadow-sm">heatmap</div>
                </div>
            </div>
        )
}

export default Dashboard