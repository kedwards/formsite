import { AbilityBuilder, Ability } from "@casl/ability";

const defineAbilitiesFor = (userInfo) => {
  const { can, build } = new AbilityBuilder(Ability);

  if (userInfo && (userInfo.isOhs || userInfo.isAdmin || userInfo.isSysAdmin)) {
    can("read", "Dashboard");
  }

  // if (userInfo && userInfo.isSysAdmin) {
  //   can("manage", "all");
  // }

  return build();
};

export default defineAbilitiesFor;
