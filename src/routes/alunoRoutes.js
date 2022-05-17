import { Router } from 'express'
import AlunoController from '../controllers/AlunoController'
import authMiddleware from '../middlewares/authMiddleware'


const router = new Router()

// criando um aluno
router.get('/', AlunoController.index)
router.get('/:id', AlunoController.show)

router.post('/', authMiddleware, AlunoController.store)
router.put('/:id', authMiddleware, AlunoController.update)
router.delete('/:id', authMiddleware, AlunoController.delete)

export default router