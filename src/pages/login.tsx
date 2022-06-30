import type { NextPage } from "next"
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { createUserInput } from "../schema/user.schema";

const Register: NextPage = () => {
	const {handleSubmit, register} = useForm<createUserInput>()
	const router = useRouter();

	// const {mutate, error} = trpc.useMutation(["users.register-user"], {
	// 	onSuccess: (data) => {
	// 		router.push("/login");
	// 	}
	// })

	const onSubmit = async (values: createUserInput) => {
		// mutate(values)
	}
	
   	return (
    	<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* {error && error.message} */}
				<h1>Login</h1>
				<input type="email" placeholder="john.citizen@example.com" {...register("email")} />
			</form>

			<Link href="/register">Register</Link>
    	</>
   	)
}

export default Register;