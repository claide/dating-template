export default function ({ store, redirect, route }) {
  if (store.getters['authentication/authenticated']) {
    console.log('logged in')
    const redirectUrl = route.query.redirect
    if (redirectUrl) {
      return redirect('/' + redirectUrl)
    }
    return redirect('/dashboard')
  }
}
