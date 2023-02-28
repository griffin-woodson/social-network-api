const router = require('express').Router();
const {getAllThought, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction} = require('../../controllers/thought');

router
    .route('/')
    .get(getAllThought)
    
router
    .route('/:userId')
    .post(addThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

router
    .route('/:userId/:thoughtId')
    .delete(removeThought)

router
    .route('/:thoughtId/reaction')
    .post(addReaction);    

router
    .route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction);
    
module.exports = router;