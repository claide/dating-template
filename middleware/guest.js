export default function ({ store, redirect, route }) {
  if (store.getters['authentication/authenticated']) {
    const redirectUrl = route.query.redirect
    if (redirectUrl) {
      return redirect('/' + redirectUrl)
    }
    return redirect('/dashboard')
  }
}
