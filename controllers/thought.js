const {Users, Thoughts} = require('../model');

const thoughtsController = {
    getAllThought(req, res) {
        Thoughts.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.status(404).json(err);
        });
    },
    getThoughtById({params}, res) {
        Thoughts.findOne({_id: params.thoughtId})
        .then(dbUserData => {
            if(!dbUserData){
            res.status(404).json({message: 'ID does not match known thought'});
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err)
        });
    },
    addThought({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts:_id}},
                {new:true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'ID does not match known user'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    updateThought({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, body, {new:true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'ID does not match known thought'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    removeThought({params}, res) {
        Thoughts.findOneAndDelete({_id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought){
                return res.status(404).json({message: 'ID does not match known thought'});
            }
            return Users.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.thoughtId}},
                {new:true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({message: 'ID does not match known user'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new:true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'ID does not match known user'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));

    },
    removeReaction({params}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new:true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtsController;