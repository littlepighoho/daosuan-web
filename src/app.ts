/**
 * Created by romchung on 2020-01-30.
 *
 */

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
