const router = require('express').Router();
const FormController  = require('../controllers/FormController');
const TemplateController = require('../controllers/TemplateController');
const PaymentController=require('../controllers/PaymentController');

router.get('/form/:slug',FormController.FormBySlug);

router.post('/form/response',FormController.saveFormResponse);

router.delete('/categories/delete/:id',FormController.deleteCat)

router.post('/save/saveTem',TemplateController.createTemplate);
router.get('/template/:slug',TemplateController.TemplateBySlug);
router.get('/templateone/:id',TemplateController.TemplateByID);
router.delete('/templateone/delete/:id',TemplateController.deleteTem)

const PhotoController=require('../controllers/photoController')
const photoStorage=require('../helpers/photoStorage');

router.post('/photos',photoStorage,PhotoController.savephoto)
router.get('/photos',PhotoController.getPhoto)
router.delete('/photos/delete/:id',PhotoController.deletephoto)
router.delete('/photos/deleteAll/:id',PhotoController.deleteAll)

router.post('/payments',PaymentController.addPaymentDetails)
router.get('/paymentCIds_UID/:id',PaymentController.getPaymentIds_ByID);
router.get('/payments/:slug',PaymentController.PaymentBySlug)

const DocumentController=require('../controllers/DocumentController')
const storage=require('../helpers/documentStroge');
const photoController = require('../controllers/photoController');



router.post('/documents',storage,DocumentController.savedocument);
router.get('/documents/',DocumentController.getdocument)
router.delete('/documents/delete/:id',DocumentController.deleteDoc)
module.exports = router;