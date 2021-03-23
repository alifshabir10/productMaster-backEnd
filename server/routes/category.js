import {Router} from 'express';
// import cateCtrl from '../controllers/category.controller'
import indexCtrl from '../controllers/IndexController';


const router = Router()

router.get('/', indexCtrl.category.allCategory);
router.get('/cate', indexCtrl.category.getCateId);
router.get('/:cate_id', indexCtrl.category.findCate);
router.put('/:cate_id', indexCtrl.category.updateCate);
router.delete('/:cate_id', indexCtrl.category.deleteCate)
router.post('/', indexCtrl.category.addCate);

export default router;