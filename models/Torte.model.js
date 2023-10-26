const { Schema, model } = require("mongoose");

const TorteSchema = new Schema(
    {
        name: { type: String, require },
        sizes: {
            type:Array,
            default:['small','medium','large']
        },
        prices: {
            type:Array,
            default: [
                {
                    "small": 50,
                    "medium": 80,
                    "large": 120
                }
            ]
        },
        category: { type: String, require },
        image:String,
        description: { type: String, require },
        comment: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);
const Torte = model("Torte", TorteSchema);

module.exports = Torte;
