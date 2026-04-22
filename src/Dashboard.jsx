import { useNavigate } from "react-router-dom"
import { Button } from "./components/ui/button"
function Dashboard() {
    const navigate = useNavigate()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const heatColors = ["#EBEDF0","#9BE9A8","#40C463","#30A14E","#216E39"];
    return (
        <div className="bg-gray-200 h-screen w-screen ">
            <div className="grid grid-cols-12 grid-rows-9 gap-6 h-[calc(100vh-80px)] w-[calc(100vw-80px)] mx-auto">
                <nav className="col-span-12 row-span-1 bg-gray-50 rounded-2xl shadow-sm">nav</nav>
                <div className="habits col-span-8 row-span-4 bg-gray-50 rounded-3xl shadow-sm">habits</div>
                <div className="stats col-span-4 row-span-4 bg-gray-50 rounded-3xl shadow-sm">stats</div>
                <div className="heatmap col-span-12 row-span-4 bg-gray-50 rounded-3xl shadow-sm">
                    <div className="heatmap col-span-12 row-span-4 bg-gray-50 rounded-3xl p-6 overflow-hidden">
    <h1 className="text-2xl font-semibold mb-4">Activity</h1>
    
    <div className="flex flex-col gap-2">
        <div className="flex ml-[60px] text-xs text-gray-400 gap-[14px] justify-evenly">
            {months.map((m) => <span key={m}>{m}</span>)}
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col text-xs text-gray-400 justify-between py-1">
                {days.map((d) => <span key={d}>{d}</span>)}
            </div>
            
            <div className="grid grid-cols-[repeat(52,1fr)] grid-rows-7 gap-1.5 flex-1">
                {Array.from({ length: 364 }, (_, i) => {
                    const rand = Math.floor(Math.random() * 10);
                    return (
                        <div 
                            key={i} 
                            className="aspect-square rounded-sm"
                            style={{
                                backgroundColor: rand >= 5 ? heatColors[0] : heatColors[rand]
                            }}
                        />
                    );
                })}
            </div>
        </div>
    </div>
</div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard