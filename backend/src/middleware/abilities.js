import { AbilityBuilder, Ability } from "@casl/ability";

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  cannot("create", "User");

  if (user) {
    can("read", "Form", { userId: user._id });
  }

  if (user && user.isOhs) {
    can("read", "Form");
  }
  console.log("what", user);

  if (user && user.isManager) {
    can("read", "Form", { userDepartment: user.department });
  }

  return build();
};

export default defineAbilitiesFor;
