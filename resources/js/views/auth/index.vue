<template>
  <div :class="[
    'box',
    'container',
    'container--auth',
    [$route.params.tab],
  ]">
    <div class="wrapper">
      <v-login class="wrapper__login" />
      <div class="wrapper__content">
        <h2>{{ __("Hello everyone") }}&#128400;</h2>
        <p>{{ __("Do you want to know what the implementation of a test problem is? You need to log in.") }}</p>
        <p>{{ __("I hope you won't be disappointed with the result.") }}</p>
        <p>{{ __("All grammar claims to provide Google translator") }}&#128522;.</p>
      </div>
      <v-registration class="wrapper__register" />
    </div>
  </div>
</template>

<script>

import VLogin from './login'
import VRegistration from './registration'

export default {
  components: {
    VLogin,
    VRegistration,
  },
  setup() {
    
  },
}
</script>

<style lang="scss">
  
  .container--auth {
    .bg {
      top: 0;
      left: 0;
      z-index: 0;
      position: absolute;

      width: 100%;
      height: 100%;

      background-size: cover;
      background-repeat: no-repeat;
      background-position: left center;
      filter: blur(5px) brightness(.9);
    }

    form {
      z-index: 1;
      position: relative;

      gap: 15px;
      display: flex;
      flex-direction: column;

      width: 100%;
      max-width: 280px;

      input {
        width: 100%;

        &.invalid {
          border-color: #ff1f0fab;
        }
      }

      h3 {
        margin: 0;

        text-align: center;

        &::after {
          content: '';
          

          height: 1px;
          width: 100px;
        }
      }

      .nav {
        div {
          gap: 20px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }
      }

      a {
        color: rgb(228, 228, 228);
      }

      a:hover {
        color: white;
        text-decoration: underline;
      }
    }
  }

</style>

<style scoped lang="scss">

  .container {
    flex: 0 0 100%;

    width: 100%;
    max-width: 991px;

    padding: 0;

    overflow: hidden;

    .wrapper {
      display: grid;

      grid-template-columns: 100% 100% 100%;
      grid-template-areas: "Login Register" "Content .";

      transition: transform .3s;

      @media screen and (min-width: 768px) {
        grid-template-areas: "Login Content Register";
        grid-template-columns: 370px calc(100% - 370px) 370px;
      }

      &__login {
        grid-area: Login;

        transition: transform .3s;
      }

      &__register {
        grid-area: Register;

        transition: transform .3s;
      }

      &__content {
        grid-area: Content;

        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 15px;

        @media screen and (min-width: 768px) {
          min-height: 400px;

          padding: 30px;
        }

        h2 {
          margin: 0;
        }
        
        p {
          margin-top: 0;
        }

      }

    }

    &.registration {
      .wrapper__login,
      .wrapper__register {
        transform: translateX(-100%);
      }

      @media screen and (min-width: 768px) {
        .wrapper__login,
        .wrapper__register {
          transform: translateX(0);
        }

        .wrapper {
          transform: translateX(-370px);
        }
      }
    }
    
  }

</style>