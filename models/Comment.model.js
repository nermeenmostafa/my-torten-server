const { Schema, model, default: mongoose } = require("mongoose");

const CommentSchema = new Schema(
    {
        text:
        {
            type: String,
            required: true,
        },


        name:
            { type: mongoose.Types.ObjectId, ref: 'User', required: true },


    },
       
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }

);

const Comment = model("comment", CommentSchema);

module.exports = Comment;
