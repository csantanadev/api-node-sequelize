import { Router } from 'express'
import UserController from '../controllers/UserController'
import authMiddleware from '../middlewares/authMiddleware'

const router = new Router()

router.get('/', UserController.index) // num sistema real não deveriam existir
router.get('/:id', UserController.show) // num sistema real não deveriam existir


// para novos usuarios não precisa de autenticacao pq ele ainda nao existe no sistema
router.post('/', authMiddleware, UserController.store)

// O usuário nao podera alterar e nem deletar um usuário passando um id de outros usuários. O que ele pode fazer é ajustar ou remover o próprio dado dele.
// Para isso ele vai acessar via "req.id" adicionado no middleware de seguranca
router.delete('/', authMiddleware, UserController.delete)
router.put('/', authMiddleware, UserController.update)


export default router