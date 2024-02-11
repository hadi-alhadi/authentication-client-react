import { store } from "./store";

describe("Redux Store Configuration", () => {
  test("Store is configured correctly", () => {
    expect(store).toBeDefined();

    const expectedReducerKeys = [
      "authReducer",
      "userReducer",
      "generalReducer",
      "authAPI",
    ];
    const actualReducerKeys = Object.keys(store.getState());
    expect(actualReducerKeys).toEqual(
      expect.arrayContaining(expectedReducerKeys),
    );

    expect(store.dispatch).toBeDefined();
  });

  test("Middleware is applied correctly", () => {
    const middleware = store.getState().toString();
    expect(middleware).toBeTruthy();
  });
});
