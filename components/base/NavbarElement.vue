<template>
  <nav class="bg-black text-white sticky top-0 z-50">
    <div
      class="container px-4 sm:px-6 py-2 md:py-4 flex flex-wrap justify-between items-center mx-auto"
    >
      <div class="flex items-center justify-between ">
        <nuxt-link to="/">
          LogoHere
          <!-- <ShagtodayLogo class="mr-0 md:mr-8 h-6 sm:h-10" /> -->
        </nuxt-link>
        <div class="items-center hidden md:flex text-sm">
          <span class="h-3 w-3 bg-green-500 mr-2 rounded-full" />
          <span>2,360 online now</span>
        </div>
      </div>
      <div id="desktop-menu" class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 items-center"
        >
          <li class="flex items-center">
            <nuxt-link to="/login" class="text-white hover:text-primary mr-3">
              Login
            </nuxt-link>
            <nuxt-link
              to="/register"
              class="block py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:bg-yellow-500 text-black rounded font-medium"
            >
              Create account
            </nuxt-link>
          </li>
          <li class="flex items-center">
            <ThemeSwitchDesktop />
          </li>
        </ul>
      </div>
      <div id="mobile-menu" class="flex md:hidden grow gap-4 justify-end">
        <ThemeSwitchMobile />
        <nuxt-link
          v-if="$route.path === '/login'"
          to="/register"
          class="block md:hidden text-white "
        >
          Register
        </nuxt-link>
        <nuxt-link v-else to="/login" class="block md:hidden text-white ">
          Log In
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
}
</script>
