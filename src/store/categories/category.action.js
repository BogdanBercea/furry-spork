import { createAction } from '../../utils/reducer/reducer.utils';

import { CATEGORY_ACTION_TYPES } from './category.types';

export const fetchCategoriesStart = () => {
  return createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START
  );
};

export const fetchCategoriesSuccess = (categoriesArray) => {
  return createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );
};

export const fetchCategoriesFailure = (error) => {
  return createAction(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  );
};