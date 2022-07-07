export default ({ store, next }) => {
  console.log(!store.state.auth.login);
  if (!store.state.auth.login) {
    next("/");
    return false;
  }
  next();
};
