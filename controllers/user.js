const {Users} = require('../model');

const userController = {
    getAllUser(req, res) {
        Users.find({})
        .populate({path:'thoughts', path: 'friends'})
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    getUserById({params}, res) {
        Users.findOne({_id: params.id})
        .populate({path:'thoughts', path: 'friends'})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'ID does not match known user'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },
    createUser({body}, res) {
        Users.create(body)
        .then((dbUserData) => {res.json(dbUserData)})
        .catch(err => res.status(400).json(err));
    },
    updateUser({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new:true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'ID does not match known user'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'ID does not match known user'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.userId},
            {$push: {friends: params.friendId}},
            {new:true, runValidators: true}
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'ID does not match known user'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteFriend({params}, res) {
        Users.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new:true}
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;