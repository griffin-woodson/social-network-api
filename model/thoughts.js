const {Schema, model, Types} = require("mongoose");
const newDateFormat = require('../utils/newDateFormat');

const reactionSchema = new Schema(
    {
       reactionId: {
           type: Schema.Types.ObjectId,
           default: () => new Types.ObjectId()
       },
       reactionBody: {
           type: String,
           required: true,
           maxlength: 280
       },
       username: {
           type: String,
           required: true,
       },
       createdAt: {
           type: Date,
           default: Date.now,
           get: createdAtVal => newDateFormat(createdAtVal)
       }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => newDateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false,
    }
    );


    thoughtsSchema.virtual('ractionCount').get(function() {
        return this.reactions.length;
    });

    const Thoughts = model("Thoughts", thoughtsSchema);

    module.exports = Thoughts;