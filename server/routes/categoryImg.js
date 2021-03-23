import {Router} from 'express';
import indexCtrl from '../controllers/IndexController';
// import cateImg from '../controllers/categoryImg.controller';

const router = Router()

// router.post('/upload', indexCtrl.apiUploadDownload.uploadPhoto);
// router.get('/download/:image', indexCtrl.apiUploadDownload.downloadPhoto);

router.get('/', indexCtrl.categoryImg.allCateImg);
router.get('/:caim_id', indexCtrl.categoryImg.findCateImg);

router.put('/:caim_id', indexCtrl.categoryImg.updateCateImg);
router.delete('/:caim_id', indexCtrl.categoryImg.deleteCateImg)
router.post('/', indexCtrl.categoryImg.addCateImg);

export default (router)