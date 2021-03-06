import {Router} from 'express';
// import cateCtrl from '../controllers/category.controller'
import indexCtrl from '../controllers/IndexController';


const router = Router()

router.get('/', indexCtrl.condition.allCond);
router.get('/:cond_name', indexCtrl.condition.findCond);
router.put('/:cond_name', indexCtrl.condition.updateCond);
router.delete('/:cond_name', indexCtrl.condition.deleteCond)
router.post('/', indexCtrl.condition.addCond);

export default router;