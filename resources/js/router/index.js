import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

import { __ } from '@plugins/i18n'

import Auth from '@views/auth/'

import Home from '@views/index'

import Main from '@views/main'

import Values from '@views/values/'

import Games from '@views/games/'
import Game from '@views/games/single'
import NewGame from '@views/games/new'
import GamesList from '@views/games/list'

import NotFound from '@views/404'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "Main",
        component: Main,
      },
      {
        name: "Values",
        component: Values,
        path: "values/:sort?",
        meta: {
          title: __("Values"),
          nav: [
            {
              to: {
                name: 'Main',
              },
              icon: 'home',
              label: __("Home"),
            }
          ],
        },
      },
      {
        name: "Games",
        component: Games,
        path: "games",
        meta: {
          title: __("Games"),
          nav: [
            {
              to: {
                name: 'Main',
              },
              icon: 'home',
              label: __("Home"),
            },
            {
              to: {
                name: 'NewGame',
              },
              icon: 'gamepad',
              theme: 'primary',
              label: __("New game"),
            },
          ],
        },
        children: [
          {
            path: "",
            name: "GameList",
            component: GamesList,
          },
          {
            path: ":id",
            name: "Game",
            component: Game,
            meta: {
              nav: [
                {
                  to: {
                    name: 'Main',
                  },
                  icon: 'home',
                  label: __("Home"),
                },
                {
                  to: {
                    name: 'GameList',
                  },
                  label: __("Games"),
                  theme: 'default',
                  icon: 'tic-tac-toe',
                },
                {
                  to: {
                    name: 'NewGame',
                  },
                  icon: 'gamepad',
                  theme: 'primary',
                  label: __("New game"),
                },
              ],
            },
          },
          {
            path: "new",
            name: "NewGame",
            component: NewGame,
            meta: {
              title: __("Setting up your game"),
              nav: [
                {
                  to: {
                    name: 'Main',
                  },
                  icon: 'home',
                  label: __("Home"),
                },
                {
                  to: {
                    name: 'GameList',
                  },
                  label: __("Games"),
                  theme: 'default',
                  icon: 'tic-tac-toe',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    name: "Auth",
    component: Auth,
    path: "/auth/:tab?",
    meta: {
      public: "only",
      title: __("Noble Scripts Tasks"),
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: {
      public: true,
      nav: [
        {
          to: {
            name: 'Main',
          },
          icon: 'home',
          label: __("Home"),
        },
      ],
    },
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(async (to, from, next) => {
  if (store.getters['isAuthUser'])
    await store.dispatch('account/doFetch')

  if(to.matched.some(recorde => !recorde.meta.public)) {
    if (!store.getters['isAuthUser'])
      return next({ name: 'Auth' })
  } else if (to.matched.some(recorde => recorde.meta.public === 'only')) {
    if (store.getters['isAuthUser'])
      return next({ name: 'Main' })
  }

  next();
})
  
export default router