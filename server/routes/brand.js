import {Router} from 'express';
import indexController from '../controllers/IndexController';

const router = Router()
router.get('/', indexController.brand.allBrand);
router.get('/:brand_id', indexController.brand.findBrand);
router.post('/', indexController.brand.addBrandMethod);
router.delete('/:brand_id', indexController.brand.deleteBrand);
router.put('/:brand_id', indexController.brand.updateBrand)


export default router;