import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Checkbox } from "./components/ui/checkbox"
import { Button } from "./components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./components/ui/dialog"
import day from "./assets/day.png"
import night from "./assets/night.png"
import logout from "./assets/logout.png"
import logoutwhite from "./assets/logoutwhite.png"
import ProgressRing from "./components/progress"
import fire from "./assets/fire.png"
import trophy from "./assets/trophy.png"
import train from "./assets/train.png"
import power from "./assets/power.png"
import { useEffect } from "react"

function Dashboard() {
    const navigate = useNavigate()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);
    const [heatmapData, setHeatmapData] = useState(() => {
    const savedHeatmap = localStorage.getItem("habit-flow-heatmap");
    if (savedHeatmap) return JSON.parse(savedHeatmap);
    const newData = Array.from({ length: 364 }, () => Math.floor(Math.random() * 5));
    localStorage.setItem("habit-flow-heatmap", JSON.stringify(newData));
    return newData;
});
    const [selectedFrequency, setSelectedFrequency] = useState("daily");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const heatColors = ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"];
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    const [habits, setHabits] = useState([
        { id: 1, title: "Read for 30 minutes", streak: 5, completed: false, repetition: "daily", emoji: "📚" },
        { id: 2, title: "Exercise for 30 minutes", streak: 3, completed: false, repetition: "daily", emoji: "💪" },
        { id: 3, title: "Meditate for 10 minutes", streak: 7, completed: false, repetition: "daily", emoji: "🧘" },
        { id: 4, title: "Drink 8 glasses of water", streak: 2, completed: false, repetition: "daily", emoji: "💧" },
        { id: 5, title: "Walk for 30 minutes", streak: 4, completed: false, repetition: "daily", emoji: "🚶" },
    ]);
    const completedHabits = habits.filter((habit) => habit.completed);
    const longestStreak = Math.max(...habits.map(h => h.streak));
    const addHabit = (e) => {
        console.log("addHabit");
        e.preventDefault();
        const formData = new FormData(e.target);
        const newHabit = {
            id: habits.length + 1,
            title: formData.get("title"),
            streak: 0,
            completed: false,
            repetition: selectedFrequency,
            emoji: formData.get("emoji")
        };
        setHabits([...habits, newHabit]);
        setIsDialogOpen(false);
    }
    return (
        <div className="bg-gray-200 dark:bg-zinc-950 min-h-dvh w-screen transition-all duration-500 ease-in-out ">
            <div className="grid grid-cols-12 grid-rows-[repeat(9,minmax(0,1fr))] gap-6 min-h-[80vh] max-h-[100vh] w-[95%] max-w-[1600px] mx-auto py-3 overflow-y-scroll scrollbar-hide">
                <nav className="col-span-12 row-span-1 bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-2xl shadow-sm flex flex-row justify-between p-8 items-center mt-3 transition-all duration-500 ease-in-out ">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-semibold">Habit Flow</h1>
                        <p className="text-gray-500 absolute mt-[18px] ml-[120px]">Build better habits, one day at a time.</p>
                    </div>
                    <div className="CTA flex flex-row justify-between items-center">
                        <div className="profile h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-gray-50">AH</div>
                        <Button className="trigger" onClick={() => setIsDarkMode(!isDarkMode)}><img className="h-5 w-5" src={isDarkMode ? night : day} alt="" /></Button>
                        <Button className="logout" onClick={() => navigate("/")}><img className="h-5 w-5" src={isDarkMode ? logoutwhite : logout} alt="" /></Button>
                    </div>
                </nav>
                <div className="habits col-span-8 row-span-4 bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-3xl shadow-sm overflow-hidden transition-all duration-500 ease-in-out ">
                    <header className="font-semibold m-4 flex flex-row justify-between items-center">
                        <div className="title flex flex-row items-center gap-3">
                            <h1>Today's Habits</h1>
                            <div className="day font-normal text-gray-500">{formattedDate}</div>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-zinc-950 dark:bg-zinc-600 flex items-center justify-center text-gray-50" onClick={() => setIsDialogOpen(true)}>+</button>
                    </header>
                    <div className="habits flex flex-col gap-5 overflow-y-scroll max-h-[75%] scrollbar-hide ">
                        {habits.map((habit) => (
                            <div className={`${
                                habit.id !== habits.length ? "border-b border-gray-200 dark:border-zinc-700" : ""
                            } border-gray-200 py-1 flex flex-row justify-between mx-5 gap-[30rem]`}>
                                <div className={`habit flex flex-row justify-center gap-4 ${habit.completed ? "line-through decoration-2 " : ""}`}>
                                    <Checkbox className="h-5 w-5 bg-gray-200" id={habit.id}
                                        onCheckedChange={(checked) => {
                                            setHabits(prevHabits => prevHabits.map(h => {
                                                if (h.id === habit.id) {
                                                    return {
                                                        ...h,
                                                        completed: checked,
                                                        streak: checked ? h.streak + 1 : h.streak - 1
                                                    };
                                                }
                                                return h;
                                            }));
                                        }} />
                                    <h1>{habit.emoji}</h1>
                                    <h1 className="text-md font-semibold">{habit.title}</h1>
                                </div>
                                <div className={`streak flex flex-row gap-1 justify-end transition-all duration-500 ${!habit.completed ? "opacity-50 grayscale" : "grayscale-0 opacity-100"} `}>
                                    <img src={fire} alt="" className="w-5 h-5" />
                                    <p className="text-sm">{habit.streak} days</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stats col-span-4 row-span-4 bg-gray-50 dark:bg-zinc-800 dark:text-white rounded-3xl shadow-sm flex flex-col justify-center items-center gap-4 relative transition-all duration-500 ease-in-out">
                    <h1 className="text-2xl font-semibold absolute top-4 left-4">Overview</h1>
                    <div className="progress flex justify-center items-center flex-col gap-4 w-full mt-8">
                        <ProgressRing progress={completedHabits.length / habits.length * 100} />
                        <p className="text-sm text-gray-500">Today's Progress</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-center items-center dark:text-white ">
                        <div className="flex items-center gap-2 flex-col bg-gray-100 dark:bg-zinc-500 rounded-xl p-2 w-full">
                            <div className="flex flex-row">
                                <img className="h-5 w-5" src={trophy} alt="" />
                                <p className="text-xl font-semibold">{longestStreak}</p>
                            </div>
                            <p className="text-xs font-semibold ">Longest streak</p>
                        </div>
                        <div className="flex items-center gap-2 flex-col bg-gray-100 dark:bg-zinc-500 rounded-xl p-2 w-full">
                            <div className="flex flex-row items-center">
                                <img className="h-5 w-5" src={train} alt="" />
                                <p className="text-xl font-semibold">{completedHabits.length}</p>
                            </div>
                            <p className="text-xs font-semibold ">Completed</p>
                        </div>
                    </div>
                </div>
                <div className="heatmap col-span-12 row-span-4 bg-gray-50 rounded-3xl shadow-sm p-6 dark:bg-zinc-800 dark:text-white transition-all duration-500 ease-in-out">
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
                                {heatmapData.map((value, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square rounded-sm"
                                        style={{
                                            backgroundColor: value === 0 ? "#EBEDF0" : heatColors[value]
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex flex-col gap-4 text-center justify-center items-center bg-white dark:bg-zinc-800 dark:text-white rounded-[1rem]">
                    <form onSubmit={addHabit} className="flex flex-col gap-4 w-full">
                        <DialogHeader>
                            <DialogTitle>Add New Habit</DialogTitle>
                            <DialogDescription>Add a new habit to your routine.</DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-row gap-4 justify-center items-center">
                            <input
                                type="text"
                                name="title"
                                placeholder="Habit Name"
                                className="border-b-2 border-gray-200 outline-none focus:border-black-500 w-full p-2 dark:border-zinc-600 dark:focus:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                                required
                            />
                        </div>

                        <div className="buttonGroup flex flex-row gap-2 justify-center">
                            {["daily", "weekly", "monthly", "yearly"].map((freq) => (
                                <label
                                    key={freq}
                                    className={`border-2 p-2 px-4 rounded-md cursor-pointer transition-all ${selectedFrequency === freq
                                            ? "bg-black text-white border-black dark:bg-zinc-600 dark:border-zinc-600"
                                            : "text-gray-500 border-gray-200 dark:text-gray-200 dark:border-zinc-600"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="frequency"
                                        value={freq}
                                        className="hidden"
                                        checked={selectedFrequency === freq}
                                        onChange={() => setSelectedFrequency(freq)}
                                    />
                                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                                </label>
                            ))}
                        </div>

                        <button type="submit" className="bg-black text-white dark:bg-white dark:text-black p-2 rounded-md w-full">
                            Add Habit
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Dashboard