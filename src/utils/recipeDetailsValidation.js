export const title_validation = {
  name: "recipeTitle",
  label: "Title",
  type: "text",
  id: "recipeTitle",
  placeholder: "Enter Recipe Title",
  validation: {
    required: {
      value: true,
      message: "Title must be Requires",
    },
    maxLength: {
      value: 100,
      message: "100 characters max",
    },
  },
};

export const url_validation = {
  name: "recipeUrl",
  label: "Image Url",
  type: "url",
  id: "recipeUrl",
  placeholder: "Enter Image Url",
  validation: {
    required: {
      value: true,
      message: "Image Url is required",
    },
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: "Enter a valid URL",
    },
  },
};

export const servings_validation = {
  name: "recipeServing",
  label: "Total Servings",
  type: "number",
  id: "recipeServing",
  placeholder: "Enter Total Servings",
  validation: {
    required: {
      value: true,
      message: "Total Servings is required",
    },
    min: {
      value: 1,
      message: "Total Servings must be at least 1",
    },
  },
};

export const time_validation = {
  name: "recipeTime",
  label: "Cooked time (in minute)",
  type: "number",
  id: "recipeTime",
  placeholder: "Enter Cooked Time",
  validation: {
    required: {
      value: true,
      message: "Cooked time is required",
    },
    min: {
      value: 1,
      message: "Cooked time must be at least 1 minute",
    },
  },
};

export const instructions_validation = {
  name: "recipeInstructions",
  label: "Instructions",
  id: "recipeInstructions",
  multiline: true,
  placeholder: "Enter instructions separated by full-stop",
  validation: {
    required: {
      value: true,
      message: "Instructions are required",
    },
  },
};

export const ingredients_validation = {
  name: "recipeIngredients",
  label: "Ingredients",
  id: "recipeIngredients",
  multiline: true,
  placeholder: "Enter ingredients separated by comma",
  validation: {
    required: {
      value: true,
      message: "Ingredients are required",
    },
  },
};
