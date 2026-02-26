export default function Home({currentUser})
{
    return (
        <>
        <div id="Home" className="Home">
        <h1>NC NEWS</h1>
        <h2>Welcome back {currentUser}!</h2>
        <p>Discuss, chat and learn with our friendly community</p>
        </div>
        </>
    )
}