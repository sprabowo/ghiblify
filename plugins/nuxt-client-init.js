export default async (ctx) => {
	return ctx.store.dispatch('nuxtClientInit', ctx)
}
