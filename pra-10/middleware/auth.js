export default function ({ store, redirect }) {
  if (!store.getters["auth/getisAuth"]) {
    return redirect("/UserLogin");
  }
}
