import { defineAbility } from "@casl/ability";

// export default defineAbility((can, cannot) => {
//   can("manage", "all");
//   cannot("delete", "User");
// });

export default (user) =>
  defineAbility((can) => {
    can("read", "Article");

    if (user.isLoggedIn) {
      can("update", "Article", { authorId: user.id });
      can("create", "Comment");
      can("update", "Comment", { authorId: user.id });
    }
  });
