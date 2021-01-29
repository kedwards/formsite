import { AbilityBuilder, Ability } from "@casl/ability";

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  can("create", "User");
  cannot("update", "User", { isAdmin: true });

  if (user) {
    can("create", "Form");
    can("read", "Form", { userId: user._id });
    can("update", "User", { userId: user._id });
  }

  if (user && user.isOhs) {
    can("manage", "Form");
    can("manage", "User");
  }

  if (user && user.isManager) {
    can("read", "Form", { userDepartment: user.department });
    can("update", "User", { userDepartment: user.department });
  }

  if (user && user.isAdmin) {
    can("manage", "all");
  }

  return build();
};

export default defineAbilitiesFor;
