import { createRouter } from "../createRouter";

export const userRouter = createRouter()
.mutation('register-user', {
	resolve: async ({ctx}) => {
		ctx.prisma
	}
})