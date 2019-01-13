import { LoadItems, LoadItemsFail, LoadItemsSuccess } from './actions';

describe('action', () => {
  test('LoadItems', () => {
    const action = new LoadItems();

    expect(action).toMatchSnapshot();
  });

  test('LoadItemsFail', () => {
    const action = new LoadItemsFail('randomId');

    expect(action).toMatchSnapshot();
  });

  test('LoadItemsSuccess', () => {
    const action = new LoadItemsSuccess('randomId');

    expect(action).toMatchSnapshot();
  });
});
