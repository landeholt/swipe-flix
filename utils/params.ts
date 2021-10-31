import _ from "lodash";

export function getParams(props: any) {
  return _.get(props, "route.params", {});
}
