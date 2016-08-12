export default function reduceUserConversations(state, myConversations) {
  return {
    ...state,
    myConversations
  };
};
