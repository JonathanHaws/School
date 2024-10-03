
const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema(
  {
    reactionId: { type: Schema.Types.ObjectId },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { toJSON: { getters: true } }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [ReactionSchema],
  },
  { toJSON: { virtuals: true, getters: true } }
);

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = model('Thought', ThoughtSchema);
