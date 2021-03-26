import { Router } from "express"
import productCtrl from "../controllers/product.controller"

const router = Router ()
router.get ('/', productCtrl.readProduct)
router.get('/:prod_id', productCtrl.findProduct);
router.post('/', productCtrl.addProduct);
router.put('/:prod_id', productCtrl.editProduct);
router.delete('/:prod_id', productCtrl.deleteProduct);

router.get('/prod/:prod_name', productCtrl.getProdName);
export default (router)