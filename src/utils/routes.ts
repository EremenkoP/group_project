export const router = {
  main: "/",
  signUp: "/sign-up",
  signIn: "/sign-in",
  people: "/people",
  films: "/films",
  starships: "/starships",
  vehicles: "/vehicles",
  species: "/species",
  planets: "/planets",
  oneElement: "/:group/:id",
  navOneElement: (group: string, id: string) => `/${group}/${id}`,
  error: '/*'
};