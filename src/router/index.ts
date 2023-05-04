import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/IndexView.vue'
import BookrackView from '../views/BookrackView.vue'
import BookTownView from '../views/BookTownView.vue'
import BookTypeView from '../views/BookTypeView.vue'
import MineView from '../views/MineView.vue'
import RankingList from '../views/RankingList.vue'
import ChoicenessView from '../views/ChoicenessView.vue'
import FreeView from '../views/FreeView.vue'
import ManView from '../views/ManView.vue'
import GirlView from '../views/GirlView.vue'
import PublishView from '../views/PublishView.vue'
import ListenView from '../views/ListenView.vue'
import BookMsg from '../views/BookMsg.vue'
import SearchView from '../views/SearchView.vue'
import ParticularsView from '../views/ParticularsView.vue'
import CatalogueView from '../views/CatalogueView.vue'
import CommentView from '../views/CommentView.vue'
import PublishRankView from '../views/PublishRankView.vue'
import CompetitiveProductsView from '../views/CompetitiveProductsView.vue'
import ListenBookView from '../views/ListenBookView.vue'
import HistoryView from '../views/HistoryView.vue'
import ChangeBookrackView from '../views/ChangeBookrackView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexView,
      children:[
        {
          path: '',
          component: BookTownView,
          children:[
            {
              path: '',
              name: 'choiceness',
              component: ChoicenessView
            },
            {
              path: 'free',
              name: 'free',
              component: FreeView
            },
            {
              path: 'man',
              name: 'man',
              component: ManView
            },
            {
              path: 'girl',
              name: 'girl',
              component: GirlView
            },
            {
              path: 'publish',
              name: 'publish',
              component: PublishView
            },
            {
              path: 'listen',
              name: 'listen',
              component: ListenView
            },
          ]
        },
        {
          path: 'bookrack',
          name: 'bookrack',
          component: BookrackView
        },
        {
          path: 'bookType',
          name: 'bookType',
          component: BookTypeView
        },
        {
          path: 'mine',
          name: 'mine',
          component: MineView
        },
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: RankingList
    },
    {
      path: '/bookMsg',
      name: 'bookMsg',
      component: BookMsg
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/particulars',
      name: 'particulars',
      component: ParticularsView
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: CatalogueView
    },
    {
      path: '/comment',
      name: 'comment',
      component: CommentView
    },
    {
      path: '/publishRank',
      name: 'publishRank',
      component: PublishRankView
    },
    {
      path: '/competitiveProducts',
      name: 'competitiveProducts',
      component: CompetitiveProductsView
    },
    {
      path: '/listenBook',
      name: 'listenBook',
      component: ListenBookView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    },
    {
      path: '/changeBookrack',
      name: 'changeBookrack',
      component: ChangeBookrackView
    },
  ]
})

export default router
