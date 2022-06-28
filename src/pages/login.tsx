import { NextPage } from "next"
import { useState } from "react"
import { trpc } from "../utils/trpc"

const Login: NextPage = () => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = () => {
        const res = trpc.useQuery(["login", {username, password}])
        console.log(res);
        
    }
    
    return (
        <div>
            <form>
                <input className="border-solid border-black border-2 rounded-lg" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/> <br />
                <input className="border-solid border-black border-2 rounded-lg" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} /> <br />
                <button type="button" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;