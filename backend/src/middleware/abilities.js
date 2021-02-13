import { AbilityBuilder, Ability } from "@casl/ability";
import yn from "yn";

const defineAbilitiesFor = (user) => {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  if (yn(process.env.REGISTRATION_ENABLED)) {
    can("create", "User");
  }

  if (yn(process.env.LOGIN_ENABLED)) {
    can("login", "User");
  }

  if (user && (user.isAdmin || user.isManager || user.isOhs)) {
    can("manage", "all");
  }

  if (user) {
    can("create", "Form");
    can("read", "Form", { userId: user._id });
    can(["read", "update"], "User", { userId: user._id });
  }

  if (user && user.isOhs) {
    can("manage", "Form");
    can("manage", "User");
  }

  if (user && user.isManager) {
    can("read", "Form", { userDepartment: user.department });
    can(["read", "update"], "User", { userDepartment: user.department });
  }

  return build();
};

export default defineAbilitiesFor;
